# Guía de Pruebas End-to-End (E2E) con Playwright

Este documento describe cómo configurar y ejecutar pruebas de extremo a extremo (E2E) para el proyecto NAU utilizando Playwright.

## 1. ¿Qué son las Pruebas E2E y por qué Playwright?

Las pruebas E2E simulan el comportamiento de un usuario real en un navegador. Verifican flujos de trabajo completos, como navegar entre páginas, rellenar formularios o interactuar con elementos dinámicos.

Se eligió **Playwright** por varias razones:
-   **Multi-Navegador:** Permite ejecutar las mismas pruebas en Chromium (Chrome, Edge), Firefox y WebKit (Safari) con una sola API.
-   **Fiabilidad:** Tiene mecanismos de espera automática que reducen la inestabilidad de las pruebas.
-   **Excelente Herramientas:** Incluye un generador de código, un inspector de UI y reportes detallados.
-   **Integración Sencilla:** Se integra fácilmente con frameworks modernos como Astro.

## 2. Configuración del Proyecto

La configuración se centraliza en dos archivos principales:

-   **`playwright.config.ts`**: El corazón de la configuración de Playwright. Define:
    -   `testDir`: El directorio donde viven nuestras pruebas (`./tests`).
    -   `webServer`: Un comando para iniciar automáticamente el servidor de desarrollo de Astro (`npm run dev`) antes de que comiencen las pruebas. Esto es crucial.
    -   `baseURL`: La URL base (`http://localhost:4321`) para que las pruebas no necesiten URLs completas.
    -   `projects`: Los navegadores en los que se ejecutarán las pruebas.

-   **`package.json`**: Contiene el script para ejecutar las pruebas:
    -   `"test:e2e": "playwright test"`

## 3. Cómo Ejecutar las Pruebas

Para ejecutar todo el conjunto de pruebas E2E, simplemente usa el script de npm en tu terminal:

```bash
npm run test:e2e
```

Playwright se encargará de:
1.  Iniciar el servidor de desarrollo de Astro (si no está ya en ejecución).
2.  Abrir los navegadores configurados.
3.  Ejecutar todas las pruebas encontradas en la carpeta `tests/`.
4.  Mostrar un resumen de los resultados en la terminal.

### Ver el Reporte de Resultados

Después de ejecutar las pruebas, Playwright genera un reporte HTML muy completo. Para abrirlo, ejecuta:

```bash
npx playwright show-report
```

Este reporte te permite explorar cada paso de cada prueba, ver capturas de pantalla, trazas y vídeos de las ejecuciones fallidas, lo que facilita enormemente la depuración.

## 4. Escribiendo una Prueba

Las pruebas se escriben en archivos con la extensión `.spec.ts` dentro de la carpeta `tests/`.

La estructura básica de una prueba es:

```typescript
import { test, expect } from '@playwright/test';

test('descripción de lo que la prueba verifica', async ({ page }) => {
  // Paso 1: Navegar a una página
  await page.goto('/ruta-de-la-pagina');

  // Paso 2: Encontrar un elemento en la página
  const elemento = page.getByRole('button', { name: 'Enviar' });

  // Paso 3: Realizar una acción sobre el elemento
  await elemento.click();

  // Paso 4: Afirmar (assert) que algo ha cambiado como resultado
  await expect(page.locator('.mensaje-exito')).toBeVisible();
});
```

-   `test`: Define un caso de prueba.
-   `page`: Es el objeto principal que representa la pestaña del navegador. Se usa para navegar, interactuar y obtener elementos.
-   `expect`: Se usa para hacer afirmaciones sobre el estado de la página (ej. `toHaveURL`, `toBeVisible`, `toHaveText`).

## 5. Usando la Extensión de Playwright para VS Code

Para una experiencia de desarrollo mucho más fluida, es altamente recomendable instalar la extensión oficial **"Playwright Test for VSCode"** de Microsoft.

Esta extensión proporciona herramientas visuales que aceleran enormemente la creación y depuración de pruebas.

### Funcionalidades Clave:

1.  **Ejecutar Pruebas desde el Editor:**
    -   Aparecen iconos de "play" verdes junto a cada `test` y `describe` en tus archivos `.spec.ts`.
    -   Permite ejecutar pruebas individuales o grupos de pruebas con un solo clic, sin necesidad de usar la terminal.

2.  **Explorador de Pruebas (Test Explorer):**
    -   Añade un nuevo panel en la barra de actividades de VS Code que lista todas tus pruebas.
    -   Desde aquí puedes ver el estado de cada prueba (pasada/fallida) y ejecutarlas o depurarlas.

3.  **Grabar una Prueba (Record New):**
    -   Es la función más potente. Abre un navegador y graba tus interacciones (clics, escritura en formularios) generando el código de Playwright automáticamente.
    -   Para usarla, abre la paleta de comandos (`Ctrl+Shift+P`) y selecciona `Test: Record new`.

4.  **Seleccionar un Localizador (Pick Locator):**
    -   Te ayuda a encontrar el selector correcto para un elemento.
    -   Abre la paleta de comandos (`Ctrl+Shift+P`), selecciona `Test: Pick locator`, haz clic en un elemento en el navegador y la extensión te sugerirá el mejor localizador para usar en tu código.