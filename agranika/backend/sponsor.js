// sponsor.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.SPONSOR_PORT || 5006;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI2 = process.env.MONGO_URI_SPONSOR; // you can use a separate URI if you want
mongoose
  .connect(mongoURI2)
  .then(() => console.log("✅ MongoDB Connected for Sponsors", mongoose.connection.AgranikaSponsor))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ================= SPONSOR SCHEMA =================
const sponsorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    children: { type: Number, required: true },
    interval: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Sponsor = mongoose.model("Sponsor", sponsorSchema);

// ================= ROUTES =================

// Add new sponsor
app.post("/api/sponsors", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, children, interval } = req.body;

    if (!firstName || !lastName || !email || !phone || !children || !interval) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSponsor = new Sponsor({
      firstName,
      lastName,
      email,
      phone,
      children,
      interval,
    });

    await newSponsor.save();
    res.status(201).json({ message: "Sponsor saved successfully" });
  } catch (error) {
    console.log("Error saving sponsor:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all sponsors (optional)
app.get("/api/sponsors", async (req, res) => {
  try {
    const sponsors = await Sponsor.find().sort({ createdAt: -1 });
    res.status(200).json(sponsors);
  } catch (error) {
    console.log("Error fetching sponsors:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Sponsor server running on port ${PORT}`);
});