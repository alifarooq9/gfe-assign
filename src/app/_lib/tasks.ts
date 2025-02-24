import { Task } from "@/types/task";
import { create } from "zustand";

type TaskStore = {
  editTaskId: number | string | null;
  setEditTask: (params: {
    id: number | string | null;
    row: Task | null;
  }) => void;
  editTaskRowData: Task | null;
};

export const useEditTaskStore = create<TaskStore>((set) => ({
  editTaskId: null,
  setEditTask: (params: { id: number | string | null; row: Task | null }) => {
    set({ editTaskId: params.id, editTaskRowData: params.row });
  },
  editTaskRowData: null,
}));
