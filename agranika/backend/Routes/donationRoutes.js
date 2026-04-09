import express from "express";
import { createDonation, authenticateToken } from "../Controllers/donationController.js";

const router = express.Router();

// Optional: login required
router.post("/donate", authenticateToken, createDonation);

export default router;