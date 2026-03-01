// src/components/layout/Header.tsx
import { LanguageToggle } from '../ui/LanguageToggle';

export const Header = () => {
  return (
    <header className="glass sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ocean-600">
          🏝️ MiyakoStay
        </h1>
        <LanguageToggle />
      </div>
    </header>
  );
};