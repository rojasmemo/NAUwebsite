# Arquitectura de Datos: Sanity y TypeScript

## Introducción

Este documento explica cómo se estructuran y se conectan los datos entre Sanity.io (nuestro CMS headless) y el frontend de Astro. La clave para entender esta arquitectura es el mapeo que ocurre a través de las consultas GROQ.

## 1. Esquemas de Sanity (`/nau-sanity-studio/schemas`)

Los esquemas definen la estructura del contenido que los editores pueden crear en Sanity Studio. Son la "fuente de la verdad" para el contenido.

### `banner.js`

- **Propósito**: Un objeto reutilizable para crear banners con imagen, texto y un botón de llamada a la acción (CTA).
- **Campos Clave**:
    - `image`: Imagen (con hotspot).
    - `alt`: Texto alternativo.
    - `heading`: Título principal.
    - `tagline`: Subtítulo.
    - `cta`: Enlace (reutiliza el esquema `link`).

### `encuentro.js`

- **Propósito**: Un tipo de documento para cada "Encuentro" que ofrece NAU.
- **Campos Clave**:
    - `title`: Título.
    - `slug`: URL amigable.
    - `order`: Número para ordenación manual.
    - `mainImage`: Imagen principal.
    - `description`: Resumen corto.
    - `body`: Contenido principal (texto enriquecido).
    - `price`: Precio.
    - `date`: Fecha del evento.

## 2. Interfaces de TypeScript (`/nau-astro-site/src/lib/sanity/types.ts`)

Las interfaces de TypeScript definen la forma de los datos que el código de Astro espera recibir. Proporcionan seguridad de tipos y autocompletado en el editor.

### `SanityImage`

- **Propósito**: Define un objeto de imagen simplificado para el frontend.
- **Propiedades**:
    - `url`: `string`
    - `width`: `number`
    - `height`: `number`
    - `alt`: `string` (opcional)

### `Cta`

- **Propósito**: Define un objeto de llamada a la acción.
- **Propiedades**:
    - `text`: `string` (opcional)
    - `externalUrl`: `string` (opcional)
    - `internalLink`: `object` (opcional) con `_type` y `slug`.

### `HomePage`, `Hero`, `SplitSection`, `FeatureSection`, `Feature`

- **Propósito**: Definen la estructura anidada de la página de inicio y sus secciones.

## 3. Mapeo con Consultas GROQ (`/nau-astro-site/src/lib/sanity/queries.js`)

Aquí es donde ocurre la "magia". Las consultas GROQ son responsables de:

1.  **Seleccionar** los documentos de Sanity (ej., `*[_type == "homePage"]`).
2.  **Proyectar** y **transformar** los campos de los esquemas de Sanity para que coincidan con las interfaces de TypeScript.

Por ejemplo, una consulta puede tomar el campo `mainImage` de un documento `encuentro` y transformarlo en un objeto que coincida con la interfaz `SanityImage` de TypeScript, seleccionando solo la URL, las dimensiones y el texto alternativo.

Esta separación nos da una gran flexibilidad. Podemos cambiar la estructura en Sanity Studio sin romper el frontend, siempre y cuando ajustemos las consultas GROQ para mantener el contrato con las interfaces de TypeScript.
