import type { LanguageRunner, Problem, TestRunResult } from '../data/types';
import { errorResult, type RunResponse } from './protocol';

/** Hard cap on user-code execution; the worker is terminated past this. */
export const TIMEOUT_MS = 3000;

/**
 * Runs user JavaScript in a Web Worker. A fresh worker is spawned per run so an
 * infinite loop can be hard-terminated; the timeout result is synthesized on the
 * main thread once the worker is gone.
 */
export class JsRunner implements LanguageRunner {
  private activeWorker: Worker | null = null;
  private seq = 0;

  async init(): Promise<void> {
    // No runtime to preload for native JS.
  }

  run(userCode: string, problem: Problem): Promise<TestRunResult> {
    return new Promise((resolve) => {
      const worker = new Worker(new URL('./js.worker.ts', import.meta.url), {
        type: 'module',
      });
      this.activeWorker = worker;
      const requestId = ++this.seq;

      const cleanup = () => {
        worker.terminate();
        if (this.activeWorker === worker) this.activeWorker = null;
      };

      const timer = setTimeout(() => {
        cleanup();
        resolve(
          errorResult(
            `Execution timed out after ${TIMEOUT_MS}ms (possible infinite loop).`,
          ),
        );
      }, TIMEOUT_MS);

      worker.onmessage = (e: MessageEvent<RunResponse>) => {
        if (e.data?.requestId !== requestId) return;
        clearTimeout(timer);
        cleanup();
        resolve(e.data.result);
      };

      worker.onerror = (e) => {
        clearTimeout(timer);
        cleanup();
        resolve(errorResult(e.message || 'Worker error'));
      };

      worker.postMessage({
        type: 'run',
        requestId,
        userCode,
        problemKey: problem.key,
      });
    });
  }

  dispose(): void {
    this.activeWorker?.terminate();
    this.activeWorker = null;
  }
}
