### Documentación de Página: `encuentros.astro`

#### 1. Resumen y Propósito

Este archivo construye la página principal de "Encuentros" (`/encuentros`), que sirve como un portal para todos los diferentes tipos de encuentros que ofrece NAU. La página presenta una introducción general y luego muestra una serie de "tarjetas", cada una representando un encuentro específico y enlazando a su propia página de detalle.

#### 2. Flujo de Datos (Build Time)

1.  **Entrada Principal:** El proceso comienza cuando Astro decide construir la ruta `/encuentros`.
2.  **Obtención de Datos de Sanity:**
    *   Se ejecuta una única y eficiente consulta a la API de Sanity.io.
    *   **Cliente Sanity:** `sanityClient` (importado de `sanity:client`).
    *   **Consulta GROQ:** `paginaEncuentrosQuery` (importada de `src/lib/sanity/queries.js`). Esta consulta está diseñada para obtener dos conjuntos de datos a la vez:
        1.  `page`: Un objeto con el contenido específico de la página de "Encuentros" (banners, título, introducción).
        2.  `encuentros`: Un array de objetos, donde cada objeto contiene la información de una tarjeta de encuentro (título, slug, imagen, descripción breve).
    *   **Datos Recibidos:** Se obtiene un objeto `data` que contiene las propiedades `page` y `encuentros`.
3.  **Procesamiento y Filtrado de Datos:**
    *   Se desestructura `data` en las variables `page` y `encuentros`.
    *   Se realiza un filtrado de seguridad sobre el array `encuentros` para crear `encuentrosVisibles`. Esto asegura que solo se intenten renderizar las tarjetas que tienen la información mínima necesaria (un `slug` y un `title`), previniendo errores en la plantilla si un dato en el CMS está incompleto.
    *   Se procesan los enlaces de los banners con la función `resolveCtaLink`, que determina la URL de destino del botón a partir de la información del CMS.

#### 3. Construcción de la Interfaz (Componentes Utilizados)

La página se ensambla utilizando una combinación de componentes de Astro y renderizado de contenido enriquecido.

*   **`MainLayout.astro`**:
    *   **Función:** Plantilla base que proporciona la estructura HTML, `Header` y `Footer`.
    *   **Entradas (Props):**
        *   `title`: Título SEO de la página (ej., "Encuentros - NAU").
        *   `description`: Meta descripción SEO.

*   **`HeroBanner.astro`** (usado 2 veces):
    *   **Función:** Muestra los banners principal y final de la página.
    *   **Entradas (Props):** Recibe datos del objeto `page` de Sanity (imágenes, textos, CTAs).

*   **`PortableText`** (de `astro-portabletext`):
    *   **Función:** Componente crucial para renderizar contenido de "texto enriquecido" (rich text) desde Sanity.
    *   **Entrada (Prop):** `value`, que recibe el array de bloques de Sanity (ej., `page.introduction` y `encuentro.description`).
    *   **Salida:** Convierte el JSON de texto enriquecido en HTML semántico (`<p>`, `<strong>`, etc.), aplicando las clases definidas en la propiedad `prose` de Tailwind CSS para el estilo.

*   **`EncuentroCard.astro`** (usado múltiples veces dentro de un `.map`):
    *   **Función:** Es el componente visual para cada uno de los encuentros.
    *   **Entradas (Props):**
        *   `image`: URL de la imagen principal de la tarjeta (de `encuentro.image.url`).
        *   `title`: Título del encuentro.
        *   `icon`: **Importante:** El icono es estático y se importa directamente desde `src/assets/images/CLIP-ENCUENTROS.webp`. No viene de Sanity, es el mismo para todas las tarjetas.
        *   `width`, `height`: Dimensiones de la imagen para optimización.
    *   **Contenido (Slot):** Recibe el componente `PortableText` que renderiza la descripción breve del encuentro.

#### 4. Lógica Adicional

*   **Manejo de "No Hay Encuentros":** Si el array `encuentrosVisibles` está vacío, se muestra un mensaje informativo en lugar de las tarjetas. Esto evita una sección vacía y comunica al usuario que no hay contenido disponible en ese momento.

#### 5. Flujo de Runtime (Navegador del Usuario)

*   **Carga:** El usuario recibe un archivo HTML estático, completamente renderizado con toda la información de los encuentros.
*   **Interactividad:** Al igual que la página de inicio, esta página es estática. La interactividad se limita a:
    *   Los enlaces (`<a>`) en los banners.
    *   **El enlace principal de cada tarjeta `EncuentroCard`**, que envuelve todo el componente y dirige al usuario a la página de detalle correspondiente (ej., `/encuentros/pareja`).
