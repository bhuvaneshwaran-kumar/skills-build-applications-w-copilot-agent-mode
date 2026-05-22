import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String }],
    targetActivityType: { type: String, default: 'general' }
  },
  { timestamps: true }
);

export const Workout = model('Workout', workoutSchema);
