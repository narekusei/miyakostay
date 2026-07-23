// src/components/hotels/FilterBar.tsx
import { useTranslation } from 'react-i18next';
import { useFilterStore } from '../../store/useFilterStore';
import { Button } from '../ui/Button';
import { Search, X } from 'lucide-react';
import { HOTEL_TAGS, PRICE_CATEGORIES } from '../../types/hotel';
import type { PriceCategory } from '../../types/hotel';

export const FilterBar = () => {
  const { t } = useTranslation();
  const filters = useFilterStore();
  const { setSearch, setPriceCategory, toggleBeachOnly, toggleTag, resetFilters } = filters;

  return (
    <div className="glass rounded-2xl p-4 mb-6 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          aria-label={t('filters.search')}
          placeholder={t('filters.search')}
          value={filters.search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="price-category" className="block text-sm font-medium text-gray-700 mb-1">
          {t('filters.priceCategory')}
        </label>
        <select
          id="price-category"
          value={filters.priceCategory}
          onChange={(event) => setPriceCategory(event.target.value as PriceCategory | 'all')}
          className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-ocean-500"
        >
          <option value="all">{t('priceCategories.all')}</option>
          {PRICE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {t(`priceCategories.${category}`)}
            </option>
          ))}
        </select>
      </div>

      {/* Beach toggle */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={filters.beachOnly}
          onChange={toggleBeachOnly}
          className="w-4 h-4 text-ocean-500 rounded focus:ring-ocean-500"
        />
        <span className="text-sm text-gray-700">{t('filters.beachOnly')}</span>
      </label>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('filters.tags')}
        </label>
        <div className="flex flex-wrap gap-2">
          {HOTEL_TAGS.map(tag => (
            <button
              type="button"
              key={tag}
              onClick={() => toggleTag(tag)}
              aria-pressed={filters.tags.includes(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filters.tags.includes(tag)
                  ? 'bg-ocean-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t(`tags.${tag}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <Button 
        variant="outline" 
        size="sm" 
        onClick={resetFilters}
        className="w-full flex items-center justify-center gap-2"
      >
        <X className="w-4 h-4" aria-hidden="true" /> {t('filters.reset')}
      </Button>
    </div>
  );
};
