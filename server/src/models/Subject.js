import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    nameSubject: String,
    countByLab: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lab" }],
    RGR: {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      status: Boolean,
      mark: Number,
      maxMark: Number,
      passed: Boolean,
    },
    CourseWork: {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      status: Boolean,
      mark: Number,
      maxMark: Number,
      passed: Boolean,
    },
    Presentation: {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      status: Boolean,
      mark: Number,
      maxMark: Number,
      passed: Boolean,
    },
    Exam: {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      status: Boolean,
      mark: Number,
      maxMark: Number,
      passed: Boolean,
    },
    score_subj: {
      type: Number,
      required: true,
    },
    credits: Number,
    max_score_subj: Number,
  },
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  }
);

export default mongoose.model("Subject", subjectSchema);
