import { useOnlineStatus } from '../../hooks/useOnlineStatus.js'
import { useLocation as useRouterLocation, Outlet } from 'react-router-dom'
import OfflineBanner from '../UI/OfflineBanner.jsx'
import Navbar from './Navbar.jsx'
import MobileHeader from './MobileHeader.jsx'
import BottomNav from './BottomNav.jsx'
import Footer from './Footer.jsx'

function Layout() {
  const isOnline = useOnlineStatus()
  const routerLocation = useRouterLocation()
  const hideHeader = routerLocation.pathname.startsWith('/attraction')

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Offline banner */}
      <OfflineBanner />

      {/* Desktop nav */}
      <Navbar isOffline={!isOnline} />

      {/* Mobile top header */}
      {!hideHeader && <MobileHeader isOffline={!isOnline} />}

      {/* Page content */}
      <main className={`${hideHeader ? 'pt-0' : 'pt-14!'} pb-20 md:pb-0 ${!isOnline ? 'mt-8' : ''}`}>
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <BottomNav />

      {/* Desktop footer */}
      <Footer />
    </div>
  )
}

export default Layout
