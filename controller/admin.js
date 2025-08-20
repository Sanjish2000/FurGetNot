import { Admin } from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import Pet from "../models/pet.js";
import Order from "../models/OrderModel.js";
import mongoose from "mongoose";

export const adminRegistraion = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // check user alerady exit

    const exitsAdmin = await Admin.findOne({ email });
    if (exitsAdmin) {
      return res.status(409).json({
        success: false,
        message: "admin emial alerady registred",
      });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // create admin
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "account created",
      admin: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        createdAt: newAdmin.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    const exitsAdmin = await Admin.findOne({ email });
    if (!exitsAdmin) {
      return res.status(401).json({
        success: false,
        message: "Admin Email is not Found please Registraor",
      });
    }
    const isMatch = await bcrypt.compare(password, exitsAdmin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invaild Credentials",
      });
    }
    const token = await jwt.sign(
      {
        adminId: exitsAdmin._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    // 🔹 Set JWT as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true on HTTPS
      sameSite: "None", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token, // added
      role: "admin", // added
      admin: {
        id: exitsAdmin._id,
        name: exitsAdmin.name,
        email: exitsAdmin.email,
        createdAt: exitsAdmin.createdAt,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// controllers/adminController.js

export const getAdminProfile = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. No token.",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const admin = await Admin.findById(decoded.adminId).select("-password");
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error("Error in getAdminProfile:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// controllers/adminController.js

export const adminLogout = async (req, res) => {
  try {
    // Clear the token cookie
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Expire now
    });

    return res.status(200).json({
      success: true,
      message: "Admin logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during logout",
    });
  }
};

export const verifyAdminToken = (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found. Please login again.",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if token is for an admin (optional: you can verify role if added in token)
    if (!decoded.adminId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access. Admin token required.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin token verified",
      adminId: decoded.adminId,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      users, // sending actual user data
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllPetData = async (req, res) => {
  try {
    const pets = await Pet.find().populate("ownerId", "name email");

    if (!pets || pets.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No pet found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Pet details",
      data: pets,
    });
  } catch (error) {
    console.error("Error fetching pets:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};


export const deletePet = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPet = await Pet.findByIdAndDelete(id);

    if (!deletedPet) {
      return res.status(404).json({ success: false, message: 'Pet not found' });
    }

    res.json({
      success: true,
      message: 'Pet deleted successfully',
      deletedPet
    });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting pet'
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'User deleted successfully',
      deletedUser
    });
  } catch (error) {
    console.error('Error deleting Usser', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting User'
    });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID format",
      });
    }

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { name, email, password } = req.body;

    if (name) existingUser.name = name;
    if (email) {
      const emailExists = await User.findOne({ email, _id: { $ne: id } });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already in use",
        });
      }
      existingUser.email = email;
    }
    if (password) {
      // If password is not hashed by Mongoose pre-save hook, hash manually:
      existingUser.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await existingUser.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating User",
    });
  }
};
