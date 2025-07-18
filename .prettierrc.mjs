/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  // Opciones de estilo que prefieras:
  semi: true, // Poner punto y coma al final de la línea
  singleQuote: false, // Usar comillas dobles ""
  tabWidth: 2, // Ancho de la tabulación en espacios
  trailingComma: "es5", // Poner coma al final en objetos y arrays
};