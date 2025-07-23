"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Workout } from '@/types';

interface MoveWorkoutDialogProps {
  trigger: React.ReactNode;
  currentWorkout: Workout | undefined;
  onMoveWorkout: (newDate: Date) => void;
}

export function MoveWorkoutDialog({
  trigger,
  currentWorkout,
  onMoveWorkout,
}: MoveWorkoutDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNewDate, setSelectedNewDate] = useState<Date | undefined>(undefined);

  const handleMove = () => {
    if (selectedNewDate && currentWorkout) {
      onMoveWorkout(selectedNewDate);
      setIsOpen(false);
      setSelectedNewDate(undefined); // Reset selected date after moving
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Move Workout</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-muted-foreground">
            Select a new date for your workout on {currentWorkout ? format(new Date(currentWorkout.date), 'EEEE, MMMM do') : 'selected date'}.
          </p>
          <Calendar
            mode="single"
            selected={selectedNewDate}
            onSelect={setSelectedNewDate}
            initialFocus
          />
        </div>
        <DialogFooter>
          <Button onClick={handleMove} disabled={!selectedNewDate || !currentWorkout}>
            Move Workout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
