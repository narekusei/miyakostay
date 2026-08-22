import { useQuery } from '@tanstack/react-query';
import { shouldAnimatePhotoFallback } from '../domain/hotelPhotoState';
import { placePhotoService } from '../services/placePhotoService';

export const useHotelPhoto = (hotelName: string) => {
  const query = useQuery({
    queryKey: ['hotel-photo', hotelName],
    queryFn: () => placePhotoService.findForHotel(hotelName),
    enabled: placePhotoService.isConfigured,
    staleTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });

  return {
    ...query,
    isFallbackLoading: shouldAnimatePhotoFallback({
      isConfigured: placePhotoService.isConfigured,
      isFetching: query.isFetching,
    }),
  };
};
