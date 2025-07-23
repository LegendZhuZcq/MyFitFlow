export interface ExerciseSet {
  id: string;
  reps: string;
  measurement: string;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  sets: ExerciseSet[];
  youtubeLink?: string;
}

export interface Workout {
  name: string;
  date: string; // 'yyyy-MM-dd'
  exercises: Exercise[];
  completed: boolean;
}
