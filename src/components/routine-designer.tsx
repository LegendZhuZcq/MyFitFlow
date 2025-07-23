"use client";

import { format } from 'date-fns';
import { Dumbbell, Plus } from 'lucide-react';
import type { Exercise, Workout } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ExerciseCard from './exercise-card';
import { AddExerciseDialog } from './add-exercise-dialog';

interface RoutineDesignerProps {
  workout: Workout | undefined;
  selectedDate: Date;
  onAddExercise: (exercise: Omit<Exercise, 'id'>) => void;
  onDeleteExercise: (exerciseId: string) => void;
  onLogWorkout: () => void;
  onCreateRoutine: () => void;
}

const RoutineDesigner = ({
  workout,
  selectedDate,
  onAddExercise,
  onDeleteExercise,
  onLogWorkout,
  onCreateRoutine,
}: RoutineDesignerProps) => {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {workout ? workout.name : 'Rest Day'}
          </h2>
          <p className="text-muted-foreground">
            {format(selectedDate, 'EEEE, MMMM do')}
          </p>
        </div>
        {workout && (
          <Button onClick={onLogWorkout} variant={workout.completed ? "secondary" : "default"}>
            {workout.completed ? 'Mark as Incomplete' : 'Log Workout'}
          </Button>
        )}
      </div>

      {workout ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workout.exercises.map(exercise => (
              <ExerciseCard key={exercise.id} exercise={exercise} onDelete={onDeleteExercise} />
            ))}
          </div>
          <AddExerciseDialog onAddExercise={onAddExercise}>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Exercise
            </Button>
          </AddExerciseDialog>
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center p-12 space-y-4 border-dashed">
          <Dumbbell className="w-16 h-16 text-muted-foreground" />
          <h3 className="text-lg font-semibold">No routine for this day</h3>
          <p className="text-sm text-muted-foreground">Get started by creating a new routine.</p>
          <Button onClick={onCreateRoutine}>
            <Plus className="mr-2 h-4 w-4" />
            Create Routine
          </Button>
        </Card>
      )}
    </div>
  );
};

export default RoutineDesigner;
