
# Documentación del Componente: Footer.astro

## Descripción General

`Footer.astro` es el componente que renderiza el pie de página del sitio web. Está diseñado para ser informativo y funcional, proporcionando información de contacto, enlaces a redes sociales, un llamado a la acción para donar y un aviso de derechos de autor. Además, incluye una funcionalidad de "volver arriba" para mejorar la experiencia de usuario en páginas largas.

## Ubicación del Archivo

`src/components/Footer.astro`

## Props

Este componente no acepta ninguna `prop` (`Astro.props`). Es un componente estático en términos de datos de entrada.

## Estructura y Funcionalidad

### Layout y Estructura HTML

El pie de página se divide en tres secciones principales:

1.  **Sección Principal (Fondo Oscuro)**:
    - Utiliza un `div` con un `max-w-[1600px]` para limitar el ancho del contenido y centrarlo.
    - Un `grid` responsivo (`grid-cols-1 md:grid-cols-4`) organiza el contenido:
      - **Logo**: Muestra el logo de la fundación. Se escala para ajustarse al espacio disponible.
      - **Contacto**: Lista la información de contacto (móvil y email) con enlaces `tel:` y `mailto:`.
      - **Redes Sociales**: Contiene enlaces a perfiles de redes sociales (ej. Instagram).
      - **Llamado a la Acción (CTA)**: Invita a los usuarios a donar con un párrafo y un botón que enlaza a la página `/donar`.

2.  **Barra de Copyright (Fondo Claro)**:
    - Una barra inferior con un color de fondo contrastante (`bg-custom-light-teal`).
    - Muestra el aviso de derechos de autor. El año se actualiza dinámicamente mediante JavaScript.

3.  **Botón "Volver Arriba" (`scrollToTopBtn`)**:
    - Un enlace (`<a>`) con posicionamiento fijo (`fixed`) en la esquina inferior derecha de la pantalla.
    - Es inicialmente invisible y aparece cuando el usuario ha hecho scroll hacia abajo una cierta distancia.
    - Al hacer clic, desplaza suavemente la página de vuelta al inicio.

### Estilos (CSS)

- Completamente estilizado con Tailwind CSS.
- El diseño es 100% responsivo, adaptándose de una sola columna en móviles a cuatro columnas en escritorio.
- El botón "volver arriba" utiliza transiciones (`transition-all`, `duration-300`) y transformaciones (`translate-y-4`) para una aparición y desaparición suave.

### Comportamiento (JavaScript)

El componente incluye un script (`<script>`) que maneja dos funcionalidades:

1.  **Actualización del Año del Copyright**:
    - Selecciona el `span` con `id="currentYear"`.
    - Inserta el año actual (`new Date().getFullYear()`) en el contenido de ese `span`.

2.  **Lógica del Botón "Volver Arriba"**:
    - Añade un `event listener` al evento `scroll` de la ventana.
    - Comprueba la posición del scroll (`window.scrollY`). Si es mayor a 300 píxeles, hace visible el botón; de lo contrario, lo oculta. La visibilidad se controla cambiando las clases `opacity-0` e `invisible`.
    - El `event listener` se define con `{ passive: true }` para un mejor rendimiento de scroll.
    - Añade un `event listener` al evento `click` del botón. Cuando se activa, previene el comportamiento por defecto del enlace y utiliza `window.scrollTo({ top: 0, behavior: 'smooth' })` para un desplazamiento animado.

## Dependencias

- **`astro:assets`**: Utiliza el componente `Image` para mostrar el logo de forma optimizada.
- **Imágenes**: Requiere la imagen del logo en `src/assets/images/LOGO-NAU-WEB.webp`.

## Uso

El `Footer.astro` está diseñado para ser incluido en el layout principal del sitio, como `src/layouts/MainLayout.astro`, para que aparezca en todas las páginas de manera consistente.

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
