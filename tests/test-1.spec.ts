import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://naufundacion.org/');
  await page.getByRole('link', { name: 'Sobre Nau' }).click();
  await page.getByRole('link', { name: 'Logo de Nau' }).click();
  await page.getByRole('link', { name: 'Descubre cómo funciona' }).click();
  await page.goto('https://naufundacion.org/');
  await page.locator('section').filter({ hasText: '¿Sientes que algo te frena? A' }).click();
});