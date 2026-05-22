import cors from 'cors';
import express from 'express';
import { connectDatabase } from './config/database.js';
import { apiBaseUrl, PORT } from './config/server.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requireDatabaseConnection } from './middleware/requireDatabaseConnection.js';
import { activitiesRouter } from './routes/activities.js';
import { leaderboardRouter } from './routes/leaderboard.js';
import { teamsRouter } from './routes/teams.js';
import { usersRouter } from './routes/users.js';
import { workoutsRouter } from './routes/workouts.js';

const app = express();
const codespaceFrontendOrigin = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-5173.app.github.dev`
  : undefined;
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  codespaceFrontendOrigin
].filter((origin): origin is string => Boolean(origin));

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS origin not allowed: ${origin}`));
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

void connectDatabase();

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'OK',
    message: 'OctoFit Tracker API is running',
    apiBaseUrl
  });
});

app.use('/api', requireDatabaseConnection);
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on ${apiBaseUrl}`);
});
