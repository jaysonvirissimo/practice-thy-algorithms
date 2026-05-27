import rawProblems from '@shared/problems.json';
import type { Problem, RawProblem } from './types';

/**
 * Parse a JavaScript function signature into its name and argument names.
 *
 * The JSON `parameters[]` names are occasionally wrong (e.g. two_sum,
 * maximum_subarray), so the signature is the authoritative source. The split is
 * bracket-depth aware so default values containing commas survive intact, e.g.
 * `function coinChange(amount, coins = [1, 5, 10, 25])`.
 */
export function parseSignature(signature: string): {
  functionName: string;
  argNames: string[];
} {
  const nameMatch = signature.match(/function\s+([A-Za-z0-9_$]+)/);
  const functionName = nameMatch ? nameMatch[1] : '';

  const open = signature.indexOf('(');
  const close = signature.lastIndexOf(')');
  const argList =
    open >= 0 && close > open ? signature.slice(open + 1, close) : '';

  const argNames: string[] = [];
  let depth = 0;
  let current = '';
  for (const ch of argList) {
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if (ch === ')' || ch === ']' || ch === '}') depth--;

    if (ch === ',' && depth === 0) {
      argNames.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) argNames.push(current);

  return {
    functionName,
    // Strip default values (`= ...`) and whitespace; keep declaration order.
    argNames: argNames
      .map((a) => a.split('=')[0].trim())
      .filter((a) => a.length > 0),
  };
}

function deriveProblem(key: string, raw: RawProblem): Problem {
  const jsSignature = raw.functionSignatures.javascript;
  const { functionName, argNames } = parseSignature(jsSignature);

  return {
    key,
    title: raw.title,
    description: raw.description,
    complexity: raw.complexity,
    functionName,
    argNames,
    paramTypes: raw.parameters.map((p) => p.type),
    signatureTemplate: `${jsSignature} {\n  \n}\n`,
    isListNodeReturn: raw.returnType.javascript === 'ListNode',
    testCases: raw.testCases,
    hints: raw.hints,
  };
}

/** All problems, in the order they appear in problems.json. */
export const PROBLEMS: Problem[] = Object.entries(
  rawProblems as Record<string, RawProblem>,
).map(([key, raw]) => deriveProblem(key, raw));

const BY_KEY = new Map(PROBLEMS.map((p) => [p.key, p]));

export function getProblem(key: string): Problem | undefined {
  return BY_KEY.get(key);
}
