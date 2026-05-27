import rawProblems from '@shared/problems.json';
import type { Language, LangSpec, Problem, RawProblem } from './types';

/**
 * Parse a JavaScript or Ruby function signature into its name and argument names.
 *
 * The JSON `parameters[]` names are occasionally wrong (e.g. two_sum,
 * maximum_subarray), so the signature is the authoritative source. The split is
 * bracket-depth aware so default values containing commas survive intact, e.g.
 * `function coinChange(amount, coins = [1, 5, 10, 25])` or
 * `def coin_change(amount, coins = [1, 5, 10, 25])`.
 */
export function parseSignature(signature: string): {
  functionName: string;
  argNames: string[];
} {
  const nameMatch = signature.match(/(?:function|def)\s+([A-Za-z0-9_$]+)/);
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

function deriveLangSpec(
  signature: string,
  paramTypes: string[],
  isListNodeReturn: boolean,
  language: Language,
): LangSpec {
  const { functionName, argNames } = parseSignature(signature);
  // Ruby needs an `end`; Python needs a colon + indented body (`pass` so the
  // bare template parses and runs); JS needs a brace body (M1 seed preserved).
  const body =
    language === 'ruby'
      ? `\n  \nend\n`
      : language === 'python'
        ? `:\n    pass\n`
        : ` {\n  \n}\n`;
  return {
    functionName,
    argNames,
    paramTypes,
    signatureTemplate: signature + body,
    isListNodeReturn,
  };
}

function deriveProblem(key: string, raw: RawProblem): Problem {
  const paramTypes = raw.parameters.map((p) => p.type);
  return {
    key,
    title: raw.title,
    description: raw.description,
    complexity: raw.complexity,
    testCases: raw.testCases,
    hints: raw.hints,
    languages: {
      javascript: deriveLangSpec(
        raw.functionSignatures.javascript,
        paramTypes,
        raw.returnType.javascript === 'ListNode',
        'javascript',
      ),
      ruby: deriveLangSpec(
        raw.functionSignatures.ruby,
        paramTypes,
        raw.returnType.ruby === 'ListNode',
        'ruby',
      ),
      python: deriveLangSpec(
        raw.functionSignatures.python,
        paramTypes,
        raw.returnType.python === 'ListNode',
        'python',
      ),
    },
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
