# Plan de Acción para una Responsividad Real

Este documento describe el plan para auditar, definir e implementar una estrategia de diseño responsivo robusta para el sitio web de NAU, asegurando una experiencia de usuario óptima en todos los dispositivos.

## Registro de Avance

*   **2025-07-30:** Creación del plan de acción.
*   **2025-07-30:** **Fase 1 completada.** Se auditó `tailwind.config.mjs` y `global.css`.
*   **2025-07-30:** **Fase 2 completada.** Se limpió `tailwind.config.mjs`.
*   **2025-07-30:** **Fase 3 completada.** Refactorizados `Header.astro` y `Footer.astro`.
*   **2025-07-30:** **Fase 3 completada.** Refactorizada `index.astro` y componentes hijos.
*   **2025-07-30:** **Fase 3 completada.** Refactorizada `sobre-nau.astro` y componentes hijos.
*   **2025-07-30:** **Fase 3 completada.** Refactorizada `encuentros.astro` y componentes hijos.
*   **2025-07-30:** **Fase 3 completada.** Refactorizada `simbolismo-numerico.astro` y componentes hijos.
*   **2025-07-30:** **Fase 3 completada.** Refactorizada `donar.astro` y componentes hijos.
*   **2025-07-30:** **Fase 3 completada.** Refactorizada `contacto.astro` y componentes hijos.

---

## Fase 1: Auditoría y Diagnóstico Preciso (Completada)

**Objetivo:** Obtener una imagen clara y técnica del estado actual de la responsividad del sitio.

1.  **Inspeccionar la Configuración de Tailwind:** Revisar `tailwind.config.mjs`. **(Hecho)**
2.  **Revisar CSS Global:** Analizar `global.css`. **(Hecho)**
3.  **Catálogo de Componentes y Páginas Problemáticas:** Inventario y análisis de código. **(Hecho)**

## Fase 2: Definir una Estrategia de Breakpoints Robusta (Completada)

**Objetivo:** Establecer una base sólida y estándar para el diseño responsivo.

1.  **Adoptar el Principio "Mobile-First"**. **(Acordado)**
2.  **Implementar Breakpoints Estándar de Tailwind**. **(Hecho)**

## Fase 3: Implementación Gradual y Sistemática (Completada)

**Objetivo:** Aplicar la nueva estrategia de forma ordenada en todo el sitio.

1.  **Actualización de la Configuración:** Modificar `tailwind.config.mjs`. **(Hecho)**
2.  **Refactorización por Componentes:** Revisar y actualizar clases responsivas.
3.  **Priorización de la Implementación:**
    *   Componentes globales: `Header.astro`, `Footer.astro`. **(Hecho)**
    *   Página de inicio: `index.astro` y componentes hijos. **(Hecho)**
    *   Páginas principales: `sobre-nau.astro` **(Hecho)**, `encuentros.astro` **(Hecho)**, `simbolismo-numerico.astro` **(Hecho)**, `donar.astro` **(Hecho)**, `contacto.astro` **(Hecho)**.

## Fase 4: Verificación y Pruebas Exhaustivas (En Curso)

**Objetivo:** Asegurar que la implementación sea correcta y que el sitio se vea impecable en todas las resoluciones.

1.  **Pruebas en Navegador:** Simular anchos de pantalla. **(En curso)**
2.  **Pruebas en Dispositivos Reales:** Validar en dispositivos físicos.
3.  **Pruebas Automatizadas de Regresión:** Ejecutar pruebas de Playwright.