import { KanbanRow } from "@/app/kanban/_components/kanban-row";
import { OptionItem } from "@/config/task-options";
import { cn } from "@/lib/utils";
import { Task } from "@/types/task";
import { useDroppable } from "@dnd-kit/core";

type KanbanColumnProps = {
  option: OptionItem;
  tasks: Task[];
};

export function KanbanColumn({ option, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: option.value,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn("rounded-lg flex flex-col gap-4", isOver && "bg-muted/60")}
    >
      <h2
        className={cn(
          "rounded-md px-4 py-3 [&_svg]:size-4 flex items-center gap-2 text-sm",
          option.colorClassName
        )}
      >
        <option.icon />
        {option.label}
      </h2>
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
