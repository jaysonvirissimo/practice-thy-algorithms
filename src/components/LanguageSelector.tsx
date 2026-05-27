import type { Language } from '../data/types';

interface LanguageSelectorProps {
  language: Language;
  onChange: (language: Language) => void;
  rubyLoading?: boolean;
}

export default function LanguageSelector({
  language,
  onChange,
  rubyLoading,
}: LanguageSelectorProps) {
  return (
    <div className="lang-selector" role="group" aria-label="Language">
      <button
        className={`lang-option ${language === 'javascript' ? 'active' : ''}`}
        aria-pressed={language === 'javascript'}
        onClick={() => onChange('javascript')}
      >
        JavaScript
      </button>
      <button
        className={`lang-option ${language === 'ruby' ? 'active' : ''}`}
        aria-pressed={language === 'ruby'}
        onClick={() => onChange('ruby')}
      >
        {rubyLoading ? 'Ruby…' : 'Ruby'}
      </button>
    </div>
  );
}
