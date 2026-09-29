import mongoose, { Schema, type InferSchemaType, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export type ActivityDocument = InferSchemaType<typeof activitySchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Activity = model<ActivityDocument>('Activity', activitySchema);
