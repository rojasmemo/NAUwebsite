

import nodemailer from 'nodemailer';

// Configuración de Nodemailer usando las variables de entorno de Netlify
const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function validateRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secretKey}&response=${token}`,
  });

  const data = await response.json();
  
  // Log detallado de la respuesta de Google
  console.log("Respuesta de la API de reCAPTCHA:", JSON.stringify(data, null, 2));

  if (!data.success) {
    // Log de los códigos de error si la validación falla
    console.error("Falló la verificación de reCAPTCHA. Códigos de error:", data['error-codes']);
  }

  return data.success && data.score >= 0.5; // Umbral de puntuación de reCAPTCHA v3
}

export async function POST({ request }) {
  if (request.headers.get("Content-Type") !== "application/json") {
    return new Response(JSON.stringify({ message: "Tipo de contenido no permitido" }), { status: 400 });
  }

  const { nombre, email, asunto, mensaje, recaptchaToken } = await request.json();

  if (!nombre || !email || !asunto || !mensaje || !recaptchaToken) {
    return new Response(JSON.stringify({ message: "Faltan campos obligatorios" }), { status: 400 });
  }

  const isRecaptchaValid = await validateRecaptcha(recaptchaToken);

  if (!isRecaptchaValid) {
    return new Response(JSON.stringify({ message: "Verificación de reCAPTCHA fallida" }), { status: 403 });
  }

  const mailOptions = {
    from: `"${nombre}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // El correo se envía a ti mismo
    replyTo: email,
    subject: `Nuevo mensaje de contacto: ${asunto}`,
    html: `
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${asunto}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: "Mensaje enviado con éxito" }), { status: 200 });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return new Response(JSON.stringify({ message: "Error al enviar el correo" }), { status: 500 });
  }
}

