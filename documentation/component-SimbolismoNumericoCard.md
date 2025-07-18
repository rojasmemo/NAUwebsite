
# Documentación del Componente: SimbolismoNumericoCard.astro

## Descripción General

`SimbolismoNumericoCard.astro` es un componente de tarjeta especializado, diseñado para mostrar información sobre temas de "simbolismo numérico". Su diseño es muy similar al de `EncuentroCard`, pero incluye una funcionalidad de acordeón para mostrar y ocultar una descripción detallada, lo que permite presentar una gran cantidad de texto de manera compacta.

## Ubicación del Archivo

`src/components/SimbolismoNumericoCard.astro`

## Props

El componente define la siguiente interfaz de `Props`:

```typescript
interface Props {
  image?: ImageMetadata | string; // Imagen local o URL remota.
  imageAlt?: string;              // Texto alternativo para la imagen.
  icon: ImageMetadata;             // Icono (requerido, solo local).
  iconAlt?: string;               // Texto alternativo para el icono.
  title: string;                   // Título de la tarjeta (requerido).
  description: any[];              // Contenido de Portable Text para el acordeón (requerido).
  width?: number;                 // Requerido para imágenes remotas.
  height?: number;                // Requerido para imágenes remotas.
}
```

- **`image` (opcional)**: `ImageMetadata` (local) o `string` (URL remota) para la imagen de cabecera.
- **`imageAlt` (opcional)**: Texto alternativo para la imagen. Usa `title` como fallback.
- **`icon` (requerido)**: `ImageMetadata` para el icono superpuesto.
- **`iconAlt` (opcional)**: Texto alternativo para el icono. Por defecto: `"Icono representativo de NAU"`.
- **`title` (requerido)**: El título de la tarjeta.
- **`description` (requerido)**: Un array que representa contenido de tipo "Portable Text" de Sanity. Este contenido se renderizará dentro del acordeón.
- **`width` y `height` (opcionales)**: Requeridos si `image` es una URL remota.

## Estructura y Funcionalidad

### Layout y Estructura HTML

La estructura es casi idéntica a `EncuentroCard`, con la adición clave del acordeón:

- **Contenedor e Imagen**: Un `div` flexible con una `<Picture>` para la imagen de cabecera y una `<Image>` para el icono superpuesto.
- **Contenido Textual**: Un `div` inferior con fondo que contiene:
  - Título `<h3>` y separador `<hr>`.
  - **Acordeón (`.accordion-item`)**: 
    - **Botón (`.accordion-toggle`)**: Un `<button>` que ocupa todo el ancho y contiene el texto "Ver descripción" junto con los iconos de "más" y "menos".
    - **Contenido (`.accordion-content`)**: Un `div` inicialmente oculto (`hidden`) que contiene el componente `<PortableText>`. Este `div` se muestra u oculta con JavaScript.

### Acordeón y Portable Text

- **Funcionalidad del Acordeón**: Un script en el lado del cliente maneja la lógica para mostrar/ocultar el contenido. Al hacer clic en el botón, alterna la clase `hidden` en el `div` de contenido y en los iconos de más/menos.
- **Renderizado de Contenido Enriquecido**: Utiliza el componente `<PortableText>` de `astro-portabletext` para renderizar el contenido de `description`. Esto permite mostrar texto con formato (negritas, listas, etc.) tal como fue editado en Sanity.

### Estilos (CSS)

- Basado en Tailwind CSS.
- El `div` que envuelve al `<PortableText>` tiene la clase `prose`, que aplica estilos tipográficos por defecto para mejorar la legibilidad del contenido enriquecido.

### Comportamiento (JavaScript)

- Un script (`<script>`) se encarga de la funcionalidad del acordeón.
- Selecciona todos los botones de acordeón (`.accordion-toggle`) de la página.
- Añade un `event listener` de `click` a cada botón.
- La función del listener encuentra el panel de contenido (`nextElementSibling`) y los iconos (`.accordion-icon-plus`, `.accordion-icon-minus`) y alterna sus clases `hidden` para crear el efecto de despliegue.

## Dependencias

- **`astro:assets`**: Para `Picture`, `Image` y `ImageMetadata`.
- **`astro-portabletext`**: Para renderizar el contenido de Sanity.
- **Componentes de Iconos**: `IconPlus.astro` y `IconMinus.astro`.

## Uso

Este componente es perfecto para mostrar elementos que tienen una breve introducción (el título) y un cuerpo de texto extenso que el usuario puede elegir explorar.

```astro
---
import SimbolismoNumericoCard from '../components/SimbolismoNumericoCard.astro';
import { getSimbolismoData } from '../lib/sanity/queries';
import miIcono from '../assets/images/icono.svg';

const simbolismoItem = await getSimbolismoData('algun-slug');
---
<SimbolismoNumericoCard
  title={simbolismoItem.title}
  image={simbolismoItem.mainImage} // Puede ser local o remoto
  icon={miIcono}
  description={simbolismoItem.body} // Array de Portable Text de Sanity
  width={850} // Si la imagen es remota
  height={400} // Si la imagen es remota
/>
```
