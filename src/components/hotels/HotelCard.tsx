// src/components/hotels/HotelCard.tsx
import { useTranslation } from 'react-i18next';
import type { Hotel } from '../../types/hotel';
import { Button } from '../ui/Button';
import { Building2, MapPin, Waves } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
  onViewDetails: (slug: string) => void;
}

export const HotelCard = ({ hotel, onViewDetails }: HotelCardProps) => {
  const { t, i18n } = useTranslation();
  const isJa = i18n.resolvedLanguage === 'ja';

  const heroStyles: Record<Hotel['propertyType'], string> = {
    cityHotel: 'from-slate-700 via-ocean-600 to-sky-300',
    resort: 'from-ocean-900 via-ocean-500 to-cyan-200',
    villa: 'from-emerald-900 via-teal-600 to-sand-200',
    containerHotel: 'from-indigo-900 via-violet-600 to-amber-200',
  };

  return (
    <article className="glass rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className={`relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br ${heroStyles[hotel.propertyType]}`}>
        <Building2 className="h-16 w-16 text-white/80" aria-hidden="true" />
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
          <div className="rounded-full bg-sand-100 px-2 py-1 text-xs font-medium text-ocean-800">
            {t(`priceCategories.${hotel.priceCategory}`)}
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
              {isJa ? hotel.amenitiesJa[idx] : amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="text-xs text-gray-500">+{hotel.amenities.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{t(`propertyTypes.${hotel.propertyType}`)}</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetails(hotel.slug)}
          >
            {t('hotel.viewDetails')}
          </Button>
        </div>
      </div>
    </article>
  );
};
