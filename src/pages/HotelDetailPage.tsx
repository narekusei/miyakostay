// src/pages/HotelDetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mockHotels } from '../data/mockHotels';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Star, MapPin, Wifi, Waves, Utensils } from 'lucide-react';
import type { JSX } from 'react';

export const HotelDetailPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isJa = i18n.resolvedLanguage === 'ja';

  const hotel = mockHotels.find(h => h.id === id);

  if (!hotel) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">{t('hotel.notFound')}</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          {t('hotel.backToHotels')}
        </Button>
      </div>
    );
  }

  const amenityIcons: Record<string, JSX.Element> = {
    'WiFi': <Wifi className="w-5 h-5" />,
    'Pool': <Waves className="w-5 h-5" />,
    'Restaurant': <Utensils className="w-5 h-5" />,
    'Spa': <Waves className="w-5 h-5" />,
    'Bike Rental': <MapPin className="w-5 h-5" />,
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> {t('hotel.back')}
      </Button>

      {/* Image Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {hotel.images.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={`${hotel.name} ${idx + 1}`}
            className="w-full h-32 md:h-40 object-cover rounded-lg"
          />
        ))}
      </div>

      {/* Info */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-ocean-900 mb-1">
              {isJa ? hotel.nameJa : hotel.name}
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{isJa ? hotel.location.areaJa : hotel.location.area}</span>
              {hotel.location.beachAccess && (
                <span className="flex items-center gap-1 text-ocean-600 text-sm">
                  <Waves className="w-4 h-4" aria-hidden="true" /> {t('hotel.beachAccess')}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-amber-500 mb-1">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-bold text-lg">{hotel.rating}</span>
              <span className="text-gray-500">({hotel.reviewCount} {t('hotel.reviews')})</span>
            </div>
            <div className="text-3xl font-bold text-ocean-600">
              ¥{hotel.pricePerNight.toLocaleString()}
              <span className="text-lg font-normal text-gray-500 ml-1">/{t('hotel.perNight')}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed">
          {isJa ? hotel.descriptionJa : hotel.description}
        </p>

        {/* Amenities */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">{t('hotel.amenities')}</h3>
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.map((amenity, idx) => (
              <span 
                key={idx}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg"
              >
                {amenityIcons[amenity] || <Wifi className="w-4 h-4" />}
                {isJa ? hotel.amenitiesJa[idx] : amenity}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Button size="lg" className="w-full md:w-auto">
          {t('hotel.checkAvailability')}
        </Button>
        <p className="text-gray-500 text-sm mt-2">
          {t('hotel.demoNotice')}
        </p>
      </div>
    </main>
  );
};
