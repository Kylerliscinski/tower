import { Schema } from "mongoose";



export const TowerEventSchema = new Schema({
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  name: { type: String, minLength: 3, maxLength: 50, required: true },
  description: { type: String, minLength: 15, maxLength: 1000, required: true },
  coverImg: { type: String, required: true },
  location: { type: String, minLength: 1, maxLength: 500, required: true },
  capacity: { type: Number, min: 1, max: 5000, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true, default: false },
  type: { type: String, required: true, enum: ['concert', 'convention', 'sport', 'digital'] }
}, { timestamps: true, toJSON: { virtuals: true } })

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

//NOTE - Come back and fill this out
TowerEventSchema.virtual('ticketCount', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})