'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Category } from '@/features/category/types';
import { Inbox, Plus } from 'lucide-react';
import React from 'react';
import { useTaskStore } from '../store/task.store';
import { Task } from '../types';
import { TaskItem } from './TaskItem';
import { TaskModal } from './TaskModal';

interface DashboardContainerProps {
  initialTasks: Task[];
  initialCategories: Category[];
}

export function DashboardContainer({
  initialTasks,
  initialCategories,
}: DashboardContainerProps) {
  const { searchQuery, selectedCategoryId } = useTaskStore();
  const [filter, setFilter] = React.useState('all');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = React.useState(false);

  const filteredTasks = initialTasks
    .filter((task) => {
      const statusMatch = filter === 'all' || task.status === filter;
      const categoryMatch =
        !selectedCategoryId || task.categoryId === selectedCategoryId;
      const searchMatch =
        !searchQuery ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return statusMatch && categoryMatch && searchMatch;
    })
    .map((task) => {
      const category = initialCategories.find((c) => c.id === task.categoryId);
      return { ...task, category };
    });

  const completedCount = initialTasks.filter((t) => t.status === 'done').length;

  return (
    <div className="space-y-6 md:space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">
            Task Dashboard
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            Manage your upcoming priorities and track progress.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:flex gap-3 md:gap-4 justify-center md:justify-start">
          <div className="bg-[#16212e] border border-[#223145] px-3 md:px-4 py-2 rounded-lg flex flex-col items-center justify-center">
            <span className="text-white font-bold text-xs md:text-sm">
              {initialTasks.length} Total
            </span>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 md:px-4 py-2 rounded-lg flex flex-col items-center justify-center">
            <span className="text-emerald-500 font-bold text-xs md:text-sm">
              {completedCount} Done
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="bg-transparent h-auto p-0 border-b border-border w-full justify-start rounded-none gap-4 md:gap-8 overflow-x-auto no-scrollbar">
            <TabsTrigger
              value="all"
              className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary text-slate-500 font-bold text-[10px] md:text-sm uppercase tracking-wide whitespace-nowrap"
            >
              All Tasks
            </TabsTrigger>
            <TabsTrigger
              value="todo"
              className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary text-slate-500 font-bold text-[10px] md:text-sm uppercase tracking-wide whitespace-nowrap"
            >
              To Do
            </TabsTrigger>
            <TabsTrigger
              value="in-progress"
              className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary text-slate-500 font-bold text-[10px] md:text-sm uppercase tracking-wide whitespace-nowrap"
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger
              value="done"
              className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary text-slate-500 font-bold text-[10px] md:text-sm uppercase tracking-wide whitespace-nowrap"
            >
              Done
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                categories={initialCategories}
              />
            ))
          ) : (
            <div className="py-24 text-center bg-[#16212e]/30 rounded-2xl border border-dashed border-[#223145] flex flex-col items-center justify-center">
              <div className="size-16 bg-[#1f2b3a] rounded-full flex items-center justify-center mb-4">
                <Inbox className="size-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No tasks found
              </h3>
              <p className="text-slate-500 font-medium max-w-xs mx-auto mb-8">
                {initialTasks.length === 0
                  ? 'Get started by creating your first task to stay organized.'
                  : "Try adjusting your filters or search terms to find what you're looking for."}
              </p>
              {initialTasks.length === 0 && (
                <Button
                  onClick={() => setIsNewTaskModalOpen(true)}
                  className="gap-2 font-bold"
                >
                  <Plus className="size-4" />
                  Create First Task
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <TaskModal
        isOpen={isNewTaskModalOpen}
        onClose={() => setIsNewTaskModalOpen(false)}
        categories={initialCategories}
      />
    </div>
  );
}
