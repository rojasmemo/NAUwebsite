### Documentación de Páginas Dinámicas: `[slug].astro`

#### 1. Resumen y Propósito

Un archivo con corchetes en su nombre, como `[slug].astro`, es una **plantilla de ruta dinámica** en Astro. No crea una página en la ruta `/encuentros/[slug]`. En su lugar, le dice a Astro: "Usa esta plantilla para generar una página HTML estática por cada uno de los encuentros que existen en el CMS".

El resultado final son páginas como:
*   `/encuentros/pareja.html`
*   `/encuentros/padres-e-hijos.html`
*   `/simbolismo-numerico/personalidad.html`
*   etc.

Este proceso ocurre **durante el tiempo de construcción (build time)**.

#### 2. Flujo de Datos y Generación de Páginas (Build Time)

Este es el proceso más importante para las rutas dinámicas y se divide en dos funciones clave que deben existir dentro del archivo `[slug].astro`.

**A. `getStaticPaths()` - La Fábrica de Páginas**

1.  **Propósito:** Esta función es obligatoria para las rutas dinámicas en Astro. Su único trabajo es decirle a Astro **cuántas páginas necesita crear y cuál es la URL (el `slug`) de cada una**.
2.  **Funcionamiento:**
    *   Dentro de `getStaticPaths`, se hace una llamada a la API de Sanity.
    *   **Consulta GROQ:** Se usa una consulta específica para obtener solo los `slugs` de todos los documentos publicados. Para los encuentros, sería `encuentroSlugsQuery` y para los servicios, `simbolismoNumericoSlugsQuery` (ambas están en `src/lib/sanity/queries.js`).
    *   **Datos Recibidos:** Se obtiene un array de objetos, por ejemplo: `[{ slug: 'pareja' }, { slug: 'padres-e-hijos' }, ...]`.
    *   **Salida:** La función `getStaticPaths` debe devolver un array de objetos, donde cada objeto tiene una propiedad `params` que contiene el `slug` de una página a crear.
        ```javascript
        // Ejemplo de lo que devuelve getStaticPaths
        return [
          { params: { slug: 'pareja' } },
          { params: { slug: 'padres-e-hijos' } },
          // ... y así para todos los demás
        ]
        ```

**B. Renderizado de la Plantilla - El Contenido de Cada Página**

1.  **Propósito:** Una vez que `getStaticPaths` le ha dicho a Astro qué páginas crear, Astro ejecuta el resto del código del archivo `[slug].astro` **una vez por cada página**.
2.  **Funcionamiento:**
    *   **Recepción del Slug:** El código de la plantilla puede acceder al `slug` de la página que está renderizando actualmente a través de `Astro.params.slug`.
    *   **Obtención de Datos Específicos:** Ahora, se hace una **segunda llamada** a la API de Sanity para obtener los detalles completos *solo* del encuentro o servicio correspondiente a ese `slug`.
    *   **Consulta GROQ:** Se usa una consulta que filtra por el `slug`. Por ejemplo, `encuentroPorSlugQuery`, pasándole el `slug` actual como variable.
    *   **Datos Recibidos:** Se obtiene un único objeto con todos los detalles: título, descripción completa, imagen principal, etc.
    *   **Construcción de la Interfaz:** El resto del archivo utiliza estos datos para rellenar los componentes (`MainLayout`, `HeroBanner`, `PortableText` para el contenido principal, etc.) y construir el HTML de la página de detalle.

#### 3. Diagrama de Flujo (Build Time para una Ruta Dinámica)

```mermaid
graph TD
    A[Astro encuentra `[slug].astro`] --> B{Ejecuta `getStaticPaths()`};
    B --> C[Llama a Sanity con `encuentroSlugsQuery`];
    C --> D[Sanity devuelve la lista de todos los slugs];
    D --> E[Astro ahora sabe que debe crear:<br/>- /encuentros/pareja<br/>- /encuentros/padres-e-hijos<br/>- ...etc];
    
    subgraph "Loop: Para cada slug encontrado"
        F[Renderiza la plantilla para el slug actual (ej. 'pareja')];
        F --> G[Obtiene el slug de `Astro.params`];
        G --> H[Llama a Sanity con `encuentroPorSlugQuery` y el slug 'pareja'];
        H --> I[Sanity devuelve los detalles completos de 'pareja'];
        I --> J[La plantilla usa los datos para renderizar los componentes];
        J --> K[Se genera el archivo `pareja.html` en `dist/encuentros/`];
    end
    
    E --> F;
```

#### 4. Flujo de Runtime (Navegador del Usuario)

*   **Carga:** El usuario accede a una URL como `/encuentros/pareja`. El servidor de Netlify devuelve el archivo `pareja.html` que ya fue generado durante el build.
*   **Interactividad:** La página es completamente estática. No hay JavaScript del lado del cliente a menos que se haya añadido explícitamente algún componente interactivo (como un carrusel de imágenes, que no parece ser el caso aquí).

Este método es la base del rendimiento de los sitios estáticos: el trabajo pesado de obtener datos y construir las páginas se hace una sola vez en el servidor, y los usuarios reciben archivos HTML pre-construidos y ultrarrápidos.
