import admin from "../firebase-admin.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js"; // Your mongoose model

export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;
    const decoded = await admin.auth().verifyIdToken(idToken);
    const { uid, name, email, picture } = decoded;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, avatar: picture, googleId: uid });
    }

    const token = jwt.sign({ userID: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    // 🔹 Save JWT as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token, // ✅ Added
      role: "user", // ✅ Added
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ success: false, message: "Google Login Failed" });
  }
};
