// src/components/ui/LanguageToggle.tsx
import { useTranslation } from 'react-i18next';

export const LanguageToggle = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1" role="group" aria-label={t('language.label')}>
      <button
        type="button"
        onClick={() => i18n.changeLanguage('en')}
        aria-pressed={i18n.resolvedLanguage === 'en'}
        aria-label={t('language.english')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          i18n.resolvedLanguage === 'en'
            ? 'bg-white text-ocean-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => i18n.changeLanguage('ja')}
        aria-pressed={i18n.resolvedLanguage === 'ja'}
        aria-label={t('language.japanese')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          i18n.resolvedLanguage === 'ja'
            ? 'bg-white text-ocean-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        日本語
      </button>
    </div>
  );
};
