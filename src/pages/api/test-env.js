// src/pages/api/test-env.js

export async function GET() {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (secretKey) {
    // Para no exponer la clave completa, mostramos solo una parte.
    const partialKey = `${secretKey.substring(0, 4)}...${secretKey.substring(secretKey.length - 4)}`;
    return new Response(JSON.stringify({ 
      message: "La variable RECAPTCHA_SECRET_KEY está configurada.",
      partialKey: partialKey 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response(JSON.stringify({ 
      message: "Error: La variable RECAPTCHA_SECRET_KEY no se encontró." 
    }), { 
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
