import { TasksTableClient } from "@/app/_components/table/tasks-table-client";
import { getTasks } from "@/app/_lib/actions";

type TableViewProps = {
  searchParams: {
    page: string;
    rowSize: string;
    sortBy: string;
    search: string;
  };
};

export function TasksTable({ searchParams }: TableViewProps) {
  const tasks = getTasks();

  return <TasksTableClient tasks={tasks} maxPage={1} />;
}
