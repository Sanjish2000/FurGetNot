// models/petFoodModel.js
import mongoose from "mongoose";

const petFoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  image: String,
  type: {
    type: String,
    enum: ["cat", "dog", "rabbit", "cow"], // restrict to cat, dog, rabbit, cow
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  quantity: {  // <-- added this field
    type: Number,
    required: true,
    min: 0,
    default: 0, // default no stock
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("PetFood", petFoodSchema);
