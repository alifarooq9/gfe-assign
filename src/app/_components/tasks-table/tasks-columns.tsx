import { TasksTableDropdown } from "@/app/_components/tasks-table/tasks-table-dropdown";
import { useTaskMultiSelectStore } from "@/app/_lib/tasks";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "@/config/task-options";
import { Column } from "@/types/date-table";
import { Task } from "@/types/task";
import { format } from "date-fns";

export const getTaskColumns = (): Column<Task>[] => {
  const { appendSelectedTasks, removeSelectedTasks, selectedTasks } =
    useTaskMultiSelectStore();

  return [
    {
      accessor: "select",
      cell: (row) => (
        <div className="flex items-center justify-start">
          <Checkbox
            checked={selectedTasks.includes(row.id)}
            onCheckedChange={(c) => {
              if (c === true) {
                appendSelectedTasks({ selectedTasks: [row.id] });
              } else {
                removeSelectedTasks({ selectedTasks: [row.id] });
              }
            }}
          />
        </div>
      ),
    },
    { header: "Task ID", accessor: "id", sortable: true },
    {
      header: "Title",
      accessor: "title",
      cell: (row) => <span className="whitespace-nowrap">{row.title}</span>,
      sortable: true,
    },
    {
      header: "Priority",
      accessor: "priority",
      filterable: true,
      facetedFilterValues: PRIORITY_OPTIONS.map((option) => ({
        value: option.value,
        label: option.label,
        icon: option.icon,
      })),
      cell: (row) => {
        const priority = PRIORITY_OPTIONS.find(
          (option) => option.value === row.priority
        );
        let variant = "secondary";
        switch (priority?.value) {
          case "none":
            variant = "secondary";
            break;
          case "urgent":
            variant = "destructive";
            break;
          case "high":
            variant = "orange";
            break;
          case "medium":
            variant = "alert";
            break;
          case "low":
            variant = "success";
            break;
          default:
            variant = "secondary";
            break;
        }
        return (
          <Badge
            variant={variant as "secondary"}
            className="capitalize gap-1.5 py-1"
          >
            {priority?.icon && <priority.icon className="h-3.5 w-3.5" />}
            {priority?.label}
          </Badge>
        );
      },
      sortable: true,
    },
    {
      header: "Status",
      accessor: "status",
      filterable: true,
      sortable: true,
      facetedFilterValues: STATUS_OPTIONS.map((option) => ({
        value: option.value,
        label: option.label,
        icon: option.icon,
      })),
      cell: (row) => {
        const status = STATUS_OPTIONS.find(
          (option) => option.value === row.status
        );
        let variant = "secondary";
        switch (status?.value) {
          case "not_started":
            variant = "secondary";
            break;
          case "in_progress":
            variant = "alert";
            break;
          case "completed":
            variant = "success";
            break;
          default:
            variant = "secondary";
            break;
        }
        return (
          <Badge
            variant={variant as "secondary"}
            className="capitalize gap-1.5 py-1"
          >
            {status?.icon && <status.icon className="h-3.5 w-3.5" />}
            {status?.label}
          </Badge>
        );
      },
    },
    {
      header: "Created At",
      accessor: "createdAt",
      cell: (row) => (
        <span>
          {format(
            new Date(new Date(row.createdAt ?? new Date().toString())),
            "PP"
          )}
        </span>
      ),
      sortable: true,
    },
    {
      accessor: "actions",
      cell: (row) => <TasksTableDropdown row={row} />,
      cellClassName: "flex justify-center px-1",
    },
  ];
};
