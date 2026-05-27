import type { CaseResult, TestRunResult } from '../data/types';

function display(value: unknown): string {
  if (value === undefined) return '—';
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function CaseRow({ c }: { c: CaseResult }) {
  return (
    <li className={`case ${c.passed ? 'pass' : 'fail'}`}>
      <div className="case-head">
        <span className="case-icon">{c.passed ? '✓' : '✗'}</span>
        <span className="case-desc">{c.description}</span>
      </div>
      {!c.passed && (
        <div className="case-detail">
          {c.error ? (
            <pre className="case-error">{c.error}</pre>
          ) : (
            <table className="case-diff">
              <tbody>
                <tr>
                  <th>expected</th>
                  <td>{display(c.expected)}</td>
                </tr>
                <tr>
                  <th>actual</th>
                  <td>{display(c.actual)}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </li>
  );
}

interface ResultsPanelProps {
  running: boolean;
  result: TestRunResult | null;
}

export default function ResultsPanel({ running, result }: ResultsPanelProps) {
  if (running) {
    return (
      <div className="results">
        <p className="results-status">Running…</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="results">
        <p className="results-status muted">
          Write a solution and press Run (or ⌘/Ctrl+Enter).
        </p>
      </div>
    );
  }

  const passedCount = result.cases.filter((c) => c.passed).length;
  const total = result.cases.length;

  return (
    <div className="results">
      {result.runtimeError ? (
        <div className="runtime-error">
          <strong>Could not run your code:</strong>
          <pre>{result.runtimeError}</pre>
        </div>
      ) : (
        <>
          <p
            className={`results-summary ${result.passed ? 'pass' : 'fail'}`}
          >
            {passedCount}/{total} passed
            <span className="results-duration">
              {' '}
              · {result.durationMs.toFixed(1)} ms
            </span>
          </p>
          <ul className="case-list">
            {result.cases.map((c, i) => (
              <CaseRow key={i} c={c} />
            ))}
          </ul>
        </>
      )}

      {result.stdout && result.stdout.length > 0 && (
        <div className="stdout">
          <p className="stdout-label">Console output</p>
          <pre>{result.stdout}</pre>
        </div>
      )}
    </div>
  );
}
