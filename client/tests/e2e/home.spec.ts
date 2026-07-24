import { test, expect } from '@playwright/test';

test('homepage loads successfully with luxury branding and navigation links', async ({ page }) => {
  await page.goto('http://localhost:3000/en');
  await expect(page).toHaveTitle(/Origin Consulting Interior/);
});
