"use client";

import { Youtube, Trash2, Pencil, Check } from 'lucide-react';
import type { Exercise } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EditExerciseDialog } from './edit-exercise-dialog';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

interface ExerciseCardProps {
  exercise: Exercise;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedExercise: Omit<Exercise, 'id' | 'completedSets'>) => void;
  onSetCompletionChange: (exerciseId: string, setIndex: number, isCompleted: boolean) => void;
}

const getYouTubeVideoId = (url: string) => {
  let videoId = '';
  const urlObj = new URL(url);
  if (urlObj.hostname === 'youtu.be') {
    videoId = urlObj.pathname.slice(1);
  } else if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
    videoId = urlObj.searchParams.get('v') || '';
  }
  return videoId;
};


const ExerciseCard = ({ exercise, onDelete, onEdit, onSetCompletionChange }: ExerciseCardProps) => {
  const videoId = exercise.youtubeLink ? getYouTubeVideoId(exercise.youtubeLink) : null;

  return (
    <Card className="bg-card/50 hover:bg-card/70 transition-colors flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">{exercise.name}</CardTitle>
        <div className="flex items-center gap-2">
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
      <CardContent className="flex-1 flex flex-col justify-between">
        <div>
          {videoId && (
            <div className="aspect-video rounded-md overflow-hidden mb-4">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          )}
          <div className="flex flex-wrap gap-2 text-sm mb-4">
            <Badge variant="secondary">{exercise.sets} Sets</Badge>
            <Badge variant="secondary">{exercise.reps} Reps</Badge>
            <Badge variant="secondary">{exercise.weight}</Badge>
          </div>
        </div>
        <div className="space-y-2">
            <Label className="text-sm font-medium">Mark Sets Completed</Label>
            <div className="flex flex-wrap gap-3">
            {Array.from({ length: exercise.sets }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                <Checkbox
                    id={`${exercise.id}-set-${i}`}
                    checked={(exercise.completedSets || 0) > i}
                    onCheckedChange={(checked) => onSetCompletionChange(exercise.id, i, !!checked)}
                />
                <Label htmlFor={`${exercise.id}-set-${i}`} className="text-sm">
                    Set {i + 1}
                </Label>
                </div>
            ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
