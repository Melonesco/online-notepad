import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  nameGroup: {
    type: String,
    required: true,
    unique: true,
  },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
});

export default mongoose.model("Group", GroupSchema);
