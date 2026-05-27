# Practice Thy Algorithms

Solve and verify classic algorithm problems **entirely in your browser** — no clone, no
toolchain, no backend. Pick a problem, pick a language, write a solution, and run the bundled
test cases instantly, client-side.

**▶ Live: https://jaysonvirissimo.github.io/practice-thy-algorithms/**

## What it is

A static single-page app (hosted on GitHub Pages) that runs your code and its test cases in
the browser, across three languages:

- **JavaScript** — executed natively in a Web Worker.
- **Ruby** — executed via [ruby.wasm](https://github.com/ruby/ruby.wasm) (CRuby → WebAssembly).
- **Python** — executed via [Pyodide](https://pyodide.org/) (CPython → WebAssembly).

The Ruby and Python runtimes are downloaded lazily the first time you select that language.

## Features

- Browsable catalog of 22 problems with academic-style statements.
- CodeMirror 6 editor seeded with the correct function signature; optional **Vim** keybindings
  and a **reset-to-signature** action.
- In-runtime test harness: per-case pass/fail, expected-vs-actual diffs, runtime errors, captured
  `console.log`/`puts`/`print` output, and an infinite-loop timeout.
- Progressive **hints** for select problems.
- Local **persistence** (your code per problem+language, solved status, revealed hints, and the
  Vim preference) via `localStorage` — everything stays on your machine.
- A medieval illuminated-manuscript ("Scriptorium") theme.

## Usage

1. Open the [live site](https://jaysonvirissimo.github.io/practice-thy-algorithms/).
2. Choose a problem from the catalog.
3. Choose a language (JavaScript / Ruby / Python). The first Ruby or Python run lazily downloads
   that runtime (one-time, multi-MB).
4. Write your solution and press **Run** (or ⌘/Ctrl+Enter). Solved problems get a ✓ in the catalog.

## Local development

Requires Node 20 (see `.tool-versions`).

```bash
npm install
npm run dev        # Vite dev server
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build locally

npm test           # Vitest (unit/component + Ruby/Python comparator parity)
npm run test:e2e:install   # one-time: install the Playwright browser
npm run test:e2e           # Playwright end-to-end (runs the real WASM runtimes)
```

## Problem set

All 22 problems run in **all three languages** in-browser:

Two Sum · Unique Paths · Coin Change · Contains Duplicate · Best Time to Buy and Sell Stock ·
Valid Parentheses · Maximum Subarray · Product of Array Except Self · Three Sum · Merge Intervals ·
Group Anagrams · Reverse Linked List · Detect Cycle in Linked List · Container With Most Water ·
Find Minimum in Rotated Sorted Array · Longest Repeating Character Replacement ·
Longest Substring Without Repeating Characters · Number of Islands · Remove Nth Node From End of List ·
Palindromic Substrings · Pacific Atlantic Water Flow · Minimum Window Substring

## Editing or adding problems

`shared/problems.json` is the **single source of truth** — the app consumes it directly at
build time (no code generation step). Each problem entry has:

- `title`, `description`, `complexity`, `parameters`;
- `functionSignatures` and `returnType`, keyed per language (`javascript` / `ruby` / `python`);
- `testCases` (each `{ input, expected, description }`, with an optional
  `comparison.mode` of `exact` | `unordered_array` | `set_equality`);
- an optional top-level `hints` array (language-agnostic).

Edit the JSON, then verify with `npm run dev` in each language and `npm test`. If you add a problem,
also add it to the problem list above.

## Architecture

- `src/data/` — loads `problems.json` (`@shared` alias) and the `localStorage` persistence layer.
- `src/runner/` — a common `LanguageRunner` contract and the **assert-in-runtime** test harness:
  JavaScript runs in a fresh-per-run Web Worker; Ruby and Python run in persistent WASM workers
  (terminated and re-booted on timeout). Comparators are kept consistent across languages by a
  shared `comparison-vectors.json` parity fixture.
- `src/components/` — the React UI (catalog, editor, results, hints).

Design details are in the SDD: [issue #42](https://github.com/jaysonvirissimo/practice-thy-algorithms/issues/42).

## Tech stack & deployment

Vite · React · TypeScript · CodeMirror 6 · Vitest · Playwright. Deployed to GitHub Pages by a
GitHub Actions workflow on every push to `master`.

## History

This was originally a multi-language **local-CLI** practice repo (clone, then run Jest / RSpec /
unittest per language). That workflow was retired in the browser cutover; its final state is
preserved under the **`cli-final`** git tag.
