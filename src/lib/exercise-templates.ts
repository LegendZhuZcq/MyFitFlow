import type { Workout, Exercise } from '@/types';

export interface ExerciseTemplate {
  name: string;
  youtubeLink?: string;
  lastUsedSets: {
    reps: string;
    measurement: string;
  }[];
}

/**
 * Extract unique exercise templates from workout history
 * Returns the most recent configuration for each unique exercise name
 */
export function getExerciseTemplates(workouts: Record<string, Workout>): ExerciseTemplate[] {
  const exerciseMap = new Map<string, { exercise: Exercise; lastUsed: Date }>();

  // Iterate through all workouts to find exercises
  Object.values(workouts).forEach(workout => {
    workout.exercises.forEach(exercise => {
      const existingEntry = exerciseMap.get(exercise.name);
      
      // Keep the most recently used version of each exercise
      if (!existingEntry || workout.date > existingEntry.lastUsed) {
        exerciseMap.set(exercise.name, {
          exercise,
          lastUsed: workout.date
        });
      }
    });
  });

  // Convert to template format
  return Array.from(exerciseMap.values())
    .map(({ exercise }) => ({
      name: exercise.name,
      youtubeLink: exercise.youtubeLink,
      lastUsedSets: exercise.sets.map(set => ({
        reps: set.reps.toString(),
        measurement: set.measurement
      }))
    }))
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
}
