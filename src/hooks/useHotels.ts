// src/hooks/useHotels.ts
import { useMemo } from 'react';
import { mockHotels } from '../data/mockHotels';
import { useFilterStore } from '../store/useFilterStore';
import { filterHotels } from '../domain/filterHotels';

export const useHotels = () => {
  const search = useFilterStore((state) => state.search);
  const maxPrice = useFilterStore((state) => state.maxPrice);
  const minRating = useFilterStore((state) => state.minRating);
  const beachOnly = useFilterStore((state) => state.beachOnly);
  const tags = useFilterStore((state) => state.tags);
  const filters = useMemo(
    () => ({ search, maxPrice, minRating, beachOnly, tags }),
    [search, maxPrice, minRating, beachOnly, tags],
  );

  const filteredHotels = useMemo(() => filterHotels(mockHotels, filters), [filters]);

  return { hotels: filteredHotels, total: mockHotels.length };
};
