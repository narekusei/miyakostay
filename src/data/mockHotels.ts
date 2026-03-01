// src/data/mockHotels.ts
// src/data/mockHotels.ts
import type { Hotel } from '../types/hotel';

export const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Coral Beach Resort',
    nameJa: 'コーラルビーチリゾート',
    description: 'Stunning ocean views, private beach access, and traditional Okinawan hospitality.',
    descriptionJa: '絶景のオーシャンビュー、プライベートビーチ、伝統的な沖縄のおもてなし。',
    pricePerNight: 18000,
    rating: 4.8,
    reviewCount: 234,
    location: {
      area: 'Yonaha Beach',
      areaJa: '与那覇ビーチ',
      beachAccess: true,
      coordinates: { lat: 24.8, lng: 125.3 }
    },
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bike Rental'],
    amenitiesJa: ['WiFi', 'プール', 'スパ', 'レストラン', 'レンタサイクル'],
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1520257707814-7fb4a163d358?w=800'
    ],
    tags: ['beach', 'luxury', 'couples']
  },
  {
    id: '2',
    name: 'Miyako Budget Inn',
    nameJa: '宮古バジェットイン',
    description: 'Clean, comfortable, and affordable. Perfect for solo travelers and backpackers.',
    descriptionJa: '清潔で快適、お手頃価格。一人旅やバックパッカーに最適。',
    pricePerNight: 5500,
    rating: 4.2,
    reviewCount: 89,
    location: {
      area: 'Hirara City Center',
      areaJa: '平良市中心部',
      beachAccess: false,
      coordinates: { lat: 24.81, lng: 125.28 }
    },
    amenities: ['WiFi', 'Laundry', '24h Reception'],
    amenitiesJa: ['WiFi', '洗濯機', '24時間受付'],
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
    ],
    tags: ['budget', 'family']
  },
  {
    id: '3',
    name: 'Sunset Villa Miyako',
    nameJa: 'サンセットヴィラ宮古',
    description: 'Private villas with infinity pools overlooking the East China Sea.',
    descriptionJa: '東シナ海を望むインフィニティプール付きプライベートヴィラ。',
    pricePerNight: 45000,
    rating: 4.9,
    reviewCount: 156,
    location: {
      area: 'Cape Higashihennazaki',
      areaJa: '東平安名崎',
      beachAccess: true,
      coordinates: { lat: 24.82, lng: 125.4 }
    },
    amenities: ['WiFi', 'Private Pool', 'Kitchen', 'Concierge', 'Airport Transfer'],
    amenitiesJa: ['WiFi', 'プライベートプール', 'キッチン', 'コンシェルジュ', '送迎'],
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
    ],
    tags: ['luxury', 'couples', 'beach']
  }
];