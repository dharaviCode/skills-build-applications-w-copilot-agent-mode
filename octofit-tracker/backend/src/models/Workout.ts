import mongoose, { Schema, type InferSchemaType, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 10 },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  },
  { timestamps: true },
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Workout = model<WorkoutDocument>('Workout', workoutSchema);
