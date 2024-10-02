import { Schema } from "mongoose";

export const FollowerSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    parkId: { type: Schema.ObjectId, required: true, ref: 'Parks' },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

FollowerSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

FollowerSchema.virtual('park', {
  localField: 'parkId',
  ref: 'Parks',
  foreignField: '_id',
  justOne: true
})