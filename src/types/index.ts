export interface User {
  id: string;
  displayName: string;
  email?: string;
  photoUrl?: string;
  createdAt: Date;
}

export interface ExerciseSet {
  id: string;
  exerciseId: string;
  reps: number;
  measurement: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: string;
  workoutId: string;
  name: string;
  youtubeLink?: string;
  createdAt: Date;
  updatedAt: Date;
  // For client-side use, we can include the sets array
  sets: ExerciseSet[];
}

export interface Workout {
  id: string;
  userId: string;
  name: string;
  date: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  // For client-side use, we can include the exercises array
  exercises: Exercise[];
  user?: User;
}
