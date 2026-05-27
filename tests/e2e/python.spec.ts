import { test, expect, type Page } from '@playwright/test';
import { setEditorCode } from './helpers';

// Pyodide boot fetches a multi-MB runtime and compiles it — allow generous time.
test.describe.configure({ timeout: 90_000 });

/** Open a problem, switch to Python, and wait for the VM to finish loading. */
async function openPython(page: Page, problemName: RegExp) {
  await page.goto('/');
  await page.getByRole('button', { name: problemName }).click();
  await page.getByRole('button', { name: 'Python', exact: true }).click();
  // Run is disabled while the runtime loads; enabled once ready.
  await expect(page.getByTestId('run-button')).toBeEnabled({ timeout: 80_000 });
}

test('runs a correct Python solution to all-pass', async ({ page }) => {
  await openPython(page, /Two Sum/);
  await setEditorCode(
    page,
    `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i`,
  );
  await page.getByTestId('run-button').click();
  await expect(page.locator('.solved-banner')).toContainText('3/3 passed');
});

test('shows failing cases for a wrong Python solution', async ({ page }) => {
  await openPython(page, /Two Sum/);
  await setEditorCode(page, `def two_sum(nums, target):\n    return [9, 9]`);
  await page.getByTestId('run-button').click();
  await expect(page.locator('.results-summary.fail')).toBeVisible();
  await expect(page.locator('.case.fail').first()).toBeVisible();
});

test('runs a Python ListNode solution (reverse_list)', async ({ page }) => {
  await openPython(page, /Reverse Linked List/);
  await setEditorCode(
    page,
    `def reverse_list(head):
    prev = None
    cur = head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev`,
  );
  await page.getByTestId('run-button').click();
  await expect(page.locator('.solved-banner')).toContainText('3/3 passed');
});

test('runs a Python unordered solution (three_sum)', async ({ page }) => {
  await openPython(page, /Three Sum/);
  await setEditorCode(
    page,
    `def three_sum(nums):
    nums = sorted(nums)
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        lo, hi = i + 1, len(nums) - 1
        while lo < hi:
            s = nums[i] + nums[lo] + nums[hi]
            if s < 0:
                lo += 1
            elif s > 0:
                hi -= 1
            else:
                res.append([nums[i], nums[lo], nums[hi]])
                while lo < hi and nums[lo] == nums[lo + 1]:
                    lo += 1
                while lo < hi and nums[hi] == nums[hi - 1]:
                    hi -= 1
                lo += 1
                hi -= 1
    return res`,
  );
  await page.getByTestId('run-button').click();
  await expect(page.locator('.solved-banner')).toContainText('3/3 passed');
});

test('captures Python print output as stdout', async ({ page }) => {
  await openPython(page, /Two Sum/);
  await setEditorCode(
    page,
    `def two_sum(nums, target):
    print("searching the scroll")
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target - n], i]
        seen[n] = i`,
  );
  await page.getByTestId('run-button').click();
  await expect(page.locator('.solved-banner')).toContainText('3/3 passed');
  await expect(page.locator('.stdout')).toContainText('searching the scroll');
});
