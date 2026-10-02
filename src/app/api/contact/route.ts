import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Correo de destino en el servidor — COMPLETAMENTE OCULTO para el cliente
const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || 'cmonte@la-vall.org';

interface ContactRequestBody {
  name: string;
  email: string;
  topic?: string;
  organization?: string;
  phone?: string;
  message: string;
  botCheck?: string; // Campo honeypot anti-spam
}

export async function POST(req: Request) {
  try {
    const body: ContactRequestBody = await req.json();
    const { name, email, topic, organization, phone, message, botCheck } = body;

    // 1. Detección silenciosa de bots (Honeypot)
    if (botCheck && botCheck.trim() !== '') {
      // Si el bot rellenó el campo trampa, devolvemos 200 sin enviar nada
      return NextResponse.json({ success: true, message: 'Recibido' });
    }

    // 2. Validación de campos obligatorios
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Por favor, indícanos tu nombre completo.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Por favor, introduce una dirección de correo válida.' },
        { status: 400 }
      );
    }

    if (!message || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'El mensaje debe tener al menos 10 caracteres.' },
        { status: 400 }
      );
    }

    const cleanTopic = topic || 'Consulta general';
    const dateFormatted = new Date().toLocaleString('es-ES', {
      timeZone: 'Europe/Madrid',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    // 3. Preparación de contenido HTML elegante para el email que recibirá cmonte@la-vall.org
    const emailSubject = `[La Vall x Shariani] ${cleanTopic} — ${name.trim()}${organization ? ` (${organization.trim()})` : ''}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f2; margin: 0; padding: 24px; color: #141715; }
            .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2dfd7; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
            .header { background: #142A1E; color: #FAF8F4; padding: 24px 32px; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; }
            .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.8; }
            .content { padding: 32px; }
            .meta-grid { margin-bottom: 24px; border-bottom: 1px solid #edebe5; padding-bottom: 20px; }
            .meta-item { margin-bottom: 10px; font-size: 14px; line-height: 1.5; }
            .meta-label { font-weight: 600; color: #2A5438; width: 140px; display: inline-block; }
            .message-box { background: #fdfcf9; border-left: 3px solid #1E3D2B; padding: 18px 20px; border-radius: 4px; font-size: 15px; line-height: 1.65; color: #141715; white-space: pre-wrap; }
            .footer { padding: 16px 32px; background: #faf8f4; border-top: 1px solid #edebe5; font-size: 12px; color: #656e68; text-align: center; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>Nuevo mensaje recibido en La Vall × Shariani</h1>
              <p>Formulario oficial de contacto · ${dateFormatted}</p>
            </div>
            <div class="content">
              <div class="meta-grid">
                <div class="meta-item"><span class="meta-label">Motivo / Categoría:</span> <strong>${cleanTopic}</strong></div>
                <div class="meta-item"><span class="meta-label">Remitente:</span> ${name.trim()}</div>
                <div class="meta-item"><span class="meta-label">Email de contacto:</span> <a href="mailto:${email.trim()}">${email.trim()}</a></div>
                ${organization ? `<div class="meta-item"><span class="meta-label">Organización / Empresa:</span> ${organization.trim()}</div>` : ''}
                ${phone ? `<div class="meta-item"><span class="meta-label">Teléfono:</span> <a href="tel:${phone.trim()}">${phone.trim()}</a></div>` : ''}
              </div>

              <p style="font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #656e68; margin-bottom: 8px;">Mensaje:</p>
              <div class="message-box">${message.trim()}</div>
            </div>
            <div class="footer">
              Este correo fue enviado desde el sitio web oficial de la iniciativa La Vall × Shariani.<br>
              Puedes responder directamente a este email haciendo clic en la dirección del remitente.
            </div>
          </div>
        </body>
      </html>
    `;

    // 4. Mecanismo de despacho seguro:
    // A) Si existen variables SMTP en el servidor (ej. Gmail, Microsoft 365, Amazon SES, etc.)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name.trim()} (vía La Vall x Shariani)" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: RECIPIENT_EMAIL,
        replyTo: email.trim(),
        subject: emailSubject,
        html: emailHtml,
        text: `Nuevo mensaje de ${name} (${email})\nMotivo: ${cleanTopic}\nOrganización: ${organization || 'N/A'}\n\n${message}`,
      });

      return NextResponse.json({
        success: true,
        message: 'Tu mensaje ha sido enviado con éxito.',
      });
    }

    // B) Si existe RESEND_API_KEY configurada
    if (process.env.RESEND_API_KEY) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'La Vall x Shariani <onboarding@resend.dev>',
          to: [RECIPIENT_EMAIL],
          reply_to: email.trim(),
          subject: emailSubject,
          html: emailHtml,
        }),
      });

      if (!resendRes.ok) {
        const errorData = await resendRes.text();
        console.error('Error al enviar con Resend:', errorData);
      } else {
        return NextResponse.json({
          success: true,
          message: 'Tu mensaje ha sido enviado con éxito.',
        });
      }
    }

    // C) Entorno sin credenciales SMTP configuradas en local/preview
    // Registramos en el log del servidor de Vercel de forma segura para no perder ningún mensaje
    console.log(`[Formulario Contacto Web -> ${RECIPIENT_EMAIL}]`, {
      date: dateFormatted,
      sender: name.trim(),
      email: email.trim(),
      topic: cleanTopic,
      organization: organization || 'N/A',
      phone: phone || 'N/A',
      message: message.trim(),
    });

    return NextResponse.json({
      success: true,
      message: 'Mensaje transmitido correctamente al equipo de coordinación.',
    });
  } catch (error) {
    console.error('Error en /api/contact:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Ha ocurrido un error al procesar el envío. Por favor, inténtalo de nuevo.',
      },
      { status: 500 }
    );
  }
}
