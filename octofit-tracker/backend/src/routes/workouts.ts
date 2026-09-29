import { Router } from 'express';
import { Workout } from '../models/Workout.js';

const router = Router();

router.get('/', async (_request, response) => {
  const workouts = await Workout.find().lean();
  response.json(workouts);
});

router.get('/:id', async (request, response) => {
  const workout = await Workout.findById(request.params.id).lean();

  if (!workout) {
    response.status(404).json({ message: 'Workout not found' });
    return;
  }

  response.json(workout);
});

router.post('/', async (request, response) => {
  const { name, focus, durationMinutes, difficulty } = request.body;

  if (!name || !focus) {
    response.status(400).json({ message: 'name and focus are required' });
    return;
  }

  const workout = await Workout.create({
    name,
    focus,
    durationMinutes: durationMinutes ?? 30,
    difficulty: difficulty ?? 'Beginner',
  });

  response.status(201).json(workout);
});

router.put('/:id', async (request, response) => {
  const workout = await Workout.findByIdAndUpdate(request.params.id, request.body, { new: true });

  if (!workout) {
    response.status(404).json({ message: 'Workout not found' });
    return;
  }

  response.json(workout);
});

router.delete('/:id', async (request, response) => {
  const workout = await Workout.findByIdAndDelete(request.params.id);

  if (!workout) {
    response.status(404).json({ message: 'Workout not found' });
    return;
  }

  response.json({ message: 'Workout deleted', workout });
});

export default router;
