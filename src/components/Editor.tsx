import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { Compartment, EditorState, Prec } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { StreamLanguage } from '@codemirror/language';
import { basicSetup } from 'codemirror';
import type { Extension } from '@codemirror/state';
import type { Language } from '../data/types';

export interface EditorHandle {
  /** Replace the entire document (used by reset-to-signature). */
  reset: (text: string) => void;
}

interface EditorProps {
  /** Initial document only; the editor is uncontrolled after mount. */
  initialValue: string;
  onChange: (value: string) => void;
  onRun: () => void;
  vimEnabled: boolean;
  language: Language;
}

// Each syntax mode (and the Vim layer) is a separate dynamic chunk so they load
// only when their language is active / Vim is enabled, keeping every CodeMirror
// chunk under the bundle-size budget (see #50).
const loadLanguageExtension = async (language: Language): Promise<Extension> => {
  switch (language) {
    case 'ruby': {
      const { ruby } = await import('@codemirror/legacy-modes/mode/ruby');
      return StreamLanguage.define(ruby);
    }
    case 'python': {
      const { python } = await import('@codemirror/lang-python');
      return python();
    }
    default: {
      const { javascript } = await import('@codemirror/lang-javascript');
      return javascript();
    }
  }
};

// Cache the Vim module across editor instances; loaded on first enable.
let vimModule: typeof import('@replit/codemirror-vim') | null = null;

const Editor = forwardRef<EditorHandle, EditorProps>(function Editor(
  { initialValue, onChange, onRun, vimEnabled, language },
  ref,
) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const vimCompartment = useRef(new Compartment());
  const languageCompartment = useRef(new Compartment());

  // Keep callbacks fresh without recreating the editor / keymap.
  const onChangeRef = useRef(onChange);
  const onRunRef = useRef(onRun);
  onChangeRef.current = onChange;
  onRunRef.current = onRun;

  // Create the editor once.
  useEffect(() => {
    const view = new EditorView({
      parent: hostRef.current!,
      state: EditorState.create({
        doc: initialValue,
        extensions: [
          Prec.highest(
            keymap.of([
              {
                key: 'Mod-Enter',
                preventDefault: true,
                run: () => {
                  onRunRef.current();
                  return true;
                },
              },
            ]),
          ),
          // Both compartments start empty; the effects below load the Vim layer
          // and the active language mode asynchronously after mount.
          vimCompartment.current.of([]),
          basicSetup,
          languageCompartment.current.of([]),
          EditorView.updateListener.of((u) => {
            if (u.docChanged) onChangeRef.current(u.state.doc.toString());
          }),
        ],
      }),
    });
    viewRef.current = view;
    // Expose the view on the host element so e2e tests can set content
    // reliably (typing into CodeMirror is perturbed by auto-close-brackets).
    (hostRef.current as unknown as { cmView?: EditorView }).cmView = view;
    return () => view.destroy();
    // Intentionally run once: initial value/vim are applied here and updated
    // via the imperative handle and the vim effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toggle Vim keybindings without rebuilding state (Vim loads on first enable).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      let extension: Extension = [];
      if (vimEnabled) {
        vimModule ??= await import('@replit/codemirror-vim');
        extension = vimModule.vim();
      }
      if (cancelled) return;
      viewRef.current?.dispatch({
        effects: vimCompartment.current.reconfigure(extension),
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [vimEnabled]);

  // Switch syntax highlighting when the language changes (mode loads on demand).
  // Also runs on mount, applying the initial language.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const extension = await loadLanguageExtension(language);
      if (cancelled) return;
      viewRef.current?.dispatch({
        effects: languageCompartment.current.reconfigure(extension),
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [language]);

  useImperativeHandle(
    ref,
    () => ({
      reset(text: string) {
        const view = viewRef.current;
        if (!view) return;
        view.dispatch({
          changes: { from: 0, to: view.state.doc.length, insert: text },
        });
      },
    }),
    [],
  );

  return <div className="cm-host" ref={hostRef} />;
});

export default Editor;
