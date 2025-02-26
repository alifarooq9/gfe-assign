import { mock } from "@/config/mock-data";
import {
  createTaskSchema,
  CustomField,
  Task,
  updateTaskSchema,
} from "@/types/task";
import { z } from "zod";

export const getTasksSchema = z.object({
  rowSize: z
    .union([
      z.literal(10),
      z.literal(20),
      z.literal(30),
      z.literal(40),
      z.literal(50),
    ])
    .optional(),
  page: z.number().optional(),
  sortBy: z.string().optional(),
  search: z
    .object({ searchAccessor: z.string(), value: z.string() })
    .optional(),
  filter: z
    .object({ filterAccessor: z.string(), values: z.string().array() })
    .array()
    .optional(),
});

export function getTasks(
  params: z.infer<typeof getTasksSchema>
):
  | { success: true; tasks: Task[]; maxPage: number }
  | { success: false; message: string } {
  try {
    // Validate the incoming parameters
    const validated = getTasksSchema.safeParse(params);
    if (!validated.success) {
      return {
        success: false,
        message: `${validated.error.issues[0]?.path[0]} - ${validated.error.issues[0]?.message}`,
      };
    }
    const { rowSize = 10, page = 1, sortBy, search, filter } = validated.data;
    const offset = (page - 1) * rowSize;

    // Get tasks from localStorage if available; otherwise fallback to the mock data
    let tasksData: Task[] = [];
    const stored = localStorage.getItem("tasks");
    if (stored) {
      try {
        tasksData = JSON.parse(stored);
      } catch (err) {
        console.error(
          "Error parsing tasks from localStorage, using mock data",
          err
        );
        tasksData = mock;
      }
    } else {
      tasksData = mock;
    }

    // Filter by search if needed. We assume `search` has a `searchAccessor` (the field name) and a `value`.
    let filteredTasks = tasksData;
    if (search && search.searchAccessor && search.value) {
      const accessor = search.searchAccessor as keyof Task;
      const searchValue = search.value.toLowerCase();
      filteredTasks = filteredTasks.filter((task) => {
        const fieldValue =
          (task[accessor] as string | undefined)?.toLowerCase() || "";
        return fieldValue.includes(searchValue);
      });
    }

    if (filter && filter.length > 0) {
      filteredTasks = filteredTasks.filter((task) => {
        return filter.every((filterObj) => {
          const { filterAccessor, values } = filterObj;
          if (filterAccessor.startsWith("customFields.")) {
            // Handle custom fields
            const customFieldName = filterAccessor.split(".")[1];
            const customField = task.customFields?.find(
              (cf) => cf.name === customFieldName
            );
            const taskValue = customField ? String(customField.value) : "";
            return values.length > 0 ? values.includes(taskValue) : true;
          } else {
            // Handle regular fields
            const taskValue = String(task[filterAccessor as keyof Task] ?? "");
            return values.length > 0 ? values.includes(taskValue) : true;
          }
        });
      });
    }

    // Sorting logic
    // We support both regular fields and customFields.
    // For custom fields, we expect sortBy to be in the format: "customFields.fieldName.direction"
    // For regular fields: "fieldName.direction"
    const sortedTasks = [...filteredTasks];
    if (sortBy) {
      const sortParts = sortBy.split(".");
      const isCustomField = sortParts[0] === "customFields";
      const direction: "desc" | "asc" =
        (isCustomField ? sortParts[2] : sortParts[1]) === "asc"
          ? "asc"
          : "desc";
      const fieldName = isCustomField ? sortParts[1] : sortParts[0];

      if (isCustomField) {
        // Sort by a custom field value.
        sortedTasks.sort((a, b) => {
          // Helper: retrieve the custom field value (or an empty string if not found)
          const getValue = (task: Task) =>
            task.customFields?.find((cf) => cf.name === fieldName)?.value ?? "";
          const aValue = getValue(a);
          const bValue = getValue(b);

          // Tasks with the custom field should come before those without.
          const aHas = !!getValue(a);
          const bHas = !!getValue(b);
          if (aHas && !bHas) return -1;
          if (!aHas && bHas) return 1;

          return direction === "desc"
            ? String(bValue).localeCompare(String(aValue))
            : String(aValue).localeCompare(String(bValue));
        });
      } else {
        // Sort by a regular field
        sortedTasks.sort((a, b) => {
          const aValue = a[fieldName as keyof Task];
          const bValue = b[fieldName as keyof Task];

          // Check if the field is createdAt, in which case compare dates.
          if (fieldName === "createdAt") {
            return direction === "desc"
              ? new Date(bValue as string).getTime() -
                  new Date(aValue as string).getTime()
              : new Date(aValue as string).getTime() -
                  new Date(bValue as string).getTime();
          }

          // If both values are numbers
          if (typeof aValue === "number" && typeof bValue === "number") {
            return direction === "desc"
              ? (bValue as number) - (aValue as number)
              : (aValue as number) - (bValue as number);
          }

          // Fallback: compare as strings
          return direction === "desc"
            ? String(bValue).localeCompare(String(aValue))
            : String(aValue).localeCompare(String(bValue));
        });
      }
    } else {
      // Default sorting: sort by createdAt descending.
      sortedTasks.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    // Paginate the sorted tasks
    const paginatedTasks = sortedTasks.slice(offset, offset + rowSize);
    const totalCount = sortedTasks.length;
    const maxPage = Math.ceil(totalCount / rowSize);

    return {
      success: true,
      maxPage,
      tasks: paginatedTasks,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}

export function getAllTasks():
  | {
      success: true;
      tasks: Task[];
    }
  | {
      success: false;
      message: string;
    } {
  try {
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") ?? "[]");

    return {
      success: true,
      tasks,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}

export function addTask(params: z.infer<typeof createTaskSchema>):
  | {
      success: true;
      task: Task;
    }
  | {
      success: false;
      message: string;
    } {
  try {
    // Validate the incoming parameters
    const validated = createTaskSchema.safeParse(params);
    if (!validated.success) {
      return {
        success: false,
        message: `${validated.error.issues[0]?.path[0]} - ${validated.error.issues[0]?.message}`,
      };
    }
    const { title, priority, status, customFields } = validated.data;

    const tasks: Task[] =
      localStorage.getItem("tasks") !== null && localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks")!)
        : mock;

    const lastTask = tasks[tasks.length - 1];
    console.log(lastTask, "Last Task");

    // Create a new task object
    const task: Task = {
      id: lastTask.id + 1,
      title,
      priority,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
      customFields: customFields.map((f) => ({
        ...f,
        name: f.name.toLowerCase(),
      })),
    };

    // Save the task to localStorage
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));

    return {
      success: true,
      task,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}

interface GroupedData {
  name: string;
  type: "text" | "number" | "checkbox" | "dateTime";
  values: string[];
  filterable: boolean;
  sortable: boolean;
}

export function getAllCustomFields():
  | {
      success: true;
      customFields: CustomField[];
      customFieldsColumns: GroupedData[];
    }
  | { success: false; message: string } {
  try {
    const tasks: Task[] =
      localStorage.getItem("tasks") !== null && localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks")!)
        : mock;
    console.log(tasks);

    const customFields = tasks.reduce<CustomField[]>(
      (acc, task) => [...acc, ...task.customFields],
      []
    );

    // Group by a composite key built from lowercased name and type
    const grouped = customFields.reduce(
      (
        acc: Record<string, GroupedData>,
        { name, type, value, filterable, sortable }
      ) => {
        // Convert both name and type to lowercase for grouping
        const key = `${name.toLowerCase()}|${type}`;

        if (!acc[key]) {
          // You can choose to store the lowercased version, or preserve the original casing from the first occurrence
          acc[key] = {
            name: name.toLowerCase(),
            type: type,
            values: [],
            filterable,
            sortable,
          };
        }
        // Convert value to lowercase before checking for duplicates
        let lowerValue = value;
        if (type === "text") {
          lowerValue = (value as string).toLowerCase();
        }
        if (!acc[key].values.includes(lowerValue as string)) {
          acc[key].values.push(lowerValue as string);
        }
        return acc;
      },
      {} as Record<string, GroupedData>
    );

    // Convert the grouped object into an array of objects
    const customFieldsColumns: GroupedData[] = Object.values(grouped);

    return {
      success: true,
      customFields,
      customFieldsColumns,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}

export function updateTask(params: z.infer<typeof updateTaskSchema>):
  | {
      success: true;
      task: Task;
      newTasks: Task[];
    }
  | {
      success: false;
      message: string;
    } {
  try {
    // Validate the incoming parameters
    const validated = updateTaskSchema.safeParse(params);
    if (!validated.success) {
      return {
        success: false,
        message: `${validated.error.issues[0]?.path[0]} - ${validated.error.issues[0]?.message}`,
      };
    }
    const { id, title, priority, status, customFields } = validated.data;

    const tasks =
      localStorage.getItem("tasks") !== null && localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks")!)
        : mock;

    // Find the task with the given ID
    const taskIndex: number = tasks.findIndex(
      (task: Task) => task.id === Number(id)
    );
    if (taskIndex === -1) {
      return {
        success: false,
        message: "Task not found",
      };
    }

    // Update the task
    const updatedTask = {
      ...tasks[taskIndex],
      updatedAt: new Date(),
      title,
      priority,
      status,
      customFields,
    };

    console.log(updatedTask);

    // Update the task in the localStorage
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    return {
      success: true,
      task: updatedTask,
      newTasks: updatedTasks,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}

export function deleteTasks(
  id: string[]
): { success: true } | { success: false; message: string } {
  try {
    const tasks: Task[] =
      localStorage.getItem("tasks") !== null && localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks")!)
        : mock;
    const updatedTasks = tasks.filter(
      (task) => !id.includes(task.id.toString())
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}
