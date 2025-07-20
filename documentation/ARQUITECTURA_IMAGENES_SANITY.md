# Arquitectura de Imágenes Responsivas con Sanity y Astro

## 1. Problema

El sitio presentaba inconsistencias en el manejo de imágenes provenientes de Sanity. Algunas imágenes se renderizaban con una URL fija, lo cual no es una práctica responsiva y perjudica el rendimiento (Core Web Vitals, LCP). Otras implementaciones intentaban ser dinámicas pero fallaban en el entorno de producción (Netlify).

El requisito fundamental es que **todas las imágenes deben ser responsivas**, es decir, el navegador debe poder descargar la versión más optimizada según el dispositivo del usuario.

## 2. Solución Estratégica

Se implementará una solución centralizada y robusta para renderizar todas las imágenes de Sanity de manera consistente y responsiva. La estrategia se basa en el uso de los atributos `srcset` y `sizes` en las etiquetas `<img>`, que es el estándar web moderno para el manejo de imágenes responsivas.

## 3. Componentes Clave de la Implementación

### 3.1. El Componente `SanityImage.astro`

Este será el único componente responsable de renderizar una imagen de Sanity.

- **Entrada (`Props`):**
  - `image`: El objeto de imagen completo de Sanity (no solo la URL).
  - `sizes`: Un string que describe qué tan ancha será la imagen en relación con el viewport (ej. `(max-width: 768px) 100vw, 50vw`). **Esta prop es crucial** y debe ser proporcionada por el componente padre que lo utiliza.
  - `alt`: Texto alternativo.
  - `loading`: `eager` o `lazy`.
  - `class`: Clases CSS adicionales.

- **Lógica Interna:**
  1.  Utiliza la librería `@sanity/image-url` para generar un `srcset`, que es una lista de URLs de la misma imagen en diferentes anchos (ej. 480w, 800w, 1200w, 1920w).
  2.  Renderiza una etiqueta `<img>` con los atributos `src`, `srcset` y `sizes`. El navegador usará esta información para descargar la imagen más eficiente.

### 3.2. Estandarización de Consultas GROQ

Todas las consultas a Sanity en `src/lib/sanity/queries.js` que obtengan imágenes se modificarán para que devuelvan el objeto de imagen completo, no solo la URL. La estructura estándar será:

```javascript
// Ejemplo en una consulta GROQ
"nombreDelCampoDeImagen": imagen {
  ...,
  asset->
},
```

Esto asegura que el componente `SanityImage.astro` siempre reciba los datos que necesita.

## 4. Ejemplo de Uso

Para usar el componente en cualquier página o componente de Astro (como `HeroBanner.astro` o `SplitSection.astro`), se hará de la siguiente manera:

```astro
---
import SanityImage from '../components/SanityImage.astro';
const { data } = await sanityClient.fetch(...); // data.hero.image es un objeto de Sanity
---

<SanityImage
  image={data.hero.image}
  alt={data.hero.image.alt || "Texto alternativo por defecto"}
  sizes="(max-width: 800px) 100vw, 800px"
  loading="eager"
  class="clase-css-adicional"
/>
```

## 5. Beneficios

- **Rendimiento (Core Web Vitals):** Mejora significativa del Largest Contentful Paint (LCP) al cargar imágenes de tamaño adecuado.
- **Experiencia de Usuario:** Tiempos de carga más rápidos, especialmente en dispositivos móviles.
- **Consistencia del Código:** Un único componente y una única forma de manejar las imágenes de Sanity.
- **Mantenimiento:** Facilita futuras modificaciones y previene errores.
