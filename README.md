# Proyecto Web de la Fundación NAU

Este repositorio contiene el código fuente del sitio web de la Fundación NAU, un proyecto desarrollado con un enfoque moderno para ser rápido, responsivo y fácil de mantener.

## Tecnologías Utilizadas

*   **Vite:** Herramienta de frontend de última generación que proporciona un servidor de desarrollo ultrarrápido con Hot Module Replacement (HMR) y una compilación optimizada para producción.
*   **Tailwind CSS:** Un framework CSS "utility-first" para construir diseños personalizados de forma rápida y consistente sin salir del HTML.
*   **PostCSS:** Herramienta para transformar CSS con plugins. Se utiliza aquí para procesar Tailwind CSS.
*   **HTML5 Semántico:** Para una estructura clara, accesible y amigable con los motores de búsqueda (SEO).
*   **JavaScript (ESM):** Código modular y moderno para la interactividad del sitio.

## Características Principales

*   **Entorno de Desarrollo Rápido:** Gracias a Vite, los cambios en el código se reflejan instantáneamente en el navegador.
*   **Compilación Optimizada:** Vite empaqueta y optimiza los archivos (HTML, CSS, JS) para un rendimiento máximo en producción.
*   **Diseño Responsivo:** El sitio se adapta perfectamente a dispositivos móviles, tabletas y ordenadores de escritorio.
*   **Componentes Modulares:** El encabezado y el pie de página se gestionan como parciales (`_header.html`, `_footer.html`) usando `vite-plugin-html`, lo que facilita el mantenimiento y evita la duplicación de código.
*   **Código Limpio y Organizado:** Una estructura de carpetas lógica (`partials`, `js`, `styles`) que facilita la navegación y el mantenimiento del proyecto.

## Flujo de Trabajo con Vite

Para trabajar con este proyecto, sigue estos pasos:

### 1. Requisitos Previos

*   Tener instalado Node.js (se recomienda la versión LTS).

### 2. Instalación de Dependencias

Clona el repositorio y, en la carpeta raíz del proyecto, instala todas las dependencias de desarrollo con npm:

```sh
npm install
```

### 3. Servidor de Desarrollo

Para iniciar el servidor de desarrollo de Vite, ejecuta:

```sh
npm run dev
```

Esto abrirá el sitio en una URL local (generalmente `http://localhost:5173`) y se recargará automáticamente cada vez que guardes un cambio en un archivo.

### 4. Compilación para Producción

Cuando el sitio esté listo para ser desplegado, genera la versión optimizada para producción con el siguiente comando:

```sh
npm run build
```

Este comando creará una carpeta `dist` en la raíz del proyecto. El contenido de esta carpeta es todo lo que necesitas subir a tu servidor de hosting.
