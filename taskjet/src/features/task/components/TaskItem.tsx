'use client';

import React from 'react';
import { Calendar, MessageSquare, Circle, CheckCircle2, PlayCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Task, TaskStatus, TaskPriority } from '../types';

interface TaskItemProps {
  task: Task;
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

export function TaskItem({ task }: TaskItemProps) {
  const StatusIcon = statusIcons[task.status];

  return (
    <div className={cn(
      "group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200",
      task.status === 'done' 
        ? "bg-emerald-500/5 border-emerald-500/20" 
        : "bg-[#16212e] border-[#223145] hover:border-primary/50"
    )}>
      <button className={cn(
        "flex-shrink-0 transition-colors",
        task.status === 'done' ? "text-emerald-500" : "text-slate-500 group-hover:text-primary"
      )}>
        <StatusIcon className={cn("size-6", task.status === 'in-progress' && "text-blue-500")} />
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className={cn(
            "text-base font-semibold truncate",
            task.status === 'done' ? "text-slate-500 line-through" : "text-white"
          )}>
            {task.title}
          </h3>
          {task.category && (
            <Badge 
              variant="outline" 
              className={cn(
                "uppercase text-[10px] font-bold tracking-wider px-2 py-0 h-4 border-none",
                task.category.color.replace('text-', 'bg-').replace('500', '500/10'),
                task.category.color
              )}
            >
              {task.category.name}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-5 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            <span>{task.dueDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={cn("size-2 rounded-full", priorityColors[task.priority])} />
            <span className="capitalize">{task.priority} Priority</span>
          </div>
          {task.commentCount > 0 && (
            <div className="flex items-center gap-1.5">
              <MessageSquare className="size-3.5" />
              <span>{task.commentCount} Comments</span>
            </div>
          )}
          {task.status === 'in-progress' && (
            <div className="flex items-center gap-1.5 text-blue-500">
              <Clock className="size-3.5" />
              <span>In Progress</span>
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
  );
}
