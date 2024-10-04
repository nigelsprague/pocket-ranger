import { Schema } from "mongoose";

export const FollowerSchema = new Schema(
  {
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
    parkCode: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

FollowerSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

// FollowerSchema.virtual('park', {
//   localField: 'parkCode',
//   ref: 'Parks',
//   foreignField: 'parkCode',
//   justOne: true
// })