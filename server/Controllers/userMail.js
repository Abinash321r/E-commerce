import emailQueue from "../queues/emailQueue.js";

const getMailData = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const mailOptions = {
          from: `${process.env.TRANSPORTER_EMAIL}`, // replace with your Gmail email
          to: email,
          subject: `Subject: ${subject}`,
          text: `Dear ${name},\n\nThank you for reaching out to us. Your message has been received with the following details:\n\nMessage: ${message}\n\nWe will get back to you as soon as possible.\n\nBest regards`,
           };
    await emailQueue.add({ mailOptions });

    res.json({ message: "Email queued successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default getMailData;
