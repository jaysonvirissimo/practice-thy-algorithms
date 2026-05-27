import type { Page } from '@playwright/test';

/** Set the CodeMirror document via the view exposed on the host element. */
export async function setEditorCode(page: Page, code: string) {
  await page.locator('.cm-host').evaluate((el, value) => {
    // cmView is attached by the Editor component for test access.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const view = (el as unknown as { cmView: any }).cmView;
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: value },
    });
  }, code);
}
