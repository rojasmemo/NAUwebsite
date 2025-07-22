import { test, expect } from '@playwright/test';

test.describe('Página de Inicio', () => {
  test('debería tener el título correcto y mostrar el encabezado principal', async ({ page }) => {
    // 1. Navegar a la página de inicio
    await page.goto('/');

    // 2. Comprobar que el título de la página es el esperado
    await expect(page).toHaveTitle(/Página principal de sitio web de Fundación NAU/);

    // 3. Comprobar que el encabezado principal es visible
    const mainHeading = page.getByRole('heading', { name: /NAU es un espacio de auto-conocimiento/i });
    await expect(mainHeading).toBeVisible();
  });
});

test.describe('Navegación Principal', () => {
    test('el enlace "Encuentros" en el header debería llevar a la página de encuentros', async ({ page }) => {
        // 1. Ir a la página de inicio
        await page.goto('/');

        // 2. Encontrar y hacer clic en el enlace "Encuentros" del header
        await page.getByRole('navigation').getByRole('link', { name: 'Encuentros' }).click();

        // 3. Comprobar que la URL es la correcta
        await expect(page).toHaveURL('/encuentros');

        // 4. Comprobar que un encabezado de la página de encuentros es visible
        const encuentrosHeading = page.getByRole('heading', { name: 'Encuentros NAU' });
        await expect(encuentrosHeading).toBeVisible();
    });
});