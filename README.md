# LankaExplorer 🌴

A boutique travel companion Progressive Web App for exploring Sri Lanka's heritage sites, nature reserves, beaches, and luxury hotels.

🔗 **Live App:** 

---

## 📱 Track

**Track B — Local Tour & Travel Web Guide**

A fully responsive Progressive Web App that helps users discover and explore attractions across Sri Lanka, with real-time geolocation-based distance calculation, live weather data, and offline support.

---

## 🛠️ Framework & Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 (SPA) |
| State Management | React Context API + Hooks |
| Data Persistence | Browser LocalStorage |
| External API | Open Meteo (weather, free, no API key) |
| Geolocation | HTML5 Geolocation API |
| Maps | Google Maps URL deep linking |
| Sharing | Web Share API |
| PWA | vite-plugin-pwa (Service Worker + Web App Manifest) |
| Icons | Lucide React |
| Avatars | DiceBear Avatars API |
| Fonts | Playfair Display (headings) + Inter (body) |
| Code Quality | ESLint + Prettier + Husky + lint-staged |

---

## ✨ Features

### Core Features
- 📍 Responsive attraction grid filtered by category (Historical, Nature, Beaches, Hotels)
- 🔍 Real-time search across attractions
- 📄 Rich media detail view per attraction with photo gallery
- ❤️ Favorites system with LocalStorage persistence
- 🌗 Dark / Light theme toggle (persisted)
- 👤 Editable display name and avatar (DiceBear)

### Advanced Features
- 🛰️ **Geolocation API** — calculates real-time distance from user to each attraction using the Haversine formula
- 🗺️ **Google Maps deep linking** — Get Directions opens native maps app
- 🌤️ **Live weather** per attraction via Open Meteo API
- 📤 **Web Share API** — native share sheet for attractions
- 📡 **Offline support** — Service Worker caches pages and assets; app remains usable without internet
- 📲 **Installable PWA** — Add to Home Screen or Install from browser

---

## 📂 Project Structure

    src/
    ├── components/
    │   ├── Layout/         Navbar, MobileHeader, BottomNav, Footer, Layout
    │   ├── Attractions/    AttractionCard, CategoryFilter
    │   ├── Weather/        WeatherWidget
    │   └── UI/             Loader, OfflineBanner, ScrollToTop
    ├── pages/              SplashPage, HomePage, DetailPage, FavoritesPage, SettingsPage, etc.
    ├── context/            ThemeContext, FavoritesContext, LocationContext
    ├── hooks/              useLocalStorage, useGeolocation, useWeather, useOnlineStatus, useInstallPrompt
    ├── services/           weatherApi.js
    ├── utils/              haversine.js
    ├── data/               attractions.json (30 Sri Lanka locations)
    └── App.jsx

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+ and npm

### Setup

Clone the repository:

    git clone https://github.com/YOUR_USERNAME/lanka-explorer.git
    cd lanka-explorer

Install dependencies:

    npm install

Start development server:

    npm run dev

App runs at http://localhost:5173

### Build for production

    npm run build
    npm run preview

### Lint and format

    npm run lint
    npm run format

---

## 🌐 Browser Compatibility

Tested and verified on:
- ✅ Google Chrome (latest) — full PWA support including install prompt
- ✅ Mozilla Firefox (latest) — core features work, manual install via browser menu
- ✅ Safari (latest) — core features work, install via Share then Add to Home Screen

**Mobile simulation tested on:**
- iPhone 12 Pro (390x844)
- Pixel 5 (393x851)
- Samsung Galaxy S20 (412x915)

**Desktop tested at:** 1024px, 1280px, 1920px viewports

---

## 📡 PWA and Offline Behavior

LankaExplorer is a fully installable Progressive Web App:

- **Service Worker** via vite-plugin-pwa precaches all static assets and uses cache-first strategy for app shell, network-first for weather API calls
- **Offline Banner** appears automatically when connection is lost
- Previously visited pages remain accessible offline
- **Install** via the browser address bar icon, browser menu, or the in-app Install Now button in Settings

Note: PWA installability is best tested on the deployed HTTPS URL rather than localhost, as Chrome's installability heuristics are unreliable during active local development.

---

## 🔑 Key Design Decisions

- **No backend or authentication** — All user preferences including display name, avatar, favorites, and theme are stored in the browser's LocalStorage, satisfying the data persistence requirement without unnecessary complexity.
- **Mock attraction data** — 30 real Sri Lankan locations with accurate coordinates, stored as local JSON, combined with a live external API (Open Meteo) to satisfy the asynchronous REST API requirement.
- **Single font family across themes** — Playfair Display and Inter used consistently in both light and dark mode; only the color palette changes via CSS custom properties.

