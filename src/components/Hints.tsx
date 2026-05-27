import { useState } from 'react';
import { loadHintCount, saveHintCount } from '../data/storage';

interface HintsProps {
  problemKey: string;
  hints?: string[];
}

export default function Hints({ problemKey, hints }: HintsProps) {
  // Clamp against the current hint count in case a stored count outlives a
  // shrunken hints array.
  const total = hints?.length ?? 0;
  const [revealed, setRevealed] = useState(() =>
    Math.min(loadHintCount(problemKey), total),
  );

  // Graceful degrade: nothing to show when a problem has no hints yet.
  if (!hints || hints.length === 0) return null;

  const reveal = () => {
    const next = Math.min(revealed + 1, hints.length);
    setRevealed(next);
    saveHintCount(problemKey, next);
  };

  const allShown = revealed >= hints.length;

  return (
    <aside className="hints" aria-label="Hints">
      <p className="hints-heading rubric">Marginalia</p>
      <ol className="hints-list">
        {hints.slice(0, revealed).map((hint, i) => (
          <li key={i} className="hint-item">
            {hint}
          </li>
        ))}
      </ol>
      {allShown ? (
        <p className="hints-exhausted muted">All hints revealed.</p>
      ) : (
        <button className="ghost-button hint-reveal" onClick={reveal}>
          Reveal a hint ({revealed}/{hints.length})
        </button>
      )}
    </aside>
  );
}
