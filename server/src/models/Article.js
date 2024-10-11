import { Schema } from "mongoose";

export const ArticleSchema = new Schema(
  {
    title: { type: String, required: true },
    listingDescription: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)