import { NavLink } from 'react-router-dom'
import { Sun, Moon, User } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

function Navbar() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <nav
      className="hidden md:flex items-center justify-between h-16"
      style={{
        backgroundColor: 'var(--nav-bg)',
        paddingLeft: '3rem',
        paddingRight: '3rem',
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
          { label: 'Search', to: '/search' },
          { label: 'Saved', to: '/favorites' },
          { label: 'Settings', to: '/settings' },
        ].map(({ label, to }) => (
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
        ))}
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
