import { loadPyodide } from 'pyodide';
import { PYODIDE_INDEX_URL } from './pyodideIndexUrl';
import prelude from './prelude.py?raw';
import driver from './driver.py?raw';
import { errorResult } from '../protocol';
import type {
  PythonRequest,
  PythonResponse,
  PythonRunRequest,
} from '../protocol';

// Narrow `self` without pulling in the DOM `lib` typing.
const ctx = self as unknown as {
  onmessage: ((e: MessageEvent<PythonRequest>) => void) | null;
  postMessage: (message: PythonResponse) => void;
};

// Pyodide's API is loosely typed by the package; treat as an unknown shape.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let pyodide: any = null;

async function boot(): Promise<void> {
  pyodide = await loadPyodide({ indexURL: PYODIDE_INDEX_URL });
  pyodide.runPython(prelude); // defines ListNode + __ptap_* helpers
}

function pythonErrorToString(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

function runPython(msg: PythonRunRequest): string {
  // Eval user code on its own first so a Python SyntaxError/NameError is
  // attributable to it (whole-program runtimeError), matching JS/Ruby.
  pyodide.runPython(msg.userCode);
  pyodide.runPython(driver); // (re)defines __ptap_run against the current prelude

  const meta = JSON.stringify({
    functionName: msg.spec.functionName,
    argNames: msg.spec.argNames,
    paramTypes: msg.spec.paramTypes,
    isListNodeReturn: msg.spec.isListNodeReturn,
    testCases: msg.testCases,
  });

  // Pyodide converts a JS string to a Python str directly (no base64 needed).
  pyodide.globals.set('__ptap_meta', meta);
  return pyodide.runPython('__ptap_run(__ptap_meta)');
}

ctx.onmessage = async (e) => {
  const msg = e.data;

  if (msg.type === 'init') {
    try {
      await boot();
      ctx.postMessage({ type: 'ready' });
    } catch (err) {
      ctx.postMessage({ type: 'init-error', message: pythonErrorToString(err) });
    }
    return;
  }

  // msg.type === 'run'
  try {
    const resultJson = runPython(msg);
    ctx.postMessage({
      type: 'result',
      requestId: msg.requestId,
      result: JSON.parse(resultJson),
    });
  } catch (err) {
    // Syntax error in user code, undefined function, or a bridge failure:
    // report as a whole-program runtimeError with no cases (matches contract).
    ctx.postMessage({
      type: 'result',
      requestId: msg.requestId,
      result: errorResult(pythonErrorToString(err)),
    });
  }
};
