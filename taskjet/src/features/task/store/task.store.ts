import { create } from 'zustand';

type TaskStore = {
  searchQuery: string;
  selectedCategoryId: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedCategoryId: (id: string | null) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  searchQuery: '',
  selectedCategoryId: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
}));
