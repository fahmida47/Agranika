import express from "express";
import { createVolunteerApplication } from "../Controllers/volunteerController.js";
import checkToken from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/apply", checkToken, createVolunteerApplication);

export default router;