"use client";

import AddTasksSheet from "@/app/_components/add-task-sheet";
import { KanbanView } from "@/app/kanban/_components/kanban-view";

export default function Kanban() {
  return (
    <main className="grid gap-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-bold">Kanban View </h1>
      </div>

      <KanbanView />

      <AddTasksSheet showButton={false} />
    </main>
  );
}
