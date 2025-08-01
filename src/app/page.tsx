"use client";

import { useState, useMemo, useEffect } from 'react';
import { format, addDays, startOfWeek, subDays } from 'date-fns';
import type { Exercise, Workout, ExerciseSet } from '@/types';
import Header from '@/components/header';
import CalendarView from '@/components/calendar-view';
import RoutineDesigner from '@/components/routine-designer';
import { MoveWorkoutDialog } from '@/components/move-workout-dialog';
import { getInitialWorkouts } from '@/data/sample-workouts';


const clientSideHydrate = (initialWorkouts: Record<string, Workout>) => {
    const clientSideWorkouts: Record<string, Workout> = {};
    if (typeof window === 'undefined') return initialWorkouts;
    for (const dateKey in initialWorkouts) {
        const workout = initialWorkouts[dateKey];
        clientSideWorkouts[dateKey] = {
            ...workout,
            exercises: workout.exercises.map(ex => ({
                ...ex,
                id: crypto.randomUUID(),
                sets: ex.sets.map(set => ({...set, id: crypto.randomUUID()}))
            }))
        };
    }
    return clientSideWorkouts;
}

export default function Home() {
  const [workouts, setWorkouts] = useState<Record<string, Workout>>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const initialWorkouts = getInitialWorkouts();
    setWorkouts(clientSideHydrate(initialWorkouts));
    setIsClient(true);
  }, []);


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleWeekChange = (direction: 'next' | 'prev') => {
    setCurrentWeek(prevWeek => {
      const newWeek = direction === 'next' ? addDays(prevWeek, 7) : subDays(prevWeek, 7);
      setSelectedDate(newWeek);
      return newWeek;
    });
  };

  const handleAddExercise = (exercise: Omit<Exercise, 'id'>) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const now = new Date();
    setWorkouts(prev => {
      const newWorkouts = { ...prev };
      const newExercise: Exercise = {
        ...exercise,
        id: crypto.randomUUID(),
        sets: exercise.sets.map(s => ({...s, id: crypto.randomUUID(), exerciseId: crypto.randomUUID()})),
      };
      if (newWorkouts[dateKey]) {
        newWorkouts[dateKey].exercises.push(newExercise);
      } else {
        newWorkouts[dateKey] = {
          id: crypto.randomUUID(),
          userId: 'user-1',
          name: 'New Routine',
          date: selectedDate,
          completed: false,
          createdAt: now,
          updatedAt: now,
          exercises: [newExercise],
        };
      }
      return newWorkouts;
    });
  };
  
  const handleDeleteExercise = (exerciseId: string) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setWorkouts(prev => {
      const newWorkouts = { ...prev };
      if (newWorkouts[dateKey]) {
        newWorkouts[dateKey].exercises = newWorkouts[dateKey].exercises.filter(ex => ex.id !== exerciseId);
        if (newWorkouts[dateKey].exercises.length === 0) {
          delete newWorkouts[dateKey];
        }
      }
      return newWorkouts;
    });
  };

  const handleEditExercise = (exerciseId: string, updatedExercise: Omit<Exercise, 'id'>) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setWorkouts(prev => {
      const newWorkouts = { ...prev };
      if (newWorkouts[dateKey]) {
        const exerciseIndex = newWorkouts[dateKey].exercises.findIndex(ex => ex.id === exerciseId);
        if (exerciseIndex > -1) {
            const originalExercise = newWorkouts[dateKey].exercises[exerciseIndex];
            newWorkouts[dateKey].exercises[exerciseIndex] = {
                ...originalExercise,
                ...updatedExercise,
                sets: updatedExercise.sets.map((set, i) => ({
                    ...set,
                    id: originalExercise.sets[i]?.id || crypto.randomUUID()
                }))
            };
        }
      }
      return newWorkouts;
    });
  };

  const handleSetCompletionChange = (exerciseId: string, setId: string, isCompleted: boolean) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setWorkouts(prev => {
      const newWorkouts = { ...prev };
      const workout = newWorkouts[dateKey];
      if (workout) {
        const exercise = workout.exercises.find(ex => ex.id === exerciseId);
        if (exercise) {
          const set = exercise.sets.find(s => s.id === setId);
          if (set) {
            set.completed = isCompleted;
          }
        }
      }
      return newWorkouts;
    });
  };
  
  const handleLogWorkout = () => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setWorkouts(prev => {
      const newWorkouts = { ...prev };
      if (newWorkouts[dateKey]) {
        newWorkouts[dateKey].completed = !newWorkouts[dateKey].completed;
      }
      return newWorkouts;
    });
  };
  
  const handleCreateRoutine = () => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const now = new Date();
    setWorkouts(prev => ({
      ...prev,
      [dateKey]: {
        id: crypto.randomUUID(),
        userId: 'user-1',
        name: 'New Routine',
        date: selectedDate,
        completed: false,
        createdAt: now,
        updatedAt: now,
        exercises: [],
      }
    }));
  };

  const handleMoveWorkout = (newDate: Date) => {
    const oldDateKey = format(selectedDate, 'yyyy-MM-dd');
    const newDateKey = format(newDate, 'yyyy-MM-dd');
    setWorkouts(prev => {
      const newWorkouts = { ...prev };
      if (newWorkouts[oldDateKey]) {
        // Update the date property within the workout object
        newWorkouts[oldDateKey].date = newDate;
        newWorkouts[oldDateKey].updatedAt = new Date();
        // Move the workout to the new date key
        newWorkouts[newDateKey] = newWorkouts[oldDateKey];
        // Delete the old entry
        delete newWorkouts[oldDateKey];
      }
      return newWorkouts;
    });
    setSelectedDate(newDate);
  };

  const selectedWorkout = useMemo(() => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    return workouts[dateKey];
  }, [selectedDate, workouts]);

  if (!isClient) {
    // You can return a loader here or null
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body">
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 md:px-8 border-b border-border">
          <CalendarView
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            workouts={workouts}
            currentWeek={currentWeek}
            onWeekChange={handleWeekChange}
          />
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <RoutineDesigner
            workout={selectedWorkout}
            selectedDate={selectedDate}
            onAddExercise={handleAddExercise}
            onDeleteExercise={handleDeleteExercise}
            onEditExercise={handleEditExercise}
            onSetCompletionChange={handleSetCompletionChange}
            onLogWorkout={handleLogWorkout}
            onCreateRoutine={handleCreateRoutine}
            onMoveWorkout={handleMoveWorkout}
          />
        </main>
      </div>
    </div>
  );
}
