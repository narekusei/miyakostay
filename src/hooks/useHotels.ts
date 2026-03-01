// src/hooks/useHotels.ts
import { useMemo } from 'react';
import { mockHotels } from '../data/mockHotels';
import { useFilterStore } from '../store/useFilterStore';

export const useHotels = () => {
  const filters = useFilterStore();

  const filteredHotels = useMemo(() => {
    return mockHotels.filter(hotel => {
      // Search filter
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = hotel.name.toLowerCase().includes(query) || 
                           hotel.nameJa.includes(query);
        const matchesArea = hotel.location.area.toLowerCase().includes(query) ||
                           hotel.location.areaJa.includes(query);
        if (!matchesName && !matchesArea) return false;
      }

      // Price filter
      if (hotel.pricePerNight > filters.maxPrice) return false;

      // Rating filter
      if (hotel.rating < filters.minRating) return false;

      // Beach access filter
      if (filters.beachOnly && !hotel.location.beachAccess) return false;

      // Tags filter
      if (filters.tags.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hasTag = filters.tags.some(tag => hotel.tags.includes(tag as any));
        if (!hasTag) return false;
      }

      return true;
    });
  }, [filters]);

  return { hotels: filteredHotels, total: mockHotels.length };
};