'use client';

import { toggleTaskStatus as toggleTaskStatusAction } from '@/actions/task';
import { Badge } from '@/components/ui/badge';
import { Category } from '@/features/category/types';
import { cn, getCategoryLightBg } from '@/lib/utils';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  MessageSquare,
  PlayCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';
import { Task } from '../types';
import { TaskModal } from './TaskModal';

interface TaskItemProps {
  task: Task;
  categories: Category[];
}

const statusIcons = {
  todo: Circle,
  'in-progress': PlayCircle,
  done: CheckCircle2,
};

const priorityColors = {
  low: 'bg-green-500',
  medium: 'bg-orange-500',
  high: 'bg-red-500',
};

export function TaskItem({ task, categories }: TaskItemProps) {
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();
  const StatusIcon = statusIcons[task.status];

  const handleToggleStatus = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPending(true);
    try {
      const result = await toggleTaskStatusAction(task.id, task.status);
      if (!result.success) {
        toast.error(result.error || 'Failed to toggle status');
        return;
      }
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div
        onClick={() => setIsEditModalOpen(true)}
        className={cn(
          'group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer',
          task.status === 'done'
            ? 'bg-emerald-500/5 border-emerald-500/20'
            : 'bg-[#16212e] border-[#223145] hover:border-primary/50'
        )}
      >
        <button
          className={cn(
            'flex-shrink-0 transition-colors relative z-10',
            task.status === 'done'
              ? 'text-emerald-500'
              : 'text-slate-500 group-hover:text-primary',
            isPending && 'opacity-50 cursor-not-allowed'
          )}
          onClick={handleToggleStatus}
          disabled={isPending}
        >
          <StatusIcon
            className={cn(
              'size-6',
              task.status === 'in-progress' && 'text-blue-500'
            )}
          />
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3
              className={cn(
                'text-base font-semibold truncate',
                task.status === 'done'
                  ? 'text-slate-500 line-through'
                  : 'text-white'
              )}
            >
              {task.title}
            </h3>
            {task.category && (
              <Badge
                variant="outline"
                className={cn(
                  'uppercase text-[10px] font-bold tracking-wider px-2 py-0 h-4 border-none',
                  getCategoryLightBg(task.category.color),
                  task.category.color
                )}
              >
                {task.category.name}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-5 text-[11px] md:text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              <span>{task.dueDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className={cn(
                  'size-2 rounded-full',
                  priorityColors[task.priority]
                )}
              />
              <span className="capitalize">{task.priority}</span>
            </div>
            {task.commentCount > 0 && (
              <div className="flex items-center gap-1.5">
                <MessageSquare className="size-3.5" />
                <span>{task.commentCount}</span>
              </div>
            )}
            {task.status === 'in-progress' && (
              <div className="flex items-center gap-1.5 text-blue-500">
                <Clock className="size-3.5" />
                <span>Active</span>
              </div>
            )}
            {task.status === 'done' && (
              <div className="flex items-center gap-1.5 text-emerald-500">
                <CheckCircle2 className="size-3.5" />
                <span>Done</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        categories={categories}
      />
    </>
  );
}
