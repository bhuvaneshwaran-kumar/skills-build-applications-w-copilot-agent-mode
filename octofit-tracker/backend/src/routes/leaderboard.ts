import { Router } from 'express';
import { Leaderboard } from '../models/Leaderboard.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', asyncHandler(async (_request, response) => {
  const leaderboard = await Leaderboard.find()
    .populate('user')
    .populate('team')
    .sort({ rank: 1, points: -1 });

  response.json(leaderboard);
}));

leaderboardRouter.post('/', asyncHandler(async (request, response) => {
  const leaderboardEntry = await Leaderboard.create(request.body);
  response.status(201).json(leaderboardEntry);
}));
