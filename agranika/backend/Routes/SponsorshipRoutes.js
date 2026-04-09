import express from "express";
import { createSponsor } from "../Controllers/SponsorshipController.js";
import authenticateToken from "../Middlewares/authMiddleware.js";

const router = express.Router();

// ei route e token optional, jodi login thake
router.post("/sponsors", authenticateToken, createSponsor);

export default router;