import { create } from 'zustand';
import { FilterState, Category } from '../types';

export const useFilterStore = create<FilterState>((set) => ({
  selectedCategory: 'All',
  setSelectedCategory: (category: Category | 'All') => set({ selectedCategory: category }),
}));
