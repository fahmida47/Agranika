// filepath: backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5004;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = "mongodb://fahmida200547_db_user:faruqi20223845@ac-odm4hsb-shard-00-00.8c5hizv.mongodb.net:27017,ac-odm4hsb-shard-00-01.8c5hizv.mongodb.net:27017,ac-odm4hsb-shard-00-02.8c5hizv.mongodb.net:27017/?ssl=true&replicaSet=atlas-nz6eig-shard-0&authSource=admin&appName=AgranikaCluster";

mongoose.connect(mongoURI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));


// ================= USER SCHEMA =================
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Password Hashing
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);


// ================= ROUTES =================

// Signup Route
app.post('/signup', async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, phone, email, password });
    await newUser.save();

    res.status(201).json({ message: "Signup successful" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});