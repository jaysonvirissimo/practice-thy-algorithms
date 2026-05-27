# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

*Practice Thy Algorithms* is a **static, in-browser** algorithm-practice app (Vite + React +
TypeScript), deployed to GitHub Pages. Users solve the bundled problems in **JavaScript, Ruby, or
Python** and verify them entirely client-side — no backend, no local language toolchains. JavaScript
runs natively in a Web Worker; Ruby runs via ruby.wasm; Python runs via Pyodide.

> History: this was formerly a multi-language local-CLI repo (Jest / RSpec / unittest per language).
> That workflow was retired in the browser cutover (M5); its final state is preserved under the
> `cli-final` git tag. Do not reintroduce per-language CLI dirs or test generators.

## Repository Structure

- `index.html`, `src/` — the browser app:
  - `src/data/` — `problems.ts` (loads `shared/problems.json` via the `@shared` alias and derives a
    typed `Problem` per language), `types.ts`, `storage.ts` (localStorage persistence).
  - `src/runner/` — the execution layer: `index.ts` (`getRunner(language)`), `JsRunner.ts`,
    `comparison.ts`, `marshal.ts`, `harness.ts` (the JS in-runtime harness), `protocol.ts`, and the
    WASM runners `ruby/` and `python/` (each with a `*Runner.ts`, `*.worker.ts`, `prelude.*`,
    `driver.*`, and a `comparison.parity.test.ts`).
  - `src/components/` — React UI (`Catalog`, `Workspace`, `Editor`, `ResultsPanel`, `Hints`, …).
- `shared/problems.json` — the single source of truth for all problems (consumed directly by the app).
- `tests/e2e/` — Playwright end-to-end specs.
- `.github/workflows/deploy.yml` — build + test + deploy to GitHub Pages on push to `master`.

## Development Commands

```bash
npm install
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build  → dist/
npm run preview    # serve the production build
npm test           # Vitest run (unit/component + Ruby & Python comparator parity)
npm run test:watch # Vitest watch
npm run test:e2e:install   # one-time Playwright browser install
npm run test:e2e           # Playwright (boots the real ruby.wasm / Pyodide runtimes)
```

Node 20 only (see `.tool-versions`); Ruby/Python execute in-browser, not locally.

## Architecture

- **Single source of truth.** `shared/problems.json` defines every problem: `title`, `description`,
  `complexity`, `parameters`, per-language `functionSignatures` and `returnType`, `testCases`, and an
  optional top-level language-agnostic `hints` array. `src/data/problems.ts` derives a `Problem`
  whose `languages: Record<Language, LangSpec>` holds, per language, the function name + arg names
  (from `parseSignature`), the editor seed template, and an `isListNodeReturn` flag.
- **Signature is authoritative.** `parseSignature` extracts the function name and argument names/order
  from `functionSignatures[language]`. The JSON `parameters[]` names and the `testCase.input` keys can
  diverge from the signature (e.g. `two_sum`'s param is `array` but the input key is `nums`;
  `maximum_subarray`'s JS arg is `numbers` but the input key is `array`). The harness binds arguments
  **by name, falling back to positional order**, so these mismatches are handled.
- **Assert in runtime.** Each language verifies natively in its own VM, then returns a structured
  `TestRunResult` (`protocolVersion: 1`, per-case `{description, passed, expected, actual, error?}`,
  `durationMs`, `runtimeError?`, `stdout`). JavaScript: a pure `runHarness` evaluated in a
  **fresh-per-run** Web Worker (so infinite loops are hard-killed by terminating it; 3 s timeout).
  Ruby/Python: a `prelude.*` (ListNode + helpers + comparators) loaded once in a **persistent** worker,
  plus a `driver.*` (`__ptap_run`) evaluated per run; on timeout the worker is terminated and the VM
  re-booted next run. Metadata reaches Ruby as base64-in-eval (the bridge can't pass a raw JS string)
  and Python via `pyodide.globals.set`; user `stdout` is captured separately from the result.
- **Comparison modes.** `comparison.mode` may be `exact`, `unordered_array`, or `set_equality`,
  implemented in `src/runner/comparison.ts` (JS) and mirrored in each language's prelude comparator.
  Cross-language agreement is guarded by `src/runner/__fixtures__/comparison-vectors.json`, asserted in
  Vitest for JS and by booting the real Ruby/Python VMs in the `comparison.parity.test.ts` suites.
- **ListNode marshalling.** Linked-list problems (`reverse_linked_list`, `remove_nth_from_end`,
  `has_cycle`) pass `head` as an array (with `pos` wiring a cycle for `has_cycle`); each runtime builds
  a ListNode for the call and serializes a ListNode return back to an array. There are no tree problems.
- **Persistence (`src/data/storage.ts`).** Per-(problem, language) code, solved status, revealed-hint
  count, last language, and the Vim preference live in `localStorage`. Resilient (all access is
  try/caught — the app works with storage disabled).

## Working with `shared/problems.json`

The app consumes the JSON **directly** — there is no code-generation step (the old generators were
removed at cutover).

**Adding test cases:** edit the problem's `testCases` array; verify with `npm run dev` (run a known
solution in each language) and `npm test`.

**Adding a problem:**
1. Add the entry to `shared/problems.json` with per-language `functionSignatures`/`returnType`,
   `parameters`, and `testCases` (plus optional `hints`). Python's seeded body is `pass`; Ruby's is an
   empty `end`; JS is an empty brace body — all produced automatically from the signature.
2. Verify a correct solution passes in **all three** languages via `npm run dev`.
3. Add the problem to the README's problem list.
4. If a return is a `ListNode`, set `returnType.<lang>` to `"ListNode"` so the harness serializes it.

### Problem Description Guidelines

Use academic, original phrasing (avoid copying problem statements verbatim):

- Formal vocabulary: "implement", "design", "develop", "construct", "determine".
- Technical precision: "contiguous subsequence", "distinct shortest paths", "optimal solution".
- Algorithm/perf framing: "classic dynamic programming problem", "strive for an optimal O(n) solution
  using constant space".

Examples of rephrasing:
- Instead of "Given an array of integers and a target sum, return the indices…" → "Implement a function
  that locates a pair of elements within an integer array whose sum equals a specified target value…".
- Instead of "Find the largest contiguous subarray sum…" → "Design an algorithm to determine the
  maximum sum achievable from any contiguous subsequence…".

Keep complete requirements/constraints; be clear despite the formal tone; make it distinct from common
online statements.

**Constraint formatting:** use proper exponential notation — write `10^5`, not `105`. For algorithm
problems "105" almost always means 10^5 (100,000); prefer "up to 100,000 elements" for clarity.

### Result ordering & comparison metadata

- Some problems are order-insensitive (e.g. Group Anagrams, Three Sum). Give each `testCase` one
  consistent `expected` value and set `comparison.mode` to `unordered_array` (or `set_equality`) rather
  than trying to enumerate orderings. `exact` is the default.
- These modes are implemented once in `src/runner/comparison.ts` and mirrored in the Ruby/Python
  preludes; if you change comparator behavior, add/adjust a vector in
  `src/runner/__fixtures__/comparison-vectors.json` so the parity tests keep all three languages aligned.
