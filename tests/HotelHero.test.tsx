import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { HotelHero } from '../src/components/hotels/HotelHero';
import { curatedHotels } from '../src/data/curatedHotels';
import { placePhotoService } from '../src/services/placePhotoService';

let intersectionCallback!: IntersectionObserverCallback;
const originalIsConfigured = placePhotoService.isConfigured;

const renderHero = (queryClient: QueryClient) =>
  render(
    <QueryClientProvider client={queryClient}>
      <HotelHero hotel={curatedHotels[0]!} />
    </QueryClientProvider>,
  );

describe('HotelHero photo loading', () => {
  beforeEach(() => {
    placePhotoService.isConfigured = true;
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(callback: IntersectionObserverCallback) {
          intersectionCallback = callback;
        }

        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() { return []; }
        readonly root = null;
        readonly rootMargin = '300px';
        readonly thresholds = [0];
      },
    );
  });

  afterEach(() => {
    placePhotoService.isConfigured = originalIsConfigured;
    vi.unstubAllGlobals();
  });

  test('loads near the viewport and reuses the 24-hour query cache', async () => {
    const findPhoto = vi.spyOn(placePhotoService, 'findForHotel').mockResolvedValue({
      url: 'https://example.com/hotel.jpg',
      googleMapsUrl: 'https://maps.example.com/hotel',
      authors: [],
    });
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const firstRender = renderHero(queryClient);

    expect(findPhoto).not.toHaveBeenCalled();

    act(() => {
      intersectionCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(await screen.findByRole('img', { name: curatedHotels[0]!.name })).toHaveAttribute(
      'src',
      'https://example.com/hotel.jpg',
    );
    expect(findPhoto).toHaveBeenCalledOnce();
    firstRender.unmount();
    renderHero(queryClient);

    expect(await screen.findByRole('img', { name: curatedHotels[0]!.name })).toBeInTheDocument();
    expect(findPhoto).toHaveBeenCalledOnce();
  });
});
