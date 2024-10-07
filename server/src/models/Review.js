import { Schema } from "mongoose";


export const ReviewSchema = new Schema({
  recommended: { type: Boolean, required: true },
  title: { type: String, maxLength: 50 },
  body: { type: String, maxLength: 500 },
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  parkId: { type: Schema.ObjectId, required: true, ref: 'Park' }
}, { timestamps: true, toJSON: { virtuals: true } })

ReviewSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

ReviewSchema.virtual('park', {
  localField: 'parkId',
  ref: 'Park',
  foreignField: '_id',
  justOne: true
})