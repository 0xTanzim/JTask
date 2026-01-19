import { z } from 'zod';
import { TaskStatus, TaskPriority } from './types';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['todo', 'in-progress', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
  categoryId: z.string().min(1, 'Category is required'),
  dueDate: z.string().min(1, 'Due date is required'),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
