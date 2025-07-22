# 4. Backend y Gestión de Contenido (Sanity)

Este documento es la referencia central para entender la estructura de contenido del proyecto NAU, gestionada a través de Sanity.io. Está dirigido tanto a desarrolladores que necesitan consumir los datos como a editores que trabajan en el Sanity Studio.

## 1. Introducción a Sanity en NAU

Sanity es nuestro CMS headless. Esto significa que gestiona el contenido de forma estructurada en un solo lugar (el "Content Lake") y lo expone a través de una API. Nuestro sitio web de Astro consume esta API para construir las páginas.

El `nau-sanity-studio/` es una aplicación de React que proporciona la interfaz de usuario para administrar el contenido. Su configuración y los modelos de datos se definen como código en la carpeta `schemas/`.

## 2. Esquemas de Contenido (Content Schemas)

Los esquemas son la definición de nuestros modelos de datos. Cada archivo `.js` en `nau-sanity-studio/schemas/` define un tipo de documento o un tipo de objeto reutilizable.

A continuación se detallan los esquemas principales:

### 2.1. `homePage.js` - Página de Inicio

Este es un esquema de tipo "documento" y está configurado para que solo exista una única instancia de él. Define toda la estructura de contenido editable para la página de inicio del sitio web.

-   **Propósito:** Ensamblar los diferentes componentes visuales y el contenido SEO de la página principal.
-   **Ubicación en el Studio:** Se encuentra en el panel principal bajo el nombre "Página de Inicio".

#### Campos del Documento:

| Campo en Studio | Nombre Técnico | Tipo | Descripción |
| :--- | :--- | :--- | :--- |
| **Título (para SEO)** | `title` | `string` | El título que aparecerá en las pestañas del navegador y en los resultados de búsqueda (etiqueta `<title>`). Es obligatorio. |
| **Descripción (para SEO)** | `seoDescription` | `text` | La descripción que usarán los motores de búsqueda (etiqueta `<meta name="description">`). Es obligatoria. |
| **Hero Banner 1 (Superior)** | `hero1` | `object` | Define el contenido del banner principal en la parte superior de la página. Contiene campos para encabezados, un botón (tipo `link`) y una imagen de fondo. |
| **Sección Dividida 1** | `splitSection1` | `object` | Una sección con texto a un lado y una imagen al otro. Incluye encabezados y párrafos. |
| **Hero Banner 2 (Intermedio)** | `hero2` | `object` | Un segundo banner con una estructura similar al primero, usado en la parte media de la página. |
| **Sección de Características** | `featureSection` | `object` | Una sección para destacar hasta dos características principales. Cada una tiene un título, un icono, una lista de puntos y un enlace. |
| **Sección Dividida 2** | `splitSection2` | `object` | Una segunda sección dividida, similar a la primera. |
| **Hero Banner 3 (Final)** | `hero3` | `object` | El banner final de la página, usualmente un llamado a la acción (CTA) fuerte. |

### 2.2. `encuentro.js` - Encuentros

Este esquema de tipo "documento" se utiliza para crear y gestionar los diferentes "Encuentros" que ofrece NAU. Cada encuentro es una entrada individual que puede tener su propia página o ser listada en la sección de encuentros.

-   **Propósito:** Definir los atributos de un encuentro, como su título, contenido, imagen y fecha.
-   **Ubicación en el Studio:** Se gestionan en el panel principal, bajo el tipo de contenido "Encuentro".

#### Campos del Documento:

| Campo en Studio | Nombre Técnico | Tipo | Descripción |
| :--- | :--- | :--- | :--- |
| **Título** | `title` | `string` | El nombre del encuentro. Es obligatorio y se usa como base para el slug. |
| **Slug** | `slug` | `slug` | La URL única para la página de este encuentro (ej: `/encuentros/mi-encuentro`). Se genera automáticamente a partir del título. Es obligatorio. |
| **Orden** | `order` | `number` | Un número para definir el orden en que aparecen los encuentros en las listas. Es obligatorio. |
| **Imagen Principal** | `mainImage` | `image` | La imagen destacada que representa al encuentro. Es obligatoria. |
| **Descripción Corta** | `description` | `text` | Un texto breve que resume el encuentro, ideal para usar en tarjetas o vistas previas. |
| **Contenido Principal** | `body` | `array` de `block` | El cuerpo del contenido detallado del encuentro. Utiliza un editor de texto enriquecido. Es obligatorio. |
| **Precio** | `price` | `number` | El costo del encuentro. Opcional. |
| **Fecha del Encuentro** | `date` | `datetime` | La fecha y hora en que se realizará el encuentro. Opcional. |

### 2.3. `simbolismoNumerico.js` - Simbolismo Numérico

Este esquema de tipo "documento" define las entradas para la sección de "Simbolismo Numérico". Cada documento representa un servicio o un tema específico dentro de esta categoría.

