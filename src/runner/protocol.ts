import type { LangSpec, RawTestCase, TestRunResult } from '../data/types';
import { PROTOCOL_VERSION } from './harness';

/** Main thread → worker (JavaScript). */
export interface RunRequest {
  type: 'run';
  requestId: number;
  userCode: string;
  problemKey: string;
}

/** Worker → main thread (shared success response). */
export interface RunResponse {
  type: 'result';
  requestId: number;
  result: TestRunResult;
}

// --- Ruby worker protocol -------------------------------------------------
// The Ruby worker is persistent: it boots the VM once on `init`, then handles
// many `run` requests. It receives the LangSpec + raw test cases directly
// (rather than a problem key) so it needs no access to @shared.

export interface RubyInitRequest {
  type: 'init';
}

export interface RubyReadyResponse {
  type: 'ready';
}

export interface RubyInitErrorResponse {
  type: 'init-error';
  message: string;
}

export interface RubyRunRequest {
  type: 'run';
  requestId: number;
  userCode: string;
  spec: LangSpec;
  testCases: RawTestCase[];
}

export type RubyRequest = RubyInitRequest | RubyRunRequest;
export type RubyResponse =
  | RubyReadyResponse
  | RubyInitErrorResponse
  | RunResponse;

// --- Python worker protocol ----------------------------------------------
// Structurally identical to Ruby (persistent worker, boot-once VM); kept as
// distinct named types so the two workers can evolve independently.

export interface PythonInitRequest {
  type: 'init';
}

export interface PythonReadyResponse {
  type: 'ready';
}

export interface PythonInitErrorResponse {
  type: 'init-error';
  message: string;
}

export interface PythonRunRequest {
  type: 'run';
  requestId: number;
  userCode: string;
  spec: LangSpec;
  testCases: RawTestCase[];
}

export type PythonRequest = PythonInitRequest | PythonRunRequest;
export type PythonResponse =
  | PythonReadyResponse
  | PythonInitErrorResponse
  | RunResponse;

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
