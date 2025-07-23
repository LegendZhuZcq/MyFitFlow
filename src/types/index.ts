export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight: string;
  youtubeLink?: string;
  completedSets?: number;
}

export interface Workout {
  name: string;
  date: string; // 'yyyy-MM-dd'
  exercises: Exercise[];
  completed: boolean;
}
