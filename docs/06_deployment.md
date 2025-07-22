# 6. Despliegue y CI/CD

Este documento describe el proceso de Integración Continua y Despliegue Continuo (CI/CD) del proyecto NAU, que está completamente automatizado a través de Netlify.

## 1. Visión General de la Arquitectura de Despliegue

El proyecto NAU consta de dos aplicaciones distintas que se despliegan de forma independiente en Netlify:

1.  **Sitio Frontend (Astro):** El sitio web público que los usuarios visitan. Se encuentra en el directorio `nau-astro-site/`.
2.  **Backend Studio (Sanity):** La interfaz de administración de contenido. Se encuentra en el directorio `nau-sanity-studio/`.

Ambos están alojados en el mismo repositorio de Git, pero configurados como dos sitios separados en Netlify, cada uno apuntando a su respectivo directorio base.

## 2. Proceso de Despliegue Automatizado

El despliegue se activa automáticamente cada vez que se realiza un `git push` a la rama principal (`main`) del repositorio en GitHub.

El flujo es el siguiente:

1.  **Push a GitHub:** Un desarrollador empuja nuevos cambios a la rama `main`.
2.  **Webhook a Netlify:** GitHub notifica a Netlify sobre los nuevos cambios.
3.  **Inicio del Build:** Netlify identifica qué sitio ha cambiado (el frontend, el backend, o ambos) y comienza el proceso de construcción para cada uno.
 4.  **Construcción y Despliegue:** Netlify ejecuta los comandos de construcción definidos para cada sitio y, si tienen éxito, despliega la nueva versión.

## 3. Configuración del Frontend (Astro) en Netlify

La configuración del sitio de Astro en la UI de Netlify debe especificar `nau-astro-site/` como el **Directorio Base**. El archivo `netlify.toml` dentro de ese directorio se encargará del resto.

### `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NPM_FLAGS = "--legacy-peer-deps"

[images]
  remote_images = ["^https://cdn\\.sanity\\.io/.*"]
```

-   **`[build]`**: Esta sección le dice a Netlify cómo construir el sitio.
    -   `command = "npm run build"`: El comando para compilar el sitio de Astro.
    -   `publish = "dist"`: El directorio que contiene los archivos del sitio final que Netlify debe servir.
-   **`[build.environment]`**: Aquí se definen variables de entorno específicas para el proceso de construcción.
    -   `NPM_FLAGS = "--legacy-peer-deps"`: Un flag para asegurar la compatibilidad entre las dependencias de npm durante la instalación.
-   **`[images]`**: Configura el CDN de imágenes de Netlify para permitir la optimización de imágenes remotas desde Sanity.

### Variables de Entorno

Las credenciales sensibles (como los tokens de API) se configuran de forma segura en la interfaz de Netlify, bajo `Site settings > Build & deploy > Environment`.

## 4. Configuración del Backend (Sanity Studio) en Netlify

El Sanity Studio es una aplicación de React y su despliegue también está automatizado en un sitio separado de Netlify.

-   **Directorio Base:** `nau-sanity-studio/`
-   **Comando de Construcción:** `npm run build` (o `sanity build`)
-   **Directorio de Publicación:** `dist/` (relativo al directorio base)

Netlify compila el estudio y lo despliega como una aplicación web estática, que se conecta al "Content Lake" de Sanity.

## 5. Despliegues de Previsualización (Deploy Previews)

Una de las características más potentes de Netlify es la capacidad de generar despliegues de previsualización. Cada vez que se abre un Pull Request (PR) en GitHub, Netlify automáticamente construye y despliega una versión del sitio con los cambios de ese PR en una URL única.

Esto permite al equipo revisar los cambios en un entorno de producción simulado antes de fusionarlos a la rama principal, facilitando la detección de errores y asegurando la calidad.
