
# Documentación del Componente: EncuentroCard.astro

## Descripción General

`EncuentroCard.astro` es un componente de tarjeta diseñado para mostrar información sobre "encuentros" o eventos. La tarjeta es visualmente rica, combinando una imagen de cabecera, un icono superpuesto, un título y contenido descriptivo. Está estructurada para ser flexible y responsiva, adaptándose a diferentes tamaños de pantalla.

## Ubicación del Archivo

`src/components/EncuentroCard.astro`

## Props

El componente define la siguiente interfaz de `Props`:

```typescript
interface Props {
  image?: ImageMetadata | string; // Imagen local o URL remota.
  imageAlt?: string;              // Texto alternativo para la imagen.
  icon: ImageMetadata;             // Icono (requerido, solo local).
  iconAlt?: string;               // Texto alternativo para el icono.
  title: string;                   // Título de la tarjeta (requerido).
  width?: number;                 // Requerido para imágenes remotas.
  height?: number;                // Requerido para imágenes remotas.
}
```

- **`image` (opcional)**: Puede ser un objeto `ImageMetadata` (para imágenes locales optimizadas por Astro) o una `string` (para URLs de imágenes remotas). Si no se proporciona, no se renderiza ninguna imagen de cabecera.
- **`imageAlt` (opcional)**: Texto alternativo para la imagen principal. Si no se define, se utiliza el `title` de la tarjeta como fallback.
- **`icon` (requerido)**: Un objeto `ImageMetadata` para el icono. Debe ser una imagen local importada.
- **`iconAlt` (opcional)**: Texto alternativo para el icono. Por defecto es `"Icono representativo de NAU"`.
- **`title` (requerido)**: El título principal de la tarjeta.
- **`width` y `height` (opcionales)**: Dimensiones de la imagen. Son **requeridos** si la `image` es una URL remota para que Astro pueda generar el marcado de `Picture` correctamente.

## Estructura y Funcionalidad

### Layout y Estructura HTML

- **Contenedor Principal**: Un `div` con `flex flex-col` que asegura que la tarjeta ocupe toda la altura disponible (`h-full`) y que el contenido textual se expanda para rellenar el espacio (`flex-grow`).
- **Imagen de Cabecera**: Utiliza el componente `<Picture>` de `astro:assets` para una optimización de imagen avanzada. Renderiza la imagen en múltiples tamaños (`widths`) y formatos (`avif`, `webp`), permitiendo al navegador elegir la más adecuada. El atributo `sizes` está configurado para un rendimiento óptimo en dispositivos móviles y de escritorio.
- **Icono Superpuesto**: Un componente `<Image>` de Astro se posiciona de forma absoluta en la esquina superior derecha de la tarjeta, con un desplazamiento que lo coloca parcialmente fuera del borde (`-translate-y-1/2`). El `z-index` (`z-10`) asegura que esté por encima de la imagen de cabecera.
- **Contenido Textual**: Un `div` inferior con fondo (`bg-custom-frosty-teal`) y padding contiene:
  - Un título `<h3>`.
  - Un separador visual `<hr>`.
  - Un `<slot />` anónimo para insertar contenido descriptivo personalizado desde el componente padre.

### Estilos (CSS)

- Totalmente basado en Tailwind CSS para un diseño responsivo y consistente.
- El uso de `flex-grow` en el contenedor del texto es clave para que todas las tarjetas en una misma fila tengan la misma altura, independientemente de la cantidad de contenido.

### Optimización de Imágenes

- **Imagen Principal**: Aprovecha `<Picture>` para servir imágenes responsivas y en formatos modernos, mejorando drásticamente los tiempos de carga.
- **Icono**: Usa `<Image>` con `loading="lazy"` para diferir la carga de iconos que no son visibles inicialmente.

## Dependencias

- **`astro:assets`**: Depende de `Picture`, `Image` y `ImageMetadata` para la gestión de imágenes.

## Uso

Este componente es ideal para listar eventos, talleres o cualquier tipo de contenido que se beneficie de una presentación en formato de tarjeta con imagen.

### Ejemplo con imagen local:

```astro
---
import EncuentroCard from '../components/EncuentroCard.astro';
import miImagen from '../assets/images/encuentro.jpg';
import miIcono from '../assets/images/icono.svg';
---
<EncuentroCard
  title="Título del Encuentro"
  image={miImagen}
  icon={miIcono}
>
  <p>Descripción detallada del encuentro que va aquí.</p>
</EncuentroCard>
```

### Ejemplo con imagen remota:

```astro
---
import EncuentroCard from '../components/EncuentroCard.astro';
import miIcono from '../assets/images/icono.svg';
const remoteImageUrl = "https://servidor.com/imagen.jpg";
---
<EncuentroCard
  title="Encuentro con Imagen Remota"
  image={remoteImageUrl}
  width={850}  // Requerido
  height={400} // Requerido
  icon={miIcono}
>
  <p>Descripción del encuentro.</p>
</EncuentroCard>
```
