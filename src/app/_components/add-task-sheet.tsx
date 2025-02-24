"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Loader2Icon,
  PencilIcon,
  PlusCircleIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CHECKBOX_OPTIONS,
  CUSTOM_FIELD_TYPES,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from "@/config/task-options";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createTaskSchema, Task, updateTaskSchema } from "@/types/task";
import { addTask, updateTask } from "@/app/_lib/actions";
import { Switch } from "@/components/ui/switch";
import { useEditTaskStore } from "@/app/_lib/tasks";
import { useEffect, useState } from "react";

export default function AddTasksSheet() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // if editTaskId is not null, display the edit form
  const { editTaskId, editTaskRowData, setEditTask } = useEditTaskStore();

  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      priority: "none",
      status: "not_started",
    },
  });

  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "customFields",
  });

  const { mutateAsync: createTaskTrigger, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof createTaskSchema>) => {
      return addTask(data);
    },
    onSuccess: () => {
      console.log("success");
      setOpen(false);
    },
    onError: () => {
      console.log("error");
    },
    onSettled: () => {
      router.refresh();
    },
  });

  const { mutateAsync: updateTaskTrigger, isPending: isPendingUpdate } =
    useMutation({
      mutationFn: async (data: z.infer<typeof updateTaskSchema>) => {
        return updateTask(data);
      },
      onSuccess: () => {
        console.log("success");
        setOpen(false);
        setEditTask({
          id: null,
          row: null,
        });
      },
      onError: () => {
        console.log("error");
      },
      onSettled: () => {
        router.refresh();
      },
    });

  useEffect(() => {
    if (editTaskId && editTaskRowData) {
      form.setValue("title", editTaskRowData.title);
      form.setValue("priority", editTaskRowData.priority);
      form.setValue("status", editTaskRowData.status);
      form.setValue("customFields", editTaskRowData.customFields);
      setOpen(true);
    }
  }, [editTaskId]);

  const isEditing = !!editTaskId && !!editTaskRowData;

  const onSubmit = async (data: z.infer<typeof createTaskSchema>) => {
    if (isEditing) {
      await updateTaskTrigger({ id: editTaskRowData.id, ...data });
    } else {
      await createTaskTrigger(data);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type="button" size="icon">
          <PlusIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[calc(100%-2rem)] sm:max-w-[36rem]">
        <SheetHeader>
          <SheetTitle>Add Tasks</SheetTitle>
          <SheetDescription>
            Create a new task by entering the details below.
          </SheetDescription>
        </SheetHeader>

        <div className="relative h-full pb-28 pt-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full space-y-4 overflow-auto"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the title of the task.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid w-full grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            {PRIORITY_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                <span className="flex items-center gap-2">
                                  <option.icon className="h-3.5 w-3.5" />
                                  {option.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Select the priority of the task.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUS_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                <span className="flex items-center gap-2">
                                  <option.icon className="h-3.5 w-3.5" />
                                  {option.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Select the status of the task.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid w-full gap-3 pt-2">
                <div className="grid gap-2">
                  <FormLabel>Custom Fields</FormLabel>
                  <FormDescription>
                    Add custom fields to your task.
                  </FormDescription>
                </div>

                <div className="grid gap-3">
                  {fields.map((field, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 gap-2 rounded-md border border-border p-3"
                    >
                      <FormField
                        control={form.control}
                        name={`customFields.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`customFields.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {CUSTOM_FIELD_TYPES.map((type) => (
                                    <SelectItem
                                      key={type.value}
                                      value={type.value}
                                      className="flex items-center gap-2"
                                    >
                                      <span className="flex items-center gap-2 capitalize">
                                        <type.icon className="h-3.5 w-3.5" />
                                        {type.label}
                                      </span>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {form.watch(`customFields.${index}.type`) === "text" && (
                        <FormField
                          control={form.control}
                          name={`customFields.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Text Value</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  onChange={field.onChange}
                                  value={field.value as string}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {form.watch(`customFields.${index}.type`) ===
                        "number" && (
                        <FormField
                          control={form.control}
                          name={`customFields.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number Value</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="text"
                                  onChange={(e) => {
                                    const { value } = e.target;
                                    // Allow only an optional minus sign followed by digits
                                    if (/^-?\d*$/.test(value)) {
                                      field.onChange(value);
                                    }
                                  }}
                                  value={field.value as string}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {form.watch(`customFields.${index}.type`) ===
                        "checkbox" && (
                        <FormField
                          control={form.control}
                          name={`customFields.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Checkbox Value</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value as string}
                                >
                                  <SelectTrigger className="w-full">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {CHECKBOX_OPTIONS.map((option) => (
                                      <SelectItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        <span className="flex items-center gap-2">
                                          <option.icon className="h-3.5 w-3.5" />
                                          {option.label}
                                        </span>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {form.watch(`customFields.${index}.type`) ===
                        "dateTime" && (
                        <FormField
                          control={form.control}
                          name={`customFields.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date & Time Value</FormLabel>
                              <FormControl>
                                <DateTimePicker
                                  className="overflow-auto"
                                  value={field.value as Date}
                                  onChange={(value) => {
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name={`customFields.${index}.sortable`}
                        render={({ field }) => (
                          <FormItem className="flex space-y-0 items-center justify-between border border-border p-3 h-9 rounded-md">
                            <FormLabel>Sortable</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`customFields.${index}.filterable`}
                        render={({ field }) => (
                          <FormItem className="flex space-y-0 items-center justify-between border border-border px-3 h-9 rounded-md">
                            <FormLabel>Filterable</FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 gap-2">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => remove(index)}
                          className="flex-shrink-0 text-xs"
                        >
                          <Trash2Icon /> Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    append({
                      name: "",
                      type: "text",
                      value: "",
                      sortable: false,
                      filterable: false,
                    })
                  }
                >
                  <PlusCircleIcon className="h-3.5 w-3.5" />
                  Add Custom Field
                </Button>
              </div>

              <div className="absolute bottom-8 grid w-full gap-2 bg-card py-4">
                <Button type="submit" className="w-full">
                  {isPending ? (
                    <Loader2Icon className="h-3.5 w-3.5 animate-spin" />
                  ) : null}
                  {isEditing ? "Save" : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
