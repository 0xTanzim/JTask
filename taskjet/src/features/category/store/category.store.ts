import { create } from 'zustand';

type CategoryStore = {
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategoryId: null,
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
}));
