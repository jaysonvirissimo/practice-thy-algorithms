import { test, expect } from '@playwright/test';
import { setEditorCode } from './helpers';

const TWO_SUM_CORRECT = `function twoSum(nums, target){
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen[need] !== undefined) return [seen[need], i];
    seen[nums[i]] = i;
  }
}`;

const TWO_SUM_WRONG = `function twoSum(nums, target){ return [9, 9]; }`;

test('runs a correct JS solution to all-pass', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Two Sum/ }).click();

  await expect(page.locator('.cm-host')).toBeVisible();
  await setEditorCode(page, TWO_SUM_CORRECT);
  await page.getByTestId('run-button').click();

  await expect(page.locator('.results-summary')).toHaveText(/3\/3 passed/);
  await expect(page.locator('.results-summary.pass')).toBeVisible();
});

test('shows failing cases with expected vs actual for a wrong solution', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Two Sum/ }).click();

  await setEditorCode(page, TWO_SUM_WRONG);
  await page.getByTestId('run-button').click();

  await expect(page.locator('.results-summary.fail')).toBeVisible();
  await expect(page.locator('.case.fail').first()).toBeVisible();
  await expect(page.locator('.case-diff').first()).toContainText('expected');
});

test('runs a linked-list solution through the real worker', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Reverse Linked List/ }).click();

  await setEditorCode(
    page,
    `function reverseList(head){
      let prev = null, cur = head;
      while (cur) { const n = cur.next; cur.next = prev; prev = cur; cur = n; }
      return prev;
    }`,
  );
  await page.getByTestId('run-button').click();

  await expect(page.locator('.results-summary')).toHaveText(/3\/3 passed/);
});
