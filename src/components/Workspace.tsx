import { useRef, useState } from 'react';
import type { LanguageRunner, Problem, TestRunResult } from '../data/types';
import ProblemStatement from './ProblemStatement';
import LanguageSelector from './LanguageSelector';
import Editor, { type EditorHandle } from './Editor';
import ResultsPanel from './ResultsPanel';

interface WorkspaceProps {
  problem: Problem;
  runner: LanguageRunner;
  onBack: () => void;
}

export default function Workspace({ problem, runner, onBack }: WorkspaceProps) {
  const [code, setCode] = useState(problem.signatureTemplate);
  const [vimEnabled, setVimEnabled] = useState(false);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<TestRunResult | null>(null);
  const editorRef = useRef<EditorHandle>(null);

  // Always run the latest editor contents even though the keymap closure is stable.
  const codeRef = useRef(code);
  codeRef.current = code;

  const run = async () => {
    if (running) return;
    setRunning(true);
    try {
      const res = await runner.run(codeRef.current, problem);
      setResult(res);
    } finally {
      setRunning(false);
    }
  };

  const reset = () => {
    editorRef.current?.reset(problem.signatureTemplate);
    setCode(problem.signatureTemplate);
    setResult(null);
  };

  return (
    <section className="workspace">
      <div className="workspace-pane statement-pane">
        <button className="link-button" onClick={onBack}>
          ← All problems
        </button>
        <ProblemStatement problem={problem} />
      </div>

      <div className="workspace-pane editor-pane">
        <div className="editor-toolbar">
          <LanguageSelector />
          <div className="toolbar-actions">
            <label className="vim-toggle">
              <input
                type="checkbox"
                checked={vimEnabled}
                onChange={(e) => setVimEnabled(e.target.checked)}
              />
              Vim
            </label>
            <button className="ghost-button" onClick={reset}>
              Reset
            </button>
            <button
              className="run-button"
              onClick={run}
              disabled={running}
              data-testid="run-button"
            >
              {running ? 'Running…' : 'Run ▶'}
            </button>
          </div>
        </div>

        <Editor
          ref={editorRef}
          initialValue={code}
          onChange={setCode}
          onRun={run}
          vimEnabled={vimEnabled}
        />

        <ResultsPanel running={running} result={result} />
      </div>
    </section>
  );
}
