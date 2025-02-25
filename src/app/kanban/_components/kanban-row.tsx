import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { STATUS_OPTIONS } from "@/config/task-options";
import { cn } from "@/lib/utils";
import { Task } from "@/types/task";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type KanbanRowProps = {
  task: Task;
};

export function KanbanRow({ task }: KanbanRowProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-background"
    >
      <CardHeader className="p-4">
        <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div>
          <Badge
            variant="secondary"
            className={cn(
              "font-normal px-1.5",
              STATUS_OPTIONS.find((s) => s.value === task.status)
                ?.colorClassName
            )}
          >
            {task.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
