import express from "express";
import { createDonation } from "../Controllers/donationController.js";
import checkToken from "../Middlewares/authMiddleware.js"; // Middleware import koren

const router = express.Router();

// POST /api/donation/create (Ekhane checkToken must)
router.post("/donate", checkToken, createDonation);

export default router;