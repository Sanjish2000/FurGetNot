import express from "express"
import { addReminder } from "../controller/reminder.js"
const router = express.Router()
router.route("/add").post(addReminder)

export default router