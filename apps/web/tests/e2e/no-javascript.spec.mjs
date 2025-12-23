import { test, expect } from '@playwright/test';

test('no-JavaScript: GitHub link works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const base = process.env.BASE_URL || 'http://localhost:3000';
  await page.goto(`${base}/`);
  const link = page.locator('a[href="https://github.com/ArktisZ10"]');
  await expect(link).toHaveCount(1);
  await context.close();
});
