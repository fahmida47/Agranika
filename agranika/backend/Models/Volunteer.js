import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true }, 
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String },
  interest: { type: String, required: true },
  message: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, 
  createdAt: { type: Date, default: Date.now },
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);
export default Volunteer;