const { test, expect } = require('@playwright/test');

test('landing page contains GitHub link with correct attributes', async ({ page }) => {
  // Assumes local dev server at http://localhost:3000
  await page.goto('http://localhost:3000/');

  const link = page.locator('a[href="https://github.com/ArktisZ10"]');

  // Expect the anchor to exist (this will fail until the page is implemented)
  await expect(link).toHaveCount(1);

  // Verify attributes required by spec
  await expect(link).toHaveAttribute('target', '_blank');
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(link).toHaveAttribute('aria-label', /ArktisZ10|GitHub/i);
});
