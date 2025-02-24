import { z } from "zod";

export const customFieldSchema = z.object({
  name: z.string().min(1, "Field name is required"),
  type: z.enum(["text", "number", "checkbox", "dateTime"]),
  value: z.union([z.string(), z.number(), z.boolean(), z.date()]),
  sortable: z.boolean().optional().default(false),
  filterable: z.boolean().optional().default(false),
});

export const customFieldsSchema = z
  .array(customFieldSchema)
  .optional()
  .default([]);

export const task = z.object({
  id: z.number(),
  title: z.string().min(2, {
    message: "Title must be at least 2 character long",
  }),
  priority: z
    .enum(["low", "medium", "high", "urgent", "none"], {
      message:
        "Priority must be one of the following: low, medium, high, urgent, none",
    })
    .default("none"),
  createdAt: z.date(),
  status: z
    .enum(["not_started", "in_progress", "completed"], {
      message:
        "Status must be one of the following: not_started, in_progress, completed",
    })
    .default("not_started"),
  customFields: customFieldsSchema,
});

export type Task = z.infer<typeof task>;
export type CustomField = z.infer<typeof customFieldSchema>;

export const createTaskSchema = task.pick({
  title: true,
  status: true,
  priority: true,
  customFields: true,
});

export const updateTaskSchema = task.pick({
  id: true,
  title: true,
  status: true,
  priority: true,
  customFields: true,
});
