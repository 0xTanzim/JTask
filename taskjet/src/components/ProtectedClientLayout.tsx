'use client';

import { Category } from '@/features/category/types';
import { DashboardHeader } from '@/features/task/components/DashboardHeader';
import { Sidebar } from '@/features/task/components/Sidebar';
import { cn } from '@/lib/utils';
import React from 'react';

interface ProtectedClientLayoutProps {
  children: React.ReactNode;
  userEmail: string;
}

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch('/api/client/categories');
  if (!response.ok) return [];
  return response.json();
}

export function ProtectedClientLayout({
  children,
  userEmail,
}: ProtectedClientLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);

  React.useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-[#101822]">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 xl:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop and Mobile */}
      <Sidebar
        className={cn(
          'fixed inset-y-0 left-0 z-50 xl:static xl:block transition-transform duration-300 ease-in-out xl:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        onClose={() => setIsSidebarOpen(false)}
        categories={categories}
        userEmail={userEmail}
      />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <DashboardHeader
          onMenuClick={() => setIsSidebarOpen(true)}
          categories={categories}
        />
        <main className="flex-1 overflow-y-auto bg-[#101822] p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
