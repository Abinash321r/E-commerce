 import nodemailer from 'nodemailer';
 import 'dotenv/config';

export const transporter = nodemailer.createTransport({
 service: "gmail",
  auth: {
    user: process.env.TRANSPORTER_EMAIL,
    pass: process.env.TRANSPORTER_PASSWORD, // Gmail App Password
  },
});