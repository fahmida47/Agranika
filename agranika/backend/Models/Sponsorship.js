import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  children: { type: Number, required: true },
  interval: { type: String, required: true }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, 
  createdAt: { type: Date, default: Date.now },
});

const Sponsor = mongoose.model("Sponsor", sponsorSchema);
export default Sponsor;