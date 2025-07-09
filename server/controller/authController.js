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

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true on HTTPS
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ success: true, message: "Login Successful", user });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ success: false, message: "Google Login Failed" });
  }
};
