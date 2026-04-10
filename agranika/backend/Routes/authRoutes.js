// Routes/authRoutes.js
import express from "express";
import checkToken from "../Middlewares/authMiddleware.js";
import { signup, login, logout } from "../Controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login",login);
router.post("/logout", checkToken, logout);

// Default export
export default router;