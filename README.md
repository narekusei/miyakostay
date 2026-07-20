# MiyakoStay

A bilingual hotel discovery experience focused exclusively on **Miyakojima, Japan**.

[![Live demo](https://img.shields.io/badge/Live_demo-Open-0284c7?style=flat-square)](https://miyakostay.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

## About the project

MiyakoStay helps travelers compare hotels, resorts, villas, and guesthouses on Miyakojima. Visitors can search by hotel or area, narrow the results by price, rating, beach access, and travel style, then explore a dedicated hotel page in English or Japanese.

The product idea comes from my hospitality experience on Miyakojima. Travelers regularly need clear, locally relevant accommodation information, so I built a focused discovery guide instead of another worldwide booking clone.

MiyakoStay is currently a frontend portfolio project. The accommodation data is demonstrative and the application does not process reservations or payments.

## Features

- Hotel and area search
- Price and rating filters
- Beach-access and travel-style filters
- English and Japanese localization
- Responsive hotel cards and detail pages
- Type-safe shared state with Zustand
- Accessible controls and keyboard focus states

## Technology

| Area | Tools |
| --- | --- |
| UI | React 19, TypeScript 5 |
| Build | Vite 7 |
| Styling | Tailwind CSS 3, Framer Motion |
| Routing | React Router 7 |
| State | Zustand 5 |
| Localization | i18next, react-i18next |
| Quality | ESLint, TypeScript |
| Hosting | Vercel |

## Architecture

```text
src/
├── components/   Reusable layout, hotel, and UI components
├── data/         Demonstration accommodation data
├── hooks/        Hotel filtering and application hooks
├── i18n/         English and Japanese resources
├── pages/        Route-level screens
├── store/        Zustand filter state
├── types/        Shared domain types
└── utils/        Formatting helpers
```

The filtering rules live outside the UI so they can be tested independently. Hotel tags are represented by one shared TypeScript union, keeping the data, filters, and interface in sync.

## Run locally

Requirements: Node.js 20.19+ or 22.12+.

```bash
git clone https://github.com/narekusei/miyakostay.git
cd miyakostay
npm ci
npm run dev
```

Quality checks:

```bash
npm run build
npm run lint
```

## Product direction

The next phase is a curated Miyakojima accommodation data layer. The goal is to add more real properties and reliable local information while keeping the project focused on discovery—not pretending to offer live prices or bookings without an authorized provider.

Planned work includes:

- A documented, normalized hotel data source
- Loading, empty, and error states
- Nearby beaches and airport-distance information
- Persistent favorites
- URL-based filters
- Automated component and integration tests

## What this project demonstrates

- Translating real hospitality experience into a focused product concept
- Building reusable, responsive React interfaces
- Modeling domain data and state with TypeScript
- Designing bilingual user experiences
- Separating filtering logic from presentation components

## Author

Built by [narekusei](https://github.com/narekusei), a frontend developer based in Japan with professional hospitality experience.

Open to frontend opportunities in Japan and remote roles.
