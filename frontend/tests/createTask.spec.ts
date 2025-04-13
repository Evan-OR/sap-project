import { test, expect } from '@playwright/test';

test('user can post new task', async ({ page }) => {
  await page.goto('/');

  await page.locator('#task-title').fill('New task 123');
  await page.locator('#task-content').fill('Task Description');

  await page.getByRole('button', { name: /post/i }).click();

  await expect(page.getByText('New task 123').first()).toBeVisible();

  await page.waitForTimeout(5000);
});
