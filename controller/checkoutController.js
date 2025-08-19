import Order from "../models/OrderModel.js";

export const placeOrder = async (req, res) => {
  try {
    // console.log("Received order data:", req.body);
    const {
      name,
      address,
      pincode,
      city,
      number,
      email,
      cart,
      totalAmount,
      paymentType = "COD",
    } = req.body;
    // console.log(req.body);

    if (
      !name ||
      !address ||
      !pincode ||
      !city ||
      !number ||
      !email ||
      !cart ||
      !totalAmount
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all order details",
      });
    }
    // Validate payment type
    const allowedPaymentTypes = ["COD", "Razorpay"];
    if (!allowedPaymentTypes.includes(paymentType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment type. Allowed values are COD or Razorpay.",
      });
    }

    const order = new Order({
      customer: {
        userID: req.id,
        name,
        address,
        pincode,
        city,
        number,
        email,
      },
      cart,
      paymentType, // new field
      totalAmount,
    });

    await order.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order placement error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while placing the order.",
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    // The userID is available from req.id, set by the isAuthenticated middleware
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found. Please ensure you are authenticated.",
      });
    }

    // Find all orders where the customer.userID matches the authenticated user's ID
    const orders = await Order.find({ "customer.userID": userId }).sort({
      createdAt: -1,
    }); // Sort by creation date, newest first

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user orders.",
    });
  }
};
