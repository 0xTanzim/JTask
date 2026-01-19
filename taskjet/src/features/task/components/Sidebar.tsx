'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Calendar, 
  Settings, 
  LogOut, 
  Plus, 
  LayoutDashboard,
  CheckCircle2,
  Briefcase,
  User,
  ShoppingCart,
  HeartPulse,
  Tag,
  Edit2
} from 'lucide-react';
import { cn, getCategoryBg, getCategoryLightBg } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { useCategoryStore } from '@/features/category/store/category.store';
import { useTaskStore } from '@/features/task/store/task.store';
import { CategoryModal } from '@/features/category/components/CategoryModal';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Calendar, label: 'Calendar', href: '/dashboard/calendar' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { categories } = useCategoryStore();
  const { selectedCategoryId, setSelectedCategoryId } = useTaskStore();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = React.useState(false);
  const [categoryToEdit, setCategoryToEdit] = React.useState<any>(null);

  const handleEditCategory = (e: React.MouseEvent, category: any) => {
    e.stopPropagation();
    setCategoryToEdit(category);
    setIsCategoryModalOpen(true);
  };

  const handleAddCategory = () => {
    setCategoryToEdit(null);
    setIsCategoryModalOpen(true);
  };

  return (
    <>
      <aside className="w-64 border-r border-border bg-[#0d131c] flex flex-col h-screen text-slate-400">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => setSelectedCategoryId(null)}>
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle2 className="text-white size-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">TaskFlow</span>
          </div>

          <div className="space-y-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 px-2">
                Workspace
              </div>
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                      pathname === item.href 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-primary/5 hover:text-white"
                    )}
                  >
                    <item.icon className={cn("size-5", pathname === item.href ? "text-primary" : "text-slate-400 group-hover:text-white")} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <div className="flex items-center justify-between px-2 mb-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Categories
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="size-5 hover:bg-primary/10"
                  onClick={handleAddCategory}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <nav className="space-y-1">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id === selectedCategoryId ? null : category.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group text-left cursor-pointer",
                      selectedCategoryId === category.id 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-primary/5 hover:text-white"
                    )}
                  >
                    <div className={cn("p-1.5 rounded-md", getCategoryLightBg(category.color))}>
                      <Tag className={cn("size-4", category.color)} />
                    </div>
                    <span className="font-medium truncate flex-1">{category.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
                      onClick={(e) => handleEditCategory(e, category)}
                    >
                      <Edit2 className="size-3" />
                    </Button>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-auto p-4 border-t border-border space-y-4">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-primary/5 hover:text-white"
          >
            <Settings className="size-5" />
            <span className="font-medium">Settings</span>
          </Link>
          <div className="flex items-center gap-3 px-3 py-2">
            <Avatar className="size-9 border border-border">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-white text-xs">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</span>
              <span className="text-xs text-slate-500 truncate">Pro Plan</span>
            </div>
            <button 
              onClick={logout}
              className="ml-auto text-slate-500 hover:text-white transition-colors"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      <CategoryModal 
        isOpen={isCategoryModalOpen} 
        onClose={() => {
          setIsCategoryModalOpen(false);
          setCategoryToEdit(null);
        }} 
        category={categoryToEdit}
      />
    </>
  );
}
