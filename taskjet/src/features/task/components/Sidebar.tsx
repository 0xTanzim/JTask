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
  Tag,
  Edit2,
  X,
  ChevronLeft,
  ChevronRight
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

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

export function Sidebar({ className, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { categories } = useCategoryStore();
  const { selectedCategoryId, setSelectedCategoryId } = useTaskStore();
  const [isCategoryModalOpen, setIsCategoryModalOpen] = React.useState(false);
  const [categoryToEdit, setCategoryToEdit] = React.useState<any>(null);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleEditCategory = (e: React.MouseEvent, category: any) => {
    e.stopPropagation();
    setCategoryToEdit(category);
    setIsCategoryModalOpen(true);
  };

  const handleAddCategory = () => {
    setCategoryToEdit(null);
    setIsCategoryModalOpen(true);
  };

  const handleSidebarClick = () => {
    if (onClose) onClose();
  };

  const toggleCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <aside className={cn(
        "bg-[#0d131c] border-r border-[#223145] flex flex-col h-screen text-slate-400 transition-all duration-300 ease-in-out shrink-0 relative",
        isCollapsed ? "w-20" : "w-64",
        className
      )}>
        {/* Collapse Toggle Button - Desktop only */}
        <button
          onClick={toggleCollapse}
          className="hidden xl:flex absolute -right-3 top-8 size-6 bg-[#223145] rounded-full items-center justify-center text-white border border-[#33465c] hover:bg-[#2d4057] transition-colors z-50"
        >
          {isCollapsed ? (
            <ChevronRight className="size-3.5" />
          ) : (
            <ChevronLeft className="size-3.5" />
          )}
        </button>

        <div className="p-6 relative h-full flex flex-col">
          {/* Mobile Close Button */}
          {onClose && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-2 xl:hidden text-slate-400 hover:text-white"
              onClick={onClose}
            >
              <X className="size-5" />
            </Button>
          )}

          <div 
            className={cn(
              "flex items-center gap-3 transition-all cursor-pointer",
              isCollapsed ? "mb-10 justify-center" : "mb-10 px-2"
            )}
            onClick={() => {
              setSelectedCategoryId(null);
              handleSidebarClick();
            }}
          >
            <div className="size-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
              <CheckCircle2 className="text-white size-5" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold tracking-tight text-white whitespace-nowrap overflow-hidden">
                TaskFlow
              </span>
            )}
          </div>

          <div className="space-y-8 flex-1 overflow-y-auto no-scrollbar py-2">
            <div>
              {!isCollapsed && (
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 px-2">
                  Workspace
                </div>
              )}
              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleSidebarClick}
                    title={isCollapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                      isCollapsed ? "justify-center" : "",
                      pathname === item.href 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-primary/5 hover:text-white"
                    )}
                  >
                    <item.icon className={cn("size-5 shrink-0", pathname === item.href ? "text-primary" : "text-slate-400 group-hover:text-white")} />
                    {!isCollapsed && (
                      <span className="font-medium whitespace-nowrap overflow-hidden">{item.label}</span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <div className={cn(
                "flex items-center mb-4 px-2",
                isCollapsed ? "justify-center" : "justify-between"
              )}>
                {!isCollapsed && (
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Categories
                  </div>
                )}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="size-5 hover:bg-primary/10"
                  onClick={handleAddCategory}
                  title={isCollapsed ? "Add Category" : undefined}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              <nav className="space-y-1">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => {
                      setSelectedCategoryId(category.id === selectedCategoryId ? null : category.id);
                      handleSidebarClick();
                    }}
                    title={isCollapsed ? category.name : undefined}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group text-left cursor-pointer",
                      isCollapsed ? "justify-center" : "",
                      selectedCategoryId === category.id 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-primary/5 hover:text-white"
                    )}
                  >
                    <div className={cn("p-1.5 rounded-md shrink-0", getCategoryLightBg(category.color))}>
                      <Tag className={cn("size-4", category.color)} />
                    </div>
                    {!isCollapsed && (
                      <span className="font-medium truncate flex-1">{category.name}</span>
                    )}
                    {!isCollapsed && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
                        onClick={(e) => handleEditCategory(e, category)}
                      >
                        <Edit2 className="size-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>

          <div className={cn(
            "mt-auto pt-6 border-t border-[#223145] space-y-4",
            isCollapsed ? "flex flex-col items-center" : ""
          )}>
            <div className={cn(
              "flex items-center gap-3 px-2 py-2",
              isCollapsed ? "justify-center" : ""
            )}>
              <Avatar className="size-9 border border-[#223145] shrink-0">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {user?.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{user?.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">Pro Plan</div>
                </div>
              )}
            </div>
            
            <div className={cn(
              "grid gap-2",
              isCollapsed ? "flex flex-col items-center" : "grid-cols-2"
            )}>
              <Button 
                variant="ghost" 
                className={cn(
                  "justify-start gap-2 h-9 text-slate-400 hover:text-white hover:bg-white/5",
                  isCollapsed ? "px-0 w-9 justify-center" : "px-2"
                )}
                title={isCollapsed ? "Settings" : undefined}
              >
                <Settings className="size-4 shrink-0" />
                {!isCollapsed && <span className="text-xs font-medium">Settings</span>}
              </Button>
              <Button 
                variant="ghost" 
                className={cn(
                  "justify-start gap-2 h-9 text-red-400 hover:text-red-300 hover:bg-red-500/10",
                  isCollapsed ? "px-0 w-9 justify-center" : "px-2"
                )}
                onClick={logout}
                title={isCollapsed ? "Logout" : undefined}
              >
                <LogOut className="size-4 shrink-0" />
                {!isCollapsed && <span className="text-xs font-medium">Logout</span>}
              </Button>
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
