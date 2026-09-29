import { Router } from 'express';
import { Team } from '../models/Team.js';

const router = Router();

router.get('/', async (_request, response) => {
  const teams = await Team.find().populate('members').lean();
  response.json(teams);
});

router.get('/:id', async (request, response) => {
  const team = await Team.findById(request.params.id).populate('members').lean();

  if (!team) {
    response.status(404).json({ message: 'Team not found' });
    return;
  }

  response.json(team);
});

router.post('/', async (request, response) => {
  const { name, sport, members, goal } = request.body;

  if (!name || !sport) {
    response.status(400).json({ message: 'name and sport are required' });
    return;
  }

  const team = await Team.create({
    name,
    sport,
    members: members ?? [],
    goal: goal ?? 'Build consistency',
  });

  response.status(201).json(team);
});

router.put('/:id', async (request, response) => {
  const team = await Team.findByIdAndUpdate(request.params.id, request.body, { new: true }).populate('members');

  if (!team) {
    response.status(404).json({ message: 'Team not found' });
    return;
  }

  response.json(team);
});

router.delete('/:id', async (request, response) => {
  const team = await Team.findByIdAndDelete(request.params.id);

  if (!team) {
    response.status(404).json({ message: 'Team not found' });
    return;
  }

  response.json({ message: 'Team deleted', team });
});

export default router;
