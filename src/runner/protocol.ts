import type { TestRunResult } from '../data/types';
import { PROTOCOL_VERSION } from './harness';

/** Main thread → worker. */
export interface RunRequest {
  type: 'run';
  requestId: number;
  userCode: string;
  problemKey: string;
}

/** Worker → main thread. */
export interface RunResponse {
  type: 'result';
  requestId: number;
  result: TestRunResult;
}

/** Build a result representing a load/runtime failure with no executed cases. */
export function errorResult(runtimeError: string): TestRunResult {
  return {
    protocolVersion: PROTOCOL_VERSION,
    passed: false,
    cases: [],
    durationMs: 0,
    runtimeError,
    stdout: '',
  };
}
