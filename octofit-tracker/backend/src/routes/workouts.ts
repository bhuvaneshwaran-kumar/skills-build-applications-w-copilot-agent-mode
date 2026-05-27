import { Router } from 'express';
import { Workout } from '../models/Workout.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const workoutsRouter = Router();

workoutsRouter.get('/', asyncHandler(async (_request, response) => {
  const workouts = await Workout.find().sort({ difficulty: 1, durationMinutes: 1 });
  response.json(workouts);
}));

workoutsRouter.post('/', asyncHandler(async (request, response) => {
  const workout = await Workout.create(request.body);
  response.status(201).json(workout);
}));
