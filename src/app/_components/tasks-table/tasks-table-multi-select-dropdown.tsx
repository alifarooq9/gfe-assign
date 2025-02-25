import { deleteTasks } from "@/app/_lib/actions";
import { useTaskMultiSelectStore } from "@/app/_lib/tasks";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function TasksTableMultiSelectDropdown() {
  const router = useRouter();
  const { selectedTasks, removeAllSelectedTasks } = useTaskMultiSelectStore();

  const handleTaskDelete = () => {
    const response = deleteTasks(selectedTasks.map((task) => task.toString()));

    if (response.success === false) {
      console.log(response.message);
      return;
    }

    removeAllSelectedTasks();
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-xs">
          <ChevronDownIcon /> Actions ({selectedTasks.length})
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions ({selectedTasks.length})</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleTaskDelete()}>
          Delete ({selectedTasks.length})
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
