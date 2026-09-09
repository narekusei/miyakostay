import { describe, expect, test } from 'vitest';
import { filterHotels } from '../src/domain/filterHotels';
import { initialFilterState, toggleHotelTag } from '../src/domain/filterState';
import { shouldAnimatePhotoFallback } from '../src/domain/hotelPhotoState';
import type { Hotel } from '../src/types/hotel';

const hotels: Hotel[] = [
  {
    slug: 'resort',
    name: 'Ocean Resort',
    nameJa: 'オーシャンリゾート',
    description: 'A resort by the ocean.',
    descriptionJa: '海辺のリゾート。',
    priceCategory: 'luxury',
    propertyType: 'resort',
    location: { area: 'Shigira', areaJa: 'シギラ', beachAccess: true },
    amenities: ['Pool'],
    amenitiesJa: ['プール'],
    tags: ['beach', 'luxury'],
    officialWebsite: 'https://example.com/resort',
  },
  {
    slug: 'inn',
    name: 'Central Inn',
    nameJa: 'セントラルイン',
    description: 'A central city hotel.',
    descriptionJa: '市街地中心部のホテル。',
    priceCategory: 'budget',
    propertyType: 'cityHotel',
    location: { area: 'Hirara', areaJa: '平良', beachAccess: false },
    amenities: ['Wi-Fi'],
    amenitiesJa: ['Wi-Fi'],
    tags: ['budget'],
    officialWebsite: 'https://example.com/inn',
  },
];

describe('hotel filtering', () => {
  test('filters hotels by localized search text', () => {
    const result = filterHotels(hotels, { ...initialFilterState, search: '平良' });

    expect(result.map(({ slug }) => slug)).toEqual(['inn']);
  });

  test('combines price category, beach, and tag filters', () => {
    const result = filterHotels(hotels, {
      ...initialFilterState,
      priceCategory: 'luxury',
      beachOnly: true,
      tags: ['luxury'],
    });

    expect(result.map(({ slug }) => slug)).toEqual(['resort']);
  });
});

test('tag state toggles without mutating the previous value', () => {
  const original = ['beach'] as const;
  const added = toggleHotelTag([...original], 'family');
  const removed = toggleHotelTag(added, 'beach');

  expect(original).toEqual(['beach']);
  expect(added).toEqual(['beach', 'family']);
  expect(removed).toEqual(['family']);
});

test('photo fallback animates only while a configured request is fetching', () => {
  expect(shouldAnimatePhotoFallback({ isConfigured: true, isFetching: true })).toBe(true);
  expect(shouldAnimatePhotoFallback({ isConfigured: true, isFetching: false })).toBe(false);
  expect(shouldAnimatePhotoFallback({ isConfigured: false, isFetching: false })).toBe(false);
  expect(shouldAnimatePhotoFallback({ isConfigured: false, isFetching: true })).toBe(false);
});
