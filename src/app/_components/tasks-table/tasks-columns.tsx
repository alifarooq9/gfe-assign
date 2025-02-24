import { TasksTableDropdown } from "@/app/_components/tasks-table/tasks-table-dropdown";
import { Badge } from "@/components/ui/badge";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "@/config/task-options";
import { Column } from "@/types/date-table";
import { Task } from "@/types/task";
import { format } from "date-fns";

export const taskColumns: Column<Task>[] = [
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
      if (priority?.value === "none") {
        variant = "secondary";
      } else if (priority?.value === "urgent") {
        variant = "destructive";
      } else if (priority?.value === "high") {
        variant = "orange";
      } else if (priority?.value === "medium") {
        variant = "alert";
      } else if (priority?.value === "low") {
        variant = "success";
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
      if (status?.value === "not_started") {
        variant = "secondary";
      } else if (status?.value === "in_progress") {
        variant = "alert";
      } else if (status?.value === "completed") {
        variant = "success";
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
    cellClassName: "flex justify-center",
  },
];
