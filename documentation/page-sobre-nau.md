### Documentación de Página: `sobre-nau.astro`

#### 1. Resumen y Propósito

La página `sobre-nau.astro` (`/sobre-nau`) tiene como objetivo presentar la misión, visión y propósito de NAU. Explica el "porqué" de la organización, qué hace y cómo lo hace, buscando generar una conexión emocional y de confianza con el visitante.

#### 2. Flujo de Datos (Build Time)

*   **Contenido Estático (Hardcodeado):** A diferencia de páginas como "Encuentros" o "Inicio", esta página **no obtiene ningún dato de Sanity**. Todo el contenido textual (títulos, párrafos, textos de botones) está escrito directamente en el archivo `.astro`.
*   **Imágenes Locales Optimizadas:**
    *   Las imágenes no provienen de una URL, sino que se **importan** directamente desde la carpeta `src/assets/images/` al inicio del archivo.
    *   **Proceso de Optimización de Astro:** Durante el `build`, Astro toma estas imágenes importadas, las procesa, las optimiza (creando múltiples tamaños y formatos como `.webp` y `.avif`) y las coloca en la carpeta `dist/` con nombres de archivo únicos. Esto asegura que las imágenes se sirvan en el formato y tamaño más eficiente para el dispositivo de cada usuario.
*   **Construcción Final:** Astro renderiza el HTML de la página, reemplazando los componentes `<Image>` y `<HeroBanner>` con el código HTML final y las referencias a las imágenes optimizadas. El resultado es un único archivo `sobre-nau.html` en la carpeta `dist/`.

#### 3. Construcción de la Interfaz (Componentes Utilizados)

*   **`MainLayout.astro`**:
    *   **Función:** Proporciona la estructura HTML base, `Header` y `Footer`.
    *   **Entradas (Props):** Recibe un `title` y `description` estáticos, definidos en el frontmatter.

*   **`HeroBanner.astro`** (usado 2 veces):
    *   **Función:** Muestra los banners de la página.
    *   **Entradas (Props):**
        *   `image`: Recibe una **variable de imagen importada** (ej. `heroImage1`), no una URL. Astro maneja esto internamente.
        *   El resto de las props (`alt`, `bgColorClass`, etc.) son strings estáticos.

*   **`Image`** (de `astro:assets`):
    *   **Función:** Es el componente de Astro para renderizar imágenes locales optimizadas.
    *   **Entradas (Props):**
        *   `src`: La variable de la imagen importada.
        *   `alt`: Texto alternativo.
        *   `widths`, `sizes`: Atributos para ayudar a Astro a generar el `srcset` más eficiente, permitiendo que el navegador elija la mejor imagen a cargar.

#### 4. Flujo de Runtime (Navegador del Usuario)

*   **Carga:** El usuario recibe un archivo HTML 100% estático y autocontenido. La carga es muy rápida.
*   **Interactividad:** La única interactividad en esta página son los hipervínculos (`<a>`) que llevan a otras páginas, como "/encuentros" y "/contacto". No hay JavaScript del lado del cliente para esta página.

#### 5. Oportunidad de Mejora (Migración a Sanity)

El estado actual de esta página es un candidato perfecto para ser migrado a Sanity. Esto implicaría:
1.  Crear un nuevo "Tipo de Documento" en Sanity Studio llamado, por ejemplo, "Pagina Sobre NAU".
2.  Añadir campos para cada sección de texto e imagen (ej. `hero1_heading`, `hero1_image`, `seccion_proposito_texto`, etc.).
3.  Modificar `sobre-nau.astro` para que:
    *   Haga una consulta GROQ a Sanity para obtener estos datos.
    *   Reemplace el texto y las imágenes "hardcodeadas" con los datos dinámicos provenientes de la API.

Esto permitiría modificar todo el contenido de la página "Sobre NAU" directamente desde el CMS, sin necesidad de tocar el código.
