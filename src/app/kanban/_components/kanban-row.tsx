import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { STATUS_OPTIONS } from "@/config/task-options";
import { cn } from "@/lib/utils";
import { Task } from "@/types/task";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useEditTaskStore } from "@/app/_lib/tasks";
import { deleteTasks } from "@/app/_lib/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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

  const queryClient = useQueryClient();

  const handleDelete = (id: number) => {
    deleteTasks([id.toString()]);
    queryClient.invalidateQueries({ queryKey: [`tasks-kanban`] });
  };

  const { setEditTask } = useEditTaskStore();

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "bg-background relative flex flex-col",
        isDragging && "z-50"
      )}
    >
      <AlertDialog>
        <CardHeader className="p-4 ">
          <CardTitle className="text-sm font-medium">{task.title}</CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="iconSm"
                className="absolute right-2 top-1"
              >
                <EllipsisVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  setEditTask({
                    id: task.id,
                    row: task,
                  })
                }
              >
                Edit
              </DropdownMenuItem>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-4 pt-0 divide-y divide-border">
          <div
            className={cn(
              task.customFields.length > 0 && "pb-4",
              "grid grid-cols-2 gap-2"
            )}
          >
            <Badge
              variant="secondary"
              className={cn(
                "font-normal px-1.5 col-span-2 py-1 flex items-center justify-center",

                STATUS_OPTIONS.find((s) => s.value === task.status)
                  ?.variantColor
              )}
            >
              {STATUS_OPTIONS.find((s) => s.value === task.status)?.label}
            </Badge>

            <div className="grid grid-cols-2 gap-1 col-span-2">
              <p className="text-xs font-medium flex items-center py-1">
                Created At
              </p>
              <p className="text-xs font-medium flex items-center py-1">
                Updated At
              </p>

              <Badge
                variant="secondary"
                className="text-xs font-medium flex items-center py-1"
              >
                {format(new Date(task.createdAt), "PP")}
              </Badge>
              <Badge
                variant="secondary"
                className="text-xs font-medium flex items-center py-1"
              >
                {format(new Date(task.updatedAt), "PP")}
              </Badge>
            </div>
          </div>

          {task.customFields.length > 0 ? (
            <div className="grid gap-1 pt-2">
              <h4 className="text-xs font-medium">Custom Fields</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-8 px-2 text-xs">Name</TableHead>
                    <TableHead className="h-8 px-2 text-xs">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {task.customFields.map((f) => (
                    <TableRow key={f.name}>
                      <TableCell className="h-8 p-2 text-xs">
                        {f.name}
                      </TableCell>
                      {f.type === "text" && (
                        <TableCell className="h-8 p-2 text-xs">
                          {f.value as string}
                        </TableCell>
                      )}
                      {f.type === "number" && (
                        <TableCell className="h-8 p-2 text-xs">
                          {Number(f.value as string)}
                        </TableCell>
                      )}
                      {f.type === "checkbox" && (
                        <TableCell className="h-8 p-2 text-xs">
                          {Boolean(f.value as string)}
                        </TableCell>
                      )}
                      {f.type === "dateTime" && (
                        <TableCell className="h-8 p-2 text-xs">
                          {format(new Date(f.value as string), "PP")}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : null}
        </CardContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete &quot;
              {task.title}&quot; task and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(task.id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
