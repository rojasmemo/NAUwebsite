# Proyecto Web de la Fundación NAU

Este repositorio contiene el código fuente del sitio web de la Fundación NAU, un proyecto desarrollado con un enfoque moderno para ser rápido, seguro y fácil de mantener.

## Tecnologías Utilizadas

*   **Vite:** Herramienta de frontend de última generación que proporciona un servidor de desarrollo ultrarrápido y una compilación optimizada para producción.
*   **Tailwind CSS:** Un framework CSS "utility-first" para construir diseños personalizados de forma rápida.
*   **PostCSS:** Herramienta para transformar CSS con plugins, utilizada para procesar Tailwind CSS.
*   **vite-plugin-handlebars:** Para gestionar parciales de HTML (como `_header.html` y `_footer.html`), permitiendo reutilizar código y facilitar el mantenimiento.
*   **vite-plugin-sitemap:** Genera automáticamente un `sitemap.xml` durante el proceso de build, mejorando el SEO.
*   **HTML5 Semántico:** Para una estructura clara, accesible y amigable con los motores de búsqueda.
*   **JavaScript (ESM):** Código modular y moderno para la interactividad del sitio.
*   **Netlify:** Plataforma de despliegue continuo utilizada para alojar el sitio.

## Características Principales

*   **Entorno de Desarrollo Rápido:** Gracias a Vite, los cambios en el código se reflejan instantáneamente en el navegador.
*   **Compilación Optimizada:** Vite empaqueta y optimiza los archivos (HTML, CSS, JS) para un rendimiento máximo en producción.
*   **Diseño Responsivo:** El sitio se adapta perfectamente a dispositivos móviles, tabletas y ordenadores de escritorio.
*   **Componentes Modulares:** El encabezado y el pie de página se gestionan como parciales, evitando la duplicación de código.
*   **Generación automática de Sitemap:** Se crea un `sitemap.xml` en cada build para mejorar la indexación en buscadores.
*   **Cabeceras de Seguridad:** Se implementa una Política de Seguridad de Contenidos (CSP) y otras cabeceras de seguridad a través de Netlify para proteger el sitio y a los usuarios.
*   **Código Limpio y Organizado:** Una estructura de carpetas lógica que facilita la navegación y el mantenimiento.

## Configuración para Despliegue

La configuración específica para el despliegue en Netlify se gestiona en el archivo `netlify.toml`. Este archivo define:
*   El comando de construcción (`npm run build`).
*   El directorio de publicación (`dist`).
*   Las cabeceras HTTP, incluyendo la Política de Seguridad de Contenidos (CSP).
*   Las reglas de caché para los diferentes tipos de archivos.

## Flujo de Trabajo

### 1. Requisitos Previos

*   Tener instalado Node.js (se recomienda la versión LTS).

### 2. Instalación

Clona el repositorio y, en la carpeta raíz del proyecto, instala las dependencias con npm:

```sh
npm install
```

### 3. Servidor de Desarrollo

Para iniciar el servidor de desarrollo de Vite, ejecuta:

```sh
npm run dev
```

Esto abrirá el sitio en una URL local (generalmente `http://localhost:5173`) y se recargará automáticamente cada vez que guardes un cambio.

### 4. Compilación para Producción

Para generar la versión optimizada para producción, ejecuta:

```sh
npm run build
```

Este comando creará una carpeta `dist` con todos los archivos estáticos listos para ser desplegados.

## Despliegue en Netlify

Este proyecto está configurado para un flujo de **Integración y Despliegue Continuo (CI/CD)** con Netlify:

1.  **Push a GitHub:** Cualquier `git push` a la rama principal del repositorio en GitHub activa automáticamente un nuevo despliegue en Netlify.
2.  **Build en Netlify:** Netlify ejecuta el comando `npm run build`, compilando el sitio y generando el sitemap.
3.  **Despliegue:** Netlify publica el contenido de la carpeta `dist` en el dominio configurado.
