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
