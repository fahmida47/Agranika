require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.DONATE_PORT || 5005;

app.use(cors());
app.use(express.json());

const mongoURI1= process.env.MONGO_URI_DONATE;

mongoose.connect(mongoURI1)
.then(() => console.log("✅ MongoDB connected for donations",mongoose.connection.AgranikaDonate))
.catch(err => console.log("❌ MongoDB error:", err));

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  amount: { type: Number, required: true },
  gifts: {
    bag: { type: Number, default: 0 },
    pencil: { type: Number, default: 0 },
    uniform: { type: Number, default: 0 },
  },
  createdAt: { type: Date, default: Date.now },
});

const Donation = mongoose.model('Donation', donationSchema);

app.post('/donate', async (req, res) => {
  console.log("Donation POST body:", req.body); // ✅ debug
  try {
    const { name, email, phone, amount, gifts } = req.body;
    const donation = new Donation({
      name,
      email,
      phone,
      amount: Number(amount),
      gifts: {
        bag: Number(gifts.bag),
        pencil: Number(gifts.pencil),
        uniform: Number(gifts.uniform),
      },
    });
    await donation.save();
    res.status(201).json({ message: "Donation saved successfully!" });
  } catch (err) {
    console.error("Donation save error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`🚀 Donation server running on port ${PORT}`));