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

  const { mailOptions } = job.data;
  await transporter.sendMail(mailOptions);

  console.log(" Email sent successfully!");
});

emailQueue.on("error", (err) => {
  console.error("Queue error:", err);
});

export default emailQueue;