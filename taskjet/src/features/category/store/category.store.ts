import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Category } from '../types';

type CategoryStore = {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
};

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'work', name: 'Work Projects', color: 'text-blue-500' },
  { id: 'personal', name: 'Personal Life', color: 'text-purple-500' },
  { id: 'shopping', name: 'Shopping', color: 'text-green-500' },
  { id: 'health', name: 'Health & Fitness', color: 'text-orange-500' },
];

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      categories: DEFAULT_CATEGORIES,
      addCategory: (category) => set((state) => ({
        categories: [...state.categories, { ...category, id: Math.random().toString(36).substring(7) }]
      })),
      updateCategory: (id, updatedCategory) => set((state) => ({
        categories: state.categories.map((c) => c.id === id ? { ...c, ...updatedCategory } : c)
      })),
      deleteCategory: (id) => set((state) => ({
        categories: state.categories.filter((c) => c.id !== id)
      })),
    }),
    {
      name: 'category-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
