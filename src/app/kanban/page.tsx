"use client";

import { KanbanView } from "@/app/kanban/_components/kanban-view";

export default function Kanban() {
  return (
    <main className="grid gap-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-bold">Kanban View </h1>
      </div>

      <KanbanView />
    </main>
  );
}
