import { Router } from 'express';
import { Activity } from '../models/Activity.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const activitiesRouter = Router();

activitiesRouter.get('/', asyncHandler(async (_request, response) => {
  const activities = await Activity.find().populate('user').sort({ completedAt: -1 });
  response.json(activities);
}));

activitiesRouter.post('/', asyncHandler(async (request, response) => {
  const activity = await Activity.create(request.body);
  response.status(201).json(activity);
}));
