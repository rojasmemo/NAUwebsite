import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Por defecto, Astro pre-renderiza todas las páginas y endpoints a HTML estático.
// Para un endpoint de API que necesita ejecutarse en el servidor en cada petición,
// debemos deshabilitar el pre-renderizado explícitamente.
export const prerender = false;

// Las variables de entorno se cargan automáticamente desde el .env por Astro
const recaptchaSecretKey = import.meta.env.RECAPTCHA_SECRET_KEY;

// Función de ayuda para sanitizar el input del usuario y prevenir ataques XSS.
const sanitize = (str: string | null | undefined) => {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};

export const GET: APIRoute = ({ redirect }) => {
  // Esta ruta es solo para POST. Si alguien intenta acceder con GET,
  // devolvemos un error 405 "Método no permitido", que es la práctica estándar.
  // Alternativamente, podrías redirigir al usuario a la página de contacto:
  // return redirect('/contacto', 307);
  return new Response(null, { status: 405, statusText: 'Method Not Allowed' });
};

// Definimos un esquema de validación con Zod para el formulario.
// Esto nos da validación de tipos y contenido en un solo lugar.
const contactFormSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido." }),
  email: z.string().email({ message: "El formato del correo electrónico no es válido." }),
  asunto: z.string().min(1, { message: "El asunto es requerido." }),
  mensaje: z.string().min(1, { message: "El mensaje es requerido." }),
  recaptchaToken: z.string().min(1, { message: "El token de reCAPTCHA es requerido." }),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // 1. Validación de campos con Zod
    const validationResult = contactFormSchema.safeParse(data);
    if (!validationResult.success) {
      // Devolvemos el primer error encontrado para simplificar el frontend.
      const firstError = validationResult.error.errors[0].message;
      return new Response(JSON.stringify({ message: firstError }), { status: 400 });
    }
    const { nombre, email, asunto, mensaje, recaptchaToken } = validationResult.data;

    // 2. Verificación del token de reCAPTCHA
    const recaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const recaptchaResponse = await fetch(recaptchaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${recaptchaSecretKey}&response=${recaptchaToken}`,
    });
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.error('Verificación de reCAPTCHA fallida:', recaptchaData['error-codes']);
      return new Response(JSON.stringify({ message: "Verificación de reCAPTCHA fallida. ¿Eres un robot?" }), { status: 400 });
    }

    // 3. Envío del correo electrónico usando Nodemailer
    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST,
      port: Number(import.meta.env.SMTP_PORT),
      secure: true, // true para puerto 465, false para otros
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"NAU Web" <${import.meta.env.SMTP_USER}>`,
      to: 'naufundacion@gmail.com', // Tu correo de destino
      replyTo: email, // El correo del usuario que llena el formulario
      subject: `Nuevo contacto: ${sanitize(asunto)}`,
      html: `
        <h1>Nuevo Mensaje desde la Web de NAU</h1>
        <p><strong>Nombre:</strong> ${sanitize(nombre)}</p>
        <p><strong>Email:</strong> <a href="mailto:${sanitize(email)}">${sanitize(email)}</a></p>
        <p><strong>Asunto:</strong> ${sanitize(asunto)}</p>
        <hr>
        <p><strong>Mensaje:</strong></p>
        <p>${sanitize(mensaje).replace(/\n/g, '<br>')}</p>
      `,
    });

    // 4. Si todo va bien, devolvemos una respuesta JSON de éxito.
    return new Response(JSON.stringify({ message: "¡Mensaje enviado con éxito!" }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error en el servidor." }), { status: 500 });
  }
};