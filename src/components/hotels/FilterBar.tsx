// src/components/hotels/FilterBar.tsx
import { useTranslation } from 'react-i18next';
import { useFilterStore } from '../../store/useFilterStore';
import { Button } from '../ui/Button';
import { Search, Filter, X } from 'lucide-react';

export const FilterBar = () => {
  const { t } = useTranslation();
  const filters = useFilterStore();
  const { setSearch, setMaxPrice, setMinRating, toggleBeachOnly, toggleTag, resetFilters } = useFilterStore();

  const tags = ['beach', 'luxury', 'budget', 'family', 'couples'];

  return (
    <div className="glass rounded-2xl p-4 mb-6 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={t('filters.search')}
          value={filters.search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-500 focus:border-transparent"
        />
      </div>

      {/* Price + Rating */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('filters.maxPrice')}: ¥{filters.maxPrice.toLocaleString()}
          </label>
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={filters.maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-ocean-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('filters.minRating')}: {filters.minRating}★
          </label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
        </div>
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
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filters.tags.includes(tag)
                  ? 'bg-ocean-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
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
        <X className="w-4 h-4" /> Reset Filters
      </Button>
    </div>
  );
};