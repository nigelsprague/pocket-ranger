import { Schema } from "mongoose";

export const BookmarksSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true },
    articleId: { type: Schema.ObjectId, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

BookmarksSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

BookmarksSchema.virtual('article', {
  localField: 'articleId',
  ref: 'Article',
  foreignField: '_id',
  justOne: true
})