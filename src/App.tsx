import { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import type { Language, LanguageRunner } from './data/types';
import { PROBLEMS, getProblem } from './data/problems';
import { getRunner as createRunner } from './runner';
import Catalog from './components/Catalog';
import './App.css';

// The editor workspace pulls in CodeMirror; defer it so the catalog landing is
// interactive without downloading the editor bundle (see #50).
const Workspace = lazy(() => import('./components/Workspace'));

export default function App() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  // Persistent per-language runners (the Ruby VM must survive across runs).
  const runnersRef = useRef<Map<Language, LanguageRunner>>(new Map());
  const getRunner = useCallback((language: Language): LanguageRunner => {
    let runner = runnersRef.current.get(language);
    if (!runner) {
      runner = createRunner(language)!;
      runnersRef.current.set(language, runner);
    }
    return runner;
  }, []);

  useEffect(() => {
    const runners = runnersRef.current;
    return () => {
      for (const runner of runners.values()) runner.dispose();
      runners.clear();
    };
  }, []);

  const problem = selectedKey ? getProblem(selectedKey) : undefined;

  return (
    <div className="app">
      <header className="app-header">
        <button
          className="app-title"
          onClick={() => setSelectedKey(null)}
          aria-label="Back to problem index"
        >
          Practice Thy Algorithms
        </button>
      </header>

      {problem ? (
        <Suspense
          fallback={<p className="workspace-loading">Loading editor…</p>}
        >
          <Workspace
            key={problem.key}
            problem={problem}
            getRunner={getRunner}
            onBack={() => setSelectedKey(null)}
          />
        </Suspense>
      ) : (
        <Catalog problems={PROBLEMS} onSelect={setSelectedKey} />
      )}
    </div>
  );
}
