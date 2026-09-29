import mongoose, { Schema, type InferSchemaType, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    sport: { type: String, required: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    goal: { type: String, default: 'Build consistency' },
  },
  { timestamps: true },
);

export type TeamDocument = InferSchemaType<typeof teamSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Team = model<TeamDocument>('Team', teamSchema);
