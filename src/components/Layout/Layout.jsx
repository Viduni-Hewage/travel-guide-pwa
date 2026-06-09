import { useOnlineStatus } from '../../hooks/useOnlineStatus.js'
import { useNavigate, useLocation as useRouterLocation, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import OfflineBanner from '../UI/OfflineBanner.jsx'
import Navbar from './Navbar.jsx'
import MobileHeader from './MobileHeader.jsx'
import BottomNav from './BottomNav.jsx'
import Footer from './Footer.jsx'

function Layout() {
  const isOnline = useOnlineStatus()
  const navigate = useNavigate()
  const routerLocation = useRouterLocation()
  const hideHeader = routerLocation.pathname.startsWith('/attraction')

  useEffect(() => {
    if (!isOnline && routerLocation.pathname !== '/offline') {
      navigate('/offline')
    }
    if (isOnline && routerLocation.pathname === '/offline') {
      navigate('/')
    }
  }, [isOnline, navigate, routerLocation.pathname])

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Offline banner */}
      <OfflineBanner />

      {/* Desktop nav */}
      <Navbar isOffline={!isOnline} />

      {/* Mobile top header */}
      {/*{!hideHeader && <MobileHeader />}*/}
      {!hideHeader && <MobileHeader isOffline={!isOnline} />}

      {/* Page content */}
      <main className={`${hideHeader ? 'pt-0' : 'pt-14!'} pb-20 md:pb-0`}>
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
