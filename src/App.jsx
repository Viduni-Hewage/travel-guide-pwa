import { ThemeProvider } from './context/ThemeContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { LocationProvider } from './context/LocationContext.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import DetailPage from './pages/DetailPage.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import Layout from './components/Layout/Layout.jsx'
import PermissionPage from './pages/PermissionPage.tsx'
import SplashPage from './pages/SplashPage.tsx'

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
              </Route>
              <Route path="*" element={<Navigate to="/splash" replace />} />
            </Routes>
          </BrowserRouter>
        </LocationProvider>
      </FavoritesProvider>
    </ThemeProvider>
  )
}
