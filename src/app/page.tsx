"use client";

import { useState, useMemo, useEffect } from 'react';
import { format, addDays, startOfWeek, subDays } from 'date-fns';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { Exercise, Workout } from '@/types';
import Header from '@/components/header';
import CalendarView from '@/components/calendar-view';
import RoutineDesigner from '@/components/routine-designer';
import { getExerciseTemplates } from '@/lib/exercise-templates';
import { subscribeToUserWorkouts, updateWorkoutInFirestore, deleteWorkoutFromFirestore } from '@/lib/firestore-service';
import AuthWrapper from '@/components/auth-wrapper';


export default function Home() {
  const [workouts, setWorkouts] = useState<Record<string, Workout>>({});
  const [user, setUser] = useState<User | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsClient(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToUserWorkouts(user.uid, (userWorkouts) => {
      setWorkouts(userWorkouts);
    });

    return () => unsubscribe();
  }, [user]);


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

  const handleAddExercise = async (exercise: Omit<Exercise, 'id'>) => {
    if (!user) return;
    
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const now = new Date();
    
    const newExercise: Exercise = {
      ...exercise,
      id: crypto.randomUUID(),
      sets: exercise.sets.map(s => ({...s, id: crypto.randomUUID(), exerciseId: crypto.randomUUID()})),
    };

    let updatedWorkout: Workout;
    if (workouts[dateKey]) {
      updatedWorkout = {
        ...workouts[dateKey],
        exercises: [...workouts[dateKey].exercises, newExercise],
        updatedAt: now,
      };
    } else {
      updatedWorkout = {
        id: crypto.randomUUID(),
        userId: user.uid,
        name: 'New Routine',
        date: selectedDate,
        completed: false,
        createdAt: now,
        updatedAt: now,
        exercises: [newExercise],
      };
    }

    try {
      await updateWorkoutInFirestore(updatedWorkout);
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };
  
  const handleDeleteExercise = async (exerciseId: string) => {
    if (!user) return;
    
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const workout = workouts[dateKey];
    if (!workout) return;

    const updatedExercises = workout.exercises.filter(ex => ex.id !== exerciseId);
    
    try {
      if (updatedExercises.length === 0) {
        await deleteWorkoutFromFirestore(workout.id);
      } else {
        const updatedWorkout = {
          ...workout,
          exercises: updatedExercises,
          updatedAt: new Date(),
        };
        await updateWorkoutInFirestore(updatedWorkout);
      }
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  };

  const handleEditExercise = async (exerciseId: string, updatedExercise: Omit<Exercise, 'id'>) => {
    if (!user) return;
    
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const workout = workouts[dateKey];
    if (!workout) return;

    const exerciseIndex = workout.exercises.findIndex(ex => ex.id === exerciseId);
    if (exerciseIndex === -1) return;

    const originalExercise = workout.exercises[exerciseIndex];
    const updatedExercises = [...workout.exercises];
    updatedExercises[exerciseIndex] = {
      ...originalExercise,
      ...updatedExercise,
      sets: updatedExercise.sets.map((set, i) => ({
        ...set,
        id: originalExercise.sets[i]?.id || crypto.randomUUID()
      }))
    };

    const updatedWorkout = {
      ...workout,
      exercises: updatedExercises,
      updatedAt: new Date(),
    };

    try {
      await updateWorkoutInFirestore(updatedWorkout);
    } catch (error) {
      console.error('Error editing exercise:', error);
    }
  };

  const handleSetCompletionChange = async (exerciseId: string, setId: string, isCompleted: boolean) => {
    if (!user) return;
    
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const workout = workouts[dateKey];
    if (!workout) return;

    const exercise = workout.exercises.find(ex => ex.id === exerciseId);
    if (!exercise) return;

    const set = exercise.sets.find(s => s.id === setId);
    if (!set) return;

    set.completed = isCompleted;

    const updatedWorkout = {
      ...workout,
      updatedAt: new Date(),
    };

    try {
      await updateWorkoutInFirestore(updatedWorkout);
    } catch (error) {
      console.error('Error updating set completion:', error);
    }
  };
  
  const handleLogWorkout = async () => {
    if (!user) return;
    
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const workout = workouts[dateKey];
    if (!workout) return;

    const updatedWorkout = {
      ...workout,
      completed: !workout.completed,
      updatedAt: new Date(),
    };

    try {
      await updateWorkoutInFirestore(updatedWorkout);
    } catch (error) {
      console.error('Error logging workout:', error);
    }
  };
  
  const handleCreateRoutine = async () => {
    if (!user) return;
    
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    const now = new Date();
    
    const newWorkout: Workout = {
      id: crypto.randomUUID(),
      userId: user.uid,
      name: 'New Routine',
      date: selectedDate,
      completed: false,
      createdAt: now,
      updatedAt: now,
      exercises: [],
    };

    try {
      await updateWorkoutInFirestore(newWorkout);
    } catch (error) {
      console.error('Error creating routine:', error);
    }
  };

  const handleMoveWorkout = async (newDate: Date) => {
    if (!user) return;
    
    const oldDateKey = format(selectedDate, 'yyyy-MM-dd');
    const workout = workouts[oldDateKey];
    if (!workout) return;

    const updatedWorkout = {
      ...workout,
      date: newDate,
      updatedAt: new Date(),
    };

    try {
      await updateWorkoutInFirestore(updatedWorkout);
      setSelectedDate(newDate);
    } catch (error) {
      console.error('Error moving workout:', error);
    }
  };

  const selectedWorkout = useMemo(() => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    return workouts[dateKey];
  }, [selectedDate, workouts]);

  const exerciseTemplates = useMemo(() => {
    return getExerciseTemplates(workouts);
  }, [workouts]);

  if (!isClient) {
    // You can return a loader here or null
    return null;
  }

  return (
    <AuthWrapper>
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
              exerciseTemplates={exerciseTemplates}
            />
          </main>
        </div>
      </div>
    </AuthWrapper>
  );
}
