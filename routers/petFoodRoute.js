// routes/petFoodRoute.js
import express from "express";
import { createPetFood, deleteProduct, getAllPetFood } from "../controller/petFoodController.js";
import upload from "../middleware/upload.js"; // ⬅️ import the upload middleware

const router = express.Router();

// Use 'upload.single("image")' to handle single image upload
router.post("/add", upload.single("image"), createPetFood); // ⬅️ added middleware here
router.get("/all", getAllPetFood);
router.delete("/product/:id",deleteProduct);


export default router;
