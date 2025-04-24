/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html", // Asegúrate que apunta a tu archivo HTML principal
    "./*.html",      // Puedes añadir patrones para otros HTML si los tienes
    // "./src/**/*.{html,js}", // Si tienes archivos en otras carpetas, añádelos aquí
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Colores personalizados basados en el boceto (aproximados)
        'custom-light-teal': '#3dcad8', // Aguamarina
        'custom-medium-teal': '#4F98A2', // Teal medio
        'custom-dark-teal': '#1E606A',  // Teal oscuro
        'custom-darker-teal': '#143946', // Teal muy oscuro (para texto/imágenes)
        'custom-specific-blue': '#005366',
        'custom-hover-teal': '#d1e3e5', // Este es el color del hover del menú
        'custom-pale-teal': '#b3dddd',  // El color de fondo correcto para la sección de contenido 2
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    // Container queries están en el core de Tailwind v3.3+
  ],
}
