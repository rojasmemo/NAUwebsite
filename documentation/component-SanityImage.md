
# Documentación del Componente: SanityImage.astro

## Descripción General

`SanityImage.astro` es un componente de utilidad crucial para renderizar imágenes gestionadas a través del CMS headless Sanity.io. Su función principal es tomar un objeto de imagen de Sanity y construir una URL optimizada utilizando las capacidades de transformación de imágenes de Sanity (como redimensionamiento y cambio de formato automático). Luego, renderiza una etiqueta `<img>` estándar con esta URL.

## Ubicación del Archivo

`src/components/SanityImage.astro`

## Props

El componente define la siguiente interfaz de `Props`:

```typescript
import type { Image as SanityImage } from 'sanity';

interface Props {
  image: SanityImage; // Objeto de imagen de Sanity (requerido).
  class?: string;     // Clases CSS adicionales para la imagen.
  width?: number;     // Ancho deseado para la optimización de la URL.
  noShadow?: boolean; // Opción para deshabilitar la sombra por defecto.
}
```

- **`image` (requerido)**: El objeto de datos de la imagen tal como se recibe de la API de Sanity. Si este objeto o su `asset` interno no existen, el componente no renderiza nada.
- **`class` (opcional)**: Una cadena de texto con clases de CSS adicionales que se aplicarán a la etiqueta `<img>`.
- **`width` (opcional)**: El ancho (en píxeles) al que se debe redimensionar la imagen a través de la URL de Sanity. Por defecto es `800`.
- **`noShadow` (opcional)**: Un booleano que, si es `true`, elimina la clase `shadow-lg` que se aplica por defecto.

## Estructura y Funcionalidad

### Lógica de Componente (Script de Astro)

1.  **Cliente de Sanity**: Importa el cliente de Sanity (`sanityClient`) configurado en el proyecto (a través de `sanity:client`).
2.  **Constructor de URLs**: Utiliza la biblioteca `@sanity/image-url` para crear un `builder` que puede transformar objetos de imagen de Sanity en URLs.
3.  **Función `urlForImage`**: Una función local que encapsula la lógica del `builder` para mayor claridad.
4.  **Procesamiento de Props**: Recibe el objeto `image` y otras props.
5.  **Validación**: Comprueba si `image` y `image.asset` existen. Si no, retorna `null` para evitar errores de renderizado.
6.  **Construcción de la URL**: Llama a `urlForImage(image)` y encadena métodos de optimización:
    - `.width(width)`: Pide a Sanity una versión de la imagen con el ancho especificado.
    - `.auto('format')`: Permite a Sanity entregar la imagen en el formato más óptimo que el navegador soporte (ej. WebP o AVIF).
    - `.url()`: Genera la cadena de texto de la URL final.
7.  **Metadatos**: Extrae las dimensiones originales (`width` y `height`) de los metadatos de la imagen (`image.asset.metadata.dimensions`) para usarlas en los atributos del `<img>`, lo cual ayuda a prevenir el Cumulative Layout Shift (CLS).
8.  **Clases CSS**: Construye dinámicamente la lista de clases para la imagen, incluyendo las clases base, la sombra condicional (`!noShadow`) y cualquier clase adicional pasada a través de la `prop` `class`.

### Renderizado (HTML)

- El componente renderiza una única etiqueta `<img>`.
- **`src`**: La URL optimizada generada por el `builder` de Sanity.
- **`alt`**: El texto alternativo definido en Sanity (`image.alt`), con un fallback genérico.
- **`loading="lazy"` y `decoding="async"`**: Atributos estándar para una carga de imágenes eficiente.
- **`width` y `height`**: Los atributos de las dimensiones originales para que el navegador reserve el espacio correcto.
- **`class`**: Las clases CSS calculadas en el script.

## Dependencias

- **`sanity:client`**: El cliente de Sanity configurado para el proyecto de Astro.
- **`@sanity/image-url`**: La biblioteca oficial de Sanity para la construcción de URLs de imágenes.
- **`sanity` (tipos)**: Para la definición de `SanityImage` en las `Props`.

## Uso

Este componente es un intermediario esencial siempre que se necesite mostrar una imagen proveniente de Sanity. Se utiliza dentro de otros componentes o páginas que obtienen datos de Sanity.

```astro
---
// En otro componente, por ejemplo, FeatureCard.astro
import SanityImage from './SanityImage.astro';
import type { SanityImage as SanityImageProps } from '../lib/sanity/types';

interface Props {
  icon: SanityImageProps;
}

const { icon } = Astro.props;
---
<div>
  <SanityImage 
    image={icon} 
    alt="Icono de la característica" 
    width={64} 
    noShadow={true} 
  />
</div>
```
