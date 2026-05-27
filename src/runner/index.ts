import type { Language, LanguageRunner } from '../data/types';
import { JsRunner } from './JsRunner';

/** Returns a runner for the language, or null if it has no runtime yet (Ruby: M2). */
export function getRunner(language: Language): LanguageRunner | null {
  switch (language) {
    case 'javascript':
      return new JsRunner();
    default:
      return null;
  }
}

export { JsRunner } from './JsRunner';
export { runHarness, PROTOCOL_VERSION } from './harness';
