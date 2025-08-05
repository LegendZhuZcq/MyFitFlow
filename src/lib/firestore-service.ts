import { collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import type { Workout, Exercise, ExerciseSet } from '@/types';

// Convert JavaScript Date to Firestore Timestamp
const convertDateToTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date);
};

// Convert workout data for Firestore storage
const convertWorkoutForFirestore = (workout: Workout) => {
  return {
    ...workout,
    date: convertDateToTimestamp(workout.date),
    createdAt: convertDateToTimestamp(workout.createdAt),
    updatedAt: convertDateToTimestamp(workout.updatedAt),
    exercises: workout.exercises.map((exercise: Exercise) => ({
      ...exercise,
      createdAt: convertDateToTimestamp(exercise.createdAt),
      updatedAt: convertDateToTimestamp(exercise.updatedAt),
      sets: exercise.sets.map((set: ExerciseSet) => ({
        ...set,
        createdAt: convertDateToTimestamp(set.createdAt),
        updatedAt: convertDateToTimestamp(set.updatedAt),
      })),
    })),
  };
};

// Save a single workout to Firestore
export const saveWorkoutToFirestore = async (workout: Workout): Promise<void> => {
  try {
    const workoutData = convertWorkoutForFirestore(workout);
    const workoutRef = doc(db, 'workout', 'fitflow', 'workouts', workout.id);
    await setDoc(workoutRef, workoutData);
    console.log(`Workout ${workout.id} saved successfully`);
  } catch (error) {
    console.error(`Error saving workout ${workout.id}:`, error);
    throw error;
  }
};

// Save multiple workouts to Firestore
export const saveWorkoutsToFirestore = async (workouts: Record<string, Workout>): Promise<void> => {
  try {
    const savePromises = Object.values(workouts).map(workout => 
      saveWorkoutToFirestore(workout)
    );
    
    await Promise.all(savePromises);
    console.log('All workouts saved successfully');
  } catch (error) {
    console.error('Error saving workouts:', error);
    throw error;
  }
};

// Save workout data with date as document ID (alternative approach)
export const saveWorkoutWithDateId = async (dateKey: string, workout: Workout): Promise<void> => {
  try {
    const workoutData = convertWorkoutForFirestore(workout);
    const workoutRef = doc(db, 'workout', 'fitflow', 'workouts', dateKey);
    await setDoc(workoutRef, workoutData);
    console.log(`Workout for ${dateKey} saved successfully`);
  } catch (error) {
    console.error(`Error saving workout for ${dateKey}:`, error);
    throw error;
  }
};
