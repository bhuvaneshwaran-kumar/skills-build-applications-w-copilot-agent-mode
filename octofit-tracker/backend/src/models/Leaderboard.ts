import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    rank: { type: Number, required: true },
    points: { type: Number, default: 0 },
    period: { type: String, default: 'weekly' }
  },
  { timestamps: true }
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);
