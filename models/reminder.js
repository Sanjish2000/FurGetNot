import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String
  },

  dateTime: {
    type: Date,
    required: true
  },

  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: /^[0-9]{10}$/  // Optional: Validate Indian mobile numbers (10 digits)
  },

  isDone: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;
