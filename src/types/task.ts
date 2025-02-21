export type Task = {
  id: number;
  title: string;
  priority: "high" | "medium" | "low" | "urgent" | "none";
  status: "in_progress" | "not_started" | "completed";
  createdAt: string;
  customFields?: {
    name: string;
    type: "text" | "number" | "dateTime" | "boolean";
    value: string | number | Date | boolean;
  }[];
};
