
# Documentación del Componente: FeatureCard.astro

## Descripción General

`FeatureCard.astro` es un componente de tarjeta diseñado para resaltar características, servicios o secciones importantes. Presenta un icono centrado en el borde superior, un título, contenido descriptivo a través de un `slot`, y un botón de llamado a la acción (CTA) opcional.

La característica más importante de este componente es su capacidad para renderizar tanto imágenes locales (gestionadas en el proyecto de Astro) como imágenes remotas (gestionadas en Sanity.io) para el icono.

## Ubicación del Archivo

`src/components/FeatureCard.astro`

## Props

El componente define la siguiente interfaz de `Props`:

```typescript
import type { Image as SanityImageType } from 'sanity';
import type { ImageMetadata } from "astro";

interface Props {
  icon: SanityImageType | ImageMetadata;
  iconAlt?: string;
  title: string;
  link?: string;
  linkText?: string;
}
```

- **`icon` (requerido)**: Un objeto que puede ser de dos tipos:
    - `SanityImageType`: Corresponde a la estructura de datos de una imagen de Sanity.io.
    - `ImageMetadata`: Corresponde a una imagen local importada en Astro.
- **`iconAlt` (opcional)**: Texto alternativo para el icono. Por defecto es `"Icono decorativo"`.
- **`title` (requerido)**: El título principal que se muestra en la tarjeta.
- **`link` (opcional)**: La URL a la que debe dirigir el botón. Si no se proporciona, el botón se renderiza en un estado "deshabilitado".
- **`linkText` (opcional)**: El texto que se muestra en el botón. Por defecto es `"Conoce más"`.

## Estructura y Funcionalidad

### Lógica de Renderizado del Icono

El componente utiliza una variable `isLocalImage` para determinar si el `icon` proporcionado es una imagen local o de Sanity. Esta comprobación se realiza verificando la existencia de la propiedad `src` en el objeto `icon`.

- Si `isLocalImage` es `true`, se utiliza el componente `Image` de `astro:assets` para renderizar la imagen local.
- Si `isLocalImage` es `false`, se utiliza el componente `SanityImage.astro` para renderizar la imagen desde Sanity.

### Layout y Estructura HTML

- **Contenedor Principal**: Un `div` relativo que sirve como base de la tarjeta.
- **Icono**: Posicionado de forma absoluta en el centro del borde superior.
- **Título**: Un `<h3>` para mostrar el título.
- **Contenido (`<slot/>`)**: Permite insertar contenido HTML dentro de la tarjeta.
- **Botón CTA**: 
  - Si se proporciona `link`, se renderiza como un enlace `<a>`.
  - Si no, se renderiza como un `<span>` no interactivo.

## Dependencias

- **`SanityImage.astro`**: Para renderizar imágenes desde Sanity.
- **`astro:assets`**: Para renderizar imágenes locales.

## Uso

### Con Imagen de Sanity

```astro
---
import FeatureCard from '../components/FeatureCard.astro';
import { getHomePageData } from '../lib/sanity/queries';

const homeData = await getHomePageData();
const feature = homeData.features[0];
---
<FeatureCard
  title={feature.title}
  icon={feature.icon} 
  link={feature.link}
>
  <p>{feature.description}</p>
</FeatureCard>
```

### Con Imagen Local

```astro
---
import FeatureCard from '../components/FeatureCard.astro';
import localIcon from '../assets/images/my-icon.png';
---
<FeatureCard
  title="Mi Característica"
  icon={localIcon}
  link="/mi-pagina"
>
  <p>Descripción de mi característica.</p>
</FeatureCard>
```
