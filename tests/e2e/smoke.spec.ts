import { test, expect } from '@playwright/test';

test('landing page loads and shows the project title', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: /practice thy algorithms/i }),
  ).toBeVisible();
});
