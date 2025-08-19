import express from "express"
import { adminLogin, adminLogout, adminRegistraion, deletePet, deleteUser, getAdminProfile, getAllOrders, getAllPetData, getAllUser, updateUser, verifyAdminToken } from "../controller/admin.js";

const router = express.Router();


router.route("/regitration/admin").post(adminRegistraion)
router.route("/login/admin").post(adminLogin)
router.get("/me", getAdminProfile);
router.get("/logout", adminLogout); // ✅ Add this
router.get("/verify-token", verifyAdminToken);
router.get("/alluser",getAllUser)
router.get("/gettpet",getAllPetData)
router.get("/orders/status", getAllOrders);
router.delete("/pet/:id",deletePet)
router.delete("/user/delete/:id",deleteUser)
router.put("/user/update/:id",updateUser)
export default router