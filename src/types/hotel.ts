// src/types/hotel.ts
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
  tags: ('beach' | 'luxury' | 'budget' | 'family' | 'couples')[];
}

export interface FilterState {
  search: string;
  maxPrice: number;
  minRating: number;
  beachOnly: boolean;
  tags: string[];
}