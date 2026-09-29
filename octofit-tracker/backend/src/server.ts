import express from 'express';
import './config/database.js';
import { getApiBaseUrl } from './config/api.js';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', baseUrl: getApiBaseUrl() });
});

app.get('/api/config', (_request, response) => {
  response.json({
    appName: 'OctoFit Tracker',
    apiBaseUrl: getApiBaseUrl(),
    port,
  });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`API base URL: ${getApiBaseUrl()}`);
});