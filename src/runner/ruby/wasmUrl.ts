// Single swap point for the Ruby WASM binary location.
//
// `?url` makes Vite emit the binary as a hashed asset under the configured
// `base` (so it resolves at /practice-thy-algorithms/assets/ruby+stdlib-*.wasm
// on GitHub Pages). The `+stdlib` build is required for `require 'json'`/'set'.
//
// To serve from a CDN instead, replace this with a string literal URL.
import url from '@ruby/3.4-wasm-wasi/dist/ruby+stdlib.wasm?url';

export const RUBY_WASM_URL = url;
