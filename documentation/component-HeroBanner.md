
# Documentación del Componente: HeroBanner.astro

## Descripción General

`HeroBanner.astro` es un componente de banner principal, comúnmente utilizado en la parte superior de las páginas para captar la atención del usuario. Permite mostrar una imagen de fondo a pantalla completa con contenido superpuesto, como títulos o botones. Es altamente configurable en cuanto a la imagen, el color de fondo y el espaciado.

## Ubicación del Archivo

`src/components/HeroBanner.astro`

## Props

El componente define la siguiente interfaz de `Props`:

```typescript
interface Props {
  image: ImageMetadata | string; // Imagen local o URL remota.
  alt: string;                   // Texto alternativo para la imagen (requerido).
  bgColorClass: string;          // Clase de color de fondo (requerido).
  loading?: 'eager' | 'lazy';   // Estrategia de carga de la imagen.
  containerClasses?: string;    // Clases para el espaciado del contenedor.
  width?: number;                 // Requerido para imágenes remotas.
  height?: number;                // Requerido para imágenes remotas.
}
```

- **`image` (requerido)**: Un objeto `ImageMetadata` (para imágenes locales) o una `string` (para URLs remotas).
- **`alt` (requerido)**: Texto alternativo para la imagen de fondo. Es crucial para la accesibilidad.
- **`bgColorClass` (requerido)**: Una clase de Tailwind CSS para el color de fondo (ej. `bg-custom-dark-teal`). Esta clase se aplica a la imagen y actúa como un fallback visual mientras la imagen carga.
- **`loading` (opcional)**: Define la estrategia de carga. Por defecto es `'lazy'`. Para banners "hero" que están en la parte superior de la página (above the fold), se recomienda establecerlo en `'eager'` para una carga prioritaria.
- **`containerClasses` (opcional)**: Clases de Tailwind CSS para controlar el `padding` vertical del contenedor. Por defecto es `'py-12 md:py-16 lg:py-24'`.
- **`width` y `height` (opcionales)**: Dimensiones de la imagen. Son **requeridos** si la `image` es una URL remota.

## Estructura y Funcionalidad

### Layout y Estructura HTML

- **Contenedor Principal (`<section>`)**: Un elemento `<section>` con posicionamiento `relative`. Se le aplican las clases de espaciado (`containerClasses`).
- **Imagen de Fondo (`<Picture>`)**: 
  - Utiliza el componente `<Picture>` de `astro:assets` para una optimización máxima.
  - Se posiciona de forma `absolute` para cubrir todo el contenedor (`top-0`, `left-0`, `w-full`, `h-full`).
  - `object-cover` asegura que la imagen cubra el área sin distorsionarse.
  - Un `z-index` negativo (`-z-10`) la coloca detrás del contenido.
  - `sizes="100vw"` indica al navegador que la imagen ocupará todo el ancho de la ventana, permitiendo descargar el tamaño más adecuado.
- **Contenedor de Contenido**: Un `div` con `relative` y `z-10` para asegurar que el contenido del `slot` se muestre por encima de la imagen de fondo.
- **Slots**: 
  - **`slot` (anónimo)**: El `slot` principal donde se coloca el contenido del banner (títulos, párrafos, botones).
  - **`slot name="decoration"`**: Un `slot` nombrado opcional para añadir elementos decorativos adicionales, como SVGs o formas, dentro del banner.

### Estilos (CSS)

- Totalmente basado en Tailwind CSS.
- La combinación de `relative` en el contenedor principal y `absolute` en la imagen es la técnica estándar para crear fondos de imagen.

### Optimización de Imágenes

- El uso de `<Picture>` es clave para el rendimiento, ya que sirve imágenes responsivas en formatos de próxima generación (`avif`, `webp`).
- La `prop` `loading` permite controlar si la imagen debe ser parte del LCP (Largest Contentful Paint) con `eager` o si puede cargarse de forma diferida con `lazy`.

## Dependencias

- **`astro:assets`**: Depende de `Picture` y `ImageMetadata`.

## Uso

Es ideal para la sección principal de la página de inicio o como cabecera visual en otras páginas.

### Ejemplo con imagen local y carga prioritaria:

```astro
---
import HeroBanner from '../components/HeroBanner.astro';
import mainBannerImage from '../assets/images/main-banner.jpg';
---
<HeroBanner
  image={mainBannerImage}
  alt="Vista panorámica de montañas al amanecer"
  bgColorClass="bg-gray-800"
  loading="eager"  // Importante para el LCP
>
  <h1 class="text-4xl font-bold">Bienvenido a Nuestro Sitio</h1>
  <p class="mt-4">Descubre todo lo que tenemos para ofrecer.</p>
</HeroBanner>
```

### Ejemplo con `containerClasses` personalizadas:

```astro
---
import HeroBanner from '../components/HeroBanner.astro';
import contactBannerImage from '../assets/images/contact-banner.jpg';
---
<HeroBanner
  image={contactBannerImage}
  alt="Un teléfono antiguo sobre un escritorio"
  bgColorClass="bg-blue-900"
  containerClasses="py-8 md:py-12" // Menos padding vertical
>
  <h1 class="text-3xl">Contáctanos</h1>
</HeroBanner>
```
