// src/pages/HotelDetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { curatedHotels } from '../data/curatedHotels';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Building2, ExternalLink, MapPin, Waves } from 'lucide-react';
import type { Hotel } from '../types/hotel';

export const HotelDetailPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isJa = i18n.resolvedLanguage === 'ja';

  const hotel = curatedHotels.find((hotel) => hotel.slug === id);

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

  const heroStyles: Record<Hotel['propertyType'], string> = {
    cityHotel: 'from-slate-700 via-ocean-600 to-sky-300',
    resort: 'from-ocean-900 via-ocean-500 to-cyan-200',
    villa: 'from-emerald-900 via-teal-600 to-sand-200',
    containerHotel: 'from-indigo-900 via-violet-600 to-amber-200',
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

      <div className={`mb-6 flex h-64 items-center justify-center rounded-2xl bg-gradient-to-br ${heroStyles[hotel.propertyType]}`}>
        <Building2 className="h-24 w-24 text-white/80" aria-hidden="true" />
      </div>

      {/* Info */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-ocean-900 mb-1">
              {isJa ? hotel.nameJa : hotel.name}
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>{isJa ? hotel.location.areaJa : hotel.location.area}</span>
              {hotel.location.beachAccess && (
                <span className="flex items-center gap-1 text-ocean-600 text-sm">
                  <Waves className="w-4 h-4" aria-hidden="true" /> {t('hotel.beachAccess')}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-ocean-700">{t(`priceCategories.${hotel.priceCategory}`)}</p>
            <p className="text-sm text-gray-500">{t(`propertyTypes.${hotel.propertyType}`)}</p>
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
                {isJa ? hotel.amenitiesJa[idx] : amenity}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href={hotel.officialWebsite}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ocean-500 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:ring-offset-2 md:w-auto"
        >
          {t('hotel.officialWebsite')}
          <ExternalLink className="h-5 w-5" aria-hidden="true" />
        </a>
        <p className="text-gray-500 text-sm mt-2">
          {t('hotel.demoNotice')}
        </p>
      </div>
    </main>
  );
};
