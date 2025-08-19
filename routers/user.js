import express from "express"
import { getMyProfile, login, logout, registration } from "../controller/user.js"
import { verifyToken } from "../controller/verifyTokenController.js"

const router = express.Router()
router.route("/register").post(registration)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.get("/me",getMyProfile)
router.get("/verify-token", verifyToken);


export default router