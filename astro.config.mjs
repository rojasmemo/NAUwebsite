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
      projectId: 'b9a3y4ri',
      dataset: 'production',
      // Usa 'false' durante el desarrollo para ver los cambios al instante.
      useCdn: false,
      apiVersion: '2024-07-08' // Usa una fecha reciente en formato YYYY-MM-DD.
    })
  ],
});