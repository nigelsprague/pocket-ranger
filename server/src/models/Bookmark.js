import { Schema } from "mongoose";

export const BookmarksSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    articleImage: { type: String, required: false },
    articleId: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

BookmarksSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

// BookmarksSchema.virtual('article', {
//   localField: 'articleId',
//   ref: 'Article',
//   foreignField: 'id',
//   justOne: true
// })