import express from "express"
import { addPet, deletePet, getallPet, updatePet } from "../controller/pet.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import upload from '../middleware/upload.js';

import multer from "multer";
import path from "path";
import fs from "fs";
const uploadPath = "uploads";

// Ensure directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});


const router = express.Router()

router.route("/addpet").post(isAuthenticated ,upload.single("image") , addPet)
router.route("/:ID").delete(deletePet)
router.route("/update/:id").put(isAuthenticated,upload.single("image"),updatePet)
router.route("/getallpets").get(isAuthenticated, getallPet)
export default router;