import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(50),
  color: z.string().min(1, 'Color is required'),
  icon: z.string().optional(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
