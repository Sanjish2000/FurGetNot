import express from "express";
import { getUserOrders, placeOrder } from "../controller/checkoutController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js"


const router = express.Router();

router.post("/create",isAuthenticated, placeOrder);
router.get("/getallorders",isAuthenticated, getUserOrders);

export default router;
