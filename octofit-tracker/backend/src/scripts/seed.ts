import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/database.js';
import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const seedDatabase = async (): Promise<void> => {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });

  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    User.deleteMany({}),
    Team.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Core Crushers',
      description: 'A team focused on strength, conditioning, and steady weekly gains.',
      totalPoints: 1380
    },
    {
      name: 'Cardio Crew',
      description: 'Runners, cyclists, and rowers chasing endurance goals together.',
      totalPoints: 1245
    },
    {
      name: 'Flex Force',
      description: 'Mobility-first athletes building consistency through balanced workouts.',
      totalPoints: 930
    }
  ]);

  const users = await User.insertMany([
    {
      username: 'alex_runner',
      email: 'alex.runner@example.com',
      displayName: 'Alex Rivera',
      team: teams[1]._id,
      profileImage: '/avatars/alex.png',
      totalPoints: 520
    },
    {
      username: 'maya_lifts',
      email: 'maya.lifts@example.com',
      displayName: 'Maya Chen',
      team: teams[0]._id,
      profileImage: '/avatars/maya.png',
      totalPoints: 610
    },
    {
      username: 'sam_cycles',
      email: 'sam.cycles@example.com',
      displayName: 'Sam Patel',
      team: teams[1]._id,
      profileImage: '/avatars/sam.png',
      totalPoints: 455
    },
    {
      username: 'jordan_core',
      email: 'jordan.core@example.com',
      displayName: 'Jordan Lee',
      team: teams[0]._id,
      profileImage: '/avatars/jordan.png',
      totalPoints: 770
    },
    {
      username: 'taylor_flow',
      email: 'taylor.flow@example.com',
      displayName: 'Taylor Morgan',
      team: teams[2]._id,
      profileImage: '/avatars/taylor.png',
      totalPoints: 495
    }
  ]);

  await Promise.all([
    Team.findByIdAndUpdate(teams[0]._id, { members: [users[1]._id, users[3]._id] }),
    Team.findByIdAndUpdate(teams[1]._id, { members: [users[0]._id, users[2]._id] }),
    Team.findByIdAndUpdate(teams[2]._id, { members: [users[4]._id] })
  ]);

  await Activity.insertMany([
    {
      user: users[0]._id,
      activityType: 'running',
      durationMinutes: 42,
      distanceMiles: 4.8,
      caloriesBurned: 480,
      points: 150,
      completedAt: new Date('2026-05-18T07:30:00Z')
    },
    {
      user: users[1]._id,
      activityType: 'strength training',
      durationMinutes: 55,
      distanceMiles: 0,
      caloriesBurned: 390,
      points: 180,
      completedAt: new Date('2026-05-18T18:15:00Z')
    },
    {
      user: users[2]._id,
      activityType: 'cycling',
      durationMinutes: 64,
      distanceMiles: 16.2,
      caloriesBurned: 620,
      points: 210,
      completedAt: new Date('2026-05-19T06:45:00Z')
    },
    {
      user: users[3]._id,
      activityType: 'rowing',
      durationMinutes: 38,
      distanceMiles: 5.1,
      caloriesBurned: 430,
      points: 160,
      completedAt: new Date('2026-05-19T17:50:00Z')
    },
    {
      user: users[4]._id,
      activityType: 'yoga',
      durationMinutes: 50,
      distanceMiles: 0,
      caloriesBurned: 210,
      points: 120,
      completedAt: new Date('2026-05-20T12:00:00Z')
    }
  ]);

  await Leaderboard.insertMany([
    { user: users[3]._id, team: teams[0]._id, rank: 1, points: 770, period: 'weekly' },
    { user: users[1]._id, team: teams[0]._id, rank: 2, points: 610, period: 'weekly' },
    { user: users[0]._id, team: teams[1]._id, rank: 3, points: 520, period: 'weekly' },
    { user: users[4]._id, team: teams[2]._id, rank: 4, points: 495, period: 'weekly' },
    { user: users[2]._id, team: teams[1]._id, rank: 5, points: 455, period: 'weekly' }
  ]);

  await Workout.insertMany([
    {
      title: 'Morning Mobility Reset',
      description: 'A light mobility session for hips, shoulders, and spine before the workday.',
      difficulty: 'beginner',
      durationMinutes: 20,
      exercises: ['Cat-cow flow', 'World greatest stretch', 'Hip airplanes', 'Thoracic rotations'],
      targetActivityType: 'mobility'
    },
    {
      title: 'Tempo Run Builder',
      description: 'Structured intervals to improve running pace without overloading recovery.',
      difficulty: 'intermediate',
      durationMinutes: 45,
      exercises: ['10 minute warmup jog', '4 x 5 minute tempo intervals', 'Easy cooldown'],
      targetActivityType: 'running'
    },
    {
      title: 'Full Body Strength Circuit',
      description: 'A balanced lift covering squat, hinge, push, pull, and core patterns.',
      difficulty: 'intermediate',
      durationMinutes: 50,
      exercises: ['Goblet squats', 'Romanian deadlifts', 'Push-ups', 'Bent-over rows', 'Plank holds'],
      targetActivityType: 'strength training'
    },
    {
      title: 'Advanced Endurance Ride',
      description: 'Long-form cycling workout with sustained threshold efforts.',
      difficulty: 'advanced',
      durationMinutes: 75,
      exercises: ['15 minute easy spin', '3 x 12 minute threshold blocks', 'Cadence drills', 'Cooldown spin'],
      targetActivityType: 'cycling'
    }
  ]);

  console.log(`Seeded ${teams.length} teams, ${users.length} users, 5 activities, 5 leaderboard entries, and 4 workouts.`);
};

seedDatabase()
  .catch((error) => {
    console.error('Failed to seed octofit_db:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
