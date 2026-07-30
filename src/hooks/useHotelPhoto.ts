import { useQuery } from '@tanstack/react-query';
import { placePhotoService } from '../services/placePhotoService';

export const useHotelPhoto = (hotelName: string) =>
  useQuery({
    queryKey: ['hotel-photo', hotelName],
    queryFn: () => placePhotoService.findForHotel(hotelName),
    enabled: placePhotoService.isConfigured,
    staleTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });
