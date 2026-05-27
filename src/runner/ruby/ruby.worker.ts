import { DefaultRubyVM } from '@ruby/wasm-wasi/dist/browser';
import { RUBY_WASM_URL } from './wasmUrl';
import prelude from './prelude.rb?raw';
import driver from './driver.rb?raw';
import { errorResult } from '../protocol';
import type {
  RubyRequest,
  RubyResponse,
  RubyRunRequest,
} from '../protocol';

// Narrow `self` without pulling in the DOM `lib` typing (which conflicts with
// the app tsconfig).
const ctx = self as unknown as {
  onmessage: ((e: MessageEvent<RubyRequest>) => void) | null;
  postMessage: (message: RubyResponse) => void;
};

// RbValue / RubyVM are loosely typed by the package; treat as unknown shapes.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let vm: any = null;

async function boot(): Promise<void> {
  const response = await fetch(RUBY_WASM_URL);
  const module = await WebAssembly.compileStreaming(response);
  ({ vm } = await DefaultRubyVM(module));
  vm.eval(prelude); // defines ListNode, __ptap_* helpers
}

function rubyErrorToString(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

/** UTF-8-safe base64 of a string, chunked to avoid call-stack limits. */
function toBase64(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

function runRuby(msg: RubyRunRequest): string {
  // Eval user code on its own first so a Ruby SyntaxError is attributable to
  // it (becomes a whole-program runtimeError), matching the JS harness.
  vm.eval(msg.userCode);
  vm.eval(driver); // (re)defines __ptap_run against the current prelude

  const meta = JSON.stringify({
    functionName: msg.spec.functionName,
    argNames: msg.spec.argNames,
    paramTypes: msg.spec.paramTypes,
    isListNodeReturn: msg.spec.isListNodeReturn,
    testCases: msg.testCases,
  });

  // The bridge can't pass a raw JS string as a Ruby arg, so embed the metadata
  // as injection-safe base64 (ASCII only) and decode + JSON.parse it in-VM.
  const rbResult = vm.eval(`__ptap_run_b64("${toBase64(meta)}")`);
  return rbResult.toString();
}

ctx.onmessage = async (e) => {
  const msg = e.data;

  if (msg.type === 'init') {
    try {
      await boot();
      ctx.postMessage({ type: 'ready' });
    } catch (err) {
      ctx.postMessage({ type: 'init-error', message: rubyErrorToString(err) });
    }
    return;
  }

  // msg.type === 'run'
  try {
    const resultJson = runRuby(msg);
    ctx.postMessage({
      type: 'result',
      requestId: msg.requestId,
      result: JSON.parse(resultJson),
    });
  } catch (err) {
    // Syntax error in user code, undefined method, or a bridge failure: report
    // as a whole-program runtimeError with no cases (matches the JS contract).
    ctx.postMessage({
      type: 'result',
      requestId: msg.requestId,
      result: errorResult(rubyErrorToString(err)),
    });
  }
};
