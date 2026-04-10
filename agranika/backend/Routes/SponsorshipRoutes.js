import express from "express";
import { createSponsor } from "../Controllers/SponsorshipController.js";
import checkToken from "../Middlewares/authMiddleware.js"; // Middleware import koren

const router = express.Router();

// 🛑 POST request-er age checkToken boshiye dilam
router.post("/sponsor", checkToken, createSponsor);

export default router;