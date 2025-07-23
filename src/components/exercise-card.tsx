"use client";

import { Youtube, Trash2, Pencil } from 'lucide-react';
import type { Exercise } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EditExerciseDialog } from './edit-exercise-dialog';
import { Checkbox } from './ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ExerciseCardProps {
  exercise: Exercise;
  onDelete: (id: string) => void;
  onEdit: (id: string, updatedExercise: Omit<Exercise, 'id'>) => void;
  onSetCompletionChange: (exerciseId: string, setId: string, isCompleted: boolean) => void;
}

const getYouTubeVideoId = (url: string) => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    } else if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
      return urlObj.searchParams.get('v') || '';
    }
  } catch (error) {
    console.error("Invalid YouTube URL", error);
    return null;
  }
  return null;
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
        </div>
        <div className="space-y-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Set</TableHead>
                <TableHead>Reps</TableHead>
                <TableHead>Value (kg or secs)</TableHead>
                <TableHead className="text-right w-[60px]">Done</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exercise.sets.map((set, i) => (
                <TableRow key={set.id}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>{set.reps}</TableCell>
                  <TableCell>{set.measurement}</TableCell>
                  <TableCell className="text-right">
                     <Checkbox
                        checked={set.completed}
                        onCheckedChange={(checked) => onSetCompletionChange(exercise.id, set.id, !!checked)}
                      />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
