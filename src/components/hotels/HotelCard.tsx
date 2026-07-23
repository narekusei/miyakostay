// src/components/hotels/HotelCard.tsx
import { useTranslation } from 'react-i18next';
import type { Hotel } from '../../types/hotel';
import { Button } from '../ui/Button';
import { Star, MapPin, Wifi, Utensils, Waves } from 'lucide-react';
import type { JSX } from 'react';

interface HotelCardProps {
  hotel: Hotel;
  onViewDetails: (id: string) => void;
}

export const HotelCard = ({ hotel, onViewDetails }: HotelCardProps) => {
  const { t, i18n } = useTranslation();
  const isJa = i18n.resolvedLanguage === 'ja';

  const amenityIcons: Record<string, JSX.Element> = {
    'WiFi': <Wifi className="w-4 h-4" aria-hidden="true" />,
    'Pool': <Waves className="w-4 h-4" aria-hidden="true" />,
    'Restaurant': <Utensils className="w-4 h-4" aria-hidden="true" />,
  };

  return (
    <article className="glass rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={hotel.images[0]} 
          alt={isJa ? hotel.nameJa : hotel.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {hotel.location.beachAccess && (
          <span className="absolute top-3 right-3 bg-ocean-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Waves className="w-3 h-3" aria-hidden="true" /> {t('hotel.beachAccess')}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-ocean-900">
            {isJa ? hotel.nameJa : hotel.name}
          </h3>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" aria-hidden="true" />
            <span className="font-medium text-sm">{hotel.rating}</span>
            <span className="text-gray-500 text-xs">({hotel.reviewCount})</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {isJa ? hotel.descriptionJa : hotel.description}
        </p>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4" aria-hidden="true" />
          <span>{isJa ? hotel.location.areaJa : hotel.location.area}</span>
        </div>

        {/* Amenities preview */}
        <div className="flex flex-wrap gap-1 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity, idx) => (
            <span 
              key={idx}
              className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {amenityIcons[amenity] || null}
              {isJa ? hotel.amenitiesJa[idx] : amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="text-xs text-gray-500">+{hotel.amenities.length - 3}</span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-ocean-600">
              ¥{hotel.pricePerNight.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm ml-1">{t('hotel.perNight')}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetails(hotel.id)}
          >
            {t('hotel.viewDetails')}
          </Button>
        </div>
      </div>
    </article>
  );
};
