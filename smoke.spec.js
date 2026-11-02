const { test, expect } = require('@playwright/test');

test('site smoke test', async ({ page }) => {
  await page.goto('http://127.0.0.1:8000/index.html');
  await expect(page).toHaveTitle(/Help Me Up/i);
  await page.locator('.accordion-trigger').first().click();
  await expect(page.locator('.accordion-trigger').first()).toHaveAttribute('aria-expanded', 'true');

  await page.goto('http://127.0.0.1:8000/projects.html');
  await expect(page.locator('.project-card')).toHaveCount(8);
  await page.locator('#programme-search').fill('bursary');
  await expect(page.locator('.project-card')).toHaveCount(1);

  await page.goto('http://127.0.0.1:8000/about.html');
  await page.locator('.gallery-tile').first().click();
  await expect(page.locator('#gallery-lightbox')).toHaveAttribute('open', /.+/);

  await page.goto('http://127.0.0.1:8000/enquiry.html');
  await page.locator('#enquiry-name').fill('Test Name');
  await page.locator('#enquiry-email').fill('test@test.com');
  await page.locator('#enquiry-role').selectOption({ label: 'Grade 12 learner' });
  await page.locator('#enquiry-topic').selectOption('study');
  await page.locator('#enquiry-message').fill('I need help with choosing a study path after Grade 12.');
  await page.locator('#enquiry-form').evaluate(form => form.requestSubmit());
  await expect(page.locator('#enquiry-result')).toBeVisible();
});
