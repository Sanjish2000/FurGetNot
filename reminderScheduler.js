// reminderScheduler.js
import dotenv from "dotenv";
dotenv.config();
import "./db/connectionDB.js"; // Import your DB connection file
import cron from "node-cron";
import dayjs from "dayjs";
import Reminder from "./models/reminder.js";
import twilio from "twilio";

// ---- Twilio Setup (your credentials) ----
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = twilio(accountSid, authToken);

// ---- CRON job: runs every minute ----
cron.schedule("* * * * *", async () => {
  console.log(`[${dayjs().format()}] 🔍 Checking reminders...`);

  try {
    const now = dayjs();
    const timeWindowStart = now.subtract(1, "minute");
    const timeWindowEnd = now.add(1, "minute");

    // Find reminders due now and not sent yet
    const dueReminders = await Reminder.find({
      isDone: false,
      dateTime: {
        $gte: timeWindowStart.toDate(),
        $lte: timeWindowEnd.toDate(),
      },
    });

    for (const reminder of dueReminders) {
      const messageBody = `🐾 Pet Reminder 🐾
Title: ${reminder.title}
Description: ${reminder.description}
Date: ${dayjs(reminder.dateTime).format("DD MMM YYYY")}
Location: https://maps.app.goo.gl/FFvvUNkyZz8yWtVTA?g_st=aw`;

      try {
        await client.messages.create({
          body: messageBody,
          messagingServiceSid: "MG8fbf81d99dcac06f591315216f105eb9", // your Messaging Service SID
          to: `+91${reminder.phoneNumber}`, // assuming Indian numbers
        });

        // Mark as sent
        reminder.isDone = true;
        await reminder.save();

        console.log(`✅ SMS sent to ${reminder.phoneNumber}`);
      } catch (smsErr) {
        console.error(
          `❌ Failed to send SMS to ${reminder.phoneNumber}:`,
          smsErr
        );
      }
    }
  } catch (err) {
    console.error("❌ Error checking reminders:", err);
  }
});
