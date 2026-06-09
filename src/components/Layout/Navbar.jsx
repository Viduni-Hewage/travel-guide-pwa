import { NavLink, useNavigate } from 'react-router-dom'
import { Sun, Moon, User } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

function Navbar({ isOffline }) {
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <nav
      className="hidden md:flex items-center justify-between h-16 fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: 'var(--nav-bg)',
        paddingLeft: '3rem',
        paddingRight: '3rem',
        top: isOffline ? '16px' : '0px',
      }}
    >
      <div
        className="text-xl font-semibold"
        style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-title-sub)' }}
      >
        LankaExplorer
      </div>

      <div className="flex items-center gap-8">
        {[
          { label: 'Explore', to: '/' },
          { label: 'Search', to: null, focusSearch: true },
          { label: 'Saved', to: '/favorites' },
          { label: 'Settings', to: '/settings' },
        ].map(({ label, to, focusSearch }) =>
          focusSearch ? (
            <button
              key={label}
              className="flex items-center h-16 cursor-pointer"
              style={{ fontFamily: "'Inter', sans-serif", background: 'none', border: 'none', padding: 0 }}
              onClick={() => {
                navigate('/')
                setTimeout(() => {
                  document.getElementById('search-input')?.focus()
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }, 100)
              }}
            >
              <span style={{ fontSize: '0.875rem', color: 'white', opacity: 0.7, fontWeight: 400 }}>{label}</span>
            </button>
          ) : (
            <NavLink
              key={label}
              to={to}
              end={to === '/'}
              className="flex items-center h-16"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {({ isActive }) => (
                <span
                  style={{
                    fontSize: '0.875rem',
                    color: isActive ? '#FFDCC3' : 'white',
                    opacity: isActive ? 1 : 0.7,
                    fontWeight: isActive ? 500 : 400,
                    textDecoration: isActive ? 'underline' : 'none',
                    textUnderlineOffset: '8px',
                    textDecorationThickness: '1.5px',
                  }}
                >
                  {label}
                </span>
              )}
            </NavLink>
          )
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-white opacity-80 hover:opacity-100 transition-opacity min-h-0 min-w-0 p-1 cursor-pointer"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2DD4BF' }}>
          <User className="w-4 h-4 text-white" />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
