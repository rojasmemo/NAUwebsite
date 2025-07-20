# Plan de Acción: Corrección de Imágenes y Componentes

Este documento detalla las acciones a realizar para solucionar los problemas de visualización de imágenes y asegurar la consistencia en el manejo de recursos visuales en el sitio web de NAU.

## 1. Componente `SplitSection`

**Problema:** Las imágenes de las secciones "split" no se muestran correctamente en las páginas `index`, `encuentros` y `simbolismo-numerico` después del despliegue. La página `donar` utiliza una imagen local, pero el objetivo es que todas las páginas consuman las imágenes desde Sanity para un manejo centralizado y responsivo.

**Solución Propuesta:**

1.  **Modificar el componente `SplitSection.astro`:**
    *   Se actualizará el componente para que reciba y procese correctamente el objeto de imagen proveniente de Sanity.
    *   Se integrará el componente `SanityImage.astro` dentro de `SplitSection.astro` para renderizar la imagen. Esto asegura que se generen las URLs para diferentes tamaños de pantalla (`srcset`) y se aplique el manejo responsivo de imágenes de manera automática.

2.  **Ajustar las consultas a Sanity:**
    *   Se verificará que las consultas de Sanity para las páginas que usan `SplitSection` (`index`, `encuentros`, `simbolismo-numerico`) estén trayendo el objeto de imagen completo y no solo la URL.

3.  **Actualizar las páginas:**
    *   Se revisarán las páginas `index.astro`, `encuentros.astro` y `simbolismo-numerico.astro` para asegurar que pasan el objeto de imagen correcto al componente `SplitSection`.
    *   La página `donar.astro` se mantendrá sin cambios por ahora, utilizando su imagen local actual.

## 2. Componente `FeatureCard`

**Problema:** Los iconos en las tarjetas de características (`FeatureCard`), utilizados en la página de inicio para "Encuentros" y "Simbolismo Numérico", no se muestran porque se intentan cargar desde Sanity como un archivo local, lo cual es incorrecto.

**Solución Propuesta:**

1.  **Modificar el componente `FeatureCard.astro`:**
    *   Se ajustará el componente para que acepte una ruta de archivo local para el icono.
    *   Se utilizará la función `getImage` de Astro para procesar el icono local y optimizarlo.

2.  **Actualizar la página `index.astro`:**
    *   Se modificarán las llamadas al componente `FeatureCard` en la página de inicio para pasar la ruta local del icono en lugar de un dato de Sanity.
    *   Se asegura que los iconos estén físicamente presentes en el directorio `src/assets/images/` o similar.

## 3. Verificación General

*   Se realizará una revisión visual de todas las páginas implicadas (`index`, `encuentros`, `simbolismo-numerico`, `donar`) para confirmar que todas las imágenes y los iconos se cargan y se muestran correctamente en diferentes tamaños de pantalla.
*   Se verificará que no haya errores en la consola del navegador relacionados con la carga de imágenes.
