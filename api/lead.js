import nodemailer from "nodemailer";

export default async function handler(req, res) {
  const { name, email } = req.body;

  await fetch(process.env.SHEET_URL, {
    method: "POST",
    body: JSON.stringify({ name, email })
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: "New Chatbot Lead",
    text: `${name} - ${email}`
  });

  res.json({ success: true });
}
