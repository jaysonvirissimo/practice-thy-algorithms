import { test, expect } from '@playwright/test';

test('solves a Foundations analysis problem and persists the seal', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByText('Foundations', { exact: true }).first()).toBeVisible();
  await page.getByRole('button', { name: /Florentine Deposit Ledger/ }).click();

  const inputs = page.getByRole('textbox');
  const answers = ['1', '80', '80', '1', '80', '1']; // part c is wrong
  for (let i = 0; i < answers.length; i++) await inputs.nth(i).fill(answers[i]);
  await page.getByTestId('check-button').click();
  await expect(page.getByRole('status')).toHaveText('5/6 correct');

  await inputs.nth(2).fill('81');
  await inputs.nth(2).press('Enter'); // submits the form
  await expect(page.locator('.solved-banner')).toBeVisible();

  await page.getByRole('button', { name: /All problems/ }).click();
  const row = page.getByRole('button', { name: /Florentine Deposit Ledger/ });
  await expect(row.locator('.solved-seal')).toBeVisible();

  await page.reload();
  await expect(
    page
      .getByRole('button', { name: /Florentine Deposit Ledger/ })
      .locator('.solved-seal'),
  ).toBeVisible();
});
