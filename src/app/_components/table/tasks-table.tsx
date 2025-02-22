"use client";

import { taskColumns } from "@/app/_components/table/tasks-columns";
import { getAllCustomFields, getTasks } from "@/app/_lib/actions";
import { DataTable } from "@/components/data-table/data-table";
import { Column, RowSize, SearchParam } from "@/types/date-table";
import { Task } from "@/types/task";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useMemo } from "react";

type TableViewProps = {
  searchParams: {
    page: string;
    rowSize: string;
    sortBy: string;
    search: string;
  };
};

export function TasksTable({ searchParams }: TableViewProps) {
  const { data, isLoading } = useQuery({
    queryKey: [
      `tasks-table-${searchParams.page}-${searchParams.rowSize}-${searchParams.sortBy}-${searchParams.search}`,
    ],
    queryFn: () => {
      const tasksResponse = getTasks({
        page: searchParams.page ? Number(searchParams.page) : undefined,
        rowSize: searchParams.rowSize
          ? (Number(searchParams.rowSize) as RowSize)
          : undefined,
        sortBy: searchParams.sortBy ? searchParams.sortBy : undefined,
        search: searchParams.search
          ? (JSON.parse(searchParams.search) as SearchParam)
          : undefined,
      });

      if (tasksResponse.success === false) {
        throw new Error(tasksResponse.message);
      }

      const customFieldsResponse = getAllCustomFields();

      if (customFieldsResponse.success === false) {
        throw new Error(customFieldsResponse.message);
      }

      return {
        tasks: tasksResponse.tasks,
        maxPage: tasksResponse.maxPage,
        customFields: customFieldsResponse.customFields,
        customFieldsColumns: customFieldsResponse.customFieldsColumns,
      };
    },
  });

  // Define columns with useMemo before any returns
  const columns: Column<Task>[] = useMemo(() => {
    // If data isn’t available yet, return base columns or an empty array
    if (!data || !data.customFieldsColumns) {
      return [...taskColumns];
    }

    const customColumns = data.customFieldsColumns.map((c) => ({
      header: c.name,
      accessor: c.name as unknown as keyof Task,
      cell: (row: Task) => {
        const field = row.customFields?.find(
          (f) =>
            f.name.toLowerCase() === c.name.toLowerCase() && f.type === c.type
        );
        const value = field?.value;
        if (value === undefined || value === null) return "-";

        switch (c.type) {
          case "text":
            return <span>{String(value)}</span>;
          case "number":
            return <span>{Number(value)}</span>;
          case "checkbox":
            return <span>{Boolean(value) ? "Check" : "No"}</span>;
          case "dateTime":
            return <span>{format(new Date(value as string), "PP")}</span>;
          default:
            return <span>-</span>;
        }
      },
      customSortAccessor: `customFields.${c.name}`,
      sortable: c.sortable,
      filterable: c.filterable,
    }));

    return [...taskColumns, ...customColumns];
  }, [data]);

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <DataTable
      data={data?.tasks as Task[]}
      columns={columns}
      maxPage={data?.maxPage as number}
    />
  );
}
