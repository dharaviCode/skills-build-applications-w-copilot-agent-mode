import { Router } from 'express';
import { User } from '../models/User.js';

const router = Router();

router.get('/', async (_request, response) => {
  const users = await User.find().lean();
  response.json(users);
});

router.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).lean();

  if (!user) {
    response.status(404).json({ message: 'User not found' });
    return;
  }

  response.json(user);
});

router.post('/', async (request, response) => {
  const { name, email, fitnessLevel, teamId } = request.body;

  if (!name || !email) {
    response.status(400).json({ message: 'name and email are required' });
    return;
  }

  const user = await User.create({
    name,
    email,
    fitnessLevel: fitnessLevel ?? 'beginner',
    teamId: teamId ?? null,
  });

  response.status(201).json(user);
});

router.put('/:id', async (request, response) => {
  const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });

  if (!user) {
    response.status(404).json({ message: 'User not found' });
    return;
  }

  response.json(user);
});

router.delete('/:id', async (request, response) => {
  const user = await User.findByIdAndDelete(request.params.id);

  if (!user) {
    response.status(404).json({ message: 'User not found' });
    return;
  }

  response.json({ message: 'User deleted', user });
});

export default router;
