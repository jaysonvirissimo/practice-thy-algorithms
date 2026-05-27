import type { Language, LanguageRunner } from '../data/types';
import { JsRunner } from './JsRunner';
import { RubyRunner } from './ruby/RubyRunner';

/** Returns a runner for the language, or null if it has no runtime. */
export function getRunner(language: Language): LanguageRunner | null {
  switch (language) {
    case 'javascript':
      return new JsRunner();
    case 'ruby':
      return new RubyRunner();
    default:
      return null;
  }
}

export { JsRunner } from './JsRunner';
export { RubyRunner } from './ruby/RubyRunner';
export { runHarness, PROTOCOL_VERSION } from './harness';
