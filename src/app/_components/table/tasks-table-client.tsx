"use client";

import { taskColumns } from "@/app/_components/table/tasks-columns";
import { DataTable } from "@/components/data-table/data-table";
import { Task } from "@/types/task";

type TasksTableClientProps = {
  tasks: Task[];
  maxPage: number;
};

export function TasksTableClient({ tasks, maxPage }: TasksTableClientProps) {
  return <DataTable data={tasks} columns={taskColumns} maxPage={maxPage} />;
}
