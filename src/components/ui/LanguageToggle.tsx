// src/components/ui/LanguageToggle.tsx
import { useTranslation } from 'react-i18next';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => i18n.changeLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          i18n.language === 'en' 
            ? 'bg-white text-ocean-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => i18n.changeLanguage('ja')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          i18n.language === 'ja' 
            ? 'bg-white text-ocean-600 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        日本語
      </button>
    </div>
  );
};