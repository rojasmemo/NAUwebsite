# Guía de Pruebas Unitarias con Vitest para el Proyecto NAU

Este documento es la guía de referencia para escribir, ejecutar y entender las pruebas unitarias en el proyecto NAU. El objetivo es asegurar la calidad, fiabilidad y mantenibilidad del código a largo plazo.

## 1. ¿Por Qué Hacemos Pruebas Unitarias?

Las pruebas unitarias son la base de un software robusto. Nos permiten:

-   **Verificar la Lógica Aislada:** Comprobar que cada pequeña pieza de código (una "unidad" o función) funciona como se espera, de forma independiente.
-   **Ganar Confianza:** Realizar cambios, refactorizar o añadir nuevas funcionalidades con la seguridad de que no hemos roto nada existente. Las pruebas actúan como una red de seguridad automatizada.
-   **Detectar Errores Temprano:** Es mucho más fácil y rápido corregir un error durante el desarrollo que cuando ya está en producción.
-   **Servir como Documentación:** Las pruebas son ejemplos prácticos de cómo usar una función, qué parámetros espera y qué resultados produce.

## 2. Conceptos Clave de Vitest

Usamos **Vitest** porque es un framework de pruebas moderno y extremadamente rápido que se integra a la perfección con Vite (la herramienta que Astro usa internamente). Sus componentes principales son:

-   `describe(nombre, funcion)`: Agrupa un conjunto de pruebas relacionadas. Por ejemplo, un `describe` para cada función que probamos.
-   `it(descripcion, funcion)` o `test(descripcion, funcion)`: Define una prueba individual para un escenario concreto. La descripción debe ser clara sobre lo que se está probando.
-   `expect(valor)`: Crea una "aserción" o "afirmación". Se usa junto con "matchers" para comparar el resultado de nuestro código con el valor esperado.
    -   `.toBe(valorEsperado)`: Comprueba igualdad estricta (como `===`).
    -   `.toEqual(objetoEsperado)`: Comprueba que dos objetos tengan los mismos valores (comparación profunda).
    -   `.not.toBeNull()`: Comprueba que el valor no sea `null`.
    -   ¡Y muchos más!

## 3. Anatomía de un Archivo de Prueba: Ejemplo Real

La regla general es: **un archivo de prueba por cada archivo de código**.

Vamos a analizar el archivo de pruebas que ya creamos para `src/lib/utils.ts`.

**El Código a Probar (`src/lib/utils.ts`):**

```typescript
// src/lib/utils.ts
import type { Cta } from './sanity/types';

export const resolveCtaLink = (cta: Cta | undefined): string | null => {
  if (!cta) return null;
  if (cta.externalUrl) return cta.externalUrl;
  if (cta.internalLink) {
    switch (cta.internalLink._type) {
      case 'homePage':
        return '/';
      case 'paginaEncuentros':
        return '/encuentros';
      // ... otros casos
      default:
        return cta.internalLink.slug ? `/${cta.internalLink.slug}` : null;
    }
  }
  return null;
};
```

**El Archivo de Pruebas (`src/lib/utils.test.ts`):**

```typescript
// 1. Importaciones necesarias
import { describe, it, expect } from 'vitest';
import { resolveCtaLink } from './utils';

// 2. Bloque `describe` para agrupar todas las pruebas de esta función
describe('resolveCtaLink', () => {

  // 3. Bloque `it` para un caso de prueba específico
  it('debería devolver la URL externa si existe', () => {
    // ARRANGE (Preparar): Definimos los datos de entrada.
    const cta = { externalUrl: 'https://dominio-externo.com' };

    // ACT (Actuar): Ejecutamos la función que estamos probando.
    const result = resolveCtaLink(cta);

    // ASSERT (Afirmar): Comprobamos si el resultado es el que esperábamos.
    expect(result).toBe('https://dominio-externo.com');
  });

  // 4. Otro bloque `it` para otro escenario
  it('debería devolver "/encuentros" para un enlace interno de tipo "paginaEncuentros"', () => {
    const cta = { internalLink: { _type: 'paginaEncuentros' } };
    const result = resolveCtaLink(cta);
    expect(result).toBe('/encuentros');
  });

  // ... y así para todos los demás casos (URL externa, slug, nulo, etc.)
});
```

## 4. Cómo Ejecutar las Pruebas

Hemos configurado un script en `package.json` para facilitar la ejecución.

### Ejecución Única

Para correr todas las pruebas del proyecto una sola vez:

```bash
npm test
```

### Modo de Desarrollo (Watch Mode)

Esta es la opción más útil durante el desarrollo. Vitest se queda escuchando los cambios en los archivos y vuelve a ejecutar las pruebas automáticamente cada vez que guardas un cambio en el código o en las pruebas.

```bash
npm test -- --watch
```
(Los `--` son necesarios para pasar el argumento `--watch` directamente a Vitest).

## 5. Interpretación de los Resultados

### Cuando Todo Funciona

Verás un reporte en verde, claro y conciso:

```
 ✓ src/lib/utils.test.ts (9 tests) 12ms

 Test Files  1 passed (1)
      Tests  9 passed (9)
   Start at  16:12:59
   Duration  3.98s
```
Esto te confirma que todos los archivos de prueba y todas las pruebas individuales pasaron con éxito.

### Cuando Algo Falla

Si una prueba falla, Vitest te da un reporte detallado para que encuentres el problema rápidamente.

```
 ✗ src/lib/utils.test.ts (1 failed, 8 passed)

  FAIL  src/lib/utils.test.ts > resolveCtaLink > debería devolver "/encuentros" para un enlace interno de tipo "paginaEncuentros"
 AssertionError: expected '/encuentro' to be '/encuentros'
 + Expected  - Received

 - /encuentro
 + /encuentros

      at src/lib/utils.test.ts:35:30
```

-   `✗ src/lib/utils.test.ts`: Te marca el archivo que contiene el fallo.
-   `FAIL ...`: Te dice exactamente qué prueba falló (leyendo los `describe` y `it`).
-   `AssertionError`: Explica el error. En este caso, esperaba recibir `'/encuentros'` pero recibió `'/encuentro'`.
-   `at ...`: Te da la línea exacta del error en el archivo de prueba.

Con esta guía, tienes todo lo necesario para empezar a construir un proyecto más sólido y fiable. ¡A programar con confianza!
