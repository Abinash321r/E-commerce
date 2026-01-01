import Bull from "bull";
import { transporter } from "../Middlewares/Transporter.js";

const emailQueue = new Bull("email-queue", {
  redis: { host: "127.0.0.1", port: 6379 },
});

// Job Processor
emailQueue.process(async (job) => {
  const { mailOptions } = job.data;
  await transporter.sendMail(mailOptions);
  console.log("Email sent successfully!");
});

export default emailQueue;
