// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  // Cambiamos a 'static' para generar un sitio estático, que es más simple y rápido.
  // Esto funciona perfectamente con la forma en que estamos pidiendo los datos a Sanity.
  output: 'static',
  integrations: [
    tailwind(),
    sanity({
      // REEMPLAZA 'xxxxxx' con el mismo Project ID que usaste en Sanity Studio.
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.PUBLIC_SANITY_DATASET,
      // Usamos una variable de entorno para el CDN. `false` en desarrollo para ver cambios al instante,
      // y `true` en producción (Netlify) para máxima velocidad.
      useCdn: process.env.NODE_ENV === 'production',
      apiVersion: process.env.PUBLIC_SANITY_API_VERSION // Usa una fecha reciente en formato YYYY-MM-DD.
    })
  ],
});