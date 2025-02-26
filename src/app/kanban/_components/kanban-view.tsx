import { getAllTasks, updateTask } from "@/app/_lib/actions";
import { KanbanColumn } from "@/app/kanban/_components/kanban-column";
import { PRIORITY_OPTIONS } from "@/config/task-options";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { Task } from "@/types/task";
import { toast } from "sonner";

export function KanbanView() {
  const queryClient = useQueryClient();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const { data, isPending, refetch } = useQuery({
    queryKey: [`tasks-kanban`],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const tasksResponse = getAllTasks();
      if (tasksResponse.success === false) {
        throw new Error(tasksResponse.message);
      }
      return {
        tasks: tasksResponse.tasks,
      };
    },
  });

  const { mutateAsync: handleUpdateTask } = useMutation({
    mutationFn: async ({
      newPriority,
      task,
    }: {
      newPriority: Task["priority"];
      task: Task;
    }) => {
      if (!task) {
        throw new Error("Task not found");
      }

      const response = updateTask({
        ...task,
        priority: newPriority,
      });

      if (response.success === false) {
        throw new Error(response.message);
      }

      return response;
    },
    onSettled: () => {
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      console.log("Drag completed!", {
        taskId: active.id,
        newStatus: over.id,
      });

      const task = data?.tasks.find((task) => task.id === active.id);

      if (!task) {
        throw new Error("Task not found");
      }

      const optimisticTasks = [...(data?.tasks ?? [])];
      optimisticTasks[optimisticTasks.findIndex((t) => t.id === active.id)] = {
        ...task,
        priority: over.id as Task["priority"],
        updatedAt: new Date(),
      };

      queryClient.setQueryData(["tasks-kanban"], {
        tasks: optimisticTasks,
      });

      await handleUpdateTask({
        task,
        newPriority: over.id as Task["priority"],
      });
    }
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div
        className={`grid grid-cols-5 gap-4 overflow-hidden min-h-[calc(100vh-12rem)]`}
      >
        {PRIORITY_OPTIONS.map((p) => {
          const filteredTasks =
            data?.tasks.filter((t) => t.priority === p.value) ?? [];

          const sortedTasks = filteredTasks.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );

          return <KanbanColumn key={p.value} option={p} tasks={sortedTasks} />;
        })}
      </div>
    </DndContext>
  );
}
