import { Router } from 'express';
import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const usersRouter = Router();

usersRouter.get('/', asyncHandler(async (_request, response) => {
  const users = await User.find().populate('team').sort({ displayName: 1 });
  response.json(users);
}));

usersRouter.post('/', asyncHandler(async (request, response) => {
  const user = await User.create(request.body);
  response.status(201).json(user);
}));
