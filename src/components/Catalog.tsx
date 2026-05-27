import { useState } from 'react';
import type { Problem } from '../data/types';

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
        {shown.map((p) => (
          <li key={p.key}>
            <button className="catalog-item" onClick={() => onSelect(p.key)}>
              <span className="catalog-item-title">{p.title}</span>
              <span className="catalog-item-meta">
                <span className="complexity">{p.complexity}</span>
                <span className="lang-badge active">JS</span>
                <span className="lang-badge soon">Ruby soon</span>
              </span>
            </button>
          </li>
        ))}
        {shown.length === 0 && (
          <li className="catalog-empty">No problems match “{filter}”.</li>
        )}
      </ul>
    </section>
  );
}
