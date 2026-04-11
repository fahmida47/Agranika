import express from "express";
import { getAdminDashboardStats, deleteUser } from "../Controllers/adminController.js";
import checkToken from "../Middlewares/authMiddleware.js";
import { isAdmin } from "../Middlewares/adminMiddleware.js";

const router = express.Router();


router.get("/stats", checkToken, isAdmin, getAdminDashboardStats);

router.delete("/user/:id", checkToken, isAdmin, deleteUser);

export default router;