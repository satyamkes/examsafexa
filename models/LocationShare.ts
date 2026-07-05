// Phase 2+ — women's-safety live location sharing.
// Scaffolded per brief Section 6 — not imported/wired up in Phase 1.
import { Schema, models, model } from "mongoose";

const LocationShareSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  communityId: { type: Schema.Types.ObjectId, ref: "Community" },
  isActive: { type: Boolean, default: false },
  lastLocation: {
    lat: Number,
    lng: Number,
    updatedAt: Date,
  },
  parentNotifiedAt: Date,
});

export default models.LocationShare || model("LocationShare", LocationShareSchema);
