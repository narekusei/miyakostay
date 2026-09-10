import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import App from '../src/App';
import { curatedHotels } from '../src/data/curatedHotels';
import i18n from '../src/i18n/config';
import { hotelService } from '../src/services/hotelService';
import { useFilterStore } from '../src/store/useFilterStore';

const renderApp = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
};

describe('main user journeys', () => {
  beforeEach(async () => {
    window.history.pushState({}, '', '/');
    window.localStorage.clear();
    useFilterStore.getState().resetFilters();
    await i18n.changeLanguage('en');
  });

  test('filters the catalog by search and restores all results', async () => {
    const user = userEvent.setup();
    renderApp();

    expect(await screen.findByText('Showing 12 of 12 hotels')).toBeInTheDocument();

    await user.type(screen.getByRole('textbox', { name: 'Search by hotel or area' }), 'Blue Village');

    expect(screen.getByText('Showing 1 of 12 hotels')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Miyakojima Blue Village Hotel & Sauna' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Hilton Okinawa Miyako Island Resort' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Reset filters' }));

    expect(screen.getByText('Showing 12 of 12 hotels')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Hilton Okinawa Miyako Island Resort' })).toBeInTheDocument();
  });

  test('switches the catalog between English and Japanese', async () => {
    const user = userEvent.setup();
    renderApp();

    expect(await screen.findByText('Discover a stay that fits your trip to Miyakojima')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Japanese' }));

    expect(screen.getByText('宮古島の旅にぴったりの宿を見つけよう')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'ホテル名・エリアで検索' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'ヒルトン沖縄宮古島リゾート' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '日本語' })).toHaveAttribute('aria-pressed', 'true');
  });

  test('opens a hotel detail route and returns to the catalog', async () => {
    const user = userEvent.setup();
    renderApp();

    const hotelHeading = await screen.findByRole('heading', {
      name: 'Hilton Okinawa Miyako Island Resort',
    });
    const hotelCard = hotelHeading.closest('article');
    expect(hotelCard).not.toBeNull();

    await user.click(within(hotelCard!).getByRole('button', { name: 'View details' }));

    expect(await screen.findByRole('heading', {
      level: 1,
      name: 'Hilton Okinawa Miyako Island Resort',
    })).toBeInTheDocument();
    expect(window.location.pathname).toBe('/hotel/hilton-okinawa-miyako-island-resort');
    expect(screen.getByRole('link', { name: 'Visit official website' })).toHaveAttribute(
      'href',
      'https://miyakojima.hiltonjapan.co.jp/',
    );

    await user.click(screen.getByRole('button', { name: 'Back' }));

    expect(await screen.findByText('Showing 12 of 12 hotels')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });

  test('shows a recoverable error when the catalog request fails', async () => {
    const user = userEvent.setup();
    vi.spyOn(hotelService, 'list')
      .mockRejectedValueOnce(new Error('Catalog unavailable'))
      .mockResolvedValueOnce(curatedHotels);
    renderApp();

    expect(await screen.findByText('We could not load the hotel catalog.')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Try again' }));

    expect(await screen.findByText('Showing 12 of 12 hotels')).toBeInTheDocument();
  });

  test('recovers from an unknown hotel URL', async () => {
    const user = userEvent.setup();
    window.history.pushState({}, '', '/hotel/not-a-real-hotel');
    renderApp();

    expect(screen.getByText('Hotel not found')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Back to hotels' }));

    expect(await screen.findByText('Showing 12 of 12 hotels')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/');
  });
});
