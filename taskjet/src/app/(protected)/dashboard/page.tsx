'use client';

import { Category } from '@/features/category/types';
import { DashboardContainer } from '@/features/task/components/DashboardContainer';
import { Task } from '@/features/task/types';
import React from 'react';

export default function DashboardPage() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [tasksRes, categoriesRes] = await Promise.all([
          fetch('/api/client/tasks'),
          fetch('/api/client/categories'),
        ]);

        if (tasksRes.ok) {
          const tasksData = await tasksRes.json();
          setTasks(tasksData);
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <DashboardContainer initialTasks={tasks} initialCategories={categories} />
  );
}
