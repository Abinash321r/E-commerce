import Bull from "bull";
import { transporter } from "../Middlewares/Transporter.js";
import "dotenv/config";

console.log("Email queue worker starting...");

let emailQueue;

if (process.env.REDIS_URL) {
  emailQueue = new Bull("email-queue", {
    redis: {
      url: process.env.REDIS_URL
    },
  });
} else {
  emailQueue = new Bull("email-queue", {
    redis: {
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: process.env.REDIS_PORT || 6379,
    },
  });
}

emailQueue.client
  .ping()
  .then((res) => console.log(" Redis connected:", res))
  .catch((err) => console.error("Redis connection failed:", err));

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