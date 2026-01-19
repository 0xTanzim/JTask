import { Category } from "@/features/category/types";

export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  categoryId: string;
  category?: Category;
  dueDate: string;
  commentCount: number;
  createdAt: string;
};

export type CreateTaskInput = Omit<Task, "id" | "createdAt" | "category" | "commentCount">;
export type UpdateTaskInput = Partial<CreateTaskInput>;
