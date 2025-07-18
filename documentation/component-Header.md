
# Documentación del Componente: Header.astro

## Descripción General

`Header.astro` es el componente que renderiza la cabecera de navegación principal del sitio web. Incluye el logo, el menú de navegación y un botón de "hamburguesa" para la navegación en dispositivos móviles. El componente es responsivo y resalta el enlace de la página activa.

## Ubicación del Archivo

`src/components/Header.astro`

## Props

Este componente no acepta ninguna `prop` (`Astro.props`). Su comportamiento se basa en la URL actual y en la interacción del usuario.

## Estructura y Funcionalidad

### Layout y Estructura HTML

- **Contenedor Principal (`<header>`)**: Un elemento `<header>` con posicionamiento relativo (`relative`) y un `z-index` alto (`z-50`) para asegurar que siempre esté visible por encima de otros contenidos.
- **Contenedor Interno**: Un `div` con `max-w-[1600px]` y `mx-auto` para centrar el contenido en pantallas grandes.
- **Logo**: Un enlace (`<a>`) que envuelve al componente `<Image>` de Astro, dirigiendo siempre a la página de inicio (`/`).
- **Botón de Hamburguesa (`#hamburger-button`)**:
  - Un `<button>` que es visible solo en pantallas pequeñas (`md:hidden`).
  - Controla la visibilidad del menú de navegación móvil.
  - Utiliza atributos `aria-*` (`aria-label`, `aria-expanded`, `aria-controls`) para mejorar la accesibilidad.
- **Menú de Navegación (`#mobile-menu`)**:
  - Un elemento `<nav>` que contiene la lista de enlaces (`<ul>`).
  - **Comportamiento Responsivo Clave**: 
    - En móvil, es `hidden` por defecto y se muestra con JavaScript. Tiene posicionamiento `absolute`, `top-full`, `left-0` y `w-full` para desplegarse debajo de la cabecera, ocupando todo el ancho.
    - En escritorio (`md:`), cambia a `static` y `flex`, mostrándose como una barra de navegación horizontal.
  - **Enlaces de Navegación (`.nav-link`)**: Cada enlace (`<a>`) comprueba si su `href` corresponde a la página actual y, de ser así, se le añade el atributo `aria-current="page"` para resaltarlo (los estilos se aplican en `src/styles/global.css`).
  - **Botón "Dona ahora"**: Un enlace estilizado como botón, que es el último elemento de la navegación.

### Estilos (CSS)

- Totalmente estilizado con clases de Tailwind CSS.
- El cambio de `absolute` a `static` en el `<nav>` es fundamental para la transición entre la vista móvil y la de escritorio.
- El resaltado del enlace activo se gestiona a través del selector de atributo `[aria-current="page"]` en el archivo de estilos global.

### Comportamiento (JavaScript)

- El componente importa y ejecuta la función `initializeDirectMenu` desde `src/scripts/menu-direct.js`.
- Este script externo contiene la lógica para:
  1.  Alternar la visibilidad del menú móvil (`#mobile-menu`) cuando se hace clic en el botón de hamburguesa (`#hamburger-button`).
  2.  Actualizar los atributos `aria-expanded` para la accesibilidad.
  3.  Manejar el cambio de los iconos dentro del botón (abrir/cerrar).

## Dependencias

- **`astro:assets`**: Utiliza el componente `Image` para el logo.
- **`../scripts/menu-direct.js`**: La lógica del menú está encapsulada en este archivo JavaScript externo.
- **Imágenes**: Requiere el logo en `src/assets/images/LOGO-NAU-WEB.webp`.
- **Estilos Globales**: Depende de `src/styles/global.css` para el estilo del enlace activo.

## Uso

El `Header.astro` está diseñado para ser incluido en el layout principal del sitio, como `src/layouts/MainLayout.astro`, para que aparezca en la parte superior de todas las páginas.

```astro
---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---
<html lang="es">
  <head>...</head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```
