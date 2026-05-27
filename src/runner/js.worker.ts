import { getProblem } from '../data/problems';
import { runHarness } from './harness';
import { errorResult, type RunRequest, type RunResponse } from './protocol';

// Avoid pulling in the DOM `lib` typing of `self` (which conflicts with the
// app's tsconfig); narrow to just what the worker needs.
const ctx = self as unknown as {
  onmessage: ((e: MessageEvent<RunRequest>) => void) | null;
  postMessage: (message: RunResponse) => void;
};

ctx.onmessage = (e) => {
  const { requestId, userCode, problemKey } = e.data;
  const problem = getProblem(problemKey);

  const result = problem
    ? safeRun(userCode, problem)
    : errorResult(`Unknown problem: ${problemKey}`);

  ctx.postMessage({ type: 'result', requestId, result });
};

function safeRun(
  userCode: string,
  problem: NonNullable<ReturnType<typeof getProblem>>,
) {
  try {
    return runHarness(userCode, problem);
  } catch (err) {
    return errorResult(err instanceof Error ? err.message : String(err));
  }
}