-   **Propósito:** Estructurar el contenido de los servicios de simbolismo numérico, incluyendo su descripción, imagen y precio.
-   **Ubicación en el Studio:** Se gestionan en el panel principal, bajo el tipo de contenido "Simbolismo Numérico".

#### Campos del Documento:

| Campo en Studio | Nombre Técnico | Tipo | Descripción |
| :--- | :--- | :--- | :--- |
| **Título** | `title` | `string` | El nombre del servicio o tema. Es obligatorio. |
| **Slug** | `slug` | `slug` | La URL única para la página de este servicio. Se genera automáticamente a partir del título. Es obligatorio. |
| **Orden** | `order` | `number` | Un número para definir el orden en que aparecen los servicios en las listas. Es obligatorio. |
| **Imagen Principal** | `mainImage` | `image` | La imagen destacada que representa al servicio. Es obligatoria. |
| **Descripción Corta** | `description` | `text` | Un texto breve que resume el servicio, ideal para usar en tarjetas o vistas previas. |
| **Contenido Principal** | `body` | `array` de `block` | El cuerpo del contenido detallado del servicio. Utiliza un editor de texto enriquecido. Es obligatorio. |
| **Precio** | `price` | `number` | El costo del servicio. Opcional. |

## 3. Esquemas de Objetos Reutilizables

Estos esquemas no son documentos completos, sino tipos de objetos que se pueden reutilizar dentro de otros documentos.

### 3.1. `link.js` - Enlace

Este es un tipo `object` que define un enlace o botón de llamado a la acción (CTA).

| Campo en Studio | Nombre Técnico | Tipo | Descripción |
| :--- | :--- | :--- | :--- |
| **Texto del Botón** | `title` | `string` | El texto que se mostrará en el botón o enlace (ej. "Conoce más"). |
| **URL Externa** | `externalUrl` | `url` | Usar para enlazar a un sitio web externo (ej. `https://google.com`). |
| **Enlace Interno** | `internalLink` | `reference` | Usar para enlazar a otra página dentro del sitio. Se debe seleccionar un documento existente (ej. una página de Encuentros). |

### 3.2. `banner.js` - Banner

Este es un tipo `object` que define un banner genérico con una imagen de fondo y contenido superpuesto.

| Campo en Studio | Nombre Técnico | Tipo | Descripción |
| :--- | :--- | :--- | :--- |
| **Encabezado** | `heading` | `string` | El texto principal del banner. |
| **Sub-encabezado** | `subheading` | `string` | Un texto secundario o complementario. |
| **Botón** | `button` | `link` | Un llamado a la acción (CTA) que utiliza el objeto de tipo `link`. |
| **Imagen de Fondo** | `backgroundImage` | `image` | La imagen que se mostrará de fondo en el banner. |

## 4. Esquemas de Páginas

Estos esquemas de tipo "documento" definen el contenido editable para páginas específicas del sitio. Generalmente están configurados como "singletons" para que solo exista una instancia de cada uno.

### 4.1. `paginaContacto.js` - Página de Contacto
- **Campos:** `title` (SEO), `seoDescription`, `initialBanner` (tipo `banner`), `finalBanner` (tipo `banner`).

### 4.2. `paginaDonar.js` - Página de Donar
- **Campos:** `title` (SEO), `seoDescription`, `initialBanner` (tipo `banner`), `donationOptions` (un array de objetos con `amount` y `description`), `finalBanner` (tipo `banner`).

### 4.3. `paginaEncuentros.js` - Página de Encuentros
- **Campos:** `title` (SEO), `seoDescription`, `initialBanner` (tipo `banner`), `finalBanner` (tipo `banner`).

### 4.4. `paginaSimbolismoNumerico.js` - Página de Simbolismo Numérico
- **Campos:** `title` (SEO), `seoDescription`, `initialBanner` (tipo `banner`), `finalBanner` (tipo `banner`).

## 5. Registro de Esquemas (`index.js`)

El archivo `schemas/index.js` es el punto de entrada que agrupa y exporta todos los esquemas definidos. Sanity Studio utiliza este archivo para registrar todos los tipos de contenido y sus correspondientes esquemas, haciendo que aparezcan en el panel de administración.

```javascript
import homePage from './homePage'
import encuentro from './encuentro'
import paginaEncuentros from './paginaEncuentros'
import banner from './banner'
import paginaContacto from './paginaContacto'
import link from './link'
import simbolismoNumerico from './simbolismoNumerico'
import paginaSimbolismoNumerico from './paginaSimbolismoNumerico'
import paginaDonar from './paginaDonar';

export const schemaTypes = [
  homePage,
  encuentro,
  paginaEncuentros,
  simbolismoNumerico,
  paginaSimbolismoNumerico,
  paginaDonar,
  paginaContacto,
  banner,
  link,
];
```

Con este archivo, la estructura de contenido de Sanity está completamente definida y registrada, permitiendo a los administradores de contenido gestionar cada sección del sitio web de manera centralizada.