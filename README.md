# LankaExplorer 🌴

A boutique travel companion Progressive Web App for exploring Sri Lanka's heritage sites, nature reserves, beaches, and luxury hotels.

🔗 **Live App:** [https://lankaexplorer.vercel.app/](https://lankaexplorer.vercel.app/)

---

## 📱 Track

**Track B — Local Tour & Travel Web Guide**

A fully responsive Progressive Web App that helps users discover and explore attractions across Sri Lanka, with real-time geolocation-based distance calculation, live weather data, and offline support.

---

## 🛠️ Framework & Tech Stack

| Layer | Technology                                          |
|-------|-----------------------------------------------------|
| Framework | React 19 + Vite 8                                   |
| Styling | Tailwind CSS v4                                     |
| Routing | React Router v7 (SPA)                               |
| State Management | React Context API + Hooks                           |
| Data Persistence | Browser LocalStorage                                |
| Weather API | Open-Meteo (weather, no API key) |
| Reverse Geocoding | BigDataCloud (city/locality lookup) |
| Geolocation | HTML5 Geolocation API                               |
| Maps | Google Maps URL deep linking                        |
| Sharing | Web Share API + Clipboard API fallback |
| PWA | vite-plugin-pwa (Service Worker + Web App Manifest) |
| Icons | Lucide React                                        |
| Avatars | DiceBear Avatars API                                |
| Fonts | Playfair Display (headings) + Inter (body)          |
| Code Quality | ESLint + Prettier + Husky + lint-staged             |

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
- 📤 **Web Share API** — opens the native share sheet when supported, with clipboard link fallback
- 🔔 **Browser notifications** — optional notifications when attractions are added to or removed from Favorites
- 📡 **Offline support** — Service Worker caches application assets and selected external resources for offline use
- 📲 **Installable PWA** — supports browser installation through the address bar/menu or the in-app Install Now control, with installed-state detection
- 🌍 **Reverse geocoding** — converts permitted user coordinates into an approximate city or locality name using BigDataCloud

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── Layout/
│   │   ├── Navbar.jsx
│   │   ├── MobileHeader.jsx
│   │   ├── BottomNav.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── UI/
│   │   ├── Loader.jsx
│   │   └── OfflineBanner.jsx
│   └── ScrollToTop.jsx
│
├── pages/
│   ├── SplashPage.jsx
│   ├── PermissionPage.jsx
│   ├── HomePage.jsx
│   ├── DetailPage.jsx
│   ├── FavoritesPage.jsx
│   ├── SettingsPage.jsx
│   ├── HelpPage.jsx
│   └── PrivacyPage.jsx
│
├── context/
│   ├── ThemeContext.jsx
│   ├── FavoritesContext.jsx
│   └── LocationContext.jsx
│
├── hooks/
│   ├── useLocalStorage.js
│   ├── useGeolocation.js
│   ├── useWeather.js
│   ├── useOnlineStatus.js
│   └── useInstallPrompt.js
│
├── services/
│   ├── weatherApi.js
│   └── reverseGeocodeApi.js
│
├── utils/
│   ├── haversine.js
│   └── notifications.js
│
├── data/
│   └── attractions.json
│
├── App.jsx
└── main.jsx
```
---

## 🚀 Running Locally

### Prerequisites
- Node.js 22+ recommended
- npm

### Setup

Clone the repository:

    git clone https://github.com/Viduni-Hewage/travel-guide-pwa.git
    cd travel-guide-pwa

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

### Verified
- ✅ **Google Chrome (latest)** — core features, geolocation, notifications, sharing, offline behavior, and PWA installation tested successfully

### Expected Support
- **Safari** — core application features are designed to work with standard browser APIs; PWA installation behavior may differ from Chrome
- **Firefox** — core browsing, search, favorites, theme, and weather features are designed to work where the required browser APIs are supported

### Responsive Testing
The interface has been tested across representative mobile and desktop viewport sizes, including:

- Mobile: 390px, 393px, and 412px widths
- Desktop: 1024px, 1280px, and 1920px widths

---

## 📡 PWA and Offline Behavior

LankaExplorer is a fully installable Progressive Web App:

- **Static assets** are precached by Workbox for offline access
- **Google Fonts, Unsplash images, and Cloudinary-hosted attraction images** use runtime caching for improved repeat loading and offline availability
- **Open Meteo weather requests** use a NetworkFirst strategy with cached responses
- **Offline Banner** appears automatically when the connection is lost
- Core attraction information remains available offline because the attraction dataset is bundled locally with the app
- **Install** is available through the browser address bar/menu or the in-app **Install Now** control in Settings
- After installation, the Settings page detects the installed state and displays **Already Installed**

Some features still require connectivity, including fresh weather data, reverse-geocoding location names, and opening external Google Maps links.

> Note: PWA installation is best tested on the deployed HTTPS version of the app. Local development behavior may differ from production.

---

## 🔑 Key Design Decisions

- **Client-side persistence** — The app does not require user accounts or a backend. Display name, avatar, favorites, theme, notification preference, and PWA-related state are stored locally in the browser using LocalStorage.

- **Local attraction dataset** — 30 curated Sri Lankan destinations are stored in local JSON with coordinates, descriptions, categories, and travel-related metadata. Open-Meteo supplements the local dataset with current weather information, while BigDataCloud is used to resolve permitted user coordinates into an approximate city or locality name.

- **Lightweight map integration** — Google Maps is opened through destination deep links rather than an embedded Maps SDK, keeping the application simpler and avoiding additional API-key requirements.

- **Offline-first PWA approach** — Core application assets and local attraction data are available through the service worker cache, while selected external resources use runtime caching strategies.

- **Consistent visual system** — Playfair Display is used for headings and Inter for body text across both light and dark themes, while CSS custom properties control theme colors.

