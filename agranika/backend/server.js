import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { carbonMiddleware } from './Middlewares/carbonMiddleware.js';


import authRoutes from "./Routes/authRoutes.js";
import donationRoutes from "./Routes/donationRoutes.js";
import SponsorshipRoutes from "./Routes/SponsorshipRoutes.js";
import volunteerRoutes from "./Routes/volunteerRoutes.js";
import contactRoutes from "./Routes/contactRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;


const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(carbonMiddleware);


app.use("/api/auth", authRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/sponsors", SponsorshipRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected:", mongoose.connection.host))
  .catch(err => console.error("❌ MongoDB connection error:", err));


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));