import express from "express";
import { createDonation,getDonationHistory } from "../Controllers/donationController.js";
import checkToken from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/donate", checkToken, createDonation);
router.get("/history", checkToken, getDonationHistory);

export default router;