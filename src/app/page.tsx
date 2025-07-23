"use client";

import { useState, useMemo, useEffect } from 'react';
import { format, addDays, startOfWeek, subDays } from 'date-fns';
import type { Exercise, Workout, ExerciseSet } from '@/types';
import Header from '@/components/header';
import CalendarView from '@/components/calendar-view';
import RoutineDesigner from '@/components/routine-designer';
import { MoveWorkoutDialog } from '@/components/move-workout-dialog';

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
        { id: '1', name: 'Bench Press', youtubeLink: 'https://www.youtube.com/watch?v=SCVCLChgT5A', sets: [
          {id: 's1', reps: '8', measurement: '80kg', completed: true},
          {id: 's2', reps: '8', measurement: '80kg', completed: true},
          {id: 's3', reps: '10', measurement: '75kg', completed: true},
          {id: 's4', reps: '10', measurement: '70kg', completed: false},
        ]},
        { id: '2', name: 'Overhead Press', youtubeLink: 'https://www.youtube.com', sets: [
          {id: 's5', reps: '10', measurement: '40kg', completed: true},
          {id: 's6', reps: '12', measurement: '40kg', completed: false},
          {id: 's7', reps: '12', measurement: '35kg', completed: false},
        ]},
        { id: '3', name: 'Tricep Pushdowns', youtubeLink: 'https://www.youtube.com', sets: [
          {id: 's8', reps: '15', measurement: '25kg', completed: false},
          {id: 's9', reps: '15', measurement: '25kg', completed: false},
          {id: 's10', reps: '15', measurement: '20kg', completed: false},
        ]},
      ],
    },
    [wednesdayKey]: {
      name: 'Pull Day',
      date: wednesdayKey,
      completed: false,
      exercises: [
        { id: '4', name: 'Pull Ups', youtubeLink: 'https://www.youtube.com', sets: [
            {id: 's11', reps: 'AMRAP', measurement: 'Bodyweight', completed: false},
            {id: 's12', reps: 'AMRAP', measurement: 'Bodyweight', completed: false},
            {id: 's13', reps: 'AMRAP', measurement: 'Bodyweight', completed: false},
            {id: 's14', reps: 'AMRAP', measurement: 'Bodyweight', completed: false},
        ]},
        { id: '5', name: 'Bent Over Rows', youtubeLink: 'https://www.youtube.com', sets: [
            {id: 's15', reps: '10', measurement: '60kg', completed: false},
            {id: 's16', reps: '10', measurement: '60kg', completed: false},
            {id: 's17', reps: '10', measurement: '60kg', completed: false},
        ]},
        { id: '6', name: 'Bicep Curls', youtubeLink: 'https://www.youtube.com', sets: [
            {id: 's18', reps: '12', measurement: '15kg', completed: false},
            {id: 's19', reps: '15', measurement: '15kg', completed: false},
            {id: 's20', reps: '15', measurement: '12.5kg', completed: false},
        ]},
      ],
    },
    [fridayKey]: {
      name: 'Leg Day',
      date: fridayKey,
      completed: false,
      exercises: [
        { id: '7', name: 'Squats', youtubeLink: 'https://www.youtube.com', sets: [
            {id: 's21', reps: '8', measurement: '100kg', completed: false},
            {id: 's22', reps: '8', measurement: '100kg', completed: false},
            {id: 's23', reps: '10', measurement: '90kg', completed: false},
            {id: 's24', reps: '10', measurement: '90kg', completed: false},
        ]},
        { id: '8', name: 'Romanian Deadlifts', youtubeLink: 'https://www.youtube.com', sets: [
            {id: 's25', reps: '12', measurement: '80kg', completed: false},
            {id: 's26', reps: '12', measurement: '80kg', completed: false},
            {id: 's27', reps: '12', measurement: '80kg', completed: false},
        ]},
        { id: '9', name: 'Leg Press', youtubeLink: 'https://www.youtube.com', sets: [
            {id: 's28', reps: '12', measurement: '150kg', completed: false},
            {id: 's29', reps: '15', measurement: '140kg', completed: false},
            {id: 's30', reps: '15', measurement: '130kg', completed: false},
        ]},
      ],
    }
  };
};

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
    setWorkouts(prev => {
      const newWorkouts = { ...prev };
      const newExercise: Exercise = {
        ...exercise,
        id: crypto.randomUUID(),
        sets: exercise.sets.map(s => ({...s, id: crypto.randomUUID()})),
      };
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

  const handleMoveWorkout = (newDate: Date) => {
    const oldDateKey = format(selectedDate, 'yyyy-MM-dd');
    const newDateKey = format(newDate, 'yyyy-MM-dd');
    setWorkouts(prev => {
      const newWorkouts = { ...prev };
      if (newWorkouts[oldDateKey]) {
        // Update the date property within the workout object
        newWorkouts[oldDateKey].date = newDateKey;
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
