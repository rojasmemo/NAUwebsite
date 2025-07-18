### Documentación de Archivos Clave de Arquitectura

Este documento detalla los archivos que son fundamentales para la estructura, diseño, lógica y despliegue del sitio web NAU. Estos archivos, aunque no son páginas visibles, actúan como el sistema nervioso central del proyecto.

---

### 1. Estilos y Diseño Global

#### `src/styles/global.css`
*   **Importancia:** Es la base de todo el diseño visual del sitio. Define los estilos fundamentales que se aplican globalmente.
*   **Contenido Clave:**
    *   `@import` para las fuentes tipográficas (Poppins).
    *   Directivas `@tailwind base;`, `@tailwind components;` y `@tailwind utilities;` que instruyen a Astro para inyectar los estilos de Tailwind CSS.
    *   Estilos base para la etiqueta `<body>`, definiendo el color de fondo por defecto, suavizado de fuentes, etc.

#### `tailwind.config.mjs`
*   **Importancia:** Es el **corazón del sistema de diseño**. Aquí se personaliza y extiende Tailwind para que coincida con la identidad de marca de NAU.
*   **Contenido Clave:**
    *   `theme.extend`: La sección más importante, donde se define la paleta de colores personalizada del sitio (ej. `custom-dark-teal`, `custom-specific-blue`), las fuentes (`fontFamily`) y cualquier otra variable de diseño. Cambiar un valor aquí se refleja en todo el sitio.
    *   `plugins`: Lista de plugins de Tailwind que se puedan estar utilizando (ej. `@tailwindcss/typography` para la clase `prose`).

---

### 2. Estructura y Plantillas Base

#### `src/layouts/MainLayout.astro`
*   **Importancia:** Es el **esqueleto de cada página del sitio**. Define la estructura HTML común (`<html>`, `<head>`, `<body>`) y componentes que se repiten en todas las páginas, como el `Header` y el `Footer`.
*   **Contenido Clave:**
    *   La estructura HTML principal.
    *   La importación y uso de los componentes `Header.astro` y `Footer.astro`.
    *   Un `<slot />` que actúa como marcador de posición donde Astro inyecta el contenido de cada página individual (`index.astro`, `contacto.astro`, etc.).

---

### 3. Lógica Central y Conexiones

#### `src/lib/sanity/queries.js`
*   **Importancia:** Centraliza **toda la comunicación con el CMS**. Desacopla la lógica de obtención de datos de las páginas, haciendo el código más limpio y fácil de mantener.
*   **Contenido Clave:**
    *   Una serie de constantes de JavaScript exportadas. Cada constante es un string que contiene una consulta en lenguaje GROQ, lista para ser usada por el cliente de Sanity.

#### `src/pages/api/enviar-formulario.js`
*   **Importancia:** Es la **única pieza de backend del sitio** (una función sin servidor o Serverless Function). Maneja la lógica crítica y segura para procesar el formulario de contacto.
*   **Contenido Clave:**
    *   Lógica de `nodemailer` para construir y enviar el correo electrónico.
    *   Función para validar el token de reCAPTCHA con la API de Google, protegiendo el formulario de spam.
    *   El manejador de la petición `POST` que recibe los datos del formulario, los valida y orquesta el proceso.

---

### 4. Configuración del Proyecto y Entorno

#### `astro.config.mjs`
*   **Importancia:** Es el archivo de configuración principal de Astro. Define qué integraciones y adaptadores utiliza el proyecto.
*   **Contenido Clave:**
    *   La llamada a `defineConfig`.
    *   El array `integrations`, que lista las integraciones clave como `@astrojs/tailwind`, `@astrojs/sanity` y el adaptador de despliegue (`@astrojs/netlify`).

#### `package.json`
*   **Importancia:** Es el manifiesto del proyecto. Define las dependencias y los scripts necesarios para trabajar con él.
*   **Contenido Clave:**
    *   `dependencies` y `devDependencies`: La lista de todos los paquetes de Node.js que el proyecto necesita.
    *   `scripts`: Comandos de atajo para ejecutar tareas comunes, como `npm run dev` (iniciar el servidor de desarrollo), `npm run build` (construir el sitio para producción) y `npm run preview` (ver el sitio construido localmente).

#### `netlify.toml`
*   **Importancia:** Define la configuración de despliegue para Netlify, asegurando que los builds sean consistentes y reproducibles.
*   **Contenido Clave:**
    *   `[build]`: Especifica el comando que Netlify debe ejecutar (`command = "npm run build"`) y el directorio que debe publicar (`publish = "dist/"`).

#### `.env`
*   **Importancia:** Contiene los **secretos** y variables de entorno del proyecto. Es un archivo local y **nunca debe ser versionado en Git** por razones de seguridad.
*   **Contenido Clave:**
    *   `EMAIL_USER` y `EMAIL_PASS`: Credenciales para el envío de correos.
    *   `RECAPTCHA_SECRET_KEY`: La clave secreta para la validación de reCAPTCHA.
    *   Credenciales y tokens de la API de Sanity.
