import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (mailOptions) => {
  return await resend.emails.send({
    from: `${process.env.SENDER_EMAIL}`, //  Resend default sender
    to: mailOptions.to,
    subject: mailOptions.subject,
    text: mailOptions.text,
    html: mailOptions.html, // optional
  });
};