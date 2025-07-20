import { defineConfig, devices } from '@playwright/test';

/**
 * Lee la documentación de Playwright para más detalles:
 * https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Directorio donde se encuentran los archivos de prueba.
  testDir: './tests',
  // Ejecutar pruebas en paralelo.
  fullyParallel: true,
  // Fallar el build en CI si accidentalmente se deja un `test.only` en el código.
  forbidOnly: !!process.env.CI,
  // Reintentar en CI.
  retries: process.env.CI ? 2 : 0,
  // Número de workers para las pruebas.
  workers: process.env.CI ? 1 : undefined,
  // Reporter para los resultados. 'html' genera un reporte web.
  reporter: 'html',
  // Configuración global para todas las pruebas.
  use: {
    // URL base para las pruebas.
    baseURL: 'http://localhost:4321',
    // Grabar un "trace" en el primer reintento de una prueba fallida.
    trace: 'on-first-retry',
  },

  // Configuración para diferentes navegadores.
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  // Inicia el servidor de desarrollo antes de ejecutar las pruebas.
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});