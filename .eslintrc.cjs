module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:astro/recommended",
    "prettier", // Asegúrate que 'prettier' sea el último para que pueda sobreescribir otras configs.
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // Aquí puedes añadir o sobreescribir reglas.
    // Por ejemplo: "no-console": "warn" para que te avise de los console.log en lugar de dar error.
  },
};