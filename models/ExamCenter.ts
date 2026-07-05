// Scaffolded per brief Section 6 — not imported/wired up in Phase 1.
import { Schema, models, model } from "mongoose";

const ExamCenterSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  examIds: [{ type: Schema.Types.ObjectId, ref: "Exam" }],
});

export default models.ExamCenter || model("ExamCenter", ExamCenterSchema);
