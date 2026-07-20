// src/store/useFilterStore.ts
import { create } from 'zustand';
import type { FilterState, HotelTag } from '../types/hotel';
import { initialFilterState, toggleHotelTag } from '../domain/filterState';

interface FilterStore extends FilterState {
  setSearch: (search: string) => void;
  setMaxPrice: (price: number) => void;
  setMinRating: (rating: number) => void;
  toggleBeachOnly: () => void;
  toggleTag: (tag: HotelTag) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialFilterState,
  setSearch: (search) => set({ search }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setMinRating: (minRating) => set({ minRating }),
  toggleBeachOnly: () => set((state) => ({ beachOnly: !state.beachOnly })),
  toggleTag: (tag) => set((state) => ({ tags: toggleHotelTag(state.tags, tag) })),
  resetFilters: () => set(initialFilterState)
}));
