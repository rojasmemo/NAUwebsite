# Documentación del Flujo de Construcción y Despliegue del Sitio NAU

Este documento detalla la arquitectura, el flujo de información y el proceso de despliegue del sitio web de NAU, construido con Astro, Sanity, GitHub y Netlify.

---

## 1. Arquitectura General

El sitio utiliza una arquitectura moderna de Jamstack para lograr un rendimiento óptimo, seguridad y una excelente experiencia de desarrollo.

-   **Astro (Framework de Frontend):** Actúa como un Generador de Sitios Estáticos (SSG). Durante el proceso de construcción, Astro compila los componentes, obtiene datos de fuentes externas y genera archivos HTML, CSS y JavaScript altamente optimizados. Su característica principal son las **"Islas de Astro"**, que permiten hidratar solo los componentes interactivos, enviando el mínimo JavaScript posible al cliente.

-   **Sanity.io (Headless CMS):** Es el sistema de gestión de contenido. Todos los textos, imágenes y datos estructurados del sitio se almacenan y gestionan en Sanity. El contenido se consume a través de su API mediante consultas GROQ.

-   **GitHub (Control de Versiones):** Es el repositorio central para todo el código fuente del proyecto. Actúa como la "única fuente de verdad" para el código.

-   **Netlify (Plataforma de Despliegue):** Automatiza el proceso de construcción y despliegue del sitio. Se conecta a GitHub y, cada vez que se actualiza el código, Netlify automáticamente construye el sitio y lo despliega en su red de distribución de contenido (CDN) global.

---

## 2. Estructura de Archivos Clave

```
/
├── dist/                     # Carpeta de salida (generada por `npm run build`)
├── public/                   # Archivos estáticos (favicons, fuentes, etc.)
├── src/
│   ├── components/           # Componentes reutilizables de Astro
│   │   ├── icons/            # Componentes de iconos SVG
│   │   └── SimbolismoNumericoCard.astro
│   ├── layouts/              # Plantillas de página (ej. Layout.astro)
│   ├── lib/                  # Lógica de negocio, como el cliente de Sanity
│   │   └── sanity.js
│   └── pages/                # Rutas del sitio (cada archivo es una página)
│       └── simbolismo.astro
├── .env                      # (Local) Variables de entorno (NO subir a Git)
├── .gitignore                # Archivos y carpetas a ignorar por Git
├── astro.config.mjs          # Configuración principal de Astro
├── netlify.toml              # Configuración de despliegue para Netlify
└── package.json              # Dependencias y scripts del proyecto
```

---

## 3. Flujo de Información y Acción

El proceso se divide en tres fases principales:

### Fase 1: Tiempo de Construcción (Build Time)

Ocurre en el servidor (en Netlify o en tu máquina local) cuando se ejecuta `npm run build`.

