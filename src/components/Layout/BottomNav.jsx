import { NavLink, useNavigate } from 'react-router-dom'
import { Compass, Search, Heart, Settings } from 'lucide-react'

const navItems = [
  { label: 'Explore', to: '/', icon: Compass },
  { label: 'Search', to: '/', icon: Search, focusSearch: true },
  { label: 'Saved', to: '/favorites', icon: Heart },
  { label: 'Settings', to: '/settings', icon: Settings },
]

function BottomNav() {
  const navigate = useNavigate()

  const handleClick = (item) => {
    if (item.focusSearch) {
      navigate('/')
      setTimeout(() => {
        document.getElementById('search-input')?.focus()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 h-16 border-t"
      style={{
        backgroundColor: 'var(--footer-bg)',
        borderColor: 'var(--color-border)',
      }}
    >
      {navItems.map((item) =>
        item.focusSearch ? (
          <button key={item.label} onClick={() => handleClick(item)} className="flex-1 min-h-0 min-w-0">
            <div className="flex flex-col items-center gap-1 rounded-2xl px-3 py-2.5 transition-all mx-3">
              <item.icon className="w-5 h-5" style={{ color: 'var(--color-text-muted)' }} />
              <span
                className="text-xs"
                style={{
                  color: 'var(--color-text-muted)',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {item.label}
              </span>
            </div>
          </button>
        ) : (
          <NavLink key={item.label} to={item.to} end={item.to === '/'} className="flex-1 min-h-0 min-w-0">
            {({ isActive }) => (
              <div
                className="flex flex-col items-center gap-1 rounded-2xl px-3 py-2.5 transition-all mx-3"
                style={{
                  backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                }}
              >
                <item.icon className="w-5 h-5" style={{ color: isActive ? '#95D3BA' : 'var(--color-text-muted)' }} />
                <span
                  className="text-xs"
                  style={{
                    color: isActive ? '#95D3BA' : 'var(--color-text-muted)',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {item.label}
                </span>
              </div>
            )}
          </NavLink>
        )
      )}
    </nav>
  )
}

export default BottomNav
