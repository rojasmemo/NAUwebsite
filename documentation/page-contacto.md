### Documentación de Página: `contacto.astro` y su Ecosistema

#### 1. Resumen y Propósito

La página de contacto (`/contacto`) permite a los usuarios enviar mensajes directamente al equipo de NAU. A diferencia de las páginas de contenido, esta es altamente interactiva y tiene una arquitectura más compleja que involucra:
1.  Un componente de formulario en el frontend (`ContactForm.astro`).
2.  Validación de datos en el navegador del usuario (JavaScript).
3.  Protección anti-spam con Google reCAPTCHA v3.
4.  Una **función sin servidor** (Serverless Function) en el backend (`api/enviar-formulario.js`) para procesar y enviar el correo electrónico de forma segura.

---

### 2. Flujo de Construcción (Build Time)

1.  **`contacto.astro`**: Durante el build, Astro simplemente renderiza esta página. Su única función es establecer el layout principal (`MainLayout.astro`) y renderizar el componente `ContactForm.astro` dentro de él.
2.  **`ContactForm.astro`**:
    *   Renderiza el HTML del formulario (`<form>`, `<input>`, etc.).
    *   Incluye el bloque `<script>` que contiene toda la lógica de validación y envío del formulario. Astro identifica este script como una **Isla de Astro**.
3.  **`api/enviar-formulario.js`**:
    *   Este archivo **no se convierte en HTML**. Astro lo identifica como un **"API Endpoint"** o función sin servidor.
    *   Durante el build, Netlify (o el adaptador de Astro) empaqueta este archivo para que esté listo para ejecutarse en su infraestructura de backend cuando reciba una petición.

---

### 3. Flujo de Runtime y Envío del Formulario

Este es el flujo principal y ocurre enteramente en el navegador del usuario y en la infraestructura de Netlify.

**Diagrama de Flujo (Runtime):**

```mermaid
graph TD
    subgraph "Navegador del Usuario"
        A[Usuario visita /contacto] --> B[Se carga el HTML y el CSS];
        B --> C[Se carga el script de reCAPTCHA de Google];
        B --> D[Se carga el script de la Isla de Astro (`ContactForm.astro`)];
        D --> E[El script añade `event listeners` para validación y envío];
        E --> F[Usuario rellena el formulario y hace clic en "Enviar"];
        F --> G{Se ejecuta el `event listener` del 'submit'};
        G --> H{1. Se valida el formulario en el cliente};
        H -- Válido --> I[2. Se ejecuta `grecaptcha.execute()`];
        H -- Inválido --> J[Muestra mensajes de error y detiene el envío];
        I --> K[Google devuelve un `recaptchaToken`];
        K --> L[3. Se realiza una petición `fetch` a `/api/enviar-formulario`];
        L -- Envía JSON (datos + token) --> M;
        M -- Recibe respuesta de la API --> N;
        N -- OK --> O[Redirige a `/gracias`];
        N -- Error --> P[Muestra un `alert` con el error];
    end

    subgraph "Backend (Netlify Functions)"
        M[API Endpoint recibe la petición POST];
        M --> Q{1. Valida que los datos y el token existan};
        Q --> R[2. Llama a la API de Google para verificar el `recaptchaToken`];
        R --> S{¿Token válido y score > 0.5?};
        S -- Sí --> T[3. Usa `nodemailer` para enviar el correo electrónico];
        T --> U[4. Devuelve una respuesta `200 OK`];
        S -- No --> V[Devuelve una respuesta `403 Forbidden`];
        Q -- Faltan datos --> W[Devuelve una respuesta `400 Bad Request`];
        T -- Error de envío --> X[Devuelve una respuesta `500 Server Error`];
    end
    
    U --> N;
    V --> N;
    W --> N;
    X --> N;
```

**Pasos Detallados:**

1.  **Carga de la Página:** El usuario ve el formulario HTML. Mientras tanto, se cargan dos scripts de forma asíncrona: la librería reCAPTCHA de Google y el script de `ContactForm.astro`.
2.  **Validación en el Cliente:** El script del formulario añade "oyentes" a los campos. Si el usuario introduce datos incorrectos o deja un campo vacío, aparecen mensajes de error en tiempo real sin necesidad de recargar la página.
3.  **Envío y reCAPTCHA:**
    *   Al hacer clic en "Enviar", primero se ejecuta la validación.
    *   Si es válida, se pide un token a reCAPTCHA. Este token es una prueba de que la interacción probablemente proviene de un humano.
    *   Se empaquetan los datos del formulario y el token en un objeto JSON.
4.  **Llamada a la API:** Se envía este JSON mediante una petición `POST` a la ruta `/api/enviar-formulario`.
5.  **Procesamiento en el Backend (Función Sin Servidor):**
    *   El código de `enviar-formulario.js` se ejecuta en un servidor de Netlify.
    *   **Seguridad:** Primero, verifica el `recaptchaToken` con Google. Esto evita que los bots envíen spam directamente a tu API.
    *   **Envío de Correo:** Si la verificación es exitosa, utiliza `nodemailer` para enviar el correo. Las credenciales (`EMAIL_USER`, `EMAIL_PASS`) se obtienen de las **variables de entorno** configuradas en Netlify, manteniéndolas seguras y fuera del código fuente.
6.  **Respuesta y Redirección:**
    *   La función sin servidor devuelve una respuesta de éxito o error.
    *   El script en el navegador recibe esta respuesta. Si fue exitosa (`200 OK`), redirige al usuario a la página de agradecimiento. Si no, muestra un mensaje de error.
