import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Thompson',
        email: 'ava.thompson@example.com',
        fitnessLevel: 'intermediate',
      },
      {
        name: 'Leo Ramirez',
        email: 'leo.ramirez@example.com',
        fitnessLevel: 'beginner',
      },
      {
        name: 'Maya Chen',
        email: 'maya.chen@example.com',
        fitnessLevel: 'advanced',
      },
    ]);

    const momentumTeam = await Team.create({
      name: 'Momentum Movers',
      sport: 'CrossFit',
      members: [users[0]._id, users[2]._id],
      goal: 'Complete 12 weekly challenges',
    });

    const hillTeam = await Team.create({
      name: 'Hill Climbers',
      sport: 'Running',
      members: [users[1]._id],
      goal: 'Hit 100 total training miles',
    });

    await User.updateOne({ _id: users[0]._id }, { teamId: momentumTeam._id });
    await User.updateOne({ _id: users[2]._id }, { teamId: momentumTeam._id });
    await User.updateOne({ _id: users[1]._id }, { teamId: hillTeam._id });

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Running',
        durationMinutes: 35,
        caloriesBurned: 420,
        date: new Date('2026-09-28'),
      },
      {
        userId: users[1]._id,
        type: 'Strength',
        durationMinutes: 50,
        caloriesBurned: 510,
        date: new Date('2026-09-27'),
      },
      {
        userId: users[2]._id,
        type: 'Cycling',
        durationMinutes: 42,
        caloriesBurned: 390,
        date: new Date('2026-09-26'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: users[0]._id,
        name: users[0].name,
        score: 1240,
        rank: 1,
      },
      {
        userId: users[1]._id,
        name: users[1].name,
        score: 980,
        rank: 2,
      },
      {
        userId: users[2]._id,
        name: users[2].name,
        score: 860,
        rank: 3,
      },
    ]);

    await Workout.insertMany([
      {
        name: 'Power Circuit',
        focus: 'Full body',
        durationMinutes: 30,
        difficulty: 'Intermediate',
      },
      {
        name: 'Mobility Reset',
        focus: 'Recovery',
        durationMinutes: 20,
        difficulty: 'Beginner',
      },
      {
        name: 'Hill Sprint Blast',
        focus: 'Cardio',
        durationMinutes: 25,
        difficulty: 'Advanced',
      },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
