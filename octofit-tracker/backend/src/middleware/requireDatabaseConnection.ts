import mongoose from 'mongoose';
import { RequestHandler } from 'express';

export const requireDatabaseConnection: RequestHandler = (_request, response, next) => {
  if (mongoose.connection.readyState !== 1) {
    response.status(503).json({
      error: 'Database unavailable',
      message: 'MongoDB is not connected. Start MongoDB on localhost:27017 and retry the request.'
    });
    return;
  }

  next();
};
