
# Documentación del Componente: DonationCard.astro

## Descripción General

El componente `DonationCard.astro` es una tarjeta de contenido reutilizable, diseñada para mostrar información de manera destacada. Su característica principal es un icono que se posiciona en el borde superior de la tarjeta, creando un efecto visual distintivo. Es ideal para secciones que necesitan resaltar pequeñas piezas de información o llamados a la acción.

## Ubicación del Archivo

`src/components/DonationCard.astro`

## Props

El componente define la siguiente interfaz de `Props`:

```typescript
interface Props {
  icon: ImageMetadata; // Objeto de metadatos de una imagen local procesada por Astro.
  iconAlt?: string;    // Texto alternativo para el icono.
}
```

- **`icon` (requerido)**: Un objeto `ImageMetadata` importado desde una imagen local (ej: `import myIcon from '../assets/icon.png'`). Este objeto es generado automáticamente por Astro y contiene toda la información necesaria para que el componente `<Image>` renderice la imagen de forma optimizada.

- **`iconAlt` (opcional)**: Una cadena de texto que sirve como `alt` para la imagen del icono. Si no se proporciona, se utiliza el valor por defecto: `"Icono representativo de NAU"`.

## Estructura y Funcionalidad

### Layout y Estructura HTML

- El componente consiste en un `<div>` principal que actúa como contenedor de la tarjeta. Este `div` tiene estilos de fondo, padding, bordes redondeados y sombra (`bg-white`, `p-6`, `rounded-lg`, `shadow-md`).
- **Icono**: Utiliza el componente `<Image>` de `astro:assets` para renderizar el icono. El icono se posiciona de forma absoluta en el centro del borde superior de la tarjeta (`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2`), lo que hace que la mitad del icono quede fuera de la tarjeta.
- **Contenido (`<slot/>`)**: El componente utiliza un `<slot />` anónimo para permitir que cualquier contenido HTML se pueda insertar dentro de la tarjeta desde el componente padre. Esto le da una gran flexibilidad.

### Estilos (CSS)

- Utiliza clases de Tailwind CSS para un diseño responsivo y moderno.
- El posicionamiento del icono es clave en este componente, utilizando una combinación de `absolute`, `top-0`, `left-1/2`, y transformaciones (`-translate-x-1/2`, `-translate-y-1/2`) para centrarlo perfectamente.

### Optimización de Imágenes

- Al usar el componente `<Image>` de `astro:assets`, el icono se beneficia de la optimización automática de Astro (lazy loading, formatos modernos, etc.). El atributo `loading="lazy"` se añade para mejorar el rendimiento de carga de la página.

## Dependencias

- **`astro:assets`**: Depende de los componentes `Image` y el tipo `ImageMetadata` para la gestión de imágenes locales.

## Uso

Este componente está diseñado para ser utilizado en páginas donde se necesite mostrar información en tarjetas con un icono destacado. Se debe importar el componente y el icono que se desea usar.

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
import DonationCard from '../components/DonationCard.astro';
import miIcono from '../assets/images/mi-icono.svg'; // Importar el icono
---
<MainLayout title="Donaciones">
  <DonationCard icon={miIcono} iconAlt="Icono de donación">
    <h3 class="text-xl font-bold">Título de la tarjeta</h3>
    <p>Este es el contenido que se insertará dentro de la tarjeta.</p>
    <a href="/donar" class="btn">Donar ahora</a>
  </DonationCard>
</MainLayout>
```
