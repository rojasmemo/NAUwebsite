# Guía de Herramientas de Desarrollo: Astro, ESLint, Prettier y Husky

Este documento describe la configuración, el uso y el propósito de las herramientas de desarrollo clave utilizadas en el proyecto `nau-astro-site`. El objetivo de esta configuración es automatizar la calidad y el formato del código para mejorar la mantenibilidad, reducir errores y agilizar el desarrollo.

---

## 1. Extensión de Astro para VS Code (`astro-build.astro-vscode`)

- **Propósito:** Es la base para trabajar con Astro en VS Code. Proporciona el entendimiento fundamental del editor sobre la sintaxis de los archivos `.astro`.
- **Funcionalidades Clave:**
    - **Coloreado de Sintaxis:** Distingue correctamente el frontmatter de YAML, el HTML, las expresiones de JS/TS y los bloques de `<script>` y `<style>`.
    - **Autocompletado:** Ofrece sugerencias básicas para directivas de Astro y atributos HTML.
    - **Integración:** Actúa como un puente para que otras herramientas, como ESLint y Prettier, puedan entender y operar sobre los archivos `.astro`.

**En resumen:** Esta extensión es el requisito mínimo para una experiencia de desarrollo decente con Astro en VS Code.

---

## 2. Prettier (El Formateador de Código)

- **Propósito:** Actúa como el "estilista" del código. Su única misión es asegurar que todo el código del proyecto tenga un formato visual 100% consistente, sin importar quién lo escribió.

### Configuración (`.prettierrc.mjs`)

El comportamiento de Prettier está definido por las siguientes reglas:

- `plugins: ['prettier-plugin-astro']`: Le enseña a Prettier a entender y formatear archivos `.astro`.
- `semi: true`: Asegura que cada sentencia termine con un punto y coma (`;`).
- `singleQuote: false`: Fuerza el uso de comillas dobles (`"`) para todas las cadenas de texto.
- `tabWidth: 2`: Fija la indentación a 2 espacios.
- `trailingComma: "es5"`: Añade una coma al final de objetos y arrays multilínea, lo que resulta en historiales de Git más limpios.

### Forma de Uso

1.  **Automática (Recomendado):** Con la opción `"editor.formatOnSave": true` en el archivo `.vscode/settings.json` (configuración del área de trabajo), Prettier reformatea automáticamente cada archivo en el momento en que lo guardas.
2.  **Manual:** Ejecutando el comando `npm run format` en la terminal. Esto formateará todos los archivos del proyecto a la vez.

### Resultado

- **Consistencia Absoluta:** Se eliminan las discusiones sobre estilo (espacios vs. tabs, comillas simples vs. dobles).
- **Legibilidad:** El código es más fácil de leer al tener una estructura predecible.

---

## 3. ESLint (El Inspector de Calidad de Código)

- **Propósito:** Actúa como el "inspector de calidad". Analiza el código para encontrar errores potenciales, malas prácticas y código que no sigue las convenciones establecidas.

### Configuración (`.eslintrc.cjs`)

Nuestra configuración se basa en un conjunto de reglas recomendadas (`extends`):

- `eslint:recommended`: Reglas básicas de ESLint que atrapan errores comunes (ej. usar una variable no declarada).
- `plugin:@typescript-eslint/recommended`: Reglas específicas para código TypeScript (ej. advertir sobre variables no utilizadas).
- `plugin:astro/recommended`: Reglas cruciales para Astro. **Impone buenas prácticas de accesibilidad** (como exigir el atributo `alt` en las imágenes `<img>`) y previene errores comunes en la sintaxis de Astro.
- `prettier`: **Esta es la regla más importante para la convivencia.** Desactiva todas las reglas de estilo de ESLint para que solo Prettier se encargue del formato, evitando conflictos.

### Forma de Uso

1.  **En Tiempo Real (En el editor):** La extensión de ESLint para VS Code (`dbaeumer.vscode-eslint`) lee la configuración y subraya los problemas directamente mientras escribes, ofreciendo feedback instantáneo.
2.  **Manual:** Ejecutando `npm run lint`. Este comando revisará todos los archivos y arreglará automáticamente los problemas que pueda (`--fix`).

### Resultado

- **Menos Bugs:** Se detectan errores comunes antes de que el código llegue a ejecutarse.
- **Código más Robusto y Accesible:** Se aplican buenas prácticas de forma automática.
- **Mantenibilidad:** El código es más limpio y fácil de entender para futuros desarrolladores (o para ti mismo en el futuro).

---

## 4. Husky + lint-staged (El Guardián Automatizado)

- **Propósito:** Es el sistema que automatiza y fuerza el cumplimiento de las reglas de Prettier y ESLint. Actúa como un guardián o portero que impide que código de mala calidad sea subido al repositorio.

### Configuración

- **Husky (`.husky/pre-commit`):** Se configura para ejecutarse automáticamente cada vez que se intenta hacer un `git commit`.
- **lint-staged (`package.json`):** Husky le pasa el control a `lint-staged`, que está configurado para ejecutar `eslint --fix` y `prettier --write` **únicamente sobre los archivos que han sido modificados y están listos para el commit (`staged`).**

### Forma de Uso

- **Totalmente Automática:** No tienes que hacer nada. Simplemente trabaja como siempre con `git add` y `git commit`. El sistema se encarga del resto en segundo plano.

### Resultado

- **Garantía de Calidad:** Es imposible confirmar código que no cumpla con los estándares de calidad y formato del proyecto. Si ESLint o Prettier encuentran un problema que no pueden arreglar, el commit se cancela hasta que el desarrollador lo solucione manualmente.
- **Eficiencia:** Al analizar solo los archivos modificados, el proceso es extremadamente rápido y no ralentiza el flujo de trabajo.
