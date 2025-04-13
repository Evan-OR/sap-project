import { test, expect } from '@playwright/test';

test.describe.serial('My sequential tests', () => {
  const timestamp = new Date().getTime();
  const userName = `testUser${timestamp}`;

  test('user can register', async ({ page }) => {
    await page.goto('/');

    await page.locator('#form-username').fill(userName);
    await page.locator('#form-password').fill('password123$');
    await page.locator('#form-email').fill(`${userName}@gmail.com`);

    await page.getByRole('button', { name: /register/i }).click();

    await expect(page.getByText('sign out')).toBeVisible();

    await page.waitForTimeout(5000);
  });

  test('user can login', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: /login/i }).click();

    await page.locator('#form-username').fill(userName);
    await page.locator('#form-password').fill('password123$');

    await page.getByRole('button', { name: /login/i }).click();

    await expect(page.getByText('sign out')).toBeVisible();

    await page.waitForTimeout(5000);
  });
});
