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
  try {
    if (!workouts || typeof workouts !== 'object') {
      return [];
    }

    const exerciseMap = new Map<string, { exercise: Exercise; lastUsed: Date }>();

    // Iterate through all workouts to find exercises
    Object.values(workouts).forEach(workout => {
      if (!workout || !workout.exercises || !Array.isArray(workout.exercises)) {
        return;
      }

      workout.exercises.forEach(exercise => {
        if (!exercise || !exercise.name || !exercise.sets || !Array.isArray(exercise.sets)) {
          return;
        }

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
        lastUsedSets: exercise.sets
          .filter(set => set && typeof set.measurement === 'string') // Filter out invalid sets
          .map(set => ({
            reps: set.reps?.toString() || '8-12',
            measurement: set.measurement || ''
          }))
      }))
      .filter(template => template.name && template.lastUsedSets.length > 0) // Filter out invalid templates
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
  } catch (error) {
    console.error('Error generating exercise templates:', error);
    return [];
  }
}
