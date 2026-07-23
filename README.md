# MiyakoStay

A bilingual hotel discovery experience focused exclusively on **Miyakojima, Japan**.

[![Live demo](https://img.shields.io/badge/Live_demo-Open-0284c7?style=flat-square)](https://miyakostay.vercel.app)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

## About the project

MiyakoStay helps travelers compare a curated selection of hotels, resorts, and villas across Miyakojima and its bridge-connected islands. Visitors can search by hotel or area, narrow the results by indicative price category, beach access, and travel style, then continue to each property's official website.

The product idea comes from my hospitality experience on Miyakojima. Travelers regularly need clear, locally relevant accommodation information, so I built a focused discovery guide instead of another worldwide booking clone.

MiyakoStay is currently a frontend portfolio project. Property names, locations, facilities, and links are curated from official hotel websites. Price categories are indicative, and the application does not process reservations or payments.

## Features

- Hotel and area search
- Indicative price-category filter
- Official hotel links and human-readable detail URLs
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
├── data/         Curated accommodation catalog
├── hooks/        Hotel filtering and application hooks
├── i18n/         English and Japanese resources
├── pages/        Route-level screens
├── store/        Zustand filter state
├── types/        Shared domain types
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

## Data policy

MiyakoStay links directly to official property websites and intentionally avoids presenting live rates, availability, or third-party review scores. The interface uses original visual placeholders instead of copying hotel photography. Property information should be rechecked periodically because facilities and services can change.

The catalog references official websites from Hilton, Tokyu Hotels, Shigira Seven Miles Resort, UDS Hotels, Iraph SUI, Seawood Hotel, Hotel Atollemerald, Tabino Hotel, and Miyakojima Blue Village.

## Product direction

Planned work includes:

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
