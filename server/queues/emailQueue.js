import Bull from "bull";
import { transporter } from "../Middlewares/Transporter.js";
import 'dotenv/config';

const emailQueue = new Bull("email-queue", {
  redis: { host:`${process.env.REDIS_HOST}`, port: `${process.env.REDIS_PORT}` },
});

// Job Processor
emailQueue.process(async (job) => {
  const { mailOptions } = job.data;
  await transporter.sendMail(mailOptions);
  console.log("Email sent successfully!");
});

export default emailQueue;
