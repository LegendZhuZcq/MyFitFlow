"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  sets: z.coerce.number().min(1, { message: "Must be at least 1 set." }),
  reps: z.string().min(1, { message: "Reps are required." }),
  weight: z.string().min(1, { message: "Weight is required." }),
  youtubeLink: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

type AddExerciseFormValues = z.infer<typeof formSchema>;

interface AddExerciseDialogProps {
  children: React.ReactNode;
  onAddExercise: (exercise: Omit<Exercise, 'id'>) => void;
}

export function AddExerciseDialog({ children, onAddExercise }: AddExerciseDialogProps) {
  const { toast } = useToast();
  const form = useForm<AddExerciseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sets: 3,
      reps: "8-12",
      weight: "",
      youtubeLink: "",
    },
  });

  function onSubmit(values: AddExerciseFormValues) {
    onAddExercise(values);
    toast({
      title: "Exercise Added",
      description: `${values.name} has been added to your routine.`,
    });
    form.reset();
    // Manually close the sheet by clicking the close button if it exists
    document.getElementById('close-sheet')?.click();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Exercise</SheetTitle>
          <SheetDescription>
            Fill in the details for the new exercise to add to your routine.
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
                    <Input placeholder="e.g., Bench Press" {...field} />
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
                <Button type="button" variant="secondary" id="close-sheet">Cancel</Button>
              </SheetClose>
              <Button type="submit">Add Exercise</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
