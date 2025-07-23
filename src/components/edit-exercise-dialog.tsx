"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Exercise } from "@/types";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string(), // Keep name, but it will be read-only or hidden
  sets: z.coerce.number().min(1, { message: "Must be at least 1 set." }),
  reps: z.string().min(1, { message: "Reps are required." }),
  weight: z.string().min(1, { message: "Weight is required." }),
  youtubeLink: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

type EditExerciseFormValues = z.infer<typeof formSchema>;

interface EditExerciseDialogProps {
  children: React.ReactNode;
  exercise: Exercise;
  onEditExercise: (exerciseId: string, updatedExercise: Omit<Exercise, 'id'>) => void;
}

export function EditExerciseDialog({ children, exercise, onEditExercise }: EditExerciseDialogProps) {
  const { toast } = useToast();
  const form = useForm<EditExerciseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      youtubeLink: exercise.youtubeLink || "",
    },
  });

  useEffect(() => {
    form.reset({
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      youtubeLink: exercise.youtubeLink || "",
    });
  }, [exercise, form]);


  function onSubmit(values: EditExerciseFormValues) {
    onEditExercise(exercise.id, values);
    toast({
      title: "Exercise Updated",
      description: `${values.name} has been updated.`,
    });
    document.getElementById(`close-sheet-${exercise.id}`)?.click();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Exercise</SheetTitle>
          <SheetDescription>
            Update the details for your exercise.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Exercise Name</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly disabled className="cursor-not-allowed bg-muted" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sets</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reps</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 8-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight / Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 50kg or Bodyweight" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="youtubeLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube Link (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://youtube.com/watch?v=..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <SheetClose asChild>
                <Button type="button" variant="secondary" id={`close-sheet-${exercise.id}`}>Cancel</Button>
              </SheetClose>
              <Button type="submit">Save Changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}