### Documentación de Página: `index.astro` (Página de Inicio)

#### 1. Resumen y Propósito

Este archivo representa la página de inicio del sitio web (`/`). Su función es presentar una vista general atractiva de NAU, combinando secciones de banner, texto, imágenes y llamadas a la acción (CTAs) para guiar al usuario a través del contenido principal del sitio.

#### 2. Flujo de Datos (Build Time)

1.  **Entrada Principal:** El proceso se inicia cuando Astro decide construir esta página.
2.  **Obtención de Datos de Sanity:**
    *   Se ejecuta una consulta a la API de Sanity.io.
    *   **Cliente Sanity:** `sanityClient` (importado de `sanity:client`).
    *   **Consulta GROQ:** `homePageQuery` (importada de `src/lib/sanity/queries.js`).
    *   **Datos Recibidos:** Se obtiene un único objeto JSON que contiene toda la información necesaria para la página de inicio, incluyendo textos, imágenes y datos para las CTAs. Este objeto se guarda en la variable `data`.
3.  **Procesamiento de Datos:**
    *   Se desestructura el objeto `data` para extraer las diferentes secciones (`hero1`, `splitSection1`, `featureSection`, etc.).
    *   Se utiliza la función `resolveCtaLink` (de `src/lib/utils.ts`) para procesar los datos de los enlaces (CTAs) y convertirlos en URLs válidas.

#### 3. Construcción de la Interfaz (Componentes Utilizados)

La página se construye anidando componentes y pasándoles los datos obtenidos de Sanity como `props`.

*   **`MainLayout.astro`**:
    *   **Función:** Es la plantilla principal que envuelve toda la página.
    *   **Entradas (Props):**
        *   `title`: El título de la página para SEO y la pestaña del navegador (ej., "NAU - Inicio").
        *   `description`: La meta descripción para SEO.
    *   **Salida:** Proporciona la estructura HTML base (`<html>`, `<head>`, `<body>`), incluyendo el `Header` y el `Footer` comunes a todo el sitio.

*   **`HeroBanner.astro`** (usado 3 veces):
    *   **Función:** Muestra una imagen de fondo a pantalla completa con texto y un botón de CTA superpuestos.
    *   **Entradas (Props):**
        *   `image`: URL de la imagen de fondo (de Sanity).
        *   `alt`: Texto alternativo para la imagen.
        *   `width`, `height`: Dimensiones de la imagen para optimización.
        *   `bgColorClass`: Clase de CSS para un color de fondo de respaldo.
        *   `loading`: Atributo de carga de la imagen (`eager` para el primer banner, `lazy` para los demás).
    *   **Contenido (Slot):** Recibe el `<h2>`, `<p>` y el `<a>` (CTA) que se mostrarán encima de la imagen.

*   **`SplitSection.astro`** (usado 2 veces):
    *   **Función:** Crea una sección con dos columnas que se ajustan automáticamente en dispositivos móviles.
    *   **Entradas (Props):**
        *   `reverseOnMobile`: Booleano para invertir el orden de las columnas en móviles.
        *   `bgColorClass`: Clase para el color de fondo de la sección.
    *   **Contenido (Slots):**
        *   `slot="left"`: Contenido de la columna izquierda.
        *   `slot="right"`: Contenido de la columna derecha.

*   **`FeatureCard.astro`** (usado 2 veces dentro de una sección):
    *   **Función:** Muestra una "tarjeta" con un icono, un título, una lista de características y un enlace.
    *   **Entradas (Props):**
        *   `icon`: URL del icono (de Sanity).
        *   `title`: Título de la tarjeta.
        *   `link`: URL a la que apunta el enlace.
        *   `linkText`: Texto del enlace.
    *   **Contenido (Slot):** Recibe la lista `<ul>` de características.

*   **`SanityImage.astro`**:
    *   **Función:** Componente especializado para renderizar imágenes provenientes de Sanity, probablemente manejando la optimización y el responsive.
    *   **Entradas (Props):**
        *   `image`: El objeto de imagen de Sanity.
        *   `width`: Ancho para la optimización.

#### 4. Flujo de Runtime (Navegador del Usuario)

*   **Carga:** El usuario recibe un archivo HTML completamente renderizado. La carga es muy rápida.
*   **Interactividad:** Esta página en particular **no tiene JavaScript del lado del cliente** (no hay `client:load`, `client:idle`, etc.). Es 100% estática. La única interactividad son los hipervínculos (`<a>`) que llevan a otras páginas.
