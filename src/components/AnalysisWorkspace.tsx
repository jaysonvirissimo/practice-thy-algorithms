import { useState, type FormEvent } from 'react';
import type { AnalysisProblem } from '../data/types';
import { gradePart } from '../data/analysis';
import {
  isAnalysisSolved,
  loadAnswers,
  markAnalysisSolved,
  saveAnswers,
} from '../data/storage';
import ProblemStatement from './ProblemStatement';
import Hints from './Hints';

interface AnalysisWorkspaceProps {
  problem: AnalysisProblem;
  onBack: () => void;
}

const partLetter = (i: number) => String.fromCharCode(97 + i);

/**
 * Workspace for a no-code analysis problem: one answer per part, graded in
 * place. Each part is marked ✓/✗ on check; its explanation appears only once
 * it is correct. Retries are unlimited and draft answers persist.
 */
export default function AnalysisWorkspace({
  problem,
  onBack,
}: AnalysisWorkspaceProps) {
  const { parts } = problem;
  const [answers, setAnswers] = useState<string[]>(() => {
    const stored = loadAnswers(problem.key);
    return parts.map((_, i) => stored[i] ?? '');
  });
  // Per-part result of the last check; null = not checked since last edit.
  const [marks, setMarks] = useState<(boolean | null)[]>(() =>
    parts.map(() => null),
  );
  const [solved, setSolved] = useState(() => isAnalysisSolved(problem.key));

  const setAnswer = (i: number, value: string) => {
    const next = answers.map((a, j) => (j === i ? value : a));
    setAnswers(next);
    setMarks((m) => m.map((v, j) => (j === i ? null : v)));
    saveAnswers(problem.key, next);
  };

  const check = (e: FormEvent) => {
    e.preventDefault();
    const graded = parts.map((p, i) => gradePart(p.answer, answers[i]));
    setMarks(graded);
    if (graded.every(Boolean)) {
      markAnalysisSolved(problem.key);
      setSolved(true);
    }
  };

  const checked = marks.every((m) => m !== null);
  const correct = marks.filter((m) => m === true).length;

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

      <form className="workspace-pane analysis-pane" onSubmit={check}>
        <ol className="case-list analysis-parts">
          {parts.map((part, i) => {
            const mark = marks[i];
            const state = mark === null ? '' : mark ? ' pass' : ' fail';
            const id = `${problem.key}-part-${i}`;
            return (
              <li key={i} className={`case analysis-part${state}`}>
                <div className="case-head">
                  {mark === null ? (
                    <span className="case-icon" aria-hidden="true">
                      {partLetter(i)}.
                    </span>
                  ) : (
                    <span
                      className="case-icon"
                      role="img"
                      aria-label={mark ? 'Correct' : 'Incorrect'}
                    >
                      {mark ? '✓' : '✗'}
                    </span>
                  )}
                  {part.answer.type === 'integer' ? (
                    <label htmlFor={id} className="analysis-prompt">
                      {part.prompt}
                    </label>
                  ) : (
                    <span className="analysis-prompt">{part.prompt}</span>
                  )}
                </div>
                {part.answer.type === 'integer' ? (
                  <input
                    id={id}
                    className="analysis-input"
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="steps"
                    value={answers[i]}
                    onChange={(e) => setAnswer(i, e.target.value)}
                    aria-invalid={mark === false || undefined}
                  />
                ) : (
                  <div
                    className="analysis-choices"
                    role="radiogroup"
                    aria-label={part.prompt}
                  >
                    {part.answer.choices.map((choice) => (
                      <label key={choice} className="analysis-choice">
                        <input
                          type="radio"
                          name={id}
                          value={choice}
                          checked={answers[i] === choice}
                          onChange={() => setAnswer(i, choice)}
                        />
                        <code>{choice}</code>
                      </label>
                    ))}
                  </div>
                )}
                {mark === true && part.explanation && (
                  <p className="analysis-explanation">{part.explanation}</p>
                )}
              </li>
            );
          })}
        </ol>

        <div className="analysis-actions">
          <button
            type="submit"
            className="run-button"
            data-testid="check-button"
          >
            Check answers
          </button>
          {checked &&
            (correct === parts.length ? (
              <div className="solved-banner" role="status">
                <span className="solved-banner-seal" aria-hidden="true">
                  ❦
                </span>
                <span className="solved-banner-text">
                  Solved — {correct}/{parts.length} correct
                </span>
              </div>
            ) : (
              <p className="results-summary fail" role="status">
                {correct}/{parts.length} correct
              </p>
            ))}
        </div>
      </form>
    </section>
  );
}
