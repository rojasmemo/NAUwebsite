# 1. Guía de Inicio Rápido: De Cero a Productivo

Esta guía es el punto de partida para cualquier desarrollador que se una al proyecto NAU. El objetivo es que puedas tener un entorno de desarrollo completamente funcional y listo para contribuir en el menor tiempo posible.

## Filosofía

Creemos en la documentación clara y accionable. Si algún paso de esta guía es confuso, está desactualizado o puede ser mejorado, tu primera contribución puede ser proponer un cambio. ¡Las mejoras a la documentación son tan importantes como las del código!

---

## Nivel 1: Configuración del Entorno Local

### Prerrequisitos

**Software:**
- **Node.js:** Versión `20.x` o superior.
- **npm:** Versión `10.x` o superior (se instala con Node.js).
- **Git:** Para clonar y gestionar el código fuente.

**Conocimientos Previos:**
- Familiaridad con la línea de comandos.
- Conocimientos básicos de Git (clonar, crear ramas, hacer commits).
- Comprensión general de cómo funcionan los sitios web (frontend/backend).

### 1. Clonar el Repositorio

El proyecto utiliza un monorepo que contiene tanto el frontend como el backend. Clónalo en tu máquina local:

```bash
git clone https://github.com/tu-usuario/NAU-website.git
cd NAU-website
```

La estructura principal es:
- `nau-astro-site/`: El sitio web construido con Astro (nuestro frontend).
- `nau-sanity-studio/`: El estudio de contenido de Sanity (nuestro backend).
- `docs/`: La documentación del proyecto que estás leyendo ahora mismo.

### 2. Configuración del Backend (Sanity Studio)

El Studio es una aplicación local que te permite gestionar el contenido del sitio web.

1.  **Navega al directorio y instala dependencias:**
    ```bash
    # Desde la raíz del proyecto (NAU-website/)
    cd nau-sanity-studio
    npm install
    ```

2.  **Inicia el Studio:**
    ```bash
    # Asegúrate de estar en la carpeta nau-sanity-studio
    npm run dev
    ```

Por defecto, el Studio se ejecutará en `http://localhost:3333`. La primera vez que lo abras, te pedirá que inicies sesión con un proveedor (como Google o GitHub) para asociar tu sesión al proyecto de Sanity en la nube. No necesitas credenciales en un archivo `.env` para que funcione en desarrollo.

### 3. Configuración del Frontend (Astro)

El sitio de Astro consume los datos de Sanity para renderizar las páginas.

1.  **Navega al directorio y instala dependencias:**
    ```bash
    # Desde la raíz del proyecto (NAU-website/), en una nueva terminal
    cd nau-astro-site
    npm install
    ```

2.  **Configura las Variables de Entorno:**
    Este es el paso más importante. El frontend necesita "llaves" (tokens) para acceder a los servicios que utiliza. Crea un archivo `.env` en la raíz de `nau-astro-site/` y copia la siguiente plantilla:

    ```env
    # SANITY: Conecta el frontend con el backend
    PUBLIC_SANITY_PROJECT_ID="b9a3y4ri"
    PUBLIC_SANITY_DATASET="production"
    PUBLIC_SANITY_API_VERSION="v2024-05-21"
    SANITY_API_READ_TOKEN=""

    # MERCADOPAGO: Procesa las donaciones
    PUBLIC_MERCADOPAGO_PUBLIC_KEY=""
    MERCADOPAGO_ACCESS_TOKEN=""

    # EMAILJS: Envía correos desde el formulario de contacto
    PUBLIC_EMAILJS_SERVICE_ID="service_nau_web"
    PUBLIC_EMAILJS_TEMPLATE_ID="template_nau_web"
    PUBLIC_EMAILJS_PUBLIC_KEY=""
    ```

    **¿Cómo obtener estas llaves?**
    -   `SANITY_API_READ_TOKEN`: Ve a [manage.sanity.io](https://manage.sanity.io), selecciona el proyecto `NAU`, ve a la pestaña `API` y crea un nuevo token con permisos de **solo lectura (viewer)**. Este es el más importante.
    -   `MERCADOPAGO_*`: Accede a la cuenta de Mercado Pago del proyecto, ve a `Tus Negocios > Configuración > Credenciales` y obtén la Public Key y el Access Token.
    -   `PUBLIC_EMAILJS_PUBLIC_KEY`: Accede a la cuenta de EmailJS, ve a `Account > API Keys` y copia tu Public Key.

3.  **Inicia el Servidor de Desarrollo:**
    ```bash
    # Asegúrate de estar en la carpeta nau-astro-site
    npm run dev
    ```
    El sitio web se ejecutará en `http://localhost:4321`.

### 4. Verificación

Si todo ha ido bien, deberías poder:
1.  Abrir `http://localhost:3333` y ver el Sanity Studio.
2.  Abrir `http://localhost:4321` y ver el sitio web de NAU cargando el contenido desde Sanity.

**¿Algo salió mal?**
-   **Error de `fetch` en Astro:** Casi siempre se debe a que el `SANITY_API_READ_TOKEN` es incorrecto o no está presente en el `.env`.
-   **El sitio no muestra contenido:** Asegúrate de que tu Sanity Studio local está conectado y que tienes contenido publicado en el dataset de `production`.

---

## Nivel 2: Flujo de Contribución

Ahora que tienes todo funcionando, ¿cómo contribuyes con un cambio?

### 1. Crea una Rama

Nunca trabajes directamente sobre la rama `main`. Crea una rama descriptiva para tu cambio:

```bash
# Ejemplo para una nueva funcionalidad
git checkout -b feat/nombre-de-la-funcionalidad

# Ejemplo para un arreglo
git checkout -b fix/descripcion-del-bug
```

### 2. Realiza tus Cambios

Modifica el código, añade nuevas funcionalidades o corrige errores. Escribe código limpio y sigue las convenciones del proyecto.

### 3. Verifica tu Trabajo (¡Importante!)

Antes de enviar tu cambio, asegúrate de que no has roto nada. Desde el directorio `nau-astro-site/`, ejecuta los tests end-to-end:

```bash
npm run test:e2e
```

Esto ejecutará las pruebas de Playwright que simulan la navegación de un usuario. Todos los tests deben pasar.

### 4. Haz Commit y Envía tu Pull Request (PR)

Los commits deben ser atómicos y tener mensajes claros. Utilizamos [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) como estándar.

```bash
# Ejemplo de un buen mensaje de commit
git commit -m "feat(donar): agrega soporte para donaciones con PayPal"

git push -u origin feat/nombre-de-la-funcionalidad
```

Finalmente, ve a GitHub y abre un Pull Request desde tu rama hacia `main`. Describe tus cambios en el PR para que el equipo pueda revisarlos.

¡Felicidades! Ahora estás listo para contribuir al proyecto NAU como un profesional.
