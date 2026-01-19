'use client';

import React from 'react';
import { TaskItem } from './TaskItem';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Task } from '../types';

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Update website hero section',
    status: 'todo',
    priority: 'high',
    categoryId: 'work',
    category: { id: 'work', name: 'WORK', color: 'text-blue-500' },
    dueDate: 'Oct 24, 2023',
    commentCount: 3,
    createdAt: '2023-10-20',
  },
  {
    id: '2',
    title: 'Design mobile navigation flows',
    status: 'in-progress',
    priority: 'medium',
    categoryId: 'personal',
    category: { id: 'personal', name: 'PERSONAL', color: 'text-purple-500' },
    dueDate: 'Oct 26, 2023',
    commentCount: 0,
    createdAt: '2023-10-21',
  },
  {
    id: '3',
    title: 'Buy gym supplement restock',
    status: 'done',
    priority: 'low',
    categoryId: 'shopping',
    category: { id: 'shopping', name: 'SHOPPING', color: 'text-green-500' },
    dueDate: 'Yesterday',
    commentCount: 0,
    createdAt: '2023-10-22',
  },
  {
    id: '4',
    title: 'Morning 5km run at the park',
    status: 'todo',
    priority: 'medium',
    categoryId: 'health',
    category: { id: 'health', name: 'HEALTH', color: 'text-orange-500' },
    dueDate: 'Tomorrow',
    commentCount: 0,
    createdAt: '2023-10-23',
  },
];

export function Dashboard() {
  return (
    <div className="p-8 space-y-10">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Task Dashboard</h1>
          <p className="text-slate-500 font-medium">Manage your upcoming priorities and track progress.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-[#16212e] border border-[#223145] px-4 py-2 rounded-lg flex flex-col items-center justify-center min-w-[120px]">
            <span className="text-white font-bold">12 Tasks Total</span>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-lg flex flex-col items-center justify-center min-w-[120px]">
            <span className="text-emerald-500 font-bold">4 Completed</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="all" className="w-full">
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
          {MOCK_TASKS.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
