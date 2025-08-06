"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Exercise } from "@/types";
import type { ExerciseTemplate } from "@/lib/exercise-templates";
import { useToast } from "@/hooks/use-toast";

const setSchema = z.object({
  reps: z.string().min(1, { message: "Reps are required." }),
  measurement: z.string().min(1, { message: "Value is required." }),
});

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  youtubeLink: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  sets: z.array(setSchema).min(1, "You must add at least one set."),
});

type AddExerciseFormValues = z.infer<typeof formSchema>;

interface AddExerciseDialogProps {
  children: React.ReactNode;
  onAddExercise: (exercise: Omit<Exercise, 'id'>) => void;
  exerciseTemplates?: ExerciseTemplate[];
}

export function AddExerciseDialog({ children, onAddExercise, exerciseTemplates = [] }: AddExerciseDialogProps) {
  const { toast } = useToast();
  const form = useForm<AddExerciseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      youtubeLink: "",
      sets: [{ reps: "8-12", measurement: "" }],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "sets",
  });

  const handleTemplateSelect = (templateName: string) => {
    try {
      if (templateName === "new") {
        // Reset to default values for new exercise
        form.reset({
          name: "",
          youtubeLink: "",
          sets: [{ reps: "8-12", measurement: "" }],
        });
        return;
      }

      const template = exerciseTemplates.find(t => t.name === templateName);
      if (template) {
        // Set form values from template
        form.setValue("name", template.name);
        form.setValue("youtubeLink", template.youtubeLink || "");
        
        // Replace all sets at once instead of removing one by one
        const templateSets = template.lastUsedSets.map(set => ({
          reps: set.reps,
          measurement: set.measurement
        }));
        
        // Use replace to safely update all sets at once
        replace(templateSets);
      }
    } catch (error) {
      console.error('Error selecting template:', error);
      // Fallback to reset form if there's an error
      form.reset({
        name: "",
        youtubeLink: "",
        sets: [{ reps: "8-12", measurement: "" }],
      });
    }
  };

  function onSubmit(values: AddExerciseFormValues) {
    const now = new Date();
    const newExercise = {
        name: values.name,
        youtubeLink: values.youtubeLink,
        workoutId: '',
        createdAt: now,
        updatedAt: now,
        sets: values.sets.map(s => ({ 
          ...s, 
          completed: false, 
          id: '',
          exerciseId: '',
          createdAt: now,
          updatedAt: now,
          reps: s.reps.includes('-') ? 0 : parseInt(s.reps) || 0
        }))
    }
    onAddExercise(newExercise);
    toast({
      title: "Exercise Added",
      description: `${values.name} has been added to your routine.`,
    });
    form.reset();
    document.getElementById('close-sheet')?.click();
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Exercise</SheetTitle>
          <SheetDescription>
            Fill in the details for the new exercise to add to your routine.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            {exerciseTemplates.length > 0 && (
              <div className="space-y-2">
                <FormLabel>Exercise Template</FormLabel>
                <Select onValueChange={handleTemplateSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Create new exercise or select from previous" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Create New Exercise</SelectItem>
                    {exerciseTemplates.map((template) => (
                      <SelectItem key={template.name} value={template.name}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

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
                      name={`sets.${index}.measurement`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          {index === 0 && <FormLabel>Value (kg or secs)</FormLabel>}
                          <FormControl>
                            <Input placeholder="30lbs or 20s" {...field} />
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
                    onClick={() => {
                      if (fields.length > 0) {
                        // Get the current values from the form for the last set
                        const lastIndex = fields.length - 1;
                        const lastSetReps = form.getValues(`sets.${lastIndex}.reps`);
                        const lastSetMeasurement = form.getValues(`sets.${lastIndex}.measurement`);
                        append({ reps: lastSetReps || "", measurement: lastSetMeasurement || "" });
                      } else {
                        // Use empty values if no sets exist
                        append({ reps: "", measurement: "" });
                      }
                    }}
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
