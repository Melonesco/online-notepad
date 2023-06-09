import mongoose from "mongoose";

export const LabSchema = new mongoose.Schema(
  {
    labPosition: Number,
    labMark: Number,
    labMaxMark: Number,
    labStatus: Boolean,
    labPassed: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  }
);

export default mongoose.model("Lab", LabSchema);
