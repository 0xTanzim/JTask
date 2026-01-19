import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types';

type TaskStore = {
  tasks: Task[];
  searchQuery: string;
  selectedCategoryId: string | null;
  addTask: (input: CreateTaskInput) => void;
  updateTask: (id: string, patch: UpdateTaskInput) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategoryId: (id: string | null) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      searchQuery: '',
      selectedCategoryId: null,
      addTask: (input) => set((state) => ({
        tasks: [
          ...state.tasks,
          {
            ...input,
            id: Math.random().toString(36).substring(7),
            createdAt: new Date().toISOString(),
            commentCount: 0,
          },
        ],
      })),
      updateTask: (id, patch) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
      })),
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      })),
      toggleTaskStatus: (id) => set((state) => ({
        tasks: state.tasks.map((t) => {
          if (t.id === id) {
            const nextStatus = t.status === 'done' ? 'todo' : 'done';
            return { ...t, status: nextStatus };
          }
          return t;
        }),
      })),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
    }),
    {
      name: 'task-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
