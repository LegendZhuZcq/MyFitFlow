"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

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

const setSchema = z.object({
  id: z.string().optional(),
  reps: z.string().min(1, { message: "Reps are required." }),
  weight: z.string().min(1, { message: "Weight is required." }),
  completed: z.boolean(),
});

const formSchema = z.object({
  name: z.string(),
  youtubeLink: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  sets: z.array(setSchema).min(1, "You must add at least one set."),
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
      youtubeLink: exercise.youtubeLink || "",
      sets: exercise.sets,
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sets",
  });

  useEffect(() => {
    form.reset({
      name: exercise.name,
      youtubeLink: exercise.youtubeLink || "",
      sets: exercise.sets,
    });
  }, [exercise, form]);


  function onSubmit(values: EditExerciseFormValues) {
     const updatedExercise = {
        name: values.name,
        youtubeLink: values.youtubeLink,
        sets: values.sets.map(s => ({ ...s, id: s.id || crypto.randomUUID()}))
    }
    onEditExercise(exercise.id, updatedExercise);
    toast({
      title: "Exercise Updated",
      description: `${values.name} has been updated.`,
    });
    document.getElementById(`close-sheet-${exercise.id}`)?.click();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto">
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

            <div>
              <FormLabel>Sets</FormLabel>
              <div className="space-y-3 mt-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-end gap-2">
                    <span className="text-sm font-medium text-muted-foreground pt-2">{index + 1}</span>
                    <FormField
                      control={form.control}
                      name={`sets.${index}.reps`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                           {index === 0 && <FormLabel>Reps</FormLabel>}
                          <FormControl>
                            <Input placeholder="8-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`sets.${index}.weight`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          {index === 0 && <FormLabel>Weight</FormLabel>}
                          <FormControl>
                            <Input placeholder="50kg" {...field} />
                          </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="shrink-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                 <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ reps: "", weight: "", completed: false })}
                    className="w-full"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Set
                </Button>
              </div>
               <FormMessage>{form.formState.errors.sets?.message}</FormMessage>
            </div>
            
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
