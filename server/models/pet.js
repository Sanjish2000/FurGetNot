import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  type: {
    type: String,
    enum: ['Dog', 'Cat', 'Bird', 'Cow', 'Rabbit'], // You can expand this
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  breed: {
    type: String,
    required: true
  },

  image: {
    type: String // Image URL or file path
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Pet = mongoose.model('Pet', petSchema);

export default Pet;
