"use client";

import { format, addDays, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { LegacyWorkout as Workout } from '@/types';

interface CalendarViewProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  workouts: Record<string, Workout>;
  currentWeek: Date;
  onWeekChange: (direction: 'next' | 'prev') => void;
}

const CalendarView = ({ selectedDate, onDateSelect, workouts, currentWeek, onWeekChange }: CalendarViewProps) => {
  const days = Array.from({ length: 7 }).map((_, i) => addDays(currentWeek, i));

  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" size="icon" onClick={() => onWeekChange('prev')}>
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <div className="flex items-center justify-center space-x-2 md:space-x-3 overflow-x-auto">
        {days.map(day => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const hasCompletedWorkout = workouts[dateKey]?.completed;
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentToday = isToday(day);

          return (
            <div key={day.toString()} className="flex flex-col items-center space-y-2">
              <span className="text-xs text-muted-foreground uppercase">
                {format(day, 'E')}
              </span>
              <Button
                variant={isSelected ? 'default' : 'outline'}
                size="icon"
                onClick={() => onDateSelect(day)}
                className={cn(
                  'w-12 h-12 rounded-full flex flex-col relative shrink-0',
                  isSelected && 'bg-primary text-primary-foreground hover:bg-primary/90',
                  !isSelected && 'bg-transparent border-border',
                  isCurrentToday && !isSelected && 'border-accent text-accent',
                )}
              >
                <span className="text-lg font-bold">{format(day, 'd')}</span>
                 {hasCompletedWorkout && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full"></span>
                )}
              </Button>
            </div>
          );
        })}
      </div>
      <Button variant="ghost" size="icon" onClick={() => onWeekChange('next')}>
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default CalendarView;
