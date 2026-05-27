import { Router } from 'express';
import { Team } from '../models/Team.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const teamsRouter = Router();

teamsRouter.get('/', asyncHandler(async (_request, response) => {
  const teams = await Team.find().populate('members').sort({ totalPoints: -1, name: 1 });
  response.json(teams);
}));

teamsRouter.post('/', asyncHandler(async (request, response) => {
  const team = await Team.create(request.body);
  response.status(201).json(team);
}));
