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

type TaskMultiSelectStore = {
  selectedTasks: number[];
  setSelectedTasks: (params: { selectedTasks: number[] }) => void;
  appendSelectedTasks: (params: { selectedTasks: number[] }) => void;
  removeSelectedTasks: (params: { selectedTasks: number[] }) => void;
  removeAllSelectedTasks: () => void;
};

export const useTaskMultiSelectStore = create<TaskMultiSelectStore>((set) => ({
  selectedTasks: [],
  setSelectedTasks: (params: { selectedTasks: number[] }) => {
    set({ selectedTasks: params.selectedTasks });
  },
  appendSelectedTasks: (params: { selectedTasks: number[] }) => {
    set((state) => ({
      selectedTasks: [...state.selectedTasks, ...params.selectedTasks],
    }));
  },
  removeSelectedTasks: (params: { selectedTasks: number[] }) => {
    set((state) => ({
      selectedTasks: state.selectedTasks.filter(
        (id) => !params.selectedTasks.includes(id)
      ),
    }));
  },
  removeAllSelectedTasks: () => {
    set({ selectedTasks: [] });
  },
}));
