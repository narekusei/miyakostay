// src/pages/HomePage.tsx
import { useTranslation } from 'react-i18next';
import { useFilteredHotels } from '../hooks/useFilteredHotels';
import { FilterBar } from '../components/hotels/FilterBar';
import { HotelCard } from '../components/hotels/HotelCard';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {
  const { t } = useTranslation();
  const { hotels, total } = useFilteredHotels();
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero */}
      <section className="text-center mb-8">
        <h2 className="text-3xl font-bold text-ocean-900 mb-2">
          {t('app.title')}
        </h2>
        <p className="text-gray-600">{t('app.subtitle')}</p>
        <p className="mt-3 text-xs text-gray-500">
          {t('hotel.sampleDataNotice')}
        </p>
      </section>

      <FilterBar />

      {/* Results */}
      <p className="mb-4 text-sm text-gray-600" aria-live="polite">
        {t('hotel.resultsCount', { count: hotels.length, total })}
      </p>
      {hotels.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">{t('common.noResults')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map(hotel => (
            <HotelCard 
              key={hotel.id} 
              hotel={hotel} 
              onViewDetails={(id) => navigate(`/hotel/${id}`)}
            />
          ))}
        </div>
      )}
    </main>
  );
};
