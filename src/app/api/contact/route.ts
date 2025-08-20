import nodemailer from "nodemailer";

export async function POST(req: any) {
    try {
        const { name, email, organization, location, whatsapp, message } = await req.json();

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const html = `
      <h2>AI English — Demo Request</h2>
      <p><strong>Name:</strong> ${name || ""}</p>
      <p><strong>Email:</strong> ${email || ""}</p>
      <p><strong>Organization:</strong> ${organization || ""}</p>
      <p><strong>Location:</strong> ${location || ""}</p>
      <p><strong>WhatsApp:</strong> ${whatsapp || ""}</p>
      <p><strong>Message:</strong><br/>${(message || "").replace(/\n/g, "<br/>")}</p>
    `;

        await transporter.sendMail({
            from: `"AI English Website" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
            to: "bobby.lian@docai.net",
            subject: "New Demo Request — AI English",
            html,
        });

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: "Email failed to send." }), { status: 500 });
    }
}
