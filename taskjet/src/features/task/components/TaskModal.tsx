'use client';

import {
  createTask,
  deleteTask as deleteTaskAction,
  updateTask as updateTaskAction,
} from '@/actions/task';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Category } from '@/features/category/types';
import { cn, getCategoryBg } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, CheckCircle2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Task } from '../types';
import { TaskFormValues, taskSchema } from '../validators';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  categories: Category[];
}

export function TaskModal({
  isOpen,
  onClose,
  task,
  categories,
}: TaskModalProps) {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      categoryId: '',
      dueDate: new Date().toISOString(),
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      if (task) {
        form.reset({
          title: task.title,
          description: task.description || '',
          status: task.status,
          priority: task.priority,
          categoryId: task.categoryId,
          dueDate: task.dueDate,
        });
      } else {
        form.reset({
          title: '',
          description: '',
          status: 'todo',
          priority: 'medium',
          categoryId: categories[0]?.id || '',
          dueDate: new Date().toISOString(),
        });
      }
    }
  }, [isOpen, task, form, categories]);

  const onSubmit = async (values: TaskFormValues) => {
    setIsPending(true);
    try {
      const result = task
        ? await updateTaskAction(task.id, values)
        : await createTask(values);

      if (!result.success) {
        toast.error(result.error || 'Operation failed');
        return;
      }

      toast.success(task ? 'Task updated' : 'Task created');
      window.location.reload();
      onClose();
      form.reset();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async () => {
    if (!task) return;
    setIsPending(true);
    try {
      const result = await deleteTaskAction(task.id);
      if (!result.success) {
        toast.error(result.error || 'Failed to delete');
        return;
      }
      toast.success('Task deleted');
      window.location.reload();
      onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[440px] bg-[#101822] border-[#223145] text-white p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b border-[#223145]">
          <DialogTitle className="text-xl font-bold">
            {task ? 'Edit Task' : 'Create New Task'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Task Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Finalize Brand Guidelines"
                      className="bg-[#16212e] border-[#223145] text-white placeholder:text-slate-600 h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#16212e] border-[#223145] text-white h-11">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#16212e] border-[#223145] text-white">
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  'size-2 rounded-full',
                                  getCategoryBg(c.color)
                                )}
                              />
                              {c.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                      Due Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full bg-[#16212e] border-[#223145] text-white h-11 text-left font-normal pl-3',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                            {field.value
                              ? format(new Date(field.value), 'MMM dd, yyyy')
                              : 'Pick a date'}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-[#16212e] border-[#223145]"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={new Date(field.value)}
                          onSelect={(date) =>
                            field.onChange(date ? date.toISOString() : '')
                          }
                          initialFocus
                          className="bg-[#16212e] text-white"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Add more details about this task..."
                      className="bg-[#16212e] border-[#223145] text-white placeholder:text-slate-600 min-h-[100px] resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Priority
                  </FormLabel>
                  <FormControl>
                    <div className="flex bg-[#16212e] border border-[#223145] rounded-lg p-1 gap-1">
                      {(['low', 'medium', 'high'] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => field.onChange(p)}
                          className={cn(
                            'flex-1 py-2 text-xs font-bold uppercase rounded transition-all',
                            field.value === p
                              ? 'bg-primary text-white shadow-lg shadow-primary/20'
                              : 'text-slate-500 hover:text-slate-300'
                          )}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4 flex items-center justify-between border-t border-[#223145] mt-6 -mx-6 px-6">
              {task ? (
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    Last Updated
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {format(new Date(task.createdAt), 'MMM dd, yyyy @ h:mm a')}
                  </span>
                </div>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-4">
                {task && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-400 hover:bg-red-500/10 gap-2 font-bold text-xs uppercase"
                  >
                    <Trash2 className="size-4" />
                    Delete Task
                  </Button>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="text-slate-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button type="submit" className="gap-2 font-bold px-6">
                  <CheckCircle2 className="size-4" />
                  {task ? 'Save Changes' : 'Create Task'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
