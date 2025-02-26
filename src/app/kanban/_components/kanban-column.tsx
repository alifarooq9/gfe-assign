import { useCreateTaskSheetStore } from "@/app/_lib/tasks";
import { KanbanRow } from "@/app/kanban/_components/kanban-row";
import { Button } from "@/components/ui/button";
import { OptionItem } from "@/config/task-options";
import { cn } from "@/lib/utils";
import { Task } from "@/types/task";
import { useDroppable } from "@dnd-kit/core";
import { PlusIcon } from "lucide-react";

type KanbanColumnProps = {
  option: OptionItem;
  tasks: Task[];
};

export function KanbanColumn({ option, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: option.value,
  });

  const { setSheetOpen, setDefaultValues } = useCreateTaskSheetStore();

  return (
    <div
      ref={setNodeRef}
      className={cn("rounded-lg flex flex-col gap-4", isOver && "bg-muted/60")}
    >
      <div className="flex items-center justify-between gap-1">
        <h2
          className={cn(
            "rounded-md px-4 h-10 w-full [&_svg]:size-4 flex items-center gap-2 text-sm",
            option.variantColor
          )}
        >
          <option.icon />
          {option.label}
        </h2>
        <Button
          type="button"
          size="iconSm"
          className="flex-shrink-0 h-10 w-10"
          onClick={() => {
            setDefaultValues({ priority: option.value as Task["priority"] });
            setSheetOpen({ sheetOpen: true });
          }}
        >
          <PlusIcon />
        </Button>
      </div>
      <div className="grid gap-3">
        {tasks.length > 0 ? (
          tasks.map((t) => <KanbanRow key={t.id} task={t} />)
        ) : (
          <div className="p-3 text-sm w-full flex items-center justify-center text-centerborder border-dashed rounded">
            Drop items here
          </div>
        )}
      </div>
    </div>
  );
}
