// Scaffolded per brief Section 6 — not imported/wired up in Phase 1.
import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    password: { type: String, required: true, select: false },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
    },
    examSelected: { type: Schema.Types.ObjectId, ref: "Exam" },
    examCenterSelected: { type: Schema.Types.ObjectId, ref: "ExamCenter" },
    // Optional — only collected if the student opts into the safety layer
    parentEmail: { type: String, lowercase: true, trim: true },
    liveLocationOptIn: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

export default models.User || model("User", UserSchema);
