
import nodemailer from 'nodemailer';
import fetch from 'node-fetch'; // Asegúrate de que node-fetch esté en tu package.json

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { nombre, email, asunto, mensaje, recaptchaToken } = JSON.parse(event.body);
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  // 1. Verificar el token de reCAPTCHA
  try {
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${recaptchaToken}`,
    });

    const recaptchaResult = await response.json();

    // Si la verificación falla, o el score es bajo, rechaza la solicitud.
    if (!recaptchaResult.success || recaptchaResult.score < 0.5) {
      console.warn('reCAPTCHA verification failed:', recaptchaResult['error-codes']);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Verificación de reCAPTCHA fallida. Inténtalo de nuevo.' }),
      };
    }

  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error en el servidor al verificar reCAPTCHA.' }),
    };
  }

  // 2. Si reCAPTCHA es válido, proceder a enviar el correo.
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${nombre}" <${email}>`, // Mejor formato para el remitente
    to: process.env.EMAIL_USER,
    subject: `Nuevo mensaje de contacto: ${asunto}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>Nuevo Mensaje del Formulario de Contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo Electrónico:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <hr>
        <h3>Mensaje:</h3>
        <p>${mensaje.replace(/\n/g, '<br>')}</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Formulario enviado con éxito' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al enviar el formulario' }),
    };
  }
};
