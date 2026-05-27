import type { LanguageRunner, Problem, TestRunResult } from '../../data/types';
import { errorResult, type RubyResponse } from '../protocol';

/** Execution cap for a single Ruby run (longer than JS — WASM is slower). */
export const RUBY_TIMEOUT_MS = 10_000;

/**
 * Runs user Ruby in a PERSISTENT Web Worker hosting a ruby.wasm VM.
 *
 * Unlike JsRunner (fresh worker per run), the VM is multi-MB and takes seconds
 * to boot, so it is loaded once via `init()` and reused. An infinite loop can
 * only be stopped by terminating the worker; on timeout we terminate and reset,
 * so the next run transparently re-boots the VM.
 */
export class RubyRunner implements LanguageRunner {
  private worker: Worker | null = null;
  private ready: Promise<void> | null = null;
  private seq = 0;

  init(): Promise<void> {
    if (this.ready) return this.ready;

    const worker = new Worker(new URL('./ruby.worker.ts', import.meta.url), {
      type: 'module',
    });
    this.worker = worker;

    this.ready = new Promise<void>((resolve, reject) => {
      const onMessage = (e: MessageEvent<RubyResponse>) => {
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
        reject(new Error(ev.message || 'Ruby worker failed to load'));
      worker.postMessage({ type: 'init' });
    });

    // If boot fails, reset so a later init()/run() re-spawns cleanly.
    this.ready.catch(() => this.dispose());
    return this.ready;
  }

  async run(userCode: string, problem: Problem): Promise<TestRunResult> {
    try {
      await this.init();
    } catch (err) {
      return errorResult(
        `Ruby runtime failed to load: ${(err as Error).message}`,
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
            `Execution timed out after ${RUBY_TIMEOUT_MS}ms (possible infinite loop).`,
          ),
        );
      }, RUBY_TIMEOUT_MS);

      const onMessage = (e: MessageEvent<RubyResponse>) => {
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
        spec: problem.languages.ruby,
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
