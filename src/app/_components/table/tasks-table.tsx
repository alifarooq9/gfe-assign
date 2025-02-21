"use client";

import { taskColumns } from "@/app/_components/table/tasks-columns";
import { getTasks } from "@/app/_lib/actions";
import { DataTable } from "@/components/data-table/data-table";
import { RowSize, SearchParam } from "@/types/date-table";

type TableViewProps = {
  searchParams: {
    page: string;
    rowSize: string;
    sortBy: string;
    search: string;
  };
};

export function TasksTable({ searchParams }: TableViewProps) {
  const response = getTasks({
    page: searchParams.page ? Number(searchParams.page) : undefined,
    rowSize: searchParams.rowSize
      ? (Number(searchParams.rowSize) as RowSize)
      : undefined,
    sortBy: searchParams.sortBy ? searchParams.sortBy : undefined,
    search: searchParams.search
      ? (JSON.parse(searchParams.search) as SearchParam)
      : undefined,
  });

  if (response.success === false) {
    return <div>Error: {response.message}</div>;
  }

  const { tasks, maxPage } = response;

  return <DataTable data={tasks} columns={taskColumns} maxPage={maxPage} />;
}
