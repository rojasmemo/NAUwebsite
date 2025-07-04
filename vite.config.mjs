// Importa las funciones y módulos necesarios de Vite y Node.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

// Usamos process.cwd() para obtener la ruta raíz del proyecto de forma robusta.
const projectRoot = process.cwd();

// La función defineConfig ofrece autocompletado y validación para tu configuración.
export default defineConfig({
  // No es necesario definir 'root' aquí, ya que por defecto es process.cwd().
  
  // Configuración para el proceso de compilación (build).
  build: {
    rollupOptions: {
      // 'input' define los puntos de entrada de tu aplicación.
      input: {
        main: resolve(projectRoot, 'index.html'),
        sobre: resolve(projectRoot, 'sobre-nau.html'),
        encuentros: resolve(projectRoot, 'encuentros.html'),
        simbolismo: resolve(projectRoot, 'simbolismo-numerico.html'),
        contacto: resolve(projectRoot, 'contacto.html'),
        donar: resolve(projectRoot, 'donar.html'),
        campanas: resolve(projectRoot, 'campanas.html'),
        gracias: resolve(projectRoot, 'gracias.html'),
      },
    },
    // Define el directorio de salida para los archivos compilados.
    outDir: 'dist',
  },

  // 'plugins' es donde activamos las extensiones de Vite.
  plugins: [
    // Aquí activamos el plugin para procesar los parciales de HTML con Handlebars.
    handlebars({
      // Especificamos la ruta al directorio que contiene los parciales.
      partialDirectory: resolve(projectRoot, 'partials'),
    }),
  ],
});
