import type { LanguageRunner, Problem, TestRunResult } from '../../data/types';
import { errorResult, type PythonResponse } from '../protocol';

/** Execution cap for a single Python run (Pyodide is heavier than ruby.wasm). */
export const PYTHON_TIMEOUT_MS = 12_000;

/**
 * Runs user Python in a PERSISTENT Web Worker hosting a Pyodide VM.
 *
 * Like RubyRunner, the VM (multi-MB) is loaded once via `init()` and reused.
 * Without cross-origin isolation there is no interrupt buffer, so an infinite
 * loop can only be stopped by terminating the worker; on timeout we terminate
 * and reset, so the next run transparently re-boots the VM.
 */
export class PythonRunner implements LanguageRunner {
  private worker: Worker | null = null;
  private ready: Promise<void> | null = null;
  private seq = 0;

  init(): Promise<void> {
    if (this.ready) return this.ready;

    const worker = new Worker(new URL('./python.worker.ts', import.meta.url), {
      type: 'module',
    });
    this.worker = worker;

    this.ready = new Promise<void>((resolve, reject) => {
      const onMessage = (e: MessageEvent<PythonResponse>) => {
        if (e.data.type === 'ready') {
          worker.removeEventListener('message', onMessage);
          resolve();
        } else if (e.data.type === 'init-error') {
          worker.removeEventListener('message', onMessage);
          reject(new Error(e.data.message));
        }
      };
      worker.addEventListener('message', onMessage);
      worker.onerror = (ev) =>
        reject(new Error(ev.message || 'Python worker failed to load'));
      worker.postMessage({ type: 'init' });
    });

    this.ready.catch(() => this.dispose());
    return this.ready;
  }

  async run(userCode: string, problem: Problem): Promise<TestRunResult> {
    try {
      await this.init();
    } catch (err) {
      return errorResult(
        `Python runtime failed to load: ${(err as Error).message}`,
      );
    }

    const worker = this.worker!;
    const requestId = ++this.seq;

    return new Promise<TestRunResult>((resolve) => {
      const cleanup = () => worker.removeEventListener('message', onMessage);

      const timer = setTimeout(() => {
        cleanup();
        // Only worker termination stops an infinite loop. Reset so the next
        // run re-boots the VM.
        this.dispose();
        resolve(
          errorResult(
            `Execution timed out after ${PYTHON_TIMEOUT_MS}ms (possible infinite loop).`,
          ),
        );
      }, PYTHON_TIMEOUT_MS);

      const onMessage = (e: MessageEvent<PythonResponse>) => {
        if (e.data.type !== 'result' || e.data.requestId !== requestId) return;
        clearTimeout(timer);
        cleanup();
        resolve(e.data.result);
      };

      worker.addEventListener('message', onMessage);
      worker.postMessage({
        type: 'run',
        requestId,
        userCode,
        spec: problem.languages.python,
        testCases: problem.testCases,
      });
    });
  }

  dispose(): void {
    this.worker?.terminate();
    this.worker = null;
    this.ready = null;
  }
}
