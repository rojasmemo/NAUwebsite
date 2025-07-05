
const nodemailer = require('nodemailer');
const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { nombre, email, telefono, asunto, mensaje, recaptchaToken } = JSON.parse(event.body);

  // 1. Verify reCAPTCHA v3 Token
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaToken}`;

  try {
    const recaptchaResult = await axios.post(verificationURL);
    const { success, score } = recaptchaResult.data;

    // Consider a score > 0.5 as legitimate
    if (!success || score < 0.5) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Verificación de reCAPTCHA fallida. Inténtalo de nuevo.' }),
      };
    }
  } catch (error) {
    console.error('Error al verificar reCAPTCHA:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error en el servidor durante la verificación de reCAPTCHA.' }),
    };
  }

  // 2. Send Email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${nombre}" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `Nuevo mensaje de contacto: ${asunto}`,
    html: `
      <p>Has recibido un nuevo mensaje (verificado con reCAPTCHA v3).</p>
      <h2>Detalles del Contacto:</h2>
      <ul>
        <li><strong>Nombre:</strong> ${nombre}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</li>
        <li><strong>Asunto:</strong> ${asunto}</li>
      </ul>
      <h2>Mensaje:</h2>
      <p>${mensaje}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Mensaje enviado con éxito.' }),
    };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Hubo un error al enviar el mensaje.' }),
    };
  }
};
