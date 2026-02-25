import Bull from "bull";
import { transporter } from "../Middlewares/Transporter.js";
import "dotenv/config";

console.log("Email queue worker starting...");

const redisUrl = process.env.REDIS_URL;

console.log("Using Redis URL:", redisUrl); // debug log

const emailQueue = new Bull("email-queue", redisUrl);

emailQueue.client
  .ping()
  .then((res) => console.log(" Redis connected:", res))
  .catch((err) => console.error(" Redis connection failed:", err));

emailQueue.process(async (job) => {
  console.log(" Processing job:", job.id);

  try {
    const { mailOptions } = job.data;
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    console.log("Message ID:", info.messageId);
  } catch (err) {
    console.error("Email sending failed:", err);
    throw err; // important so Bull marks job failed
  }
});

emailQueue.on("error", (err) => {
  console.error("Queue error:", err);
});

export default emailQueue;