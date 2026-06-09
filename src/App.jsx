import { ThemeProvider } from './context/ThemeContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { LocationProvider } from './context/LocationContext.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import DetailPage from './pages/DetailPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import Layout from './components/Layout/Layout.jsx'
import SplashPage from './pages/SplashPage.jsx'
import PermissionPage from './pages/PermissionPage.jsx'
import HelpPage from './pages/HelpPage.jsx'
import PrivacyPage from './pages/PrivacyPage.jsx'
import OfflinePage from './pages/OfflinePage.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <LocationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/splash" element={<SplashPage />} />
              <Route path="/permission" element={<PermissionPage />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="attraction/:id" element={<DetailPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="help" element={<HelpPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="offline" element={<OfflinePage />} />
              </Route>
              <Route path="*" element={<Navigate to="/splash" replace />} />
            </Routes>
          </BrowserRouter>
        </LocationProvider>
      </FavoritesProvider>
    </ThemeProvider>
  )
}
