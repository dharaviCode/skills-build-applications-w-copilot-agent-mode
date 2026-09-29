import { Router } from 'express';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';

const router = Router();

router.get('/', async (_request, response) => {
  const leaderboard = await LeaderboardEntry.find().sort({ score: -1 }).lean();
  response.json(leaderboard);
});

router.get('/:id', async (request, response) => {
  const entry = await LeaderboardEntry.findById(request.params.id).lean();

  if (!entry) {
    response.status(404).json({ message: 'Leaderboard entry not found' });
    return;
  }

  response.json(entry);
});

router.post('/', async (request, response) => {
  const { userId, name, score } = request.body;

  if (!userId || !name || typeof score !== 'number') {
    response.status(400).json({ message: 'userId, name, and numeric score are required' });
    return;
  }

  const entries = await LeaderboardEntry.find().sort({ score: -1 }).lean();
  const rank = entries.length + 1;

  const entry = await LeaderboardEntry.create({
    userId,
    name,
    score,
    rank,
  });

  response.status(201).json(entry);
});

router.put('/:id', async (request, response) => {
  const entry = await LeaderboardEntry.findByIdAndUpdate(request.params.id, request.body, { new: true });

  if (!entry) {
    response.status(404).json({ message: 'Leaderboard entry not found' });
    return;
  }

  response.json(entry);
});

router.delete('/:id', async (request, response) => {
  const entry = await LeaderboardEntry.findByIdAndDelete(request.params.id);

  if (!entry) {
    response.status(404).json({ message: 'Leaderboard entry not found' });
    return;
  }

  response.json({ message: 'Leaderboard entry deleted', entry });
});

export default router;
