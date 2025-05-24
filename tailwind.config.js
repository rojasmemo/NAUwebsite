/** @type {import('tailwindcss').Config} */
// Importa el tema por defecto de Tailwind para poder extenderlo, especialmente útil para la familia de fuentes.
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  // 'content' define los archivos que Tailwind CSS escaneará para buscar clases de utilidad.
  // Es importante que esta lista incluya todos los archivos HTML, JavaScript, etc., donde uses clases de Tailwind.
  content: [
    "./index.html",         // Archivo HTML principal en la raíz del proyecto.
    "./*.html",             // Cualquier otro archivo HTML en la raíz del proyecto.
    // Ejemplo: "./src/**/*.{html,js}", // Descomentar y ajustar si tienes archivos en una carpeta 'src'.
  ],
  // 'theme' es donde se personalizan los valores de diseño de Tailwind (colores, fuentes, espaciado, etc.).
  theme: {
    // 'extend' permite añadir nuevas utilidades o modificar las existentes sin sobrescribir completamente el tema por defecto.
    extend: {
      // Personalización de la familia de fuentes.
      fontFamily: {
        // Define 'sans' para usar 'Poppins' como fuente principal, manteniendo las fuentes sans-serif por defecto de Tailwind como fallback.
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      // Personalización de la paleta de colores.
      colors: {
        // Paleta de colores personalizada para el proyecto NAU.
        // Estos colores estarán disponibles como clases de utilidad (ej. bg-custom-light-teal, text-custom-medium-teal).
        'custom-light-teal': '#3dcad8',    // Aguamarina, usado para elementos destacados y fondos claros.
        'custom-medium-teal': '#4F98A2',   // Teal medio, usado para fondos y acentos.
        'custom-dark-teal': '#1E606A',     // Teal oscuro, usado para texto y elementos con mayor contraste.
        'custom-darker-teal': '#143946',   // Teal muy oscuro, usado para fondos profundos y texto principal.
        'custom-specific-blue': '#005366', // Azul específico para ciertos elementos de diseño.
        'custom-hover-teal': '#d1e3e5',    // Color para el estado hover en elementos del menú.
        'custom-pale-teal': '#b3dddd',     // Teal pálido, usado como color de fondo para secciones de contenido.
        'custom-frosty-teal': '#e6efef',   // Azul muy claro, usado para fondos de tarjetas.
        'custom-gray-blue': '#CAD4E0',     // Gris perla azulado, usado en líneas separadoras.
      }
    }, // Fin de 'extend'
  }, // Fin de 'theme'
  // 'plugins' permite añadir funcionalidades extra a Tailwind CSS a través de plugins oficiales o de terceros.
  plugins: [
    require('@tailwindcss/forms'),        // Plugin para estilizar formularios con clases de utilidad.
    require('@tailwindcss/typography'),   // Plugin para añadir estilos de tipografía por defecto (prose).
    require('@tailwindcss/aspect-ratio'), // Plugin para controlar la relación de aspecto de los elementos.
    require('@tailwindcss/line-clamp'),   // Plugin para truncar texto a un número específico de líneas.
    // Nota: Las 'container queries' ya están incluidas en el core de Tailwind CSS a partir de la v3.3, por lo que no necesitan un plugin separado.
  ], // Fin de 'plugins'
} // Fin de module.exports
