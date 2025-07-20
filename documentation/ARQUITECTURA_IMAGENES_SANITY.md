# Arquitectura de Imágenes Responsivas con Sanity y Astro

## 1. Problema

El sitio presentaba inconsistencias en el manejo de imágenes provenientes de Sanity. Algunas imágenes se renderizaban con una URL fija, lo cual no es una práctica responsiva y perjudica el rendimiento (Core Web Vitals, LCP). Otras implementaciones intentaban ser dinámicas pero fallaban en el entorno de producción (Netlify).

El requisito fundamental es que **todas las imágenes del sitio deben ser 100% responsivas**, adaptándose al tamaño de la pantalla del usuario para optimizar los tiempos de carga y la experiencia de usuario.

## 2. Solución Estratégica

Se ha implementado una solución centralizada y robusta para renderizar todas las imágenes de Sanity de manera consistente y responsiva. La estrategia se basa en el uso de los atributos `srcset` y `sizes` en las etiquetas `<img>`, que es el estándar web moderno para el manejo de imágenes responsivas.

Toda la lógica está encapsulada en un único componente: `src/components/SanityImage.astro`.

## 3. El Componente `SanityImage.astro`

Este es el **único** componente que debe usarse para renderizar cualquier imagen proveniente de Sanity.

### 3.1. Props (Entradas del Componente)

| Prop | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `image` | `object` | Sí | El objeto de imagen completo de Sanity. |
| `sizes` | `string` | Sí | Describe qué tan ancha será la imagen en relación con el viewport. **Es la clave para la responsividad.** |
| `alt` | `string` | No | Texto alternativo. Si no se provee, usa el `alt` definido en Sanity o un texto genérico. |
| `loading` | '''lazy''' \| '''eager''' | No | Define la estrategia de carga. El valor por defecto es `lazy`. |
| `class` | `string` | No | Permite añadir clases CSS adicionales desde el componente padre. |

### 3.2. Lógica Interna

1.  **Validación:** Si no recibe un objeto `image` válido, no renderiza nada.
2.  **Generación de `srcset`:** Utiliza la librería `@sanity/image-url` para generar un `srcset`, que es una lista de URLs de la misma imagen en diferentes anchos predefinidos (`[320, 480, 640, ..., 2560]`).
3.  **Generación de `src`:** Crea una URL de tamaño mediano (800w) como fallback para navegadores antiguos que no soportan `srcset`.
4.  **Renderizado:** Produce una etiqueta `<img>` con los atributos `src`, `srcset`, `sizes`, `alt`, `loading`, y `decoding="async"`. El navegador usa `sizes` para entender el layout y luego elige la URL más adecuada de `srcset` según el tamaño de la pantalla y la densidad de píxeles.

### 3.3. Estilos y Comportamiento por Defecto

- **Clases Base:** El componente aplica las clases `w-full h-auto object-cover` por defecto para asegurar que la imagen ocupe todo el ancho de su contenedor y se escale correctamente.
- **Texto Alternativo:** Prioriza el `alt` pasado como prop, luego el `alt` definido en Sanity, y finalmente un texto genérico (`'Imagen descriptiva de NAU'`).

## 4. Cómo Usarlo

### 4.1. Consulta GROQ

Asegúrate de que tus consultas a Sanity devuelvan el objeto de imagen completo.

```javascript
// Ejemplo en una consulta GROQ
"campoDeImagen": {
  ...,
  asset->
}
```

### 4.2. Implementación en un Componente Astro

Importa y utiliza `SanityImage` en cualquier página o componente, proveyendo las props necesarias. El valor de `sizes` es el más importante y debe definirse cuidadosamente.

```astro
---
// Ejemplo: src/components/HeroBanner.astro
import SanityImage from '~/components/SanityImage.astro';
import { getHomePage } from '~/lib/sanity/queries'; // Asumiendo que la query existe

const homeData = await getHomePage();
const heroImage = homeData.hero.image;
---

<div class="relative w-full h-96">
  <SanityImage
    image={heroImage}
    alt={heroImage.alt}
    sizes="(max-width: 768px) 100vw, 50vw"
    loading="eager"
    class="absolute inset-0 w-full h-full object-cover"
  />
</div>
```

**Explicación del atributo `sizes`:**
- `(max-width: 768px) 100vw`: En pantallas de hasta 768px de ancho, la imagen ocupará el 100% del ancho del viewport (`100vw`).
- `50vw`: En pantallas de más de 768px, la imagen ocupará el 50% del ancho del viewport (`50vw`).

## 5. Beneficios

- **Rendimiento (Core Web Vitals):** Mejora drástica del Largest Contentful Paint (LCP) al servir imágenes optimizadas.
- **Experiencia de Usuario:** Tiempos de carga más rápidos, especialmente en móviles.
- **Consistencia y Mantenimiento:** Un único componente y una única forma de manejar las imágenes de Sanity, previniendo errores y facilitando futuras actualizaciones.
- **100% Responsivo:** El diseño se adapta a cualquier dispositivo, cumpliendo con el requisito principal del proyecto.