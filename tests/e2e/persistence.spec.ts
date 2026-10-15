import { test, expect, type Page } from '@playwright/test';
import { setEditorCode } from './helpers';

const TWO_SUM_CORRECT = `function twoSum(nums, target){
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen[need] !== undefined) return [seen[need], i];
    seen[nums[i]] = i;
  }
}`;

/** Read the current CodeMirror document text. */
function editorText(page: Page): Promise<string> {
  return page.locator('.cm-host').evaluate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (el) => (el as unknown as { cmView: any }).cmView.state.doc.toString(),
  );
}

test('persists code and solved status across navigation and reload', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Two Sum/ }).click();
  await setEditorCode(page, TWO_SUM_CORRECT);
  await page.getByTestId('run-button').click();
  await expect(page.locator('.solved-banner')).toBeVisible();

  // Back to catalog → solved seal shown on the Two Sum row.
  await page.getByRole('button', { name: /All problems/ }).click();
  const twoSumRow = page.getByRole('button', { name: /Two Sum/ });
  await expect(twoSumRow.locator('.solved-seal')).toBeVisible();

  // Reopen → code restored.
  await twoSumRow.click();
  expect(await editorText(page)).toContain('seen[nums[i]] = i;');

  // Full reload → code + solved seal persist.
  await page.reload();
  await expect(
    page.getByRole('button', { name: /Two Sum/ }).locator('.solved-seal'),
  ).toBeVisible();
  await page.getByRole('button', { name: /Two Sum/ }).click();
  expect(await editorText(page)).toContain('seen[nums[i]] = i;');
});

test('reset progress erases code and solved status but keeps preferences', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Two Sum/ }).click();
  await page.getByRole('checkbox', { name: /vim/i }).check();
  await setEditorCode(page, TWO_SUM_CORRECT);
  await page.getByTestId('run-button').click();
  await expect(page.locator('.solved-banner')).toBeVisible();

  await page.getByRole('button', { name: /All problems/ }).click();
  const twoSumRow = page.getByRole('button', { name: /Two Sum/ });
  await expect(twoSumRow.locator('.solved-seal')).toBeVisible();

  // Two-step: the confirm button only appears after "Reset progress…".
  await expect(page.getByTestId('reset-progress-confirm')).toHaveCount(0);
  await page.getByRole('button', { name: /Reset progress/ }).click();
  await page.getByTestId('reset-progress-confirm').click();

  // Seal gone immediately, and still gone after a reload.
  await expect(twoSumRow.locator('.solved-seal')).toHaveCount(0);
  await page.reload();
  await expect(
    page.getByRole('button', { name: /Two Sum/ }).locator('.solved-seal'),
  ).toHaveCount(0);

  // Code is back to the seed; the Vim preference survived.
  await page.getByRole('button', { name: /Two Sum/ }).click();
  expect(await editorText(page)).not.toContain('seen[nums[i]] = i;');
  expect(await editorText(page)).toContain('function twoSum(nums, target)');
  await expect(page.getByRole('checkbox', { name: /vim/i })).toBeChecked();
});

test('persists revealed hints across reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Two Sum/ }).click();

  const reveal = page.getByRole('button', { name: /reveal a hint/i });
  await reveal.click();
  await reveal.click();
  await expect(page.locator('.hint-item')).toHaveCount(2);

  await page.reload();
  await page.getByRole('button', { name: /Two Sum/ }).click();
  await expect(page.locator('.hint-item')).toHaveCount(2);
});

test('language selection is sticky across problems', async ({ page }) => {
  await page.goto('/');

  // Select Python on one problem.
  await page.getByRole('button', { name: /Two Sum/ }).click();
  const python = page.getByRole('button', { name: /Python/ });
  await python.click();
  await expect(python).toHaveAttribute('aria-pressed', 'true');

  // Open a different problem → Python is already selected there.
  await page.getByRole('button', { name: /All problems/ }).click();
  await page.getByRole('button', { name: /Maximum Subarray/ }).click();
  await expect(page.getByRole('button', { name: /Python/ })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('persists the Vim preference across reload', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Two Sum/ }).click();

  const vim = page.getByRole('checkbox', { name: /vim/i });
  await vim.check();
  await expect(vim).toBeChecked();

  await page.reload();
  await page.getByRole('button', { name: /Two Sum/ }).click();
  await expect(page.getByRole('checkbox', { name: /vim/i })).toBeChecked();
});
