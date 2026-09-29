import { Router } from 'express';
import { Activity } from '../models/Activity.js';

const router = Router();

router.get('/', async (_request, response) => {
  const activities = await Activity.find().populate('userId').lean();
  response.json(activities);
});

router.get('/:id', async (request, response) => {
  const activity = await Activity.findById(request.params.id).populate('userId').lean();

  if (!activity) {
    response.status(404).json({ message: 'Activity not found' });
    return;
  }

  response.json(activity);
});

router.post('/', async (request, response) => {
  const { userId, type, durationMinutes, caloriesBurned, date } = request.body;

  if (!userId || !type) {
    response.status(400).json({ message: 'userId and type are required' });
    return;
  }

  const activity = await Activity.create({
    userId,
    type,
    durationMinutes: durationMinutes ?? 30,
    caloriesBurned: caloriesBurned ?? 0,
    date: date ?? new Date(),
  });

  response.status(201).json(activity);
});

router.put('/:id', async (request, response) => {
  const activity = await Activity.findByIdAndUpdate(request.params.id, request.body, { new: true }).populate('userId');

  if (!activity) {
    response.status(404).json({ message: 'Activity not found' });
    return;
  }

  response.json(activity);
});

router.delete('/:id', async (request, response) => {
  const activity = await Activity.findByIdAndDelete(request.params.id);

  if (!activity) {
    response.status(404).json({ message: 'Activity not found' });
    return;
  }

  response.json({ message: 'Activity deleted', activity });
});

export default router;
