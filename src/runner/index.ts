import type { Language, LanguageRunner } from '../data/types';
import { JsRunner } from './JsRunner';
import { RubyRunner } from './ruby/RubyRunner';
import { PythonRunner } from './python/PythonRunner';

/** Returns a runner for the language, or null if it has no runtime. */
export function getRunner(language: Language): LanguageRunner | null {
  switch (language) {
    case 'javascript':
      return new JsRunner();
    case 'ruby':
      return new RubyRunner();
    case 'python':
      return new PythonRunner();
    default:
      return null;
  }
}

export { JsRunner } from './JsRunner';
export { RubyRunner } from './ruby/RubyRunner';
export { PythonRunner } from './python/PythonRunner';
export { runHarness, PROTOCOL_VERSION } from './harness';
