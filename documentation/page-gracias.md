### Documentación de Página: `gracias.astro`

#### 1. Resumen y Propósito

La página `gracias.astro` (`/gracias`) es una página de confirmación estática. Su único propósito es ser el destino del usuario después de que ha enviado exitosamente un formulario de contacto.

Proporciona retroalimentación positiva al usuario, confirmando que su mensaje fue recibido, y le ofrece una forma clara de regresar a la página de inicio.

#### 2. Flujo de Datos (Build Time)

*   **Cero Dependencias de Datos Externos:** Esta página es completamente autocontenida. No realiza ninguna llamada a la API de Sanity ni a ninguna otra fuente de datos.
*   **Construcción:** Durante el `build`, Astro simplemente toma este archivo, lo envuelve en el `MainLayout` y genera un único archivo `gracias.html` en la carpeta `dist/`. Todo el contenido (títulos, textos) está escrito directamente en el archivo (`hardcodeado`).

#### 3. Construcción de la Interfaz (Componentes Utilizados)

*   **`MainLayout.astro`**:
    *   **Función:** Proporciona la estructura HTML base, el `Header` y el `Footer`.
    *   **Entradas (Props):** Recibe un `title` y una `description` estáticos, definidos directamente en el frontmatter de `gracias.astro`.

#### 4. Flujo de Runtime (Navegador del Usuario)

*   **Acceso:** Un usuario **nunca debería navegar directamente** a `/gracias`. Llega a esta página únicamente a través de una redirección de JavaScript (`window.location.href = '/gracias'`) que se ejecuta después de que el formulario de contacto se envía con éxito (como se documentó en `contacto.astro`).
*   **Carga:** El usuario recibe un archivo HTML 100% estático. La carga es instantánea.
*   **Interactividad:** La única interactividad es el botón "Volver", que es un simple hipervínculo (`<a>`) que dirige al usuario a la página de inicio (`/`).
