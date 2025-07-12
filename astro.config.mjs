// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  // Cambiamos a 'server' para habilitar funciones del lado del servidor con el adaptador de Netlify.
  output: 'server',
  adapter: netlify(),
  image: {
    service: {
      entrypoint: '@astrojs/netlify/image-service'
    },
    remotePatterns: [{
      protocol: "https",
      hostname: "cdn.sanity.io"
    }]
  },
  integrations: [
    tailwind(),
    sanity({
      // REEMPLAZA 'xxxxxx' con el mismo Project ID que usaste en Sanity Studio.
      projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.PUBLIC_SANITY_DATASET,
      // Usamos una variable de entorno para el CDN. `false` en desarrollo para ver cambios al instante,
      // y `true` en producción (Netlify) para máxima velocidad.
      useCdn: process.env.NODE_ENV === 'production',
      apiVersion: '2024-07-11' // Usa una fecha reciente en formato YYYY-MM-DD.
    })
  ],
});