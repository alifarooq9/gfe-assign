import { mock } from "@/config/mock-data";
import { Task } from "@/types/task";

export function getTasks(): Task[] {
  return mock;
}
