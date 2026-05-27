import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  Language,
  LanguageRunner,
  Problem,
  TestRunResult,
} from '../data/types';
import {
  isSolved,
  lastLanguage,
  loadCode,
  loadVimPref,
  markSolved,
  saveCode,
  saveLastLanguage,
  saveVimPref,
} from '../data/storage';
import ProblemStatement from './ProblemStatement';
import Hints from './Hints';
import LanguageSelector from './LanguageSelector';
import Editor, { type EditorHandle } from './Editor';
import ResultsPanel from './ResultsPanel';

const SAVE_DEBOUNCE_MS = 400;

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
  // Resolve the initial language once (Workspace remounts per problem.key).
  const initialLangRef = useRef<Language | null>(null);
  if (initialLangRef.current === null) {
    initialLangRef.current = lastLanguage(problem.key) ?? 'javascript';
  }
  const initialLang = initialLangRef.current;

  const [language, setLanguage] = useState<Language>(initialLang);
  const [code, setCode] = useState(
    () =>
      loadCode(problem.key, initialLang) ??
      problem.languages[initialLang].signatureTemplate,
  );
  const [vimEnabled, setVimEnabled] = useState(() => loadVimPref());
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<TestRunResult | null>(null);
  const [solved, setSolved] = useState(() => isSolved(problem.key));
  const [rubyLoading, setRubyLoading] = useState(false);
  const [rubyError, setRubyError] = useState<string | null>(null);
  const editorRef = useRef<EditorHandle>(null);

  // Stable refs so the editor's Mod-Enter keymap / debounce always see latest.
  const codeRef = useRef(code);
  codeRef.current = code;
  const languageRef = useRef(language);
  languageRef.current = language;
  const runningRef = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const flushSave = useCallback(() => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    saveCode(problem.key, languageRef.current, codeRef.current);
  }, [problem.key]);

  const onCodeChange = useCallback(
    (value: string) => {
      setCode(value);
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        saveCode(problem.key, languageRef.current, value);
        saveTimer.current = null;
      }, SAVE_DEBOUNCE_MS);
    },
    [problem.key],
  );

  // Load the Ruby runtime eagerly if we resumed into Ruby; flush code on unmount.
  useEffect(() => {
    if (initialLang === 'ruby') ensureRuby();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => () => flushSave(), [flushSave]);

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
      if (res.passed) {
        markSolved(problem.key, languageRef.current);
        setSolved(true);
      }
    } finally {
      runningRef.current = false;
      setRunning(false);
    }
  }, [getRunner, problem]);

  const changeLanguage = (next: Language) => {
    if (next === language) return;
    flushSave(); // persist outgoing language's code (languageRef still = old)
    setLanguage(next);
    const seed =
      loadCode(problem.key, next) ?? problem.languages[next].signatureTemplate;
    setCode(seed);
    editorRef.current?.reset(seed);
    setResult(null);
    saveLastLanguage(problem.key, next);
    if (next === 'ruby') ensureRuby();
  };

  const reset = () => {
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
      saveTimer.current = null;
    }
    const seed = problem.languages[language].signatureTemplate;
    editorRef.current?.reset(seed);
    setCode(seed);
    setResult(null);
    saveCode(problem.key, language, seed);
  };

  const runDisabled = running || (language === 'ruby' && rubyLoading);

  return (
    <section className="workspace">
      <div className="workspace-pane statement-pane">
        <button className="link-button" onClick={onBack}>
          ← All problems
        </button>
        {solved && (
          <span className="solved-seal inline" title="Solved">
            ✓ Solved
          </span>
        )}
        <ProblemStatement problem={problem} />
        <Hints problemKey={problem.key} hints={problem.hints} />
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
                onChange={(e) => {
                  setVimEnabled(e.target.checked);
                  saveVimPref(e.target.checked);
                }}
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
          onChange={onCodeChange}
          onRun={run}
          vimEnabled={vimEnabled}
          language={language}
        />

        <ResultsPanel running={running} result={result} />
      </div>
    </section>
  );
}
