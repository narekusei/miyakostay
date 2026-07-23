// src/types/hotel.ts
export const HOTEL_TAGS = [
  'beach',
  'luxury',
  'budget',
  'family',
  'couples',
  'city',
  'villa',
  'wellness',
] as const;

export type HotelTag = (typeof HOTEL_TAGS)[number];

export const PRICE_CATEGORIES = ['budget', 'midRange', 'premium', 'luxury'] as const;

export type PriceCategory = (typeof PRICE_CATEGORIES)[number];

export interface Hotel {
  slug: string;
  name: string;
  nameJa: string;
  description: string;
  descriptionJa: string;
  location: {
    area: string;
    areaJa: string;
    beachAccess: boolean;
  };
  propertyType: 'cityHotel' | 'resort' | 'villa' | 'containerHotel';
  priceCategory: PriceCategory;
  officialWebsite: string;
  amenities: string[];
  amenitiesJa: string[];
  tags: HotelTag[];
}

export interface FilterState {
  search: string;
  priceCategory: PriceCategory | 'all';
  beachOnly: boolean;
  tags: HotelTag[];
}
