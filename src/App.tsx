import { useEffect, useRef, useState } from 'react';
import { PROBLEMS, getProblem } from './data/problems';
import { JsRunner } from './runner';
import Catalog from './components/Catalog';
import Workspace from './components/Workspace';
import './App.css';

export default function App() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  // One runner for the app's lifetime; it spawns a fresh worker per run.
  const runnerRef = useRef<JsRunner | null>(null);
  if (!runnerRef.current) runnerRef.current = new JsRunner();
  useEffect(() => {
    const runner = runnerRef.current;
    return () => runner?.dispose();
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
        <Workspace
          key={problem.key}
          problem={problem}
          runner={runnerRef.current}
          onBack={() => setSelectedKey(null)}
        />
      ) : (
        <Catalog problems={PROBLEMS} onSelect={setSelectedKey} />
      )}
    </div>
  );
}
