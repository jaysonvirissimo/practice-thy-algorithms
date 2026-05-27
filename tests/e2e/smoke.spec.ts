import { test, expect } from '@playwright/test';

test('landing page loads and shows the catalog', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('button', { name: /back to problem index/i }),
  ).toBeVisible();
  await expect(page.getByRole('button', { name: /Two Sum/ })).toBeVisible();
});
