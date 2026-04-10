import express from "express";
import { submitContactForm } from "../Controllers/contactController.js";
import checkToken from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/contacts", checkToken, submitContactForm);

export default router;