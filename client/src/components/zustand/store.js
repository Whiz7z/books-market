import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useSelectedTags = create(
  devtools((set) => ({
    tags: [],
    selectedCategory: "all",
    setTags: (tags) => set((state) => ({ tags: tags })),
    resetTags: () => set({ tags: [] }),
    setCategory: (category) => set((state) => ({ selectedCategory: category })),
    resetCategory: () => set({ selectedCategory: "all" }),
  }))
);
