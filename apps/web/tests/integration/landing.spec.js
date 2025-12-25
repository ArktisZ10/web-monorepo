import { test, expect } from '@playwright/test';

test('landing page contains GitHub link with correct attributes', async ({ page }) => {
  // Use BASE_URL if provided (e.g., preview deployments); fallback to localhost
  const base = process.env.BASE_URL || 'http://localhost:3000';
  await page.goto(`${base}/`);

  const link = page.locator('a[href="https://github.com/ArktisZ10"]');

  // Expect the anchor to exist (this will fail until the page is implemented)
  await expect(link).toHaveCount(1);

  // Verify attributes required by spec
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(link).toHaveAttribute('aria-label', /ArktisZ10|GitHub/i);
});
