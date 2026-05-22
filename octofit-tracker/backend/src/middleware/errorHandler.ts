import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error);

  response.status(500).json({
    error: 'Internal server error',
    message: error instanceof Error ? error.message : 'Unexpected API error'
  });
};
