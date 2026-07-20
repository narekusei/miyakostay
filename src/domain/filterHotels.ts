import type { FilterState, Hotel } from '../types/hotel';

export const filterHotels = (hotels: Hotel[], filters: FilterState) => {
  const query = filters.search.trim().toLocaleLowerCase();

  return hotels.filter((hotel) => {
    if (query) {
      const searchableText = [
        hotel.name,
        hotel.nameJa,
        hotel.location.area,
        hotel.location.areaJa,
      ].join(' ').toLocaleLowerCase();

      if (!searchableText.includes(query)) return false;
    }

    if (hotel.pricePerNight > filters.maxPrice) return false;
    if (hotel.rating < filters.minRating) return false;
    if (filters.beachOnly && !hotel.location.beachAccess) return false;
    if (filters.tags.length > 0 && !filters.tags.some((tag) => hotel.tags.includes(tag))) {
      return false;
    }

    return true;
  });
};
