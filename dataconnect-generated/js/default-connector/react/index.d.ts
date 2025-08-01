import { AddExerciseSetData, AddExerciseSetVariables, ListWorkoutsByUserData, ListWorkoutsByUserVariables, UpdateWorkoutCompletionData, UpdateWorkoutCompletionVariables, GetExercisesForWorkoutData, GetExercisesForWorkoutVariables, CreateWorkoutData, CreateWorkoutVariables, DeleteExerciseSetData, DeleteExerciseSetVariables, ListExercisesByUserData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useAddExerciseSet(options?: useDataConnectMutationOptions<AddExerciseSetData, FirebaseError, AddExerciseSetVariables>): UseDataConnectMutationResult<AddExerciseSetData, AddExerciseSetVariables>;
export function useAddExerciseSet(dc: DataConnect, options?: useDataConnectMutationOptions<AddExerciseSetData, FirebaseError, AddExerciseSetVariables>): UseDataConnectMutationResult<AddExerciseSetData, AddExerciseSetVariables>;

export function useListWorkoutsByUser(vars: ListWorkoutsByUserVariables, options?: useDataConnectQueryOptions<ListWorkoutsByUserData>): UseDataConnectQueryResult<ListWorkoutsByUserData, ListWorkoutsByUserVariables>;
export function useListWorkoutsByUser(dc: DataConnect, vars: ListWorkoutsByUserVariables, options?: useDataConnectQueryOptions<ListWorkoutsByUserData>): UseDataConnectQueryResult<ListWorkoutsByUserData, ListWorkoutsByUserVariables>;

export function useUpdateWorkoutCompletion(options?: useDataConnectMutationOptions<UpdateWorkoutCompletionData, FirebaseError, UpdateWorkoutCompletionVariables>): UseDataConnectMutationResult<UpdateWorkoutCompletionData, UpdateWorkoutCompletionVariables>;
export function useUpdateWorkoutCompletion(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateWorkoutCompletionData, FirebaseError, UpdateWorkoutCompletionVariables>): UseDataConnectMutationResult<UpdateWorkoutCompletionData, UpdateWorkoutCompletionVariables>;

export function useGetExercisesForWorkout(vars: GetExercisesForWorkoutVariables, options?: useDataConnectQueryOptions<GetExercisesForWorkoutData>): UseDataConnectQueryResult<GetExercisesForWorkoutData, GetExercisesForWorkoutVariables>;
export function useGetExercisesForWorkout(dc: DataConnect, vars: GetExercisesForWorkoutVariables, options?: useDataConnectQueryOptions<GetExercisesForWorkoutData>): UseDataConnectQueryResult<GetExercisesForWorkoutData, GetExercisesForWorkoutVariables>;

export function useCreateWorkout(options?: useDataConnectMutationOptions<CreateWorkoutData, FirebaseError, CreateWorkoutVariables>): UseDataConnectMutationResult<CreateWorkoutData, CreateWorkoutVariables>;
export function useCreateWorkout(dc: DataConnect, options?: useDataConnectMutationOptions<CreateWorkoutData, FirebaseError, CreateWorkoutVariables>): UseDataConnectMutationResult<CreateWorkoutData, CreateWorkoutVariables>;

export function useDeleteExerciseSet(options?: useDataConnectMutationOptions<DeleteExerciseSetData, FirebaseError, DeleteExerciseSetVariables>): UseDataConnectMutationResult<DeleteExerciseSetData, DeleteExerciseSetVariables>;
export function useDeleteExerciseSet(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteExerciseSetData, FirebaseError, DeleteExerciseSetVariables>): UseDataConnectMutationResult<DeleteExerciseSetData, DeleteExerciseSetVariables>;

export function useListExercisesByUser(options?: useDataConnectQueryOptions<ListExercisesByUserData>): UseDataConnectQueryResult<ListExercisesByUserData, undefined>;
export function useListExercisesByUser(dc: DataConnect, options?: useDataConnectQueryOptions<ListExercisesByUserData>): UseDataConnectQueryResult<ListExercisesByUserData, undefined>;
