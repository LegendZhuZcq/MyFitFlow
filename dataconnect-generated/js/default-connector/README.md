# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`default-connector/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListWorkoutsByUser*](#listworkoutsbyuser)
  - [*GetExercisesForWorkout*](#getexercisesforworkout)
  - [*ListExercisesByUser*](#listexercisesbyuser)
- [**Mutations**](#mutations)
  - [*AddExerciseSet*](#addexerciseset)
  - [*UpdateWorkoutCompletion*](#updateworkoutcompletion)
  - [*CreateWorkout*](#createworkout)
  - [*DeleteExerciseSet*](#deleteexerciseset)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@firebasegen/default-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListWorkoutsByUser
You can execute the `ListWorkoutsByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listWorkoutsByUser(vars: ListWorkoutsByUserVariables): QueryPromise<ListWorkoutsByUserData, ListWorkoutsByUserVariables>;

interface ListWorkoutsByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListWorkoutsByUserVariables): QueryRef<ListWorkoutsByUserData, ListWorkoutsByUserVariables>;
}
export const listWorkoutsByUserRef: ListWorkoutsByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listWorkoutsByUser(dc: DataConnect, vars: ListWorkoutsByUserVariables): QueryPromise<ListWorkoutsByUserData, ListWorkoutsByUserVariables>;

interface ListWorkoutsByUserRef {
  ...
  (dc: DataConnect, vars: ListWorkoutsByUserVariables): QueryRef<ListWorkoutsByUserData, ListWorkoutsByUserVariables>;
}
export const listWorkoutsByUserRef: ListWorkoutsByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listWorkoutsByUserRef:
```typescript
const name = listWorkoutsByUserRef.operationName;
console.log(name);
```

### Variables
The `ListWorkoutsByUser` query requires an argument of type `ListWorkoutsByUserVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListWorkoutsByUserVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `ListWorkoutsByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListWorkoutsByUserData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListWorkoutsByUserData {
  workouts: ({
    id: UUIDString;
    name: string;
    date: DateString;
    completed: boolean;
  } & Workout_Key)[];
}
```
### Using `ListWorkoutsByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listWorkoutsByUser, ListWorkoutsByUserVariables } from '@firebasegen/default-connector';

// The `ListWorkoutsByUser` query requires an argument of type `ListWorkoutsByUserVariables`:
const listWorkoutsByUserVars: ListWorkoutsByUserVariables = {
  userId: ..., 
};

// Call the `listWorkoutsByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listWorkoutsByUser(listWorkoutsByUserVars);
// Variables can be defined inline as well.
const { data } = await listWorkoutsByUser({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listWorkoutsByUser(dataConnect, listWorkoutsByUserVars);

console.log(data.workouts);

// Or, you can use the `Promise` API.
listWorkoutsByUser(listWorkoutsByUserVars).then((response) => {
  const data = response.data;
  console.log(data.workouts);
});
```

### Using `ListWorkoutsByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listWorkoutsByUserRef, ListWorkoutsByUserVariables } from '@firebasegen/default-connector';

// The `ListWorkoutsByUser` query requires an argument of type `ListWorkoutsByUserVariables`:
const listWorkoutsByUserVars: ListWorkoutsByUserVariables = {
  userId: ..., 
};

// Call the `listWorkoutsByUserRef()` function to get a reference to the query.
const ref = listWorkoutsByUserRef(listWorkoutsByUserVars);
// Variables can be defined inline as well.
const ref = listWorkoutsByUserRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listWorkoutsByUserRef(dataConnect, listWorkoutsByUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.workouts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.workouts);
});
```

## GetExercisesForWorkout
You can execute the `GetExercisesForWorkout` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
getExercisesForWorkout(vars: GetExercisesForWorkoutVariables): QueryPromise<GetExercisesForWorkoutData, GetExercisesForWorkoutVariables>;

interface GetExercisesForWorkoutRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetExercisesForWorkoutVariables): QueryRef<GetExercisesForWorkoutData, GetExercisesForWorkoutVariables>;
}
export const getExercisesForWorkoutRef: GetExercisesForWorkoutRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getExercisesForWorkout(dc: DataConnect, vars: GetExercisesForWorkoutVariables): QueryPromise<GetExercisesForWorkoutData, GetExercisesForWorkoutVariables>;

interface GetExercisesForWorkoutRef {
  ...
  (dc: DataConnect, vars: GetExercisesForWorkoutVariables): QueryRef<GetExercisesForWorkoutData, GetExercisesForWorkoutVariables>;
}
export const getExercisesForWorkoutRef: GetExercisesForWorkoutRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getExercisesForWorkoutRef:
```typescript
const name = getExercisesForWorkoutRef.operationName;
console.log(name);
```

### Variables
The `GetExercisesForWorkout` query requires an argument of type `GetExercisesForWorkoutVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetExercisesForWorkoutVariables {
  workoutId: UUIDString;
}
```
### Return Type
Recall that executing the `GetExercisesForWorkout` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetExercisesForWorkoutData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetExercisesForWorkout`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getExercisesForWorkout, GetExercisesForWorkoutVariables } from '@firebasegen/default-connector';

// The `GetExercisesForWorkout` query requires an argument of type `GetExercisesForWorkoutVariables`:
const getExercisesForWorkoutVars: GetExercisesForWorkoutVariables = {
  workoutId: ..., 
};

// Call the `getExercisesForWorkout()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getExercisesForWorkout(getExercisesForWorkoutVars);
// Variables can be defined inline as well.
const { data } = await getExercisesForWorkout({ workoutId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getExercisesForWorkout(dataConnect, getExercisesForWorkoutVars);

console.log(data.exercises);

// Or, you can use the `Promise` API.
getExercisesForWorkout(getExercisesForWorkoutVars).then((response) => {
  const data = response.data;
  console.log(data.exercises);
});
```

### Using `GetExercisesForWorkout`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getExercisesForWorkoutRef, GetExercisesForWorkoutVariables } from '@firebasegen/default-connector';

// The `GetExercisesForWorkout` query requires an argument of type `GetExercisesForWorkoutVariables`:
const getExercisesForWorkoutVars: GetExercisesForWorkoutVariables = {
  workoutId: ..., 
};

// Call the `getExercisesForWorkoutRef()` function to get a reference to the query.
const ref = getExercisesForWorkoutRef(getExercisesForWorkoutVars);
// Variables can be defined inline as well.
const ref = getExercisesForWorkoutRef({ workoutId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getExercisesForWorkoutRef(dataConnect, getExercisesForWorkoutVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.exercises);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.exercises);
});
```

## ListExercisesByUser
You can execute the `ListExercisesByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
listExercisesByUser(): QueryPromise<ListExercisesByUserData, undefined>;

interface ListExercisesByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListExercisesByUserData, undefined>;
}
export const listExercisesByUserRef: ListExercisesByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listExercisesByUser(dc: DataConnect): QueryPromise<ListExercisesByUserData, undefined>;

interface ListExercisesByUserRef {
  ...
  (dc: DataConnect): QueryRef<ListExercisesByUserData, undefined>;
}
export const listExercisesByUserRef: ListExercisesByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listExercisesByUserRef:
```typescript
const name = listExercisesByUserRef.operationName;
console.log(name);
```

### Variables
The `ListExercisesByUser` query has no variables.
### Return Type
Recall that executing the `ListExercisesByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListExercisesByUserData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListExercisesByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listExercisesByUser } from '@firebasegen/default-connector';


// Call the `listExercisesByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listExercisesByUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listExercisesByUser(dataConnect);

console.log(data.exercises);

// Or, you can use the `Promise` API.
listExercisesByUser().then((response) => {
  const data = response.data;
  console.log(data.exercises);
});
```

### Using `ListExercisesByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listExercisesByUserRef } from '@firebasegen/default-connector';


// Call the `listExercisesByUserRef()` function to get a reference to the query.
const ref = listExercisesByUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listExercisesByUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.exercises);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.exercises);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddExerciseSet
You can execute the `AddExerciseSet` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
addExerciseSet(vars: AddExerciseSetVariables): MutationPromise<AddExerciseSetData, AddExerciseSetVariables>;

interface AddExerciseSetRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddExerciseSetVariables): MutationRef<AddExerciseSetData, AddExerciseSetVariables>;
}
export const addExerciseSetRef: AddExerciseSetRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addExerciseSet(dc: DataConnect, vars: AddExerciseSetVariables): MutationPromise<AddExerciseSetData, AddExerciseSetVariables>;

interface AddExerciseSetRef {
  ...
  (dc: DataConnect, vars: AddExerciseSetVariables): MutationRef<AddExerciseSetData, AddExerciseSetVariables>;
}
export const addExerciseSetRef: AddExerciseSetRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addExerciseSetRef:
```typescript
const name = addExerciseSetRef.operationName;
console.log(name);
```

### Variables
The `AddExerciseSet` mutation requires an argument of type `AddExerciseSetVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddExerciseSetVariables {
  exerciseId: UUIDString;
  completed: boolean;
  measurement: string;
  reps: number;
}
```
### Return Type
Recall that executing the `AddExerciseSet` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddExerciseSetData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddExerciseSetData {
  exerciseSet_insert: ExerciseSet_Key;
}
```
### Using `AddExerciseSet`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addExerciseSet, AddExerciseSetVariables } from '@firebasegen/default-connector';

// The `AddExerciseSet` mutation requires an argument of type `AddExerciseSetVariables`:
const addExerciseSetVars: AddExerciseSetVariables = {
  exerciseId: ..., 
  completed: ..., 
  measurement: ..., 
  reps: ..., 
};

// Call the `addExerciseSet()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addExerciseSet(addExerciseSetVars);
// Variables can be defined inline as well.
const { data } = await addExerciseSet({ exerciseId: ..., completed: ..., measurement: ..., reps: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addExerciseSet(dataConnect, addExerciseSetVars);

console.log(data.exerciseSet_insert);

// Or, you can use the `Promise` API.
addExerciseSet(addExerciseSetVars).then((response) => {
  const data = response.data;
  console.log(data.exerciseSet_insert);
});
```

### Using `AddExerciseSet`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addExerciseSetRef, AddExerciseSetVariables } from '@firebasegen/default-connector';

// The `AddExerciseSet` mutation requires an argument of type `AddExerciseSetVariables`:
const addExerciseSetVars: AddExerciseSetVariables = {
  exerciseId: ..., 
  completed: ..., 
  measurement: ..., 
  reps: ..., 
};

// Call the `addExerciseSetRef()` function to get a reference to the mutation.
const ref = addExerciseSetRef(addExerciseSetVars);
// Variables can be defined inline as well.
const ref = addExerciseSetRef({ exerciseId: ..., completed: ..., measurement: ..., reps: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addExerciseSetRef(dataConnect, addExerciseSetVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.exerciseSet_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.exerciseSet_insert);
});
```

## UpdateWorkoutCompletion
You can execute the `UpdateWorkoutCompletion` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
updateWorkoutCompletion(vars: UpdateWorkoutCompletionVariables): MutationPromise<UpdateWorkoutCompletionData, UpdateWorkoutCompletionVariables>;

interface UpdateWorkoutCompletionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateWorkoutCompletionVariables): MutationRef<UpdateWorkoutCompletionData, UpdateWorkoutCompletionVariables>;
}
export const updateWorkoutCompletionRef: UpdateWorkoutCompletionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateWorkoutCompletion(dc: DataConnect, vars: UpdateWorkoutCompletionVariables): MutationPromise<UpdateWorkoutCompletionData, UpdateWorkoutCompletionVariables>;

interface UpdateWorkoutCompletionRef {
  ...
  (dc: DataConnect, vars: UpdateWorkoutCompletionVariables): MutationRef<UpdateWorkoutCompletionData, UpdateWorkoutCompletionVariables>;
}
export const updateWorkoutCompletionRef: UpdateWorkoutCompletionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateWorkoutCompletionRef:
```typescript
const name = updateWorkoutCompletionRef.operationName;
console.log(name);
```

### Variables
The `UpdateWorkoutCompletion` mutation requires an argument of type `UpdateWorkoutCompletionVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateWorkoutCompletionVariables {
  workoutId: UUIDString;
  completed: boolean;
}
```
### Return Type
Recall that executing the `UpdateWorkoutCompletion` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateWorkoutCompletionData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateWorkoutCompletionData {
  workout_update?: Workout_Key | null;
}
```
### Using `UpdateWorkoutCompletion`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateWorkoutCompletion, UpdateWorkoutCompletionVariables } from '@firebasegen/default-connector';

// The `UpdateWorkoutCompletion` mutation requires an argument of type `UpdateWorkoutCompletionVariables`:
const updateWorkoutCompletionVars: UpdateWorkoutCompletionVariables = {
  workoutId: ..., 
  completed: ..., 
};

// Call the `updateWorkoutCompletion()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateWorkoutCompletion(updateWorkoutCompletionVars);
// Variables can be defined inline as well.
const { data } = await updateWorkoutCompletion({ workoutId: ..., completed: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateWorkoutCompletion(dataConnect, updateWorkoutCompletionVars);

console.log(data.workout_update);

// Or, you can use the `Promise` API.
updateWorkoutCompletion(updateWorkoutCompletionVars).then((response) => {
  const data = response.data;
  console.log(data.workout_update);
});
```

### Using `UpdateWorkoutCompletion`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateWorkoutCompletionRef, UpdateWorkoutCompletionVariables } from '@firebasegen/default-connector';

// The `UpdateWorkoutCompletion` mutation requires an argument of type `UpdateWorkoutCompletionVariables`:
const updateWorkoutCompletionVars: UpdateWorkoutCompletionVariables = {
  workoutId: ..., 
  completed: ..., 
};

// Call the `updateWorkoutCompletionRef()` function to get a reference to the mutation.
const ref = updateWorkoutCompletionRef(updateWorkoutCompletionVars);
// Variables can be defined inline as well.
const ref = updateWorkoutCompletionRef({ workoutId: ..., completed: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateWorkoutCompletionRef(dataConnect, updateWorkoutCompletionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.workout_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.workout_update);
});
```

## CreateWorkout
You can execute the `CreateWorkout` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
createWorkout(vars: CreateWorkoutVariables): MutationPromise<CreateWorkoutData, CreateWorkoutVariables>;

interface CreateWorkoutRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateWorkoutVariables): MutationRef<CreateWorkoutData, CreateWorkoutVariables>;
}
export const createWorkoutRef: CreateWorkoutRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createWorkout(dc: DataConnect, vars: CreateWorkoutVariables): MutationPromise<CreateWorkoutData, CreateWorkoutVariables>;

interface CreateWorkoutRef {
  ...
  (dc: DataConnect, vars: CreateWorkoutVariables): MutationRef<CreateWorkoutData, CreateWorkoutVariables>;
}
export const createWorkoutRef: CreateWorkoutRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createWorkoutRef:
```typescript
const name = createWorkoutRef.operationName;
console.log(name);
```

### Variables
The `CreateWorkout` mutation requires an argument of type `CreateWorkoutVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateWorkoutVariables {
  userId: UUIDString;
  name: string;
  date: DateString;
}
```
### Return Type
Recall that executing the `CreateWorkout` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateWorkoutData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateWorkoutData {
  workout_insert: Workout_Key;
}
```
### Using `CreateWorkout`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createWorkout, CreateWorkoutVariables } from '@firebasegen/default-connector';

// The `CreateWorkout` mutation requires an argument of type `CreateWorkoutVariables`:
const createWorkoutVars: CreateWorkoutVariables = {
  userId: ..., 
  name: ..., 
  date: ..., 
};

// Call the `createWorkout()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createWorkout(createWorkoutVars);
// Variables can be defined inline as well.
const { data } = await createWorkout({ userId: ..., name: ..., date: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createWorkout(dataConnect, createWorkoutVars);

console.log(data.workout_insert);

// Or, you can use the `Promise` API.
createWorkout(createWorkoutVars).then((response) => {
  const data = response.data;
  console.log(data.workout_insert);
});
```

### Using `CreateWorkout`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createWorkoutRef, CreateWorkoutVariables } from '@firebasegen/default-connector';

// The `CreateWorkout` mutation requires an argument of type `CreateWorkoutVariables`:
const createWorkoutVars: CreateWorkoutVariables = {
  userId: ..., 
  name: ..., 
  date: ..., 
};

// Call the `createWorkoutRef()` function to get a reference to the mutation.
const ref = createWorkoutRef(createWorkoutVars);
// Variables can be defined inline as well.
const ref = createWorkoutRef({ userId: ..., name: ..., date: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createWorkoutRef(dataConnect, createWorkoutVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.workout_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.workout_insert);
});
```

## DeleteExerciseSet
You can execute the `DeleteExerciseSet` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [default-connector/index.d.ts](./index.d.ts):
```typescript
deleteExerciseSet(vars: DeleteExerciseSetVariables): MutationPromise<DeleteExerciseSetData, DeleteExerciseSetVariables>;

interface DeleteExerciseSetRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteExerciseSetVariables): MutationRef<DeleteExerciseSetData, DeleteExerciseSetVariables>;
}
export const deleteExerciseSetRef: DeleteExerciseSetRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteExerciseSet(dc: DataConnect, vars: DeleteExerciseSetVariables): MutationPromise<DeleteExerciseSetData, DeleteExerciseSetVariables>;

interface DeleteExerciseSetRef {
  ...
  (dc: DataConnect, vars: DeleteExerciseSetVariables): MutationRef<DeleteExerciseSetData, DeleteExerciseSetVariables>;
}
export const deleteExerciseSetRef: DeleteExerciseSetRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteExerciseSetRef:
```typescript
const name = deleteExerciseSetRef.operationName;
console.log(name);
```

### Variables
The `DeleteExerciseSet` mutation requires an argument of type `DeleteExerciseSetVariables`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteExerciseSetVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteExerciseSet` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteExerciseSetData`, which is defined in [default-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteExerciseSetData {
  exerciseSet_delete?: ExerciseSet_Key | null;
}
```
### Using `DeleteExerciseSet`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteExerciseSet, DeleteExerciseSetVariables } from '@firebasegen/default-connector';

// The `DeleteExerciseSet` mutation requires an argument of type `DeleteExerciseSetVariables`:
const deleteExerciseSetVars: DeleteExerciseSetVariables = {
  id: ..., 
};

// Call the `deleteExerciseSet()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteExerciseSet(deleteExerciseSetVars);
// Variables can be defined inline as well.
const { data } = await deleteExerciseSet({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteExerciseSet(dataConnect, deleteExerciseSetVars);

console.log(data.exerciseSet_delete);

// Or, you can use the `Promise` API.
deleteExerciseSet(deleteExerciseSetVars).then((response) => {
  const data = response.data;
  console.log(data.exerciseSet_delete);
});
```

### Using `DeleteExerciseSet`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteExerciseSetRef, DeleteExerciseSetVariables } from '@firebasegen/default-connector';

// The `DeleteExerciseSet` mutation requires an argument of type `DeleteExerciseSetVariables`:
const deleteExerciseSetVars: DeleteExerciseSetVariables = {
  id: ..., 
};

// Call the `deleteExerciseSetRef()` function to get a reference to the mutation.
const ref = deleteExerciseSetRef(deleteExerciseSetVars);
// Variables can be defined inline as well.
const ref = deleteExerciseSetRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteExerciseSetRef(dataConnect, deleteExerciseSetVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.exerciseSet_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.exerciseSet_delete);
});
```

