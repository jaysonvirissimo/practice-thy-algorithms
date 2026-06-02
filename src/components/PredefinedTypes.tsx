import type { Language, Problem } from '../data/types';
import {
  PREDEFINED_TYPES,
  type PredefinedTypeName,
} from '../data/predefinedTypes';

interface PredefinedTypesProps {
  problem: Problem;
  language: Language;
}

/**
 * Read-only box in the editor pane that shows the predefined classes (e.g.
 * ListNode) a problem hands the user, in the currently selected language.
 * Detection is signature-driven (`LangSpec.predefinedTypes`), so it appears
 * only for problems that reference a catalog type and updates on language
 * switch. Renders nothing otherwise.
 */
export default function PredefinedTypes({
  problem,
  language,
}: PredefinedTypesProps) {
  const names = problem.languages[language].predefinedTypes;
  if (names.length === 0) return null;

  return (
    <aside className="predefined" aria-label="Predefined types">
      <p className="predefined-heading rubric">Predefined</p>
      {names.map((name) => {
        const text = PREDEFINED_TYPES[name as PredefinedTypeName]?.[language];
        if (!text) return null;
        return (
          <pre key={name} className="predefined-block">
            <code>{text}</code>
          </pre>
        );
      })}
    </aside>
  );
}
