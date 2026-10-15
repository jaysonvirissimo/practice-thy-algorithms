import { useState, type ReactNode } from 'react';
import type { AnalysisProblem, Problem } from '../data/types';
import {
  clearProgress,
  isAnalysisSolved,
  solvedLanguages,
} from '../data/storage';

const LANG_ABBR: Record<string, string> = {
  javascript: 'JS',
  ruby: 'Rb',
  python: 'Py',
};

interface CatalogProps {
  problems: Problem[];
  analysis?: AnalysisProblem[];
  onSelect: (key: string) => void;
}

interface CatalogRowProps {
  title: string;
  solved: boolean;
  solvedTitle: string;
  meta: ReactNode;
  onSelect: () => void;
}

function CatalogRow({
  title,
  solved,
  solvedTitle,
  meta,
  onSelect,
}: CatalogRowProps) {
  return (
    <li>
      <button
        className={`catalog-item${solved ? ' solved' : ''}`}
        onClick={onSelect}
      >
        <span className="catalog-item-title">
          {solved && (
            <span className="solved-seal" title={solvedTitle} aria-label="Solved">
              ✓
            </span>
          )}
          {title}
        </span>
        <span className="catalog-item-meta">{meta}</span>
      </button>
    </li>
  );
}

export default function Catalog({
  problems,
  analysis = [],
  onSelect,
}: CatalogProps) {
  const [filter, setFilter] = useState('');
  const [confirmingReset, setConfirmingReset] = useState(false);
  const q = filter.trim().toLowerCase();

  // Catalog reads solved status straight from storage on every render, so the
  // state change below is enough to drop the seals once progress is cleared.
  const resetProgress = () => {
    clearProgress();
    setConfirmingReset(false);
  };
  const shown = q
    ? problems.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.complexity.toLowerCase().includes(q),
      )
    : problems;
  const shownAnalysis = q
    ? analysis.filter((p) => p.title.toLowerCase().includes(q))
    : analysis;

  return (
    <section className="catalog">
      <input
        className="catalog-filter"
        type="search"
        placeholder="Search by title or complexity…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        aria-label="Search problems"
      />

      {shownAnalysis.length > 0 && (
        <>
          <p className="rubric">Foundations</p>
          <ul className="catalog-list catalog-section">
            {shownAnalysis.map((p) => (
              <CatalogRow
                key={p.key}
                title={p.title}
                solved={isAnalysisSolved(p.key)}
                solvedTitle="Solved"
                meta={<span className="lang-chip">Foundations</span>}
                onSelect={() => onSelect(p.key)}
              />
            ))}
          </ul>
        </>
      )}

      {shown.length > 0 && <p className="rubric">Index of Problems</p>}
      <ul className="catalog-list">
        {shown.map((p) => {
          const solved = solvedLanguages(p.key);
          return (
            <CatalogRow
              key={p.key}
              title={p.title}
              solved={solved.length > 0}
              solvedTitle={`Solved in ${solved.join(', ')}`}
              meta={
                <>
                  <span className="complexity">{p.complexity}</span>
                  {solved.map((lang) => (
                    <span key={lang} className="lang-chip">
                      {LANG_ABBR[lang] ?? lang}
                    </span>
                  ))}
                </>
              }
              onSelect={() => onSelect(p.key)}
            />
          );
        })}
        {shown.length === 0 && shownAnalysis.length === 0 && (
          <li className="catalog-empty">No problems match “{filter}”.</li>
        )}
      </ul>

      <footer className="catalog-footer">
        {confirmingReset ? (
          <>
            <p className="catalog-footer-note">
              Erase saved code, solved marks, revealed hints and answers for
              every problem on this device? Vim and language preferences are
              kept.
            </p>
            <div className="catalog-footer-actions">
              <button
                className="ghost-button danger"
                onClick={resetProgress}
                data-testid="reset-progress-confirm"
              >
                Erase progress
              </button>
              <button
                className="link-button"
                onClick={() => setConfirmingReset(false)}
              >
                Keep
              </button>
            </div>
          </>
        ) : (
          <button
            className="link-button"
            onClick={() => setConfirmingReset(true)}
          >
            Reset progress…
          </button>
        )}
      </footer>
    </section>
  );
}
