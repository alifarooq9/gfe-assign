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
  },
  {
    header: "Status",
    accessor: "status",
    filterable: true,
    facetedFilterValues: STATUS_OPTIONS.map((option) => ({
      value: option.value,
      label: option.label,
      icon: option.icon,
    })),
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
];
