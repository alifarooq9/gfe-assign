import { Column } from "@/types/date-table";
import { Task } from "@/types/task";
import { format } from "date-fns";

export const taskColumns: Column<Task>[] = [
  { header: "Task ID", accessor: "id", sortable: true },
  { header: "Title", accessor: "title", sortable: true },
  { header: "Priority", accessor: "priority" },
  { header: "Status", accessor: "status" },
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
