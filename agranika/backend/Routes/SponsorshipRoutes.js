import express from "express";
import { createSponsor } from "../Controllers/SponsorshipController.js";
import checkToken from "../Middlewares/authMiddleware.js"; 

const router = express.Router();

router.post("/sponsor", checkToken, createSponsor);

export default router;