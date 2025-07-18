### Documentación de Página: `donar.astro`

#### 1. Resumen y Propósito

La página `donar.astro` (`/donar`) está diseñada para informar a los visitantes sobre cómo pueden apoyar económicamente a la fundación NAU. Presenta los diferentes métodos de donación disponibles y un mensaje de agradecimiento, con el objetivo de facilitar y motivar las contribuciones.

#### 2. Flujo de Datos (Build Time)

*   **Contenido Estático (Hardcodeado):** Al igual que la página "Sobre NAU", esta página no se conecta a Sanity. Todo el contenido, incluyendo los detalles de la cuenta bancaria y los enlaces de donación, está escrito directamente en el archivo `.astro`.
*   **Imágenes Locales Optimizadas:** Las imágenes se importan desde `src/assets/images/` y son procesadas y optimizadas por Astro durante el proceso de construcción.
*   **Construcción Final:** Astro renderiza el HTML de la página, generando un único archivo `donar.html` en la carpeta `dist/`.

#### 3. Construcción de la Interfaz (Componentes Utilizados)

*   **`MainLayout.astro`**: Proporciona la estructura HTML base, `Header` y `Footer`.
*   **`HeroBanner.astro`** (usado 2 veces): Muestra los banners de la página con imágenes locales importadas.
*   **`SplitSection.astro`**: Utilizado para la sección final de agradecimiento, dividiendo el contenido en dos columnas.
*   **`DonationCard.astro`**: Un componente específico para esta página que muestra las opciones de donación en tarjetas. El contenido de estas tarjetas (textos, enlaces, detalles bancarios) se pasa a través de `slots` y está hardcodeado en `donar.astro`.
*   **`Image`** (de `astro:assets`): Renderiza las imágenes locales optimizadas.

#### 4. Flujo de Runtime (Navegador del Usuario)

*   **Carga:** El usuario recibe un archivo HTML 100% estático.
*   **Interactividad:** La interactividad se limita a los hipervínculos (`<a>`):
    *   El botón "Dona online" (que actualmente enlaza a `/donar`, un placeholder).
    *   El botón "Contáctanos" que lleva a la página de contacto.

#### 5. Oportunidad de Mejora (Migración a Sanity)

Esta página es otro candidato ideal para ser gestionada desde Sanity.
*   **Flexibilidad en Métodos de Pago:** Podrías crear un "Tipo de Documento" en Sanity llamado "Pagina Donar" y dentro de él, un campo de tipo `array` para los "Métodos de Donación". Esto te permitiría añadir, eliminar o modificar métodos de pago (ej. añadir PayPal, cambiar un número de cuenta) desde el CMS sin tocar el código.
*   **Actualización de Contenido:** Los textos de introducción y agradecimiento también podrían ser campos en Sanity para facilitar su edición.
