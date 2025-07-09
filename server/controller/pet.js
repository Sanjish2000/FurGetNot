import Pet from "../models/pet.js";
import { User } from "../models/user.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const addPet = async (req, res) => {
  try {
    const ownerId = req.id;
    const { name, type, age, breed } = req.body;

    if (!name || !type || !age || !breed) {
      return res.status(400).json({
        success: false,
        message: "All fields except image are required",
      });
    }

    const allowedTypes = ['Dog', 'Cat', 'Bird', 'Cow', 'Rabbit'];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid pet type",
      });
    }

    const user = await User.findById(ownerId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    const newPet = await Pet.create({
      ownerId,
      name,
      type,
      age,
      breed,
      image: req.file ? req.file.filename : null, // ✅ file name if uploaded
    });

    return res.status(201).json({
      success: true,
      message: "Pet added successfully",
      pet: newPet
    });

  } catch (error) {
    console.error("Add Pet Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding pet"
    });
  }
};

export const deletePet = async (req, res) => {
  try {
    const  id  = req.params.ID
    // console.log(`correct id ${id}`);

    const pet = await Pet.findById(id);
    console.log("Found Pet:", pet);

      if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Pet ID format" });
    }


    const deletedPet = await Pet.findByIdAndDelete(id);

    if (!deletedPet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pet deleted successfully",
      pet: deletedPet
    });

  } catch (error) {
    console.error("Delete Pet Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting pet",
    });
  }
};

export const updatePet = async (req, res) => {
  try {
    const id = req.params.id; // use lowercase "id", not "ID"

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Pet ID format",
      });
    }

    const existingPet = await Pet.findById(id);
    if (!existingPet) {
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    // ✅ Access fields from req.body
    const { name, type, age, breed } = req.body;

    if (name) existingPet.name = name;
    if (type) existingPet.type = type;
    if (age) existingPet.age = age;
    if (breed) existingPet.breed = breed;

    // ✅ Update image if a new one was uploaded
    if (req.file) {
      existingPet.image = req.file.filename;
    }

    const updatedPet = await existingPet.save();

    res.status(200).json({
      success: true,
      message: "Pet updated successfully",
      pet: updatedPet,
    });
  } catch (error) {
    console.error("Update Pet Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating pet",
    });
  }
};

export const getallPet=async(req,res)=>{
  try {
    const ownerId= req.id
    if(!ownerId){
      return res.status(401).json({
        success:false,
        message:"Unauthorize user ID token is not found"
      })

    }
    const pets = await Pet.find({ownerId})
    return res.status(200).json({
      success:true,
      pets,
    })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:"Internal Server Error"
    })
    
  }
}