import mongoose from "mongoose";

export const UserSubjectLabModel = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  lab: { type: mongoose.Schema.Types.ObjectId, ref: "Lab", required: false },
  bonusProject: { type: mongoose.Schema.Types.ObjectId, required: false },
  labMark: {
    type: Number,
    required: true,
  },
  passed: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("UserSubjectLab", UserSubjectLabModel);
