
# Documentación del Componente: ContactForm.astro

## Descripción General

El componente `ContactForm.astro` renderiza un formulario de contacto completo, interactivo y seguro. Está diseñado para recopilar información del usuario (nombre, email, asunto y mensaje) y enviarla a un endpoint de API (`/api/enviar-formulario`). Incluye validación de campos en tiempo real, protección contra spam mediante Google reCAPTCHA v3 y feedback visual para el usuario durante el proceso de envío.

## Ubicación del Archivo

`src/components/ContactForm.astro`

## Props

Este componente no acepta ninguna `prop` (`Astro.props`). Su contenido y comportamiento son autónomos.

## Estructura y Funcionalidad

### Formulario HTML

- **Campos del Formulario**:
  - **Nombre Completo**: `input type="text"` con `id="nombre"`. Es un campo obligatorio.
  - **Correo Electrónico**: `input type="email"` con `id="email"`. Es obligatorio y valida el formato de email.
  - **Asunto**: `select` con `id="asunto"`. Es un campo de selección obligatorio con las opciones: "Encuentros", "Simbolismo Numérico", "Donaciones" y "Otro".
  - **Mensaje**: `textarea` con `id="mensaje"`. Es un campo de texto obligatorio.
- **Botón de Envío**: Un `button type="submit"` que inicia el proceso de validación y envío.

### Estilos (CSS)

- Utiliza clases de Tailwind CSS para el diseño responsivo y estilizado del formulario.
- Define estilos específicos para los mensajes de error (`.error-message`) y para los campos inválidos (`.form-input.invalid`), proporcionando feedback visual inmediato al usuario.
- Los mensajes de error ocupan un espacio fijo (`h-5`) para evitar saltos en el layout cuando aparecen.

### Comportamiento (JavaScript)

El componente incluye un script (`<script>`) que se ejecuta en el lado del cliente y gestiona toda la lógica del formulario.

1.  **Integración con reCAPTCHA v3**:
    - Carga el script de reCAPTCHA de forma asíncrona desde los servidores de Google.
    - La clave del sitio (`recaptchaSiteKey`) se define como una constante y se pasa al script del formulario.

2.  **Validación de Campos en Tiempo Real**:
    - Se activa cuando el usuario interactúa con los campos (eventos `blur` e `input`).
    - Utiliza la API de validación de HTML5 (`checkValidity`, `setCustomValidity`) para verificar los datos.
    - Muestra y oculta mensajes de error personalizados debajo de cada campo.
    - Añade o quita la clase `.invalid` para resaltar los campos con errores.

3.  **Envío del Formulario (Evento `submit`)**:
    - Previene el envío por defecto del navegador.
    - Realiza una validación completa de todos los campos antes de proceder.
    - Si el formulario es válido, solicita un token a reCAPTCHA para verificar que la interacción es legítima.
    - Deshabilita el botón de envío y muestra el texto "Enviando..." para evitar envíos duplicados.
    - Realiza una petición `fetch` de tipo `POST` al endpoint `/api/enviar-formulario` con los datos del formulario y el token de reCAPTCHA en formato JSON.
    - **Manejo de Respuesta**:
      - Si la respuesta es exitosa (`response.ok`), redirige al usuario a la página de agradecimiento (`/gracias`).
      - Si hay un error, muestra una alerta (`alert`) con el mensaje de error devuelto por la API.
    - **Finalización**: Restaura el estado original del botón de envío, tanto en caso de éxito como de error.

## Dependencias

- **Google reCAPTCHA v3**: Requiere una clave de sitio válida para funcionar.
- **Endpoint de API**: Depende de un endpoint funcional en `/api/enviar-formulario` que sepa cómo procesar los datos y el token de reCAPTCHA.

## Uso

Este componente está diseñado para ser insertado directamente en cualquier página de Astro donde se necesite un formulario de contacto, como `src/pages/contacto.astro`.

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
import ContactForm from '../components/ContactForm.astro';
---
<MainLayout title="Contacto">
  <ContactForm />
</MainLayout>
```
