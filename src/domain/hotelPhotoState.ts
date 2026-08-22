interface HotelPhotoFallbackState {
  isConfigured: boolean;
  isFetching: boolean;
}

export const shouldAnimatePhotoFallback = ({
  isConfigured,
  isFetching,
}: HotelPhotoFallbackState) => isConfigured && isFetching;
