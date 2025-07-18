### Documentación de Página: `simbolismo-numerico.astro`

#### 1. Resumen y Propósito

Este archivo construye la página principal de "Simbolismo Numérico" (`/simbolismo-numerico`). Su objetivo es informar a los usuarios sobre los servicios de numerología que ofrece NAU. La página presenta contenido introductorio y una serie de tarjetas, cada una detallando un servicio específico. A diferencia de otras páginas, esta incluye interactividad del lado del cliente a través de un acordeón en cada tarjeta.

#### 2. Flujo de Datos (Build Time)

1.  **Entrada Principal:** El proceso se activa cuando Astro construye la ruta `/simbolismo-numerico`.
2.  **Obtención de Datos de Sanity:**
    *   Se realiza una consulta a la API de Sanity.io.
    *   **Cliente Sanity:** `sanityClient`.
    *   **Consulta GROQ:** `paginaSimbolismoNumericoQuery` (importada de `src/lib/sanity/queries.js`). Esta consulta, similar a la de Encuentros, obtiene dos conjuntos de datos:
        1.  `page`: Un objeto con el contenido de la página contenedora (banners, introducción, etc.).
        2.  `servicios`: Un array de objetos, donde cada objeto es un servicio de numerología con su título, imagen y, crucialmente, su `description` completa.
    *   **Datos Recibidos:** Un objeto `data` que contiene las propiedades `page` y `servicios`.
3.  **Procesamiento de Datos:**
    *   Se desestructura `data` en las variables `page` y `servicios`.
    *   Se procesa el enlace del banner de CTA con `resolveCtaLink`.

#### 3. Construcción de la Interfaz (Componentes Utilizados)

*   **`MainLayout.astro`**:
    *   **Función:** Plantilla base que provee la estructura HTML, `Header` y `Footer`.
    *   **Entradas (Props):** `title` y `description` obtenidos del objeto `page` de Sanity.

*   **`HeroBanner.astro`** (usado 2 veces):
    *   **Función:** Muestra los banners de la página.
    *   **Entradas (Props):** Recibe datos del objeto `page` de Sanity.

*   **`PortableText`** (de `astro-portabletext`):
    *   **Función:** Renderiza el contenido de texto enriquecido para la sección de introducción y, muy importante, para la descripción *dentro* de cada tarjeta de acordeón.
    *   **Entrada (Prop):** `value`, que recibe el contenido de `page.introduction` y `servicio.description`.

*   **`SimbolismoNumericoCard.astro`** (usado múltiples veces dentro de un `.map`):
    *   **Función:** Componente clave que muestra cada servicio. Contiene la lógica del acordeón.
    *   **Entradas (Props):**
        *   `title`: Título del servicio.
        *   `image`: URL de la imagen de la tarjeta.
        *   `description`: El contenido completo de texto enriquecido para el cuerpo del acordeón.
        *   `icon`: Un icono estático importado localmente desde `src/assets/images/`, el mismo para todas las tarjetas.
    *   **Salida:** Una tarjeta con una imagen, un título y un acordeón interactivo.

#### 4. Flujo de Runtime (Navegador del Usuario)

Esta página es un excelente ejemplo de las **"Islas de Astro"**.

*   **Carga Inicial:** El usuario recibe un archivo HTML estático con todo el contenido visible (imágenes, títulos, botones "Ver descripción"). La página se carga muy rápido.
*   **Hidratación de la Isla:** El bloque `<script>` dentro de `SimbolismoNumericoCard.astro` es una "Isla de Astro".
    1.  Una vez que el HTML se ha cargado, el navegador descarga y ejecuta el pequeño script asociado a estas islas.
    2.  El script busca todos los botones con la clase `.accordion-toggle`.
    3.  A cada botón le añade un `addEventListener` que escucha eventos de `click`.
*   **Interactividad:**
    1.  Cuando el usuario hace clic en un botón "Ver descripción", se dispara el evento.
    2.  La función del `addEventListener` se ejecuta.
    3.  Manipula el DOM: alterna la clase `hidden` en el contenedor del contenido (`accordion-content`) y en los iconos de más/menos.
    4.  El navegador actualiza la vista, mostrando u ocultando la descripción del servicio.

Este enfoque es altamente eficiente porque, en lugar de cargar una gran librería de JavaScript, Astro solo envía el código mínimo necesario para que los acordeones funcionen, sin afectar el rendimiento de carga inicial del resto de la página.
