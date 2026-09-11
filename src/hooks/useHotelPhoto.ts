import { useQuery } from '@tanstack/react-query';
import { shouldAnimatePhotoFallback } from '../domain/hotelPhotoState';
import { placePhotoService } from '../services/placePhotoService';

export const HOTEL_PHOTO_CACHE_TIME_MS = 24 * 60 * 60 * 1000;

export const useHotelPhoto = (hotelName: string, isNearViewport = true) => {
  const isEnabled = placePhotoService.isConfigured && isNearViewport;
  const query = useQuery({
    queryKey: ['hotel-photo', hotelName],
    queryFn: () => placePhotoService.findForHotel(hotelName),
    enabled: isEnabled,
    staleTime: HOTEL_PHOTO_CACHE_TIME_MS,
    gcTime: HOTEL_PHOTO_CACHE_TIME_MS,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    ...query,
    isFallbackLoading: shouldAnimatePhotoFallback({
      isConfigured: isEnabled,
      isFetching: query.isFetching,
    }),
  };
};
