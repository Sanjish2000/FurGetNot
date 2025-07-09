import Pet from "../models/pet.js";
import Reminder from "../models/reminder.js";
import { User } from "../models/user.js";

export const addReminder = async (req, res) => {
  try {
    const { petId, userId, title, description, dateTime } = req.body;

    // Step 1: Validate required fields
    if (!petId || !userId || !title || !dateTime) {
      return res.status(400).json({
        success: false,
        message: "petId, userId, title, and dateTime are required"
      });
    }

    // Step 2: Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Step 3: Check if pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found"
      });
    }

    // Step 4: Create and save reminder
    const reminder = await  Reminder.create({
      petId,
      userId,
      title,
      description,
      dateTime
    });

    return res.status(201).json({
      success: true,
      message: "Reminder added successfully",
      reminder
    });

  } catch (error) {
    console.error("Add Reminder Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding reminder"
    });
  }
};