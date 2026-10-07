import rawProblems from '@shared/problems.json';
import type {
  AnalysisProblem,
  Language,
  LangSpec,
  Problem,
  RawAnalysisProblem,
  RawEntry,
  RawProblem,
} from './types';
import { isPredefinedType } from './predefinedTypes';

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
  returnType: string,
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
  // Catalog types referenced by the signature (params ∪ return), in order,
  // deduped — drives the read-only "Predefined" box; empty for primitive-only
  // problems.
  const predefinedTypes: string[] = [];
  for (const t of [...paramTypes, returnType]) {
    if (isPredefinedType(t) && !predefinedTypes.includes(t)) {
      predefinedTypes.push(t);
    }
  }
  return {
    functionName,
    argNames,
    paramTypes,
    signatureTemplate: signature + body,
    isListNodeReturn: returnType === 'ListNode',
    predefinedTypes,
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
        raw.returnType.javascript,
        'javascript',
      ),
      ruby: deriveLangSpec(
        raw.functionSignatures.ruby,
        paramTypes,
        raw.returnType.ruby,
        'ruby',
      ),
      python: deriveLangSpec(
        raw.functionSignatures.python,
        paramTypes,
        raw.returnType.python,
        'python',
      ),
    },
  };
}

function isAnalysis(raw: RawEntry): raw is RawAnalysisProblem {
  return raw.kind === 'analysis';
}

const ENTRIES = Object.entries(rawProblems as Record<string, RawEntry>);

/** All coding problems, in the order they appear in problems.json. */
export const PROBLEMS: Problem[] = ENTRIES.flatMap(([key, raw]) =>
  isAnalysis(raw) ? [] : [deriveProblem(key, raw)],
);

/** All analysis (no-code) problems, in the order they appear in problems.json. */
export const ANALYSIS_PROBLEMS: AnalysisProblem[] = ENTRIES.flatMap(
  ([key, raw]) =>
    isAnalysis(raw)
      ? [
          {
            key,
            title: raw.title,
            description: raw.description,
            parts: raw.parts,
            hints: raw.hints,
          },
        ]
      : [],
);

const BY_KEY = new Map(PROBLEMS.map((p) => [p.key, p]));
const ANALYSIS_BY_KEY = new Map(ANALYSIS_PROBLEMS.map((p) => [p.key, p]));

export function getProblem(key: string): Problem | undefined {
  return BY_KEY.get(key);
}

export function getAnalysisProblem(key: string): AnalysisProblem | undefined {
  return ANALYSIS_BY_KEY.get(key);
}
