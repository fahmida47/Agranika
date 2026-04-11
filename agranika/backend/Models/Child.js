
import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  className: { type: String, required: true },
  gender: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Child", childSchema);