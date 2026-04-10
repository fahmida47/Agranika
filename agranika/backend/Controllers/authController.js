import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../Utils/db.js";


const lifetime = 3600000; 

// --- SIGNUP ---
export const signup = async (req, res) => {
  try {
    const { name, email, password ,phone} = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    
    const hashedPassword = await hashPassword(password);

   
    const newUser = new User({ 
      name, 
      email, 
      phone,
      password,
    });
    await newUser.save();

    return res.status(201).json({
      message: "Signup successful! Please login to continue.",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// --- LOGIN ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("--- Login Attempt ---");
    console.log("Email:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found in DB");
      return res.status(404).json({ message: "User not found" });
    }

    
    const isPassEqual = await comparePassword(password, user.password);
    console.log("Entered Password:", password);
    console.log("DB Hashed Password:", user.password);
    console.log("Match Status:", isPassEqual);

    if (!isPassEqual) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      maxAge: lifetime,
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      message: "Login successful",
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

// --- LOGOUT ---
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });
  return res.status(200).json({ message: "Logout successful" });
};