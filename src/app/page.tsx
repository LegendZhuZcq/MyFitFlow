"use client";

import { useState, useMemo } from 'react';
import { format, addDays, startOfWeek, subDays, isToday, parseISO } from 'date-fns';
import type { Exercise, Workout } from '@/types';
import Header from '@/components/header';
import CalendarView from '@/components/calendar-view';
import RoutineDesigner from '@/components/routine-designer';

const getInitialWorkouts = (): Record<string, Workout> => {
  const today = new Date();
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // Monday

  const mondayKey = format(startOfThisWeek, 'yyyy-MM-dd');
  const wednesdayKey = format(addDays(startOfThisWeek, 2), 'yyyy-MM-dd');
  const fridayKey = format(addDays(startOfThisWeek, 4), 'yyyy-MM-dd');

  return {
    [mondayKey]: {
      name: 'Push Day',
      date: mondayKey,
      completed: true,
      exercises: [
        { id: crypto.randomUUID(), name: 'Bench Press', sets: 4, reps: '8-10', weight: '80kg', youtubeLink: 'https://www.youtube.com/watch?v=SCVCLChgT5A', completedSets: 4 },
        { id: crypto.randomUUID(), name: 'Overhead Press', sets: 3, reps: '10-12', weight: '40kg', youtubeLink: 'https://www.youtube.com', completedSets: 1 },
        { id: crypto.randomUUID(), name: 'Tricep Pushdowns', sets: 3, reps: '12-15', weight: '25kg', youtubeLink: 'https://www.youtube.com', completedSets: 0 },
      ],
    },
    [wednesdayKey]: {
      name: 'Pull Day',
      date: wednesdayKey,
      completed: false,
      exercises: [
        { id: crypto.randomUUID(), name: 'Pull Ups', sets: 4, reps: 'AMRAP', weight: 'Bodyweight', youtubeLink: 'https://www.youtube.com', completedSets: 0 },
        { id: crypto.randomUUID(), name: 'Bent Over Rows', sets: 3, reps: '10', weight: '60kg', youtubeLink: 'https://www.youtube.com', completedSets: 0 },
        { id: crypto.randomUUID(), name: 'Bicep Curls', sets: 3, reps: '12-15', weight: '15kg', youtubeLink: 'https://www.youtube.com', completedSets: 0 },
      ],
    },
    [fridayKey]: {
      name: 'Leg Day',
      date: fridayKey,
      completed: false,
      exercises: [
        { id: crypto.randomUUID(), name: 'Squats', sets: 4, reps: '8-10', weight: '100kg', youtubeLink: 'https://www.youtube.com', completedSets: 0 },
        { id: crypto.randomUUID(), name: 'Romanian Deadlifts', sets: 3, reps: '10-12', weight: '80kg', youtubeLink: 'https://www.youtube.com', completedSets: 0 },
        { id: crypto.randomUUID(), name: 'Leg Press', sets: 3, reps: '12-15', weight: '150kg', youtubeLink: 'https://www.youtube.com', completedSets: 0 },
      ],
    }
  };
};

export default function Home() {
  const [workouts, setWorkouts] = useState<Record<string, Workout>>(getInitialWorkouts);
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
    setWorkouts(prev => {
      const newWorkouts = { ...prev };
      const newExercise = { ...exercise, id: crypto.randomUUID(), completedSets: 0 };
      if (newWorkouts[dateKey]) {
        newWorkouts[dateKey].exercises.push(newExercise);
      } else {
        newWorkouts[dateKey] = {
          name: 'New Routine',
          date: dateKey,
          completed: false,
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

  const handleEditExercise = (exerciseId: string, updatedExercise: Omit<Exercise, 'id' | 'completedSets'>) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setWorkouts(prev => {
      const newWorkouts = { ...prev };
      if (newWorkouts[dateKey]) {
        const exerciseIndex = newWorkouts[dateKey].exercises.findIndex(ex => ex.id === exerciseId);
        if (exerciseIndex > -1) {
          newWorkouts[dateKey].exercises[exerciseIndex] = { ...newWorkouts[dateKey].exercises[exerciseIndex], ...updatedExercise };
        }
      }
      return newWorkouts;
    });
  };

  const handleSetCompletionChange = (exerciseId: string, setIndex: number, isCompleted: boolean) => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    setWorkouts(prev => {
      const newWorkouts = { ...prev };
      const workout = newWorkouts[dateKey];
      if (workout) {
        const exercise = workout.exercises.find(ex => ex.id === exerciseId);
        if (exercise) {
          // This is a simplified logic. A more robust way would be to store an array of booleans for sets.
          // For now, we just increment or decrement the count of completed sets.
          let completedCount = exercise.completedSets || 0;
          if(isCompleted) {
             completedCount = Math.min(exercise.sets, completedCount + 1);
          } else {
             completedCount = Math.max(0, completedCount - 1);
          }
           // A real implementation would need a more robust way to handle which specific set is checked.
           // This logic just toggles the count, which works for sequential checking.
          const newCompleted = Array(exercise.sets).fill(false).map((_,i) => i < completedCount);
          exercise.completedSets = newCompleted.filter(Boolean).length;
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
    setWorkouts(prev => ({
      ...prev,
      [dateKey]: {
        name: 'New Routine',
        date: dateKey,
        completed: false,
        exercises: [],
      }
    }));
  };

  const selectedWorkout = useMemo(() => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    return workouts[dateKey];
  }, [selectedDate, workouts]);

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
          />
        </main>
      </div>
    </div>
  );
}
