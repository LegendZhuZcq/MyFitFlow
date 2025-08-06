import { collection, doc, setDoc, Timestamp, onSnapshot, query, where, deleteDoc, updateDoc, getDocs } from 'firebase/firestore';
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
    const workoutRef = doc(db, 'fitflow', workout.id);
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
    const workoutRef = doc(db, 'fitflow', dateKey);
    await setDoc(workoutRef, workoutData);
    console.log(`Workout for ${dateKey} saved successfully`);
  } catch (error) {
    console.error(`Error saving workout for ${dateKey}:`, error);
    throw error;
  }
};

// Convert Firestore data back to Workout format
const convertFirestoreToWorkout = (data: any): Workout => {
  return {
    ...data,
    date: data.date.toDate(),
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
    exercises: data.exercises.map((exercise: any) => ({
      ...exercise,
      createdAt: exercise.createdAt.toDate(),
      updatedAt: exercise.updatedAt.toDate(),
      sets: exercise.sets.map((set: any) => ({
        ...set,
        createdAt: set.createdAt.toDate(),
        updatedAt: set.updatedAt.toDate(),
      })),
    })),
  };
};

// Subscribe to user workouts with real-time updates
export const subscribeToUserWorkouts = (
  userId: string,
  callback: (workouts: Record<string, Workout>) => void
): (() => void) => {
  const workoutsRef = collection(db, 'fitflow');
  const q = query(workoutsRef, where('userId', '==', userId));
  
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const workouts: Record<string, Workout> = {};
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      const workout = convertFirestoreToWorkout(data);
      const dateKey = workout.date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      workouts[dateKey] = workout;
    });
    
    callback(workouts);
  }, (error) => {
    console.error('Error subscribing to workouts:', error);
  });
  
  return unsubscribe;
};

// Update workout in Firestore
export const updateWorkoutInFirestore = async (workout: Workout): Promise<void> => {
  try {
    const workoutData = convertWorkoutForFirestore(workout);
    const workoutRef = doc(db, 'fitflow', workout.id);
    await setDoc(workoutRef, workoutData);
    console.log(`Workout ${workout.id} updated successfully`);
  } catch (error) {
    console.error(`Error updating workout ${workout.id}:`, error);
    throw error;
  }
};

// Delete workout from Firestore
export const deleteWorkoutFromFirestore = async (workoutId: string): Promise<void> => {
  try {
    const workoutRef = doc(db, 'fitflow', workoutId);
    await deleteDoc(workoutRef);
    console.log(`Workout ${workoutId} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting workout ${workoutId}:`, error);
    throw error;
  }
};

// Get all user workouts (one-time fetch)
export const getUserWorkouts = async (userId: string): Promise<Record<string, Workout>> => {
  try {
    const workoutsRef = collection(db, 'fitflow');
    const q = query(workoutsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    
    const workouts: Record<string, Workout> = {};
    snapshot.forEach((doc) => {
      const data = doc.data();
      const workout = convertFirestoreToWorkout(data);
      const dateKey = workout.date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      workouts[dateKey] = workout;
    });
    
    return workouts;
  } catch (error) {
    console.error('Error fetching user workouts:', error);
    throw error;
  }
};
