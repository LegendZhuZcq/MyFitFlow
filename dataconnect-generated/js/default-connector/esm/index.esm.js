import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'default',
  service: 'myfitflow-2-service',
  location: 'us-west1'
};

export const addExerciseSetRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddExerciseSet', inputVars);
}
addExerciseSetRef.operationName = 'AddExerciseSet';

export function addExerciseSet(dcOrVars, vars) {
  return executeMutation(addExerciseSetRef(dcOrVars, vars));
}

export const listWorkoutsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListWorkoutsByUser', inputVars);
}
listWorkoutsByUserRef.operationName = 'ListWorkoutsByUser';

export function listWorkoutsByUser(dcOrVars, vars) {
  return executeQuery(listWorkoutsByUserRef(dcOrVars, vars));
}

export const updateWorkoutCompletionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateWorkoutCompletion', inputVars);
}
updateWorkoutCompletionRef.operationName = 'UpdateWorkoutCompletion';

export function updateWorkoutCompletion(dcOrVars, vars) {
  return executeMutation(updateWorkoutCompletionRef(dcOrVars, vars));
}

export const getExercisesForWorkoutRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetExercisesForWorkout', inputVars);
}
getExercisesForWorkoutRef.operationName = 'GetExercisesForWorkout';

export function getExercisesForWorkout(dcOrVars, vars) {
  return executeQuery(getExercisesForWorkoutRef(dcOrVars, vars));
}

export const createWorkoutRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateWorkout', inputVars);
}
createWorkoutRef.operationName = 'CreateWorkout';

export function createWorkout(dcOrVars, vars) {
  return executeMutation(createWorkoutRef(dcOrVars, vars));
}

export const deleteExerciseSetRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteExerciseSet', inputVars);
}
deleteExerciseSetRef.operationName = 'DeleteExerciseSet';

export function deleteExerciseSet(dcOrVars, vars) {
  return executeMutation(deleteExerciseSetRef(dcOrVars, vars));
}

export const listExercisesByUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExercisesByUser');
}
listExercisesByUserRef.operationName = 'ListExercisesByUser';

export function listExercisesByUser(dc) {
  return executeQuery(listExercisesByUserRef(dc));
}

