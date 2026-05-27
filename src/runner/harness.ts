import type { Problem, TestRunResult, CaseResult } from '../data/types';
import { compare } from './comparison';
import { arrayToList, listToArray, serializeForDisplay } from './marshal';

export const PROTOCOL_VERSION = 1;

const CONSOLE_METHODS = ['log', 'info', 'warn', 'error', 'debug'] as const;

function stringifyArg(arg: unknown): string {
  if (typeof arg === 'string') return arg;
  try {
    return JSON.stringify(arg);
  } catch {
    return String(arg);
  }
}

function errToString(err: unknown): string {
  if (err instanceof Error) return err.stack ?? `${err.name}: ${err.message}`;
  return String(err);
}

/**
 * Execute `userCode` against a problem's test cases and return a structured,
 * structured-clone-safe result. Pure and synchronous: no worker/postMessage, so
 * the same function runs under Vitest on the main thread and inside the worker.
 *
 * It cannot interrupt an infinite loop — the hard timeout lives in JsRunner,
 * which terminates the worker.
 */
export function runHarness(userCode: string, problem: Problem): TestRunResult {
  const start =
    typeof performance !== 'undefined' ? performance.now() : Date.now();

  const result: TestRunResult = {
    protocolVersion: PROTOCOL_VERSION,
    passed: false,
    cases: [],
    durationMs: 0,
    stdout: '',
  };

  // Capture user debug output separately from the result protocol.
  let stdoutBuffer = '';
  const original: Partial<Record<(typeof CONSOLE_METHODS)[number], unknown>> =
    {};
  const globalConsole = console as unknown as Record<string, unknown>;
  for (const method of CONSOLE_METHODS) {
    original[method] = globalConsole[method];
    globalConsole[method] = (...args: unknown[]) => {
      stdoutBuffer += args.map(stringifyArg).join(' ') + '\n';
    };
  }

  try {
    // --- Load phase: resolve the user's function. Failures are runtimeError. ---
    let fn: unknown;
    try {
      const factory = new Function(
        `${userCode}\n;return typeof ${problem.functionName} !== 'undefined' ? ${problem.functionName} : undefined;`,
      );
      fn = factory();
    } catch (err) {
      result.runtimeError = errToString(err);
      return finalize();
    }
    if (typeof fn !== 'function') {
      result.runtimeError = `Function "${problem.functionName}" is not defined. Define it using the given signature.`;
      return finalize();
    }
    const userFn = fn as (...args: unknown[]) => unknown;

    // --- Per-case execution. Each case is isolated; the loop never aborts. ---
    for (const testCase of problem.testCases) {
      const { input, expected, description } = testCase;
      const mode = testCase.comparison?.mode ?? 'exact';
      const caseResult: CaseResult = {
        description,
        passed: false,
        expected: serializeForDisplay(expected),
        actual: undefined,
      };

      try {
        const args = marshalArgs(problem, input);
        const raw = userFn(...args);
        const actual = problem.isListNodeReturn
          ? listToArray(raw as never)
          : raw;
        caseResult.actual = serializeForDisplay(actual);
        caseResult.passed = compare(mode, actual, expected);
      } catch (err) {
        caseResult.error = errToString(err);
      }

      result.cases.push(caseResult);
    }

    result.passed =
      result.cases.length > 0 && result.cases.every((c) => c.passed);
    return finalize();
  } finally {
    // Restore console no matter how we exit.
    for (const method of CONSOLE_METHODS) {
      globalConsole[method] = original[method];
    }
  }

  function finalize(): TestRunResult {
    const end =
      typeof performance !== 'undefined' ? performance.now() : Date.now();
    result.durationMs = end - start;
    result.stdout = stdoutBuffer;
    return result;
  }
}

/**
 * Build positional arguments for the user function from a test case's `input`.
 *
 * Prefers `input[argName]`, falling back to positional order (handles cases
 * where the input key diverges from the signature arg name, e.g.
 * maximum_subarray's `array` vs `numbers`). ListNode params are built from their
 * array, using `input.pos` to wire a cycle when present (has_cycle). The `pos`
 * key is a construction hint, never passed as an argument.
 */
function marshalArgs(
  problem: Problem,
  input: Record<string, unknown>,
): unknown[] {
  const values = Object.values(input);
  const pos = typeof input.pos === 'number' ? input.pos : undefined;

  return problem.argNames.map((name, i) => {
    const hasNamed = Object.prototype.hasOwnProperty.call(input, name);
    const raw = hasNamed ? input[name] : values[i];

    if (problem.paramTypes[i] === 'ListNode') {
      // arrayToList builds fresh nodes, so the source array is never mutated.
      return arrayToList(raw as number[], pos);
    }
    // Clone so in-place mutation by user code (e.g. nums.sort(), grid flips)
    // can't corrupt the shared problem data across cases or runs.
    return clone(raw);
  });
}

function clone<T>(value: T): T {
  if (typeof value !== 'object' || value === null) return value;
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value)) as T;
}
