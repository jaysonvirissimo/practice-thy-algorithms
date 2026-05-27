import { useState } from 'react';
import type { Problem } from '../data/types';
import { solvedLanguages } from '../data/storage';

const LANG_ABBR: Record<string, string> = { javascript: 'JS', ruby: 'Rb' };

interface CatalogProps {
  problems: Problem[];
  onSelect: (key: string) => void;
}

export default function Catalog({ problems, onSelect }: CatalogProps) {
  const [filter, setFilter] = useState('');
  const q = filter.trim().toLowerCase();
  const shown = q
    ? problems.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.complexity.toLowerCase().includes(q),
      )
    : problems;

  return (
    <section className="catalog">
      <p className="rubric">Index of Problems</p>
      <input
        className="catalog-filter"
        type="search"
        placeholder="Search by title or complexity…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        aria-label="Search problems"
      />
      <ul className="catalog-list">
        {shown.map((p) => {
          const solved = solvedLanguages(p.key);
          return (
            <li key={p.key}>
              <button
                className={`catalog-item${solved.length ? ' solved' : ''}`}
                onClick={() => onSelect(p.key)}
              >
                <span className="catalog-item-title">
                  {solved.length > 0 && (
                    <span
                      className="solved-seal"
                      title={`Solved in ${solved.join(', ')}`}
                      aria-label="Solved"
                    >
                      ✓
                    </span>
                  )}
                  {p.title}
                </span>
                <span className="catalog-item-meta">
                  <span className="complexity">{p.complexity}</span>
                  {solved.map((lang) => (
                    <span key={lang} className="lang-chip">
                      {LANG_ABBR[lang] ?? lang}
                    </span>
                  ))}
                </span>
              </button>
            </li>
          );
        })}
        {shown.length === 0 && (
          <li className="catalog-empty">No problems match “{filter}”.</li>
        )}
      </ul>
    </section>
  );
}
