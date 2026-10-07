import type { AnswerSpec } from './types';

const INTEGER = /^\s*-?\d+\s*$/;

/**
 * Grade one analysis part. Integer answers must be a plain whole number
 * (surrounding whitespace allowed; "81.0" or "eighty" are wrong). Choice
 * answers must match the authored value exactly.
 */
export function gradePart(answer: AnswerSpec, input: string): boolean {
  if (answer.type === 'integer') {
    return INTEGER.test(input) && Number(input.trim()) === answer.value;
  }
  return input === answer.value;
}
