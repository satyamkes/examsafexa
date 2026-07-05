// Scaffolded per brief Section 6 — not imported/wired up in Phase 1.
import { Schema, models, model } from "mongoose";

const ExamSchema = new Schema({
  name: { type: String, required: true }, // e.g. "NEET UG"
  code: { type: String, required: true, unique: true }, // e.g. "NEET"
  examDate: { type: Date, required: true },
  category: {
    type: String,
    enum: ["medical", "engineering", "civil-services", "state-psc", "ssc", "other"],
    required: true,
  },
});

export default models.Exam || model("Exam", ExamSchema);
