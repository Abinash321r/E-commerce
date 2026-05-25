import emailjs from '@emailjs/nodejs';
import 'dotenv/config';

export const sendEmail = async (mailOptions) => {
  try {
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,    
      process.env.EMAILJS_TEMPLATE_ID,   
      {
        email: mailOptions.to,
        subject: mailOptions.subject,
        message: mailOptions.text || mailOptions.html,
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY, // Highly recommended for backend security
      }
    );
    
    console.log('SUCCESS!', response.status, response.text);
    return response;
  } catch (error) {
    console.error('FAILED...', error);
    throw error;
  }
};