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

interface CopyWorkoutDialogProps {
  trigger: React.ReactNode;
  currentWorkout: Workout | undefined;
  onCopyWorkout: (targetDate: Date) => void;
}

export function CopyWorkoutDialog({
  trigger,
  currentWorkout,
  onCopyWorkout,
}: CopyWorkoutDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTargetDate, setSelectedTargetDate] = useState<Date | undefined>(undefined);

  const handleCopy = () => {
    if (selectedTargetDate && currentWorkout) {
      onCopyWorkout(selectedTargetDate);
      setIsOpen(false);
      setSelectedTargetDate(undefined); // Reset selected date after copying
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Copy Workout</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-muted-foreground">
            Select a date to copy your workout "{currentWorkout?.name}" from {currentWorkout ? format(new Date(currentWorkout.date), 'EEEE, MMMM do') : 'selected date'}.
          </p>
          <Calendar
            mode="single"
            selected={selectedTargetDate}
            onSelect={setSelectedTargetDate}
            initialFocus
          />
        </div>
        <DialogFooter>
          <Button onClick={handleCopy} disabled={!selectedTargetDate || !currentWorkout}>
            Copy Workout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
