# Guía de Contribución para el Proyecto NAU

¡Gracias por tu interés en contribuir al proyecto NAU! Tu ayuda es invaluable para crear un producto de excelencia.

## Filosofía de Colaboración

Nos guiamos por los principios de código limpio, comunicación clara y mejora continua. Cada contribución, sin importar su tamaño, debe aspirar a dejar el proyecto en un estado mejor del que lo encontró.

## Proceso de Contribución

Para mantener el orden y la calidad, seguimos un flujo de trabajo estandarizado.

### Reportar un Bug

1.  **Busca primero:** Asegúrate de que el bug no haya sido reportado antes en la sección de "Issues" de GitHub.
2.  **Crea un nuevo Issue:** Si no existe, crea un nuevo issue utilizando la plantilla de "Bug Report". Proporciona la mayor cantidad de detalles posible: pasos para reproducirlo, capturas de pantalla y versión del navegador/SO.

### Proponer una Nueva Funcionalidad (Feature)

1.  **Crea un nuevo Issue:** Utiliza la plantilla de "Feature Request" para describir la funcionalidad que propones, el problema que resuelve y por qué es importante para el proyecto.
2.  **Discusión:** El equipo revisará la propuesta y la discutirá en el mismo issue para refinar la idea antes de empezar a programar.

### Flujo de Trabajo con Git y Pull Requests

1.  **Fork y Clonar:** Haz un fork del repositorio y clónalo en tu máquina local.
2.  **Crear una Rama:** Crea una nueva rama descriptiva para tu trabajo a partir de la rama `main`.
    *   Para bugs: `fix/nombre-corto-del-bug` (ej. `fix/error-formulario-contacto`)
    *   Para features: `feat/nombre-corto-feature` (ej. `feat/agregar-seccion-testimonios`)
3.  **Desarrollar y Commitear:**
    *   Escribe código limpio y claro.
    *   Asegúrate de que todos los tests existentes pasen (`npm run test:e2e`).
    *   Si añades una nueva funcionalidad, añade también los tests correspondientes.
    *   Usa mensajes de commit convencionales (Conventional Commits).
4.  **Crear un Pull Request (PR):**
    -   Una vez que tu trabajo esté listo, haz push de tu rama a tu fork.
    -   Abre un Pull Request hacia la rama `main` del repositorio principal.
    -   Rellena la plantilla del PR, explicando qué cambios has hecho y por qué.
    -   Asegúrate de que los chequeos automáticos (CI) pasen correctamente.
5.  **Revisión de Código:**
    -   Al menos un miembro del equipo revisará tu PR.
    -   Es posible que se te pidan cambios. ¡No te lo tomes como algo personal! Es parte del proceso para asegurar la calidad.
6.  **Merge:** Una vez aprobado, tu PR será mergeado a `main`.

## Estándares de Código

-   **Linting y Formato:** Usamos ESLint y Prettier para mantener un estilo de código consistente. La configuración está en el repositorio y se verifica automáticamente antes de cada commit.
-   **Documentación:** Si modificas un componente o una función, asegúrate de que la documentación correspondiente (en el código con JSDoc y en la carpeta `/docs`) se actualice para reflejar tus cambios.

¡Gracias de nuevo por tu contribución!