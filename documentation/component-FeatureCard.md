
# Documentación del Componente: FeatureCard.astro

## Descripción General

`FeatureCard.astro` es un componente de tarjeta diseñado para resaltar características, servicios o secciones importantes. Similar a `DonationCard`, presenta un icono centrado en el borde superior. Incluye un título, contenido descriptivo a través de un `slot`, y un botón de llamado a la acción (CTA) opcional.

## Ubicación del Archivo

`src/components/FeatureCard.astro`

## Props

El componente define la siguiente interfaz de `Props`:

```typescript
import type { SanityImage as SanityImageProps } from '../lib/sanity/types';

interface Props {
  icon: SanityImageProps; // Objeto de imagen de Sanity.
  iconAlt?: string;       // Texto alternativo para el icono.
  title: string;          // Título de la tarjeta (requerido).
  link?: string;          // URL para el botón CTA.
  linkText?: string;      // Texto para el botón CTA.
}
```

- **`icon` (requerido)**: Un objeto de tipo `SanityImageProps`, que corresponde a la estructura de datos de una imagen gestionada en Sanity.io. Este objeto es obtenido a través de la API de Sanity.
- **`iconAlt` (opcional)**: Texto alternativo para el icono. Por defecto es `"Icono decorativo"`.
- **`title` (requerido)**: El título principal que se muestra en la tarjeta.
- **`link` (opcional)**: La URL a la que debe dirigir el botón. Si no se proporciona, el botón se renderiza en un estado "deshabilitado" (visible pero no funcional).
- **`linkText` (opcional)**: El texto que se muestra en el botón. Por defecto es `"Conoce más"`.

## Estructura y Funcionalidad

### Layout y Estructura HTML

- **Contenedor Principal**: Un `div` relativo que sirve como base de la tarjeta, con estilos de fondo, padding, bordes redondeados y sombra.
- **Icono**: El icono es un componente `SanityImage`, que se encarga de renderizar la imagen proveniente de Sanity. Se posiciona de forma absoluta en el centro del borde superior, similar a `DonationCard`.
- **Título**: Un `<h3>` para mostrar el título de la característica.
- **Contenido (`<slot/>`)**: Un `slot` anónimo permite insertar cualquier contenido HTML (como párrafos de texto) dentro de la tarjeta.
- **Botón CTA**: 
  - Si se proporciona una `prop` `link`, se renderiza como una etiqueta `<a>` (un enlace funcional) estilizada como un botón.
  - Si `link` no se proporciona, se renderiza como una etiqueta `<span>` con los mismos estilos de botón pero con opacidad reducida y el cursor deshabilitado (`cursor-not-allowed`), indicando visualmente que no es interactivo.

### Estilos (CSS)

- Utiliza clases de Tailwind CSS para un diseño consistente y responsivo.
- El posicionamiento del icono se logra con `absolute`, `top-0`, `left-1/2`, y transformaciones (`-translate-x-1/2`, `-translate-y-1/2`).

### Integración con Sanity

- A diferencia de otros componentes que usan `astro:assets`, `FeatureCard` está diseñado para trabajar con imágenes gestionadas en un CMS headless (Sanity.io).
- Utiliza el componente `SanityImage.astro` para renderizar el icono. Este componente hijo se encarga de construir la URL de la imagen optimizada a partir de los datos de Sanity.

## Dependencias

- **`SanityImage.astro`**: Depende de este componente para renderizar el icono desde Sanity.
- **`../lib/sanity/types`**: Importa el tipo `SanityImage` para definir las props, asegurando la consistencia con los datos de Sanity.

## Uso

Este componente es ideal para páginas de inicio o secciones que resumen los puntos fuertes de un producto o servicio. Se debe pasar un objeto de imagen de Sanity válido a la `prop` `icon`.

```astro
---
import FeatureCard from '../components/FeatureCard.astro';
import { getHomePageData } from '../lib/sanity/queries'; // Función que obtiene datos de Sanity

const homeData = await getHomePageData();
const feature = homeData.features[0]; // Suponiendo que `features` es un array de objetos
---
<FeatureCard
  title={feature.title}
  icon={feature.icon} // feature.icon es un objeto de imagen de Sanity
  link={feature.link}
  linkText="Ver detalle"
>
  <p>{feature.description}</p>
</FeatureCard>
```
