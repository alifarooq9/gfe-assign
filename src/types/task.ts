import { z } from "zod";

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
  customFields: z
    .array(
      z.object({
        name: z.string().min(1, "Field name is required"),
        type: z.enum(["text", "number", "checkbox", "dateTime"]),
        value: z.union([z.string(), z.number(), z.boolean(), z.date()]),
      })
    )
    .optional()
    .default([]),
});

export type Task = z.infer<typeof task>;

export const createTaskSchema = task.pick({
  title: true,
  status: true,
  priority: true,
  customFields: true,
});
