// Importa las funciones y módulos necesarios de Vite y Node.js
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { readdirSync } from 'fs';
import handlebars from 'vite-plugin-handlebars';

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
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno del archivo .env según el modo (development o production)
  const env = loadEnv(mode, projectRoot, '');

  return {
    // Para desplegar en un dominio raíz (Netlify, GoDaddy), la base debe ser '/'.
    base: '/',

    // Pone las variables de entorno a disposición del código del lado del cliente.
    define: {
      'process.env.VITE_RECAPTCHA_SITE_KEY': JSON.stringify(env.VITE_RECAPTCHA_SITE_KEY),
      'process.env.VITE_RECAPTCHA_SECRET_KEY': JSON.stringify(env.VITE_RECAPTCHA_SECRET_KEY)
    },

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
    ],
  };
});
