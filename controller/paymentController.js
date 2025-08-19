import Razorpay from "razorpay";
import { RAZORPAY_KEY_ID, RAZORPAY_SECRET } from "../config.js"; // Adjust path if needed

const instance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET,
});

export const createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount , // in paise
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Order creation failed" });
  }
};
