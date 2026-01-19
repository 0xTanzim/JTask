'use client';

import React from 'react';
import { TaskItem } from './TaskItem';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTaskStore } from '../store/task.store';
import { useCategoryStore } from '@/features/category/store/category.store';
import { Plus, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskModal } from './TaskModal';

export function Dashboard() {
  const { tasks, searchQuery, selectedCategoryId } = useTaskStore();
  const categories = useCategoryStore((state) => state.categories);
  const [filter, setFilter] = React.useState('all');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = React.useState(false);

  const filteredTasks = tasks.filter((task) => {
    // Filter by tab (status)
    const statusMatch = filter === 'all' || task.status === filter;
    
    // Filter by category sidebar
    const categoryMatch = !selectedCategoryId || task.categoryId === selectedCategoryId;
    
    // Filter by search query
    const searchMatch = !searchQuery || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
    return statusMatch && categoryMatch && searchMatch;
  }).map(task => ({
    ...task,
    category: categories.find(c => c.id === task.categoryId)
  }));

  const completedCount = tasks.filter(t => t.status === 'done').length;

  return (
    <div className="p-8 space-y-10">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Task Dashboard</h1>
          <p className="text-slate-500 font-medium">Manage your upcoming priorities and track progress.</p>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="bg-[#16212e] border border-[#223145] px-4 py-2 rounded-lg flex flex-col items-center justify-center min-w-[120px]">
            <span className="text-white font-bold">{tasks.length} Tasks Total</span>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-lg flex flex-col items-center justify-center min-w-[120px]">
            <span className="text-emerald-500 font-bold">{completedCount} Completed</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="bg-transparent h-auto p-0 border-b border-border w-full justify-start rounded-none gap-8">
            <TabsTrigger 
              value="all" 
              className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary text-slate-500 font-bold text-sm uppercase tracking-wide"
            >
              All Tasks
            </TabsTrigger>
            <TabsTrigger 
              value="todo" 
              className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary text-slate-500 font-bold text-sm uppercase tracking-wide"
            >
              To Do
            </TabsTrigger>
            <TabsTrigger 
              value="in-progress" 
              className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary text-slate-500 font-bold text-sm uppercase tracking-wide"
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger 
              value="done" 
              className="px-0 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary text-slate-500 font-bold text-sm uppercase tracking-wide"
            >
              Done
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))
          ) : (
            <div className="py-24 text-center bg-[#16212e]/30 rounded-2xl border border-dashed border-[#223145] flex flex-col items-center justify-center">
              <div className="size-16 bg-[#1f2b3a] rounded-full flex items-center justify-center mb-4">
                <Inbox className="size-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No tasks found</h3>
              <p className="text-slate-500 font-medium max-w-xs mx-auto mb-8">
                {tasks.length === 0 
                  ? "Get started by creating your first task to stay organized." 
                  : "Try adjusting your filters or search terms to find what you're looking for."}
              </p>
              {tasks.length === 0 && (
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
      />
    </div>
  );
}
