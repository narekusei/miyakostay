import type { FilterState, HotelTag } from '../types/hotel';

export const initialFilterState: FilterState = {
  search: '',
  maxPrice: 50000,
  minRating: 0,
  beachOnly: false,
  tags: [],
};

export const toggleHotelTag = (tags: HotelTag[], tag: HotelTag): HotelTag[] =>
  tags.includes(tag) ? tags.filter((currentTag) => currentTag !== tag) : [...tags, tag];
