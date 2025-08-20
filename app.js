import express from "express";
import dotenv from "dotenv";
import connectionDB from "./db/connectionDB.js";
import userRouter from "./routers/user.js";
import petRouter from "./routers/pet.js";
import reminderRoute from "./routers/reminder.js";
import authRoutes from "./routers/authRoutes.js";
import adminRoute from "./routers/admin.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import petFoodRoute from "./routers/petFoodRoute.js";
import Checkout from "./routers/checkoutRoute.js";
import paymentRoutes from "./routers/paymentRoutes.js";
// import cron from "node-cron";
// import { checkAndSendReminders } from "./Utils/checkReminders.js";
import './reminderScheduler.js';

const app = express();
dotenv.config();
connectionDB();
app.use(express.json());
// app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "https://fur-get-not.vercel.app/",
    credentials: true,
  })
);

//user Router
app.use("/api/user", userRouter);

// pet Router
app.use("/api/pets", petRouter);

// reminder route
app.use("/api/reminders", reminderRoute);

// Google Auht
app.use("/api/auth", authRoutes);

//admin route
app.use("/api/admin", adminRoute);

app.use("/api/food", petFoodRoute);

//checkout
app.use("/api/order", Checkout);

//razor pay
app.use("/api/payment", paymentRoutes);

//msg system
// cron.schedule("*/15 * * * *", async () => {
//   console.log("🔔 Running scheduled reminder check...");
//   await checkAndSendReminders();
// });
// // Test Run (optional for dev)
// await checkAndSendReminders();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`runing at ${port}`);
});
