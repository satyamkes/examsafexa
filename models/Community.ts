// Scaffolded per brief Section 6 — not imported/wired up in Phase 1.
import { Schema, models, model } from "mongoose";

const CommunitySchema = new Schema(
  {
    examId: { type: Schema.Types.ObjectId, ref: "Exam", required: true },
    examCenterId: { type: Schema.Types.ObjectId, ref: "ExamCenter", required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

export default models.Community || model("Community", CommunitySchema);
