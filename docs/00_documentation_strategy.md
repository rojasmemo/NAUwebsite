# 0. Propuesta de Arquitectura y Estrategia de Documentación

Este documento define la visión, estructura y estrategia para la documentación del proyecto NAU, con el objetivo de crear un recurso vivo, completo y de clase mundial que evolucione junto con el software.

## Filosofía y Principios

1.  **Documentación como Código (Docs as Code):** La documentación reside en el repositorio (`/docs`), se versiona con Git y se revisa mediante Pull Requests. Es parte integral del desarrollo, no una ocurrencia tardía.
2.  **Fuente Única de Verdad (Single Source of Truth):** No hay información dispersa. Si no está en la documentación o en el código documentado, no es oficial.
3.  **De lo General a lo Particular:** La estructura permite a un lector nuevo entender primero la visión general y luego profundizar en los detalles técnicos que necesite, sin sentirse abrumado.
4.  **Automatización Primero:** Todo lo que pueda ser automatizado, será automatizado. La documentación manual se reserva para conceptos y guías que requieren una narrativa humana.

## Parte 1: Estructura de la Documentación (en `/docs`)

La documentación se organiza en los siguientes archivos, creando una ruta de aprendizaje lógica:

-   **[`00_documentation_strategy.md`](./00_documentation_strategy.md):** (Este mismo archivo) La estrategia y visión que guía toda la documentación.
-   **[`index.md`](./index.md):** Portal principal con enlaces a todas las secciones.
-   **[`01_getting_started.md`](./01_getting_started.md):** Guía de inicio rápido para la configuración del entorno local.
-   **[`02_architecture.md`](./02_architecture.md):** Visión general del sistema, diagramas y un registro de decisiones de arquitectura (ADRs) en un subdirectorio `/docs/ADRs/`.
-   **[`03_frontend_astro.md`](./03_frontend_astro.md):** Referencia técnica detallada del sitio `nau-astro-site`.
-   **[`04_backend_sanity.md`](./04_backend_sanity.md):** Referencia técnica detallada del `nau-sanity-studio` y sus esquemas.
-   **[`05_content_management.md`](./05_content_management.md):** Guía no técnica para editores de contenido sobre el uso de Sanity Studio.
-   **[`06_deployment.md`](./06_deployment.md):** Explicación del proceso de CI/CD y despliegue en Netlify.
-   **[`07_contribution_guidelines.md`](./07_contribution_guidelines.md):** Reglas y procedimientos para contribuir al código y a la documentación.
-   **[`08_api_reference.md`](./08_api_reference.md):** Referencia de API auto-generada a partir de los comentarios TSDoc del código fuente.

## Parte 2: Estrategia de Automatización y Mantenimiento

Para asegurar que la documentación se mantenga actualizada y de alta calidad, implementaremos:

1.  **Hooks de Pre-commit (`husky`):**
    -   Ejecutar linters y formateadores de código (ESLint, Prettier).
    -   Integrar un linter de documentación (ej. `markdownlint`) para consistencia y un verificador de enlaces rotos.

2.  **Integración Continua (GitHub Actions):**
    -   **Generación de API Docs:** Un workflow que se ejecuta en cada push a `main` para leer los comentarios TSDoc/JSDoc del código y generar el archivo `08_api_reference.md` usando `TypeDoc`.
    -   **Validación de Documentación:** En cada Pull Request, otro workflow verificará que no haya enlaces rotos en la documentación.

## Parte 3: Procedimiento para Desarrolladores (Flujo de Trabajo)

La documentación es responsabilidad de todos. El siguiente flujo de trabajo es obligatorio:

1.  **Branching:** Crear una nueva rama para cada nueva funcionalidad o arreglo.
2.  **Codificación y Documentación Simultánea:**
    -   Al escribir o modificar código, se deben añadir o actualizar los comentarios TSDoc correspondientes.
    -   Se debe actualizar cualquier documento `.md` en `/docs` que se vea afectado por el cambio.
    -   Si se toma una decisión de arquitectura relevante, se debe crear un nuevo archivo de Registro de Decisión de Arquitectura (ADR) en `/docs/ADRs/`.
3.  **Commit:** Realizar el commit. Los hooks de pre-commit aseguran la calidad básica.
4.  **Pull Request (PR):**
    -   Crear un PR detallando los cambios.
    -   Las acciones de GitHub validarán automáticamente la documentación.
    -   La revisión del PR debe incluir una evaluación explícita de la calidad y completitud de la documentación asociada.
5.  **Merge:** Una vez aprobado, el PR se fusiona a `main`, disparando los despliegues y la actualización automática de la referencia de API.
