import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddExerciseSetData {
  exerciseSet_insert: ExerciseSet_Key;
}

export interface AddExerciseSetVariables {
  exerciseId: UUIDString;
  completed: boolean;
  measurement: string;
  reps: number;
}

export interface CreateWorkoutData {
  workout_insert: Workout_Key;
}

export interface CreateWorkoutVariables {
  userId: UUIDString;
  name: string;
  date: DateString;
}

export interface DeleteExerciseSetData {
  exerciseSet_delete?: ExerciseSet_Key | null;
}

export interface DeleteExerciseSetVariables {
  id: UUIDString;
}

export interface ExerciseSet_Key {
  id: UUIDString;
  __typename?: 'ExerciseSet_Key';
}

export interface Exercise_Key {
  id: UUIDString;
  __typename?: 'Exercise_Key';
}

export interface GetExercisesForWorkoutData {
  exercises: ({
    id: UUIDString;
    name: string;
    youtubeLink?: string | null;
    exerciseSets_on_exercise: ({
      id: UUIDString;
      completed: boolean;
      measurement: string;
      reps: number;
    } & ExerciseSet_Key)[];
  } & Exercise_Key)[];
}

export interface GetExercisesForWorkoutVariables {
  workoutId: UUIDString;
}

export interface ListExercisesByUserData {
  exercises: ({
    id: UUIDString;
    name: string;
    youtubeLink?: string | null;
    workout: {
      id: UUIDString;
      name: string;
      date: DateString;
      completed: boolean;
      user: {
        id: UUIDString;
        displayName: string;
        email?: string | null;
        photoUrl?: string | null;
      } & User_Key;
    } & Workout_Key;
  } & Exercise_Key)[];
}

export interface ListWorkoutsByUserData {
  workouts: ({
    id: UUIDString;
    name: string;
    date: DateString;
    completed: boolean;
  } & Workout_Key)[];
}

export interface ListWorkoutsByUserVariables {
  userId: UUIDString;
}

export interface UpdateWorkoutCompletionData {
  workout_update?: Workout_Key | null;
}

export interface UpdateWorkoutCompletionVariables {
  workoutId: UUIDString;
  completed: boolean;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Workout_Key {
  id: UUIDString;
  __typename?: 'Workout_Key';
}

interface AddExerciseSetRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddExerciseSetVariables): MutationRef<AddExerciseSetData, AddExerciseSetVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddExerciseSetVariables): MutationRef<AddExerciseSetData, AddExerciseSetVariables>;
  operationName: string;
}
export const addExerciseSetRef: AddExerciseSetRef;

export function addExerciseSet(vars: AddExerciseSetVariables): MutationPromise<AddExerciseSetData, AddExerciseSetVariables>;
export function addExerciseSet(dc: DataConnect, vars: AddExerciseSetVariables): MutationPromise<AddExerciseSetData, AddExerciseSetVariables>;

interface ListWorkoutsByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListWorkoutsByUserVariables): QueryRef<ListWorkoutsByUserData, ListWorkoutsByUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListWorkoutsByUserVariables): QueryRef<ListWorkoutsByUserData, ListWorkoutsByUserVariables>;
  operationName: string;
}
export const listWorkoutsByUserRef: ListWorkoutsByUserRef;

export function listWorkoutsByUser(vars: ListWorkoutsByUserVariables): QueryPromise<ListWorkoutsByUserData, ListWorkoutsByUserVariables>;
export function listWorkoutsByUser(dc: DataConnect, vars: ListWorkoutsByUserVariables): QueryPromise<ListWorkoutsByUserData, ListWorkoutsByUserVariables>;

interface UpdateWorkoutCompletionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateWorkoutCompletionVariables): MutationRef<UpdateWorkoutCompletionData, UpdateWorkoutCompletionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateWorkoutCompletionVariables): MutationRef<UpdateWorkoutCompletionData, UpdateWorkoutCompletionVariables>;
  operationName: string;
}
export const updateWorkoutCompletionRef: UpdateWorkoutCompletionRef;

export function updateWorkoutCompletion(vars: UpdateWorkoutCompletionVariables): MutationPromise<UpdateWorkoutCompletionData, UpdateWorkoutCompletionVariables>;
export function updateWorkoutCompletion(dc: DataConnect, vars: UpdateWorkoutCompletionVariables): MutationPromise<UpdateWorkoutCompletionData, UpdateWorkoutCompletionVariables>;

interface GetExercisesForWorkoutRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetExercisesForWorkoutVariables): QueryRef<GetExercisesForWorkoutData, GetExercisesForWorkoutVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetExercisesForWorkoutVariables): QueryRef<GetExercisesForWorkoutData, GetExercisesForWorkoutVariables>;
  operationName: string;
}
export const getExercisesForWorkoutRef: GetExercisesForWorkoutRef;

export function getExercisesForWorkout(vars: GetExercisesForWorkoutVariables): QueryPromise<GetExercisesForWorkoutData, GetExercisesForWorkoutVariables>;
export function getExercisesForWorkout(dc: DataConnect, vars: GetExercisesForWorkoutVariables): QueryPromise<GetExercisesForWorkoutData, GetExercisesForWorkoutVariables>;

interface CreateWorkoutRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWorkoutVariables): MutationRef<CreateWorkoutData, CreateWorkoutVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateWorkoutVariables): MutationRef<CreateWorkoutData, CreateWorkoutVariables>;
  operationName: string;
}
export const createWorkoutRef: CreateWorkoutRef;

export function createWorkout(vars: CreateWorkoutVariables): MutationPromise<CreateWorkoutData, CreateWorkoutVariables>;
export function createWorkout(dc: DataConnect, vars: CreateWorkoutVariables): MutationPromise<CreateWorkoutData, CreateWorkoutVariables>;

interface DeleteExerciseSetRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteExerciseSetVariables): MutationRef<DeleteExerciseSetData, DeleteExerciseSetVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteExerciseSetVariables): MutationRef<DeleteExerciseSetData, DeleteExerciseSetVariables>;
  operationName: string;
}
export const deleteExerciseSetRef: DeleteExerciseSetRef;

export function deleteExerciseSet(vars: DeleteExerciseSetVariables): MutationPromise<DeleteExerciseSetData, DeleteExerciseSetVariables>;
export function deleteExerciseSet(dc: DataConnect, vars: DeleteExerciseSetVariables): MutationPromise<DeleteExerciseSetData, DeleteExerciseSetVariables>;

interface ListExercisesByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListExercisesByUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListExercisesByUserData, undefined>;
  operationName: string;
}
export const listExercisesByUserRef: ListExercisesByUserRef;

export function listExercisesByUser(): QueryPromise<ListExercisesByUserData, undefined>;
export function listExercisesByUser(dc: DataConnect): QueryPromise<ListExercisesByUserData, undefined>;

