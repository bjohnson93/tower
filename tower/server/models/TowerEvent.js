import { Schema } from "mongoose";

export const TowerEventSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
  name: { type: String, minLength: 3, maxLength: 30, required: true },
  description: { type: String, minLength: 3, maxLength: 800, required: true },
  coverImg: { type: String, minlength: 3, maxLength: 250, required: true },
  location: { type: String, minLength: 3, maxLength: 30, required: true },
  capacity: { type: Number, min: 0, max: 224, required: true },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, default: false },
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'] },
},
  { timestamps: true, toJSON: { virtuals: true } }
)

TowerEventSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})
TowerEventSchema.virtual('ticketCount', {
  localField: '_id',
  ref: 'Ticket',
  foreignField: 'towerEventId',
  count: true,
})

