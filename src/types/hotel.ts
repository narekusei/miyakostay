// src/types/hotel.ts
export const HOTEL_TAGS = ['beach', 'luxury', 'budget', 'family', 'couples'] as const;

export type HotelTag = (typeof HOTEL_TAGS)[number];

export interface Hotel {
  id: string;
  name: string;
  nameJa: string;
  description: string;
  descriptionJa: string;
  pricePerNight: number;
  rating: number; // 0-5
  reviewCount: number;
  location: {
    area: string;
    areaJa: string;
    beachAccess: boolean;
    coordinates: { lat: number; lng: number };
  };
  amenities: string[];
  amenitiesJa: string[];
  images: string[];
  tags: HotelTag[];
}

export interface FilterState {
  search: string;
  maxPrice: number;
  minRating: number;
  beachOnly: boolean;
  tags: HotelTag[];
}
