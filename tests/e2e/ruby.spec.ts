import { test, expect, type Page } from '@playwright/test';
import { setEditorCode } from './helpers';

// ruby.wasm boot fetches a multi-MB binary and compiles it — allow generous time.
test.describe.configure({ timeout: 60_000 });

/** Open a problem, switch to Ruby, and wait for the VM to finish loading. */
async function openRuby(page: Page, problemName: RegExp) {
  await page.goto('/');
  await page.getByRole('button', { name: problemName }).click();
  await page.getByRole('button', { name: 'Ruby', exact: true }).click();
  // Run is disabled while the runtime loads; enabled once ready.
  await expect(page.getByTestId('run-button')).toBeEnabled({ timeout: 55_000 });
}

test('runs a correct Ruby solution to all-pass', async ({ page }) => {
  await openRuby(page, /Two Sum/);
  await setEditorCode(
    page,
    `def two_sum(nums, target)
  seen = {}
  nums.each_with_index do |n, i|
    return [seen[target - n], i] if seen.key?(target - n)
    seen[n] = i
  end
end`,
  );
  await page.getByTestId('run-button').click();
  await expect(page.locator('.results-summary')).toHaveText(/3\/3 passed/);
  await expect(page.locator('.results-summary.pass')).toBeVisible();
});

test('shows failing cases for a wrong Ruby solution', async ({ page }) => {
  await openRuby(page, /Two Sum/);
  await setEditorCode(page, `def two_sum(nums, target)\n  [9, 9]\nend`);
  await page.getByTestId('run-button').click();
  await expect(page.locator('.results-summary.fail')).toBeVisible();
  await expect(page.locator('.case.fail').first()).toBeVisible();
});

test('runs a Ruby ListNode solution (reverse_list)', async ({ page }) => {
  await openRuby(page, /Reverse Linked List/);
  await setEditorCode(
    page,
    `def reverse_list(head)
  prev = nil
  cur = head
  while cur
    nxt = cur.next
    cur.next = prev
    prev = cur
    cur = nxt
  end
  prev
end`,
  );
  await page.getByTestId('run-button').click();
  await expect(page.locator('.results-summary')).toHaveText(/3\/3 passed/);
});

test('runs a Ruby unordered solution (three_sum)', async ({ page }) => {
  await openRuby(page, /Three Sum/);
  await setEditorCode(
    page,
    `def three_sum(nums)
  nums = nums.sort
  res = []
  (0...nums.length - 2).each do |i|
    next if i > 0 && nums[i] == nums[i - 1]
    lo = i + 1
    hi = nums.length - 1
    while lo < hi
      sum = nums[i] + nums[lo] + nums[hi]
      if sum < 0
        lo += 1
      elsif sum > 0
        hi -= 1
      else
        res << [nums[i], nums[lo], nums[hi]]
        lo += 1 while lo < hi && nums[lo] == nums[lo + 1]
        hi -= 1 while lo < hi && nums[hi] == nums[hi - 1]
        lo += 1
        hi -= 1
      end
    end
  end
  res
end`,
  );
  await page.getByTestId('run-button').click();
  await expect(page.locator('.results-summary')).toHaveText(/3\/3 passed/);
});

test('captures Ruby puts output as stdout', async ({ page }) => {
  await openRuby(page, /Two Sum/);
  await setEditorCode(
    page,
    `def two_sum(nums, target)
  puts "searching the scroll"
  seen = {}
  nums.each_with_index do |n, i|
    return [seen[target - n], i] if seen.key?(target - n)
    seen[n] = i
  end
end`,
  );
  await page.getByTestId('run-button').click();
  await expect(page.locator('.results-summary')).toHaveText(/3\/3 passed/);
  await expect(page.locator('.stdout')).toContainText('searching the scroll');
});
