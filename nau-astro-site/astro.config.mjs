// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap"; // <-- Nueva importación
import dotenv from 'dotenv';

dotenv.config();

// No importamos react aquí para simplificar

// https://astro.build/config
export default defineConfig({
  // Añade la URL de tu sitio para el sitemap
  site: 'https://naufundacion.org', // <-- Nueva línea
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
    }),
    react(),
    sitemap() // <-- Nueva integración
  ],
  vite: {
    ssr: {
      external: ['react', 'vite']
    }
  }
});