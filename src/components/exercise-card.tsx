"use client";

import { Youtube, Trash2, Pencil } from 'lucide-react';
import type { Exercise } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EditExerciseDialog } from './edit-exercise-dialog';

interface ExerciseCardProps {
  exercise: Exercise;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedExercise: Omit<Exercise, 'id'>) => void;
}

const ExerciseCard = ({ exercise, onDelete, onEdit }: ExerciseCardProps) => {
  return (
    <Card className="bg-card/50 hover:bg-card/70 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">{exercise.name}</CardTitle>
        <div className="flex items-center gap-2">
          {exercise.youtubeLink && (
            <a href={exercise.youtubeLink} target="_blank" rel="noopener noreferrer">
              <Youtube className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          )}
          <EditExerciseDialog exercise={exercise} onEditExercise={onEdit}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4 text-muted-foreground hover:text-primary" />
            </Button>
          </EditExerciseDialog>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onDelete(exercise.id)}>
            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 text-sm">
          <Badge variant="secondary">{exercise.sets} Sets</Badge>
          <Badge variant="secondary">{exercise.reps} Reps</Badge>
          <Badge variant="secondary">{exercise.weight}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;