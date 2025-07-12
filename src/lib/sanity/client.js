import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

/**
 * Cliente de Sanity para hacer peticiones al CMS.
 * Este archivo es el puente entre el frontend (Astro) y el backend (Sanity).
 */
export const client = createClient({
  // Encontramos estos datos en el archivo sanity.config.js de tu Studio
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,

  // La fecha de hoy en formato YYYY-MM-DD.
  // Esto asegura que si Sanity actualiza su API, tu sitio no se rompa inesperadamente.
  apiVersion: '2024-07-11',

  // `false` si quieres datos frescos en cada petición durante el desarrollo.
  // `true` para producción para usar la CDN global y que sea más rápido.
  useCdn: import.meta.env.PROD,
});

const builder = imageUrlBuilder(client);

/**
 * Ayudante para generar URLs de imágenes con solo la referencia del asset en tus documentos.
 * Lee más en: https://www.sanity.io/docs/image-url
 */
export function urlForImage(source) {
  return builder.image(source);
}