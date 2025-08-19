// controllers/petFoodController.js
// import petFoodModel from "../models/petFoodModel.js";
import PetFood from "../models/petFoodModel.js";

export const createPetFood = async (req, res) => {
  try {
    const { name, description, price, quantity, type, rating } = req.body;

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : "";

    const newFood = new PetFood({
      name,
      description,
      price,
      quantity, // 
      type,
      rating,
      image: imageUrl,
    });

    await newFood.save();

    res.status(201).json({ message: "Pet food added successfully", newFood });
  } catch (error) {
    res.status(500).json({ message: "Error adding pet food", error });
  }
};

export const getAllPetFood = async (req, res) => {
  try {
    const foodList = await PetFood.find();
    res.status(200).json({ success: true, foodList });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await PetFood.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({
      success: true,
      message: 'product deleted successfully',
      deleteProduct
    });
  } catch (error) {
    console.error('Error deleting product', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product'
    });
  }
};