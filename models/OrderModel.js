import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  city: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true },
});

const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  image: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: customerSchema,
      required: true,
    },
    cart: {
      type: [cartItemSchema],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["COD", "Razorpay"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
