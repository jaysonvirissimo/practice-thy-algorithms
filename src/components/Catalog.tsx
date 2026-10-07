import { useState, type ReactNode } from 'react';
import type { AnalysisProblem, Problem } from '../data/types';
import { isAnalysisSolved, solvedLanguages } from '../data/storage';

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
  const q = filter.trim().toLowerCase();
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
    </section>
  );
}
