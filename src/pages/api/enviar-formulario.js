

import nodemailer from 'nodemailer';

// Configuración de Nodemailer para Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Debe ser una contraseña de aplicación de Google
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
  
  // Si la validación falla, registra los códigos de error para depuración.
  if (!data.success) {
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

