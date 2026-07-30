import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFilterStore } from '../store/useFilterStore';
import { filterHotels } from '../domain/filterHotels';
import { hotelService } from '../services/hotelService';
import type { Hotel } from '../types/hotel';

const EMPTY_HOTELS: Hotel[] = [];

export const useFilteredHotels = () => {
  const query = useQuery({
    queryKey: ['hotels'],
    queryFn: hotelService.list,
  });
  const search = useFilterStore((state) => state.search);
  const priceCategory = useFilterStore((state) => state.priceCategory);
  const beachOnly = useFilterStore((state) => state.beachOnly);
  const tags = useFilterStore((state) => state.tags);
  const filters = useMemo(
    () => ({ search, priceCategory, beachOnly, tags }),
    [search, priceCategory, beachOnly, tags],
  );

  const hotels = query.data ?? EMPTY_HOTELS;
  const filteredHotels = useMemo(() => filterHotels(hotels, filters), [hotels, filters]);

  return {
    hotels: filteredHotels,
    total: hotels.length,
    isLoading: query.isPending,
    isError: query.isError,
    retry: query.refetch,
  };
};
