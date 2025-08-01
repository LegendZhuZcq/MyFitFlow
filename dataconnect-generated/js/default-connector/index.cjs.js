const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'myfitflow-2-service',
  location: 'us-west1'
};
exports.connectorConfig = connectorConfig;

const addExerciseSetRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddExerciseSet', inputVars);
}
addExerciseSetRef.operationName = 'AddExerciseSet';
exports.addExerciseSetRef = addExerciseSetRef;

exports.addExerciseSet = function addExerciseSet(dcOrVars, vars) {
  return executeMutation(addExerciseSetRef(dcOrVars, vars));
};

const listWorkoutsByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListWorkoutsByUser', inputVars);
}
listWorkoutsByUserRef.operationName = 'ListWorkoutsByUser';
exports.listWorkoutsByUserRef = listWorkoutsByUserRef;

exports.listWorkoutsByUser = function listWorkoutsByUser(dcOrVars, vars) {
  return executeQuery(listWorkoutsByUserRef(dcOrVars, vars));
};

const updateWorkoutCompletionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateWorkoutCompletion', inputVars);
}
updateWorkoutCompletionRef.operationName = 'UpdateWorkoutCompletion';
exports.updateWorkoutCompletionRef = updateWorkoutCompletionRef;

exports.updateWorkoutCompletion = function updateWorkoutCompletion(dcOrVars, vars) {
  return executeMutation(updateWorkoutCompletionRef(dcOrVars, vars));
};

const getExercisesForWorkoutRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetExercisesForWorkout', inputVars);
}
getExercisesForWorkoutRef.operationName = 'GetExercisesForWorkout';
exports.getExercisesForWorkoutRef = getExercisesForWorkoutRef;

exports.getExercisesForWorkout = function getExercisesForWorkout(dcOrVars, vars) {
  return executeQuery(getExercisesForWorkoutRef(dcOrVars, vars));
};

const createWorkoutRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateWorkout', inputVars);
}
createWorkoutRef.operationName = 'CreateWorkout';
exports.createWorkoutRef = createWorkoutRef;

exports.createWorkout = function createWorkout(dcOrVars, vars) {
  return executeMutation(createWorkoutRef(dcOrVars, vars));
};

const deleteExerciseSetRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteExerciseSet', inputVars);
}
deleteExerciseSetRef.operationName = 'DeleteExerciseSet';
exports.deleteExerciseSetRef = deleteExerciseSetRef;

exports.deleteExerciseSet = function deleteExerciseSet(dcOrVars, vars) {
  return executeMutation(deleteExerciseSetRef(dcOrVars, vars));
};

const listExercisesByUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExercisesByUser');
}
listExercisesByUserRef.operationName = 'ListExercisesByUser';
exports.listExercisesByUserRef = listExercisesByUserRef;

exports.listExercisesByUser = function listExercisesByUser(dc) {
  return executeQuery(listExercisesByUserRef(dc));
};
