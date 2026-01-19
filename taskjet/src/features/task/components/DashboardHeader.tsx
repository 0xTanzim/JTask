'use client';

import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TaskModal } from './TaskModal';
import { useTaskStore } from '../store/task.store';

export function DashboardHeader() {
  const [isTaskModalOpen, setIsTaskModalOpen] = React.useState(false);
  const { searchQuery, setSearchQuery } = useTaskStore();

  return (
    <>
      <header className="h-16 border-b border-border bg-[#101822] flex items-center justify-between px-8">
        <div className="relative w-full max-w-xl">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <Search className="size-4" />
          </span>
          <Input 
            placeholder="Search tasks, categories, or tags..." 
            className="pl-10 bg-[#16212e] border-[#223145] text-white placeholder:text-slate-500 focus-visible:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white hover:bg-white/5">
            <Bell className="size-5" />
            <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border-2 border-[#101822]" />
          </Button>
          <Button 
            className="gap-2 font-bold px-6"
            onClick={() => setIsTaskModalOpen(true)}
          >
            <Plus className="size-4" />
            Add Task
          </Button>
        </div>
      </header>

      <TaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
      />
    </>
  );
}
