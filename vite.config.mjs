// Importa las funciones y módulos necesarios de Vite y Node.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { readdirSync } from 'fs';
import handlebars from 'vite-plugin-handlebars';
import sitemap from 'vite-plugin-sitemap';

// Usamos process.cwd() para obtener la ruta raíz del proyecto de forma robusta.
const projectRoot = process.cwd();

/**
 * Función que lee la carpeta raíz y encuentra todos los archivos .html
 * para crear dinámicamente los puntos de entrada para Rollup.
 * @returns {object} Un objeto con los puntos de entrada para la compilación.
 */
const getHtmlInput = () => {
  const files = readdirSync(projectRoot);
  return files
    .filter((file) => file.endsWith('.html'))
    .reduce((acc, file) => {
      const name = file.slice(0, -5);
      // La clave 'main' es especial para 'index.html'
      acc[name === 'index' ? 'main' : name] = resolve(projectRoot, file);
      return acc;
    }, {});
};

// La función defineConfig ofrece autocompletado y validación para tu configuración.
export default defineConfig({
  // Para desplegar en un dominio raíz (Netlify, GoDaddy), la base debe ser '/'.
  base: '/',

  // La sección 'define' ya no es necesaria al usar los formularios de Netlify.
  
    // Configuración para el proceso de compilación (build).
    build: {
      // Usamos la función para generar las entradas dinámicamente.
      rollupOptions: { input: getHtmlInput() },
      // Define el directorio de salida para los archivos compilados.
      outDir: 'dist',
    },

    plugins: [
      handlebars({
        partialDirectory: resolve(projectRoot, 'partials'),
      }),
      sitemap({ hostname: 'https://www.naufundacion.org' }),
    ],
});
