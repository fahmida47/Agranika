import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
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

const Donation = mongoose.model("Donation", donationSchema);
export default Donation;