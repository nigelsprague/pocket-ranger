import { Schema } from "mongoose";

export const ParkSchema = new Schema(
  {
    fullName: { type: String, required: true },
    images: [{ type: String }],
    parkCode: { type: String, maxlength: 4, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)