import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";

// Route imports
import authRoutes from "./Routes/authRoutes.js";
import donationRoutes from "./Routes/donationRoutes.js";
import SponsorshipRoutes from "./Routes/SponsorshipRoutes.js";
import volunteerRoutes from "./Routes/volunteerRoutes.js";
import contactRoutes from "./Routes/contactRoutes.js";

// 1. Dotenv config shobcheye upore thakbe
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004;

// 2. CORS Config (Explicitly Frontend URL dite hobe)
const corsOptions = {
  origin: "http://localhost:3000", // "true" er bodole explicit URL den
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// 3. Middlewares (Order khub e gurutto-purno)
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // Cookie parser oboshshoi routes-er upore thakbe

// 4. Routes
app.use("/api/auth", authRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/sponsors", SponsorshipRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/contact", contactRoutes);

// 5. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected:", mongoose.connection.host))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 6. Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));