import mongoose, { Schema, type InferSchemaType, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type LeaderboardEntryDocument = InferSchemaType<typeof leaderboardEntrySchema> & {
  _id: mongoose.Types.ObjectId;
};

export const LeaderboardEntry = model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema);
