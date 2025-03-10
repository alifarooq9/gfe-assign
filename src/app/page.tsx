import AddTasksSheet from "@/app/_components/add-task-sheet";
import { TasksTable } from "@/app/_components/tasks-table/tasks-table";

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;

  return (
    <main className="grid gap-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-bold">Table View </h1>

        <AddTasksSheet />
      </div>
      <TasksTable
        searchParams={{
          page: params.page as string,
          rowSize: params.rowSize as string,
          sortBy: params.sortBy as string,
          search: params.search as string,
          filter: params.filter as string,
        }}
      />
    </main>
  );
}
