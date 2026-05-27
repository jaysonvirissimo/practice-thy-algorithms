import type { Language } from '../data/types';

const OPTIONS: { id: Language; label: string }[] = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'ruby', label: 'Ruby' },
  { id: 'python', label: 'Python' },
];

interface LanguageSelectorProps {
  language: Language;
  onChange: (language: Language) => void;
  /** Per-language runtime-loading signal (true while a VM is booting). */
  loading?: Partial<Record<Language, boolean>>;
}

export default function LanguageSelector({
  language,
  onChange,
  loading,
}: LanguageSelectorProps) {
  return (
    <div className="lang-selector" role="group" aria-label="Language">
      {OPTIONS.map(({ id, label }) => (
        <button
          key={id}
          className={`lang-option ${language === id ? 'active' : ''}`}
          aria-pressed={language === id}
          onClick={() => onChange(id)}
        >
          {loading?.[id] ? `${label}…` : label}
        </button>
      ))}
    </div>
  );
}
