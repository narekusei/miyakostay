// src/store/useFilterStore.ts
import { create } from 'zustand';
import type { FilterState, HotelTag, PriceCategory } from '../types/hotel';
import { initialFilterState, toggleHotelTag } from '../domain/filterState';

interface FilterStore extends FilterState {
  setSearch: (search: string) => void;
  setPriceCategory: (category: PriceCategory | 'all') => void;
  toggleBeachOnly: () => void;
  toggleTag: (tag: HotelTag) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialFilterState,
  setSearch: (search) => set({ search }),
  setPriceCategory: (priceCategory) => set({ priceCategory }),
  toggleBeachOnly: () => set((state) => ({ beachOnly: !state.beachOnly })),
  toggleTag: (tag) => set((state) => ({ tags: toggleHotelTag(state.tags, tag) })),
  resetFilters: () => set(initialFilterState)
}));
