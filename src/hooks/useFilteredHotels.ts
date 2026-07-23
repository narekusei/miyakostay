import { useMemo } from 'react';
import { curatedHotels } from '../data/curatedHotels';
import { useFilterStore } from '../store/useFilterStore';
import { filterHotels } from '../domain/filterHotels';

export const useFilteredHotels = () => {
  const search = useFilterStore((state) => state.search);
  const priceCategory = useFilterStore((state) => state.priceCategory);
  const beachOnly = useFilterStore((state) => state.beachOnly);
  const tags = useFilterStore((state) => state.tags);
  const filters = useMemo(
    () => ({ search, priceCategory, beachOnly, tags }),
    [search, priceCategory, beachOnly, tags],
  );

  const filteredHotels = useMemo(() => filterHotels(curatedHotels, filters), [filters]);

  return { hotels: filteredHotels, total: curatedHotels.length };
};
