import express from "express"
import { addReminder, getAllReminders, markReminderDone, petReminderDelete } from "../controller/reminder.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
const router = express.Router()

router.route("/add/").post(isAuthenticated,addReminder)
router.route("/gett/reminder").get(isAuthenticated,getAllReminders)
// DELETE /api/reminders/:id
router.delete("/delete/:id", isAuthenticated, petReminderDelete);
router.put("/done/:id", isAuthenticated, markReminderDone);


export default router