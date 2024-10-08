import { Schema } from "mongoose";

const locationSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates: [{ type: Number }]
})

export const PostSchema = new Schema({
  title: { type: String, maxLength: 50, required: true },
  body: { type: String, maxLength: 200, required: true },
  category: { type: String, enum: ['wildlife alert', 'photography', 'point of interest', 'information', 'warning', 'miscellaneous'], required: true },
  image: { type: String, maxLength: 500, validate: { validator: validateImg } },
  location: { type: locationSchema, validate: { validator: validatePoint } },
  // default: { type: 'Point', coordinates: [180, 90] }
  // latitude: { type: Number, min: -90, max: 90 },
  // longitude: { type: Number, min: -180, max: 180 },
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  parkCode: { type: Schema.ObjectId, required: true, ref: 'Park' }
}, { timestamps: true, toJSON: { virtuals: true } })

PostSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

PostSchema.virtual('park', {
  localField: 'parkCode',
  ref: 'Park',
  foreignField: 'parkCode',
  justOne: true
})

function validatePoint(value) {
  const postData = value._doc
  if (postData.category == 'wildlife alert' || postData.category == 'point of interest') {
    if (postData.location == null || !postData.location.coordinates) {
      return false;
    }
  }
  if (postData.location?.coordinates.length != 2) {
    return false;
  }
  return true;
}

function validateImg(value) {
  const postData = value._doc;
  if (postData.category == 'photography') {
    if (postData.image == null) {
      return false;
    }
  }
  return true;
}