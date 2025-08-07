"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { Dumbbell, Plus, Move, Edit2, Copy } from 'lucide-react';
import type { Exercise, Workout } from '@/types';
import type { ExerciseTemplate } from '@/lib/exercise-templates';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ExerciseCard from './exercise-card';
import { AddExerciseDialog } from './add-exercise-dialog';
import { MoveWorkoutDialog } from './move-workout-dialog';
import { CopyWorkoutDialog } from './copy-workout-dialog';

interface RoutineDesignerProps {
  workout: Workout | undefined;
  selectedDate: Date;
  onAddExercise: (exercise: Omit<Exercise, 'id'>) => void;
  onDeleteExercise: (exerciseId: string) => void;
  onEditExercise: (exerciseId: string, updatedExercise: Omit<Exercise, 'id'>) => void;
  onSetCompletionChange: (exerciseId: string, setId: string, isCompleted: boolean) => void;
  onLogWorkout: () => void;
  onCreateRoutine: () => void;
  onMoveWorkout: (newDate: Date) => void;
  onCopyWorkout: (targetDate: Date) => void;
  onEditWorkoutName?: (newName: string) => void;
  exerciseTemplates?: ExerciseTemplate[];
}

const RoutineDesigner = ({
  workout,
  selectedDate,
  onAddExercise,
  onDeleteExercise,
  onEditExercise,
  onSetCompletionChange,
  onLogWorkout,
  onCreateRoutine,
  onMoveWorkout,
  onCopyWorkout,
  onEditWorkoutName,
  exerciseTemplates = [],
}: RoutineDesignerProps) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');

  const handleEditName = () => {
    if (workout) {
      setEditedName(workout.name);
      setIsEditingName(true);
    }
  };

  const handleSaveName = () => {
    if (onEditWorkoutName && editedName.trim()) {
      onEditWorkoutName(editedName.trim());
    }
    setIsEditingName(false);
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setEditedName('');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          {workout && isEditingName ? (
            <div className="flex items-center space-x-2 mb-2">
              <Input
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="text-2xl font-bold tracking-tight h-auto py-1 px-2"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSaveName();
                  } else if (e.key === 'Escape') {
                    handleCancelEdit();
                  }
                }}
                autoFocus
              />
              <Button size="sm" onClick={handleSaveName}>
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-2xl font-bold tracking-tight">
                {workout ? workout.name : 'Rest Day'}
              </h2>
              {workout && onEditWorkoutName && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEditName}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
          <p className="text-muted-foreground">
            {format(selectedDate, 'EEEE, MMMM do')}
          </p>
        </div>
        {workout && (
          <div className="space-y-2">
            <div className="flex space-x-2">
              <MoveWorkoutDialog
                trigger={
                  <Button variant="outline" size="sm" className="flex-1">
                    <Move className="mr-1 h-4 w-4" />
                    <span className="hidden sm:inline">Move</span>
                  </Button>
                }
                currentWorkout={workout}
                onMoveWorkout={onMoveWorkout}
              />
              <CopyWorkoutDialog
                trigger={
                  <Button variant="outline" size="sm" className="flex-1">
                    <Copy className="mr-1 h-4 w-4" />
                    <span className="hidden sm:inline">Copy</span>
                  </Button>
                }
                currentWorkout={workout}
                onCopyWorkout={onCopyWorkout}
              />
            </div>
            <div className="flex">
              <Button onClick={onLogWorkout} variant={workout.completed ? "secondary" : "default"} className="flex-1">
                {workout.completed ? 'Mark as Incomplete' : 'Mark as completed'}
              </Button>
            </div>
          </div>
        )}
      </div>
          <AddExerciseDialog onAddExercise={onAddExercise} exerciseTemplates={exerciseTemplates}>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Exercise
            </Button>
          </AddExerciseDialog>
      {workout ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
            {workout.exercises.map(exercise => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onDelete={onDeleteExercise}
                onEdit={onEditExercise}
                onSetCompletionChange={onSetCompletionChange}
              />
            ))}
          </div>
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
