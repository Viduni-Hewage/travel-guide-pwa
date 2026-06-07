import { Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

function MobileHeader() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header
      className="md:hidden fixed flex items-center justify-between h-14 top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: 'var(--nav-bg)',
        paddingLeft: '1.5rem',
        paddingRight: '0rem',
      }}
    >
      <button className="text-white min-h-0 min-w-0 p-1" aria-label="Menu">
        <Menu className="w-5 h-5" />
      </button>
      <div
        className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold"
        style={{ fontFamily: "'Playfair Display', serif", color: 'var(--color-title-sub)' }}
      >
        LankaExplorer
      </div>

      {/* Theme toggle */}
      <button onClick={toggleTheme} className="text-white min-h-0 min-w-0" aria-label="Toggle theme">
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </header>
  )
}

export default MobileHeader
