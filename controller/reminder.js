import Pet from "../models/pet.js";
import Reminder from "../models/reminder.js";
import { User } from "../models/user.js";

export const addReminder = async (req, res) => {
  try {
    const { petId, title, description, dateTime, phoneNumber } = req.body;
    const userId = req.id; // User ID from token

    // Step 1: Validate required fields
    if (!petId || !title || !dateTime || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "petId, title, dateTime, and phoneNumber are required",
      });
    }

    // Step 2: Validate user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Step 3: Validate pet and ownership
    const pet = await Pet.findOne({ _id: petId, ownerId: userId }); // check if this pet belongs to this user
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found or doesn't belong to user",
      });
    }

    // Step 4: Create reminder
    const reminder = await Reminder.create({
      petId,
      userId,
      title,
      description,
      dateTime,
      phoneNumber,
    });

    return res.status(201).json({
      success: true,
      message: "Reminder added successfully",
      reminder,
    });

  } catch (error) {
    console.error("Add Reminder Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding reminder",
    });
  }
};
export const getAllReminders = async (req, res) => {
  try {
    const userId = req.id; // ✅ From token middleware

    // ✅ Populate both petId and userId
    const reminders = await Reminder.find({ userId })
      .populate("petId")               // all pet details
      .populate("userId", "name");     // only fetch 'name' field of user

    if (!reminders || reminders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reminders found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Reminders fetched successfully",
      reminders,
    });

  } catch (error) {
    console.error("Error while getting reminders:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const petReminderDelete = async (req, res) => {
  try {
    const reminderId = req.params.id;
    const userId = req.id; // from isAuthenticated middleware

    // 1. Find the reminder by ID and user
    const reminder = await Reminder.findOne({ _id: reminderId, userId });

    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found or unauthorized access",
      });
    }

    // 2. Delete the reminder
    await Reminder.deleteOne({ _id: reminderId });

    return res.status(200).json({
      success: true,
      message: "Reminder deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting reminder:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting reminder",
    });
  }
};


// controllers/reminderController.js
export const markReminderDone = async (req, res) => {
  try {
    const reminderId = req.params.id;

    const updated = await Reminder.findByIdAndUpdate(
      reminderId,
      { isDone: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Reminder not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Reminder marked as done",
      reminder: updated,
    });
  } catch (error) {
    console.error("Error updating reminder:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
