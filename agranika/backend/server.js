import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";


import authRoutes from "./Routes/authRoutes.js";
import donationRoutes from "./Routes/donationRoutes.js";
import SponsorshipRoutes from "./Routes/SponsorshipRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5004;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

const corsOptions = {
  origin: true, // Allow all origins for development
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/sponsors", SponsorshipRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected", mongoose.connection.host))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));