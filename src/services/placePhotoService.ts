import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { createRequestLimiter } from './requestLimiter';

export interface PlacePhoto {
  url: string;
  googleMapsUrl: string | null;
  authors: Array<{
    name: string;
    url: string | null;
  }>;
}

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();
const placesRequestLimiter = createRequestLimiter(3);

if (apiKey) {
  setOptions({
    key: apiKey,
    v: 'weekly',
    language: 'en',
    region: 'JP',
    authReferrerPolicy: 'origin',
  });
}

export const placePhotoService = {
  isConfigured: Boolean(apiKey),

  async findForHotel(hotelName: string): Promise<PlacePhoto | null> {
    if (!apiKey) return null;

    return placesRequestLimiter.schedule(async () => {
      const { Place } = await importLibrary('places');
      const { places } = await Place.searchByText({
        textQuery: `${hotelName}, Miyakojima, Okinawa, Japan`,
        fields: ['displayName', 'photos'],
        includedType: 'lodging',
        maxResultCount: 1,
        region: 'jp',
        language: 'en',
      });

      const photo = places[0]?.photos?.[0];
      if (!photo) return null;

      return {
        url: photo.getURI({ maxWidth: 1200, maxHeight: 800 }),
        googleMapsUrl: photo.googleMapsURI,
        authors: photo.authorAttributions.map((author: google.maps.places.AuthorAttribution) => ({
          name: author.displayName,
          url: author.uri,
        })),
      };
    });
  },
};
