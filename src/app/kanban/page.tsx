"use client";

import AddTasksSheet from "@/app/_components/add-task-sheet";
import { KanbanView } from "@/app/kanban/_components/kanban-view";
import { buttonVariants } from "@/components/ui/button";
import { SITE_URLS } from "@/config/site-urls";
import Link from "next/link";

export default function Kanban() {
  return (
    <main className="grid gap-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-lg font-bold">Kanban View </h1>
      </div>

      <div className="flex flex-col justify-center gap-3 lg:hidden">
        <p className="text-sm font-medium">
          This screen is too short for kanban view, switch to table view, open
          this URL on desktop
        </p>
        <Link
          className={buttonVariants({
            size: "sm",
            variant: "outline",
            className: "text-xs w-fit",
          })}
          href={SITE_URLS.dashboard.tableView}
        >
          Switch To Table
        </Link>
      </div>

      <div className="hidden lg:block">
        <KanbanView />
      </div>

      <AddTasksSheet showButton={false} />
    </main>
  );
}
