import { format, addDays, startOfWeek } from 'date-fns';
import type { Workout } from '@/types';

export const getInitialWorkouts = (): Record<string, Workout> => {
  const today = new Date();
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // Monday

  const mondayKey = format(startOfThisWeek, 'yyyy-MM-dd');
  const wednesdayKey = format(addDays(startOfThisWeek, 2), 'yyyy-MM-dd');
  const fridayKey = format(addDays(startOfThisWeek, 4), 'yyyy-MM-dd');

  const now = new Date();
  
  return {
    [mondayKey]: {
      id: 'workout-1',
      userId: 'user-1',
      name: 'Push Day',
      date: new Date(mondayKey),
      completed: true,
      createdAt: now,
      updatedAt: now,
      exercises: [
        { 
          id: '1', 
          workoutId: 'workout-1',
          name: 'Bench Press', 
          youtubeLink: 'https://www.youtube.com/watch?v=SCVCLChgT5A',
          createdAt: now,
          updatedAt: now,
          sets: [
            {id: 's1', exerciseId: '1', reps: 8, measurement: '80kg', completed: true, createdAt: now, updatedAt: now},
            {id: 's2', exerciseId: '1', reps: 8, measurement: '80kg', completed: true, createdAt: now, updatedAt: now},
            {id: 's3', exerciseId: '1', reps: 10, measurement: '75kg', completed: true, createdAt: now, updatedAt: now},
            {id: 's4', exerciseId: '1', reps: 10, measurement: '70kg', completed: false, createdAt: now, updatedAt: now},
          ]
        },
        { 
          id: '2', 
          workoutId: 'workout-1',
          name: 'Overhead Press', 
          youtubeLink: 'https://www.youtube.com',
          createdAt: now,
          updatedAt: now,
          sets: [
            {id: 's5', exerciseId: '2', reps: 10, measurement: '40kg', completed: true, createdAt: now, updatedAt: now},
            {id: 's6', exerciseId: '2', reps: 12, measurement: '40kg', completed: false, createdAt: now, updatedAt: now},
            {id: 's7', exerciseId: '2', reps: 12, measurement: '35kg', completed: false, createdAt: now, updatedAt: now},
          ]
        },
        { 
          id: '3', 
          workoutId: 'workout-1',
          name: 'Tricep Pushdowns', 
          youtubeLink: 'https://www.youtube.com',
          createdAt: now,
          updatedAt: now,
          sets: [
            {id: 's8', exerciseId: '3', reps: 15, measurement: '25kg', completed: false, createdAt: now, updatedAt: now},
            {id: 's9', exerciseId: '3', reps: 15, measurement: '25kg', completed: false, createdAt: now, updatedAt: now},
            {id: 's10', exerciseId: '3', reps: 15, measurement: '20kg', completed: false, createdAt: now, updatedAt: now},
          ]
        },
      ],
    },
    [wednesdayKey]: {
      id: 'workout-2',
      userId: 'user-1',
      name: 'Pull Day',
      date: new Date(wednesdayKey),
      completed: false,
      createdAt: now,
      updatedAt: now,
      exercises: [
        { 
          id: '4', 
          workoutId: 'workout-2',
          name: 'Pull Ups', 
          youtubeLink: 'https://www.youtube.com',
          createdAt: now,
          updatedAt: now,
          sets: [
            {id: 's11', exerciseId: '4', reps: 0, measurement: 'AMRAP Bodyweight', completed: false, createdAt: now, updatedAt: now},
            {id: 's12', exerciseId: '4', reps: 0, measurement: 'AMRAP Bodyweight', completed: false, createdAt: now, updatedAt: now},
            {id: 's13', exerciseId: '4', reps: 0, measurement: 'AMRAP Bodyweight', completed: false, createdAt: now, updatedAt: now},
            {id: 's14', exerciseId: '4', reps: 0, measurement: 'AMRAP Bodyweight', completed: false, createdAt: now, updatedAt: now},
          ]
        },
        { 
          id: '5', 
          workoutId: 'workout-2',
          name: 'Bent Over Rows', 
          youtubeLink: 'https://www.youtube.com',
          createdAt: now,
          updatedAt: now,
          sets: [
            {id: 's15', exerciseId: '5', reps: 10, measurement: '60kg', completed: false, createdAt: now, updatedAt: now},
            {id: 's16', exerciseId: '5', reps: 10, measurement: '60kg', completed: false, createdAt: now, updatedAt: now},
            {id: 's17', exerciseId: '5', reps: 10, measurement: '60kg', completed: false, createdAt: now, updatedAt: now},
          ]
        },
        { 
          id: '6', 
          workoutId: 'workout-2',
          name: 'Bicep Curls', 
          youtubeLink: 'https://www.youtube.com',
          createdAt: now,
          updatedAt: now,
          sets: [
            {id: 's18', exerciseId: '6', reps: 12, measurement: '15kg', completed: false, createdAt: now, updatedAt: now},
            {id: 's19', exerciseId: '6', reps: 15, measurement: '15kg', completed: false, createdAt: now, updatedAt: now},
            {id: 's20', exerciseId: '6', reps: 15, measurement: '12.5kg', completed: false, createdAt: now, updatedAt: now},
          ]
        },
      ],
    },
    [fridayKey]: {
      id: 'workout-3',
      userId: 'user-1',
      name: 'Leg Day',
      date: new Date(fridayKey),
      completed: false,
      createdAt: now,
      updatedAt: now,
      exercises: [
        { 
          id: '7', 
          workoutId: 'workout-3',
          name: 'Squats', 
          youtubeLink: 'https://www.youtube.com',
          createdAt: now,
          updatedAt: now,
          sets: [
            {id: 's21', exerciseId: '7', reps: 8, measurement: '100kg', completed: false, createdAt: now, updatedAt: now},
            {id: 's22', exerciseId: '7', reps: 8, measurement: '100kg', completed: false, createdAt: now, updatedAt: now},
            {id: 's23', exerciseId: '7', reps: 10, measurement: '90kg', completed: false, createdAt: now, updatedAt: now},
            {id: 's24', exerciseId: '7', reps: 10, measurement: '90kg', completed: false, createdAt: now, updatedAt: now},
          ]
        },
        { 
          id: '8', 
          workoutId: 'workout-3',
          name: 'Romanian Deadlifts', 
          youtubeLink: 'https://www.youtube.com',
          createdAt: now,
          updatedAt: now,
          sets: [
            {id: 's25', exerciseId: '8', reps: 12, measurement: '80kg', completed: false, createdAt: now, updatedAt: now},
            {id: 's26', exerciseId: '8', reps: 12, measurement: '80kg', completed: false, createdAt: now, updatedAt: now},
            {id: 's27', exerciseId: '8', reps: 12, measurement: '80kg', completed: false, createdAt: now, updatedAt: now},
          ]
        },
        { 
          id: '9', 
          workoutId: 'workout-3',
          name: 'Leg Press', 
          youtubeLink: 'https://www.youtube.com',
          createdAt: now,
          updatedAt: now,
          sets: [
            {id: 's28', exerciseId: '9', reps: 12, measurement: '150kg', completed: false, createdAt: now, updatedAt: now},
            {id: 's29', exerciseId: '9', reps: 15, measurement: '140kg', completed: false, createdAt: now, updatedAt: now},
            {id: 's30', exerciseId: '9', reps: 15, measurement: '130kg', completed: false, createdAt: now, updatedAt: now},
          ]
        },
      ],
    }
  };
};
