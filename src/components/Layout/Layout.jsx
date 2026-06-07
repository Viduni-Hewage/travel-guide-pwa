import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import MobileHeader from './MobileHeader.jsx'
import BottomNav from './BottomNav.jsx'
import Footer from './Footer.jsx'

function Layout() {
  const { pathname } = useLocation()
  const hideHeader = pathname.startsWith('/attraction')

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Desktop nav */}
      <Navbar />

      {/* Mobile top header */}
      {!hideHeader && <MobileHeader />}

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
