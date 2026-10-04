import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage loads and shows Social Suite AI', async ({ page }) => {
  await page.goto('/');

  // Verifica que el título de la pestaña sea correcto
  await expect(page).toHaveTitle(/RepoBanner Pro/);

  // Verifica que el editor sea visible
  await expect(page.getByText('Editor Pro')).toBeVisible();

});

test('should not have any automatically detectable accessibility issues', async ({ page }) => {
  await page.goto('/');

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});