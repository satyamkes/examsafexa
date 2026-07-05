import { Schema, models, model } from "mongoose";

const CenterRequestSchema = new Schema(
  {
    examId: { type: Schema.Types.ObjectId, ref: "Exam", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    centerName: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    note: { type: String },
  },
  { timestamps: true }
);

export default models.CenterRequest || model("CenterRequest", CenterRequestSchema);
