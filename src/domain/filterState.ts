import type { FilterState, HotelTag } from '../types/hotel';

export const initialFilterState: FilterState = {
  search: '',
  priceCategory: 'all',
  beachOnly: false,
  tags: [],
};

export const toggleHotelTag = (tags: HotelTag[], tag: HotelTag): HotelTag[] =>
  tags.includes(tag) ? tags.filter((currentTag) => currentTag !== tag) : [...tags, tag];
