import { useCallback, useRef, useState } from 'react';
import type {
  Language,
  LanguageRunner,
  Problem,
  TestRunResult,
} from '../data/types';
import ProblemStatement from './ProblemStatement';
import LanguageSelector from './LanguageSelector';
import Editor, { type EditorHandle } from './Editor';
import ResultsPanel from './ResultsPanel';

interface WorkspaceProps {
  problem: Problem;
  getRunner: (language: Language) => LanguageRunner;
  onBack: () => void;
}

export default function Workspace({
  problem,
  getRunner,
  onBack,
}: WorkspaceProps) {
  const [language, setLanguage] = useState<Language>('javascript');
  const [code, setCode] = useState(
    problem.languages.javascript.signatureTemplate,
  );
  const [vimEnabled, setVimEnabled] = useState(false);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<TestRunResult | null>(null);
  const [rubyLoading, setRubyLoading] = useState(false);
  const [rubyError, setRubyError] = useState<string | null>(null);
  const editorRef = useRef<EditorHandle>(null);

  // Stable refs so the editor's Mod-Enter keymap always runs the latest state.
  const codeRef = useRef(code);
  codeRef.current = code;
  const languageRef = useRef(language);
  languageRef.current = language;
  const runningRef = useRef(false);

  const run = useCallback(async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setRunning(true);
    try {
      const res = await getRunner(languageRef.current).run(
        codeRef.current,
        problem,
      );
      setResult(res);
    } finally {
      runningRef.current = false;
      setRunning(false);
    }
  }, [getRunner, problem]);

  const ensureRuby = useCallback(() => {
    setRubyError(null);
    setRubyLoading(true);
    getRunner('ruby')
      .init()
      .then(() => setRubyLoading(false))
      .catch((err: unknown) => {
        setRubyLoading(false);
        setRubyError(err instanceof Error ? err.message : String(err));
      });
  }, [getRunner]);

  const changeLanguage = (next: Language) => {
    if (next === language) return;
    setLanguage(next);
    const seed = problem.languages[next].signatureTemplate;
    setCode(seed);
    editorRef.current?.reset(seed);
    setResult(null);
    if (next === 'ruby') ensureRuby();
  };

  const reset = () => {
    const seed = problem.languages[language].signatureTemplate;
    editorRef.current?.reset(seed);
    setCode(seed);
    setResult(null);
  };

  const runDisabled = running || (language === 'ruby' && rubyLoading);

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
          <LanguageSelector
            language={language}
            onChange={changeLanguage}
            rubyLoading={rubyLoading}
          />
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
              disabled={runDisabled}
              data-testid="run-button"
            >
              {running ? 'Running…' : 'Run ▶'}
            </button>
          </div>
        </div>

        {rubyLoading && (
          <p className="ruby-loading" data-testid="ruby-loading">
            Summoning the Ruby runtime… (one-time download)
          </p>
        )}
        {rubyError && (
          <p className="ruby-error">Ruby runtime failed to load: {rubyError}</p>
        )}

        <Editor
          ref={editorRef}
          initialValue={code}
          onChange={setCode}
          onRun={run}
          vimEnabled={vimEnabled}
          language={language}
        />

        <ResultsPanel running={running} result={result} />
      </div>
    </section>
  );
}
