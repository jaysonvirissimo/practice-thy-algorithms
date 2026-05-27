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
import { javascript } from '@codemirror/lang-javascript';
import { ruby } from '@codemirror/legacy-modes/mode/ruby';
import { vim } from '@replit/codemirror-vim';
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

const languageExtension = (language: Language): Extension =>
  language === 'ruby' ? StreamLanguage.define(ruby) : javascript();

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
          vimCompartment.current.of(vimEnabled ? vim() : []),
          basicSetup,
          languageCompartment.current.of(languageExtension(language)),
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

  // Toggle Vim keybindings without rebuilding state.
  useEffect(() => {
    viewRef.current?.dispatch({
      effects: vimCompartment.current.reconfigure(vimEnabled ? vim() : []),
    });
  }, [vimEnabled]);

  // Switch syntax highlighting when the language changes.
  useEffect(() => {
    viewRef.current?.dispatch({
      effects: languageCompartment.current.reconfigure(
        languageExtension(language),
      ),
    });
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
