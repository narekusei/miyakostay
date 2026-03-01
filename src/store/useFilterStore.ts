// src/store/useFilterStore.ts
import { create } from 'zustand';
import type { FilterState } from '../types/hotel';

interface FilterStore extends FilterState {
  setSearch: (search: string) => void;
  setMaxPrice: (price: number) => void;
  setMinRating: (rating: number) => void;
  toggleBeachOnly: () => void;
  toggleTag: (tag: string) => void;
  resetFilters: () => void;
}

const initialState: FilterState = {
  search: '',
  maxPrice: 50000,
  minRating: 0,
  beachOnly: false,
  tags: []
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,
  setSearch: (search) => set({ search }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setMinRating: (minRating) => set({ minRating }),
  toggleBeachOnly: () => set((state) => ({ beachOnly: !state.beachOnly })),
  toggleTag: (tag) => set((state) => ({
    tags: state.tags.includes(tag)
      ? state.tags.filter(t => t !== tag)
      : [...state.tags, tag]
  })),
  resetFilters: () => set(initialState)
}));