**Diagrama de Flujo (Build Time):**
```mermaid
graph TD
    A[Ejecución de `npm run build`] --> B{Astro inicia la construcción};
    B --> C[Analiza `src/pages/*.astro`];
    C --> D{Ejecuta el código del frontmatter (---)};
    D --> E[Llama a la función para obtener datos de Sanity];
    E --> F[Petición API a Sanity.io con consulta GROQ];
    F --> G{Sanity.io responde con datos en JSON};
    G --> H[La página recibe el JSON];
    H --> I{Renderiza componentes pasando los datos como `props`};
    I --> J[Los componentes (`.astro`) generan fragmentos de HTML];
    J --> K{Astro compila todo en archivos HTML estáticos};
    K --> L[Extrae y optimiza el CSS];
    K --> M[Identifica `<script>` como "Islas" y crea bundles de JS];
    L & M --> N[Guarda los archivos finales en la carpeta `dist/`];
```

**Pasos:**
1.  **Inicio:** Se ejecuta el comando `npm run build`.
2.  **Análisis de Páginas:** Astro recorre la carpeta `src/pages/` para encontrar todas las rutas del sitio.
3.  **Obtención de Datos:** El código en el frontmatter de cada página se ejecuta en el servidor. Esto incluye las llamadas a la API de Sanity para buscar el contenido.
4.  **Renderizado de Componentes:** Astro renderiza los componentes (`.astro`) con los datos obtenidos, convirtiéndolos en HTML puro.
5.  **Optimización de Assets:**
    -   El CSS de todos los componentes se agrupa, optimiza y minifica.
    -   El JavaScript dentro de las etiquetas `<script>` (Islas de Astro) se extrae y se empaqueta en pequeños archivos para ser cargados por el cliente solo cuando sea necesario.
6.  **Salida:** El resultado final es una carpeta `dist/` que contiene todo el sitio estático, listo para ser servido.

### Fase 2: Despliegue Continuo (CI/CD)

Este es el puente automatizado entre tu código y el sitio en vivo.

**Diagrama de Flujo (Despliegue):**
```mermaid
graph TD
    subgraph "Desarrollo Local"
        A[Desarrollador hace `git push` a GitHub]
    end

    subgraph "CI/CD (GitHub + Netlify)"
        A --> B{GitHub recibe el push};
        B --> C[Webhook notifica a Netlify];
        C --> D{Netlify inicia un nuevo despliegue};
        D --> E[1. Clona el repositorio];
        E --> F[2. Instala dependencias (`npm install`)];
        F --> G[3. Inyecta Variables de Entorno seguras];
        G --> H[4. Ejecuta `npm run build`];
        H --> I{¿Build Exitoso?};
        I -- Sí --> J[5. Despliega la carpeta `dist/` a su CDN global];
        I -- No --> K[6. Notifica el fallo y mantiene la versión anterior];
        J --> L[¡Sitio actualizado!];
    end
```

**Pasos:**
1.  **Push a GitHub:** El desarrollador envía los cambios al repositorio.
2.  **Webhook:** GitHub notifica automáticamente a Netlify que hay nuevo código.
3.  **Build en Netlify:** Netlify crea un entorno limpio, clona el código, instala las dependencias y ejecuta el proceso de **Build Time** descrito anteriormente. Utiliza las variables de entorno (ej. claves de API de Sanity) guardadas de forma segura en su plataforma.
4.  **Despliegue Atómico:** Si la construcción es exitosa, Netlify publica el contenido de la carpeta `dist/` en su CDN. Este proceso es "atómico", lo que significa que el sitio se actualiza instantáneamente sin tiempo de inactividad. Si falla, la versión anterior del sitio permanece activa.

### Fase 3: Tiempo de Ejecución (Runtime)

Ocurre en el navegador del usuario final cuando visita el sitio.

**Diagrama de Flujo (Runtime):**
```mermaid
graph TD
    A[Usuario navega al sitio] --> B{Navegador recibe HTML y CSS};
    B --> C[Renderiza la página (visible al instante)];
    C --> D{Astro carga el JS de las "Islas" interactivas};
    D --> E[El script JS añade `event listeners` (ej. al acordeón)];
    E --> F{Usuario interactúa (ej. hace clic)};
    F --> G[El JS manipula el DOM para mostrar/ocultar contenido];
```

**Pasos:**
1.  **Carga Inicial:** El navegador recibe el HTML y CSS pre-renderizados, mostrando la página muy rápidamente.
2.  **Hidratación:** El JavaScript mínimo necesario para los componentes interactivos (como el acordeón) se carga y se ejecuta.
3.  **Interactividad:** El script añade los manejadores de eventos. Cuando el usuario interactúa con un elemento, el JavaScript responde modificando el DOM (por ejemplo, cambiando clases para mostrar u ocultar un panel).

---

## 4. Configuración y Buenas Prácticas

### `netlify.toml`

Para asegurar que la configuración de despliegue sea consistente y parte del control de versiones, se utiliza un archivo `netlify.toml` en la raíz del proyecto.

```toml
# /netlify.toml

# Configuración principal del build.
[build]
  # Comando para construir el sitio.
  command = "npm run build"

  # Directorio que Netlify publicará.
  publish = "dist/"

# Variables de entorno para el proceso de construcción.
[build.environment]
  # Fija la versión de Node.js para evitar inconsistencias.
  NODE_VERSION = "18"
  # Flag para resolver conflictos de dependencias en npm.
  NPM_FLAGS = "--legacy-peer-deps"
```

Este archivo define explícitamente cómo Netlify debe construir el sitio, haciendo el proceso más robusto y predecible.

## 5. Arquitectura de Datos

Para entender cómo fluyen los datos desde el CMS hasta los componentes de Astro, consulta el siguiente documento:

- **[Arquitectura de Datos: Sanity y TypeScript](./ARQUITECTURA_DATOS.md)**