# 7. Guía de Contribución

Esta guía establece las reglas y mejores prácticas para contribuir al desarrollo del proyecto NAU. Seguir estas directrices ayuda a mantener la calidad del código, la coherencia del proyecto y la eficiencia del equipo.

## 1. Filosofía de Contribución

-   **Calidad sobre Velocidad:** Priorizamos un código bien escrito, probado y documentado sobre la entrega rápida de funcionalidades.
-   **Propiedad Colectiva del Código:** Todos los miembros del equipo son responsables de la calidad general del código base. Revisa el código de otros y acepta las revisiones del tuyo con una mente abierta.
-   **La Documentación es parte del Trabajo:** Una funcionalidad no está "terminada" hasta que está debidamente documentada.

## 2. Flujo de Trabajo (Git y Pull Requests)

Utilizamos un flujo de trabajo basado en ramas para mantener la rama `main` siempre estable y desplegable.

1.  **Sincroniza tu rama `main`:** Antes de empezar a trabajar, asegúrate de tener la última versión del código:
    ```bash
    git checkout main
    git pull origin main
    ```

2.  **Crea una nueva rama:** Nombra tu rama de forma descriptiva, usando un prefijo según el tipo de trabajo:
    -   `feature/nombre-de-la-funcionalidad` (ej. `feature/formulario-de-contacto`)
    -   `fix/descripcion-del-arreglo` (ej. `fix/error-en-menu-movil`)
    -   `docs/tema-de-documentacion` (ej. `docs/actualizar-guia-de-contribucion`)
    ```bash
    git checkout -b feature/nombre-de-la-funcionalidad
    ```

3.  **Trabaja y Haz Commits:**
    -   Realiza tu trabajo en la nueva rama.
    -   Haz commits pequeños y atómicos. Cada commit debe representar un cambio lógico.
    -   **Escribe mensajes de commit claros y descriptivos** siguiendo el estándar [Conventional Commits](https://www.conventionalcommits.org/). (Ej: `feat: agrega validación de email en formulario de contacto`, `docs: actualiza la sección de componentes en el frontend`)

4.  **Mantén tu rama actualizada:** Si la rama `main` ha cambiado mientras trabajabas, integra esos cambios en tu rama para evitar conflictos más tarde:
    ```bash
    git fetch origin
    git rebase origin/main
    ```

5.  **Abre un Pull Request (PR):**
    -   Una vez que tu trabajo esté completo y probado, empuja tu rama a GitHub:
        ```bash
        git push -u origin feature/nombre-de-la-funcionalidad
        ```
    -   Ve a GitHub y abre un Pull Request hacia la rama `main`.
    -   En la descripción del PR, explica **qué** problema resuelves, **por qué** lo resuelves y **cómo** lo has hecho. Si hay elementos visuales, incluye capturas de pantalla.

6.  **Revisión de Código y Documentación:**
    -   Al menos un miembro del equipo debe revisar tu PR.
    -   El revisor debe verificar no solo el código, sino también que **la documentación correspondiente ha sido actualizada**.
    -   Una vez aprobado y que todas las verificaciones automáticas (CI) pasen, el PR puede ser fusionado a `main`.

## 3. Estándares de Código

-   **Formato:** Usamos **Prettier** para formatear automáticamente el código. Asegúrate de tenerlo configurado en tu editor para que se ejecute al guardar.
-   **Linting:** Usamos **ESLint** para detectar problemas en el código. No deben quedar errores de linting en el código final.
-   **TypeScript:** Todo el código nuevo debe usar TypeScript siempre que sea posible. Evita el uso de `any` a menos que sea estrictamente inevitable.

## 4. Requisito de Documentación

**Ningún Pull Request de una nueva funcionalidad o cambio significativo será aprobado sin su correspondiente actualización en la documentación.**

-   **Código:** Todas las nuevas funciones, tipos y componentes deben tener comentarios **TSDoc/JSDoc**.
-   **Documentos `/docs`:** Si tu cambio afecta la arquitectura, el proceso de construcción, una guía de usuario o cualquier otro aspecto documentado, debes actualizar el archivo `.md` correspondiente.
-   **Decisiones de Arquitectura:** Si tu trabajo implica una decisión tecnológica importante, debes discutirla con el equipo y, si se aprueba, crear un nuevo **ADR** en `docs/ADRs/`.
