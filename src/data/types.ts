// Type contracts shared across the data, runner, and UI layers.

/** Languages the app can run in-browser (JS native, Ruby/Python via WASM). */
export type Language = 'javascript' | 'ruby' | 'python';

export type ComparisonMode = 'exact' | 'unordered_array' | 'set_equality';

// ---------------------------------------------------------------------------
// Raw shapes — mirror shared/problems.json exactly.
// ---------------------------------------------------------------------------

export interface RawParam {
  name: string;
  type: string;
  description: string;
}

export interface RawComparison {
  mode: ComparisonMode;
  type: string;
}

export interface RawTestCase {
  input: Record<string, unknown>;
  expected: unknown;
  description: string;
  comparison?: RawComparison;
}

export interface RawProblem {
  /** Coding problems omit `kind`; analysis problems set it to "analysis". */
  kind?: 'coding';
  title: string;
  description: string;
  complexity: string;
  parameters: RawParam[];
  returnType: Record<string, string>;
  functionSignatures: Record<string, string>;
  testCases: RawTestCase[];
  hints?: string[];
}

/** How an analysis part is answered and graded. */
export type AnswerSpec =
  | { type: 'integer'; value: number }
  | { type: 'choice'; choices: string[]; value: string };

export interface RawAnalysisPart {
  prompt: string;
  answer: AnswerSpec;
  /** Shown once the part is answered correctly. */
  explanation?: string;
}

/** A conceptual (no-code) problem: graded in the UI, never sent to a runner. */
export interface RawAnalysisProblem {
  kind: 'analysis';
  title: string;
  description: string;
  parts: RawAnalysisPart[];
  hints?: string[];
}

/** Any entry in shared/problems.json. */
export type RawEntry = RawProblem | RawAnalysisProblem;

// ---------------------------------------------------------------------------
// Enriched shape — derived once at load time and consumed by the app.
// ---------------------------------------------------------------------------

/** Per-language derivation used by the editor seed and the test harness. */
export interface LangSpec {
  /** Function/method name parsed from the language's signature (authoritative). */
  functionName: string;
  /** Argument names parsed from the signature, in order. */
  argNames: string[];
  /** Parameter types positionally aligned with argNames (for ListNode detection). */
  paramTypes: string[];
  /** Editor seed: the raw signature plus an empty body. */
  signatureTemplate: string;
  /** True when returnType[language] === "ListNode" (serialize result to array). */
  isListNodeReturn: boolean;
  /** Catalog type names referenced by params or return, order-preserving + deduped. */
  predefinedTypes: string[];
}

export interface Problem {
  /** snake_case key from problems.json, e.g. "two_sum". */
  key: string;
  title: string;
  description: string;
  complexity: string;
  testCases: RawTestCase[];
  hints?: string[];
  /** Derived per-language specs (javascript, ruby). */
  languages: Record<Language, LangSpec>;
}

export interface AnalysisProblem {
  /** snake_case key from problems.json, e.g. "florentine_deposit_ledger". */
  key: string;
  title: string;
  description: string;
  parts: RawAnalysisPart[];
  hints?: string[];
}

// ---------------------------------------------------------------------------
// Runner contracts (SDD §6.1).
// ---------------------------------------------------------------------------

export interface CaseResult {
  description: string;
  passed: boolean;
  /** Display-only canonical serialization of the expected value. */
  expected: unknown;
  /** Display-only canonical serialization of the actual value. */
  actual: unknown;
  /** Per-case error (exception thrown while running this case). */
  error?: string;
}

export interface TestRunResult {
  protocolVersion: number;
  passed: boolean;
  cases: CaseResult[];
  durationMs: number;
  /** Load/parse/compile failure that prevented any case from running. */
  runtimeError?: string;
  /** User debug output (console.*), captured separately from the protocol. */
  stdout?: string;
}

export interface LanguageRunner {
  init(): Promise<void>;
  run(userCode: string, problem: Problem): Promise<TestRunResult>;
  dispose(): void;
}
