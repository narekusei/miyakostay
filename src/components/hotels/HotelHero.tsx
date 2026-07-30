import { Building2 } from 'lucide-react';
import { useHotelPhoto } from '../../hooks/useHotelPhoto';
import type { Hotel } from '../../types/hotel';

interface HotelHeroProps {
  hotel: Hotel;
  className?: string;
}

const heroStyles: Record<Hotel['propertyType'], string> = {
  cityHotel: 'from-slate-700 via-ocean-600 to-sky-300',
  resort: 'from-ocean-900 via-ocean-500 to-cyan-200',
  villa: 'from-emerald-900 via-teal-600 to-sand-200',
  containerHotel: 'from-indigo-900 via-violet-600 to-amber-200',
};

export const HotelHero = ({ hotel, className = 'h-48' }: HotelHeroProps) => {
  const {
  data: photo,
  isPending,
  isError,
  error,
} = useHotelPhoto(hotel.name);

if (isError) {
  console.error(
    `Failed to load photo for ${hotel.name}:`,
    error,
  );
}

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${heroStyles[hotel.propertyType]} ${className}`}
    >
      {photo ? (
        <>
          <img
            src={photo.url}
            alt={hotel.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/65 px-3 py-1.5 text-xs text-white">
            {photo.authors.length > 0 && (
              <span>
                Photo by{' '}
                {photo.authors.map((author, index) => (
                  <span key={`${author.name}-${index}`}>
                    {index > 0 && ', '}
                    {author.url ? (
                      <a href={author.url} target="_blank" rel="noreferrer" className="underline">
                        {author.name}
                      </a>
                    ) : (
                      author.name
                    )}
                  </span>
                ))}
                {' · '}
              </span>
            )}
            {photo.googleMapsUrl ? (
              <a href={photo.googleMapsUrl} target="_blank" rel="noreferrer" className="underline">
                View on Google Maps
              </a>
            ) : (
              <span>Google Maps</span>
            )}
          </div>
        </>
      ) : (
        <Building2
          className={`text-white/80 ${isPending ? 'animate-pulse' : ''} h-16 w-16`}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
