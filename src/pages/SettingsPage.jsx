import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Moon, Bell, HelpCircle, Shield, ChevronRight, LogOut, Download, MapPin, Pencil, X, Check } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useLocation } from '../context/LocationContext'

const AVATAR_SEEDS = ['Aria', 'Nomad', 'Felix', 'Jasmine', 'Orion', 'Luna']

function Toggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex items-center w-12 h-7! rounded-full transition-colors duration-200 min-h-0! min-w-0! shrink-0 cursor-pointer"
      style={{
        backgroundColor: enabled ? 'var(--des-footer-text)' : '#6e706f',
      }}
    >
      <span
        className="absolute w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
        style={{
          transform: enabled ? 'translateX(26px)' : 'translateX(3px)',
        }}
      />
    </button>
  )
}

function AvatarPickerModal({ currentSeed, onSelect, onClose }) {
  const [selected, setSelected] = useState(currentSeed)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="rounded-3xl p-6! mx-4 w-full max-w-sm"
        style={{ backgroundColor: 'var(--color-bg)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5!">
          <h3
            className="text-lg font-bold"
            style={{ color: 'var(--des-footer-text)', fontFamily: "'Playfair Display', serif" }}
          >
            Choose Avatar
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8! rounded-full flex items-center justify-center min-h-0! min-w-0! cursor-pointer"
            style={{ backgroundColor: 'var(--sample-bg1)' }}
          >
            <X className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6!">
          {AVATAR_SEEDS.map((seed) => (
            <button
              key={seed}
              onClick={() => setSelected(seed)}
              className="flex flex-col items-center gap-2 min-h-0! min-w-0! p-2! rounded-2xl transition-all cursor-pointer"
              style={{
                border: selected === seed ? '2px solid var(--color-primary)' : '2px solid transparent',
                backgroundColor: selected === seed ? 'var(--sample-bg1)' : 'transparent',
              }}
            >
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                alt={seed}
                className="w-16 h-16 rounded-full"
                style={{ border: '2px solid var(--color-border)' }}
              />
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {seed}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            onSelect(selected)
            onClose()
          }}
          className="w-full py-3! rounded-full text-white text-sm font-medium min-h-0! flex items-center justify-center gap-2 cursor-pointer"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <Check className="w-4 h-4" />
          Confirm Avatar
        </button>
      </div>
    </div>
  )
}

function SettingsPage() {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const { location } = useLocation()
  const [displayName, setDisplayName] = useLocalStorage('lanka_display_name', 'Explorer')
  const [avatarSeed, setAvatarSeed] = useLocalStorage('lanka_avatar_seed', 'Explorer')
  const [notifications, setNotifications] = useLocalStorage('lanka_notifications', false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [tempName, setTempName] = useState(displayName)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)

  const handleSaveName = () => {
    if (tempName.trim()) {
      setDisplayName(tempName.trim())
    }
    setIsEditingName(false)
  }

  const handleLogOut = () => {
    localStorage.clear()
    navigate('/splash', { replace: true })
  }

  const handleInstall = () => {
    window.dispatchEvent(new Event('show-install-prompt'))
  }

  const locationLabel = location ? 'Colombo, Sri Lanka' : 'Location unavailable'

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {showAvatarPicker && (
        <AvatarPickerModal
          currentSeed={avatarSeed}
          onSelect={setAvatarSeed}
          onClose={() => setShowAvatarPicker(false)}
        />
      )}

      <div className="max-w-4xl mx-auto! px-6! md:px-8! md:py-22! py-10! mb-14!">
        <div className="flex flex-col items-center gap-2 mb-8">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full overflow-hidden"
              style={{ border: '3px solid var(--color-primary)' }}
            >
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => setShowAvatarPicker(true)}
              className="absolute bottom-0 right-0 w-7 h-7! rounded-full flex items-center justify-center min-h-0! min-w-0! cursor-pointer"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <Pencil className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          <h2
            className="text-2xl font-bold mt-1"
            style={{ color: 'var(--color-text)', fontFamily: "'Playfair Display', serif" }}
          >
            {displayName}
          </h2>

          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} />
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {locationLabel}
            </span>
          </div>
        </div>

        <div className="my-6!">
          <p className="text-sm font-medium mb-2!" style={{ color: 'var(--des-footer-text)' }}>
            Display Name
          </p>
          <div
            className="flex items-center px-4! py-3! rounded-xl"
            style={{
              backgroundColor: 'var(--sample-bg1)',
              border: '1px solid var(--color-border)',
            }}
          >
            <input
              type="text"
              value={isEditingName ? tempName : displayName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleSaveName}
              onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
              readOnly={!isEditingName}
              className="flex-1 bg-transparent outline-none text-base"
              style={{ color: 'var(--color-text)', cursor: isEditingName ? 'text' : 'default' }}
            />
            <button
              onClick={() => {
                setIsEditingName(true)
                setTempName(displayName)
              }}
              className="min-h-0! min-w-0! p-1!"
            >
              <Pencil
                className="w-4 h-4 cursor-pointer"
                style={{ color: isEditingName ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
              />
            </button>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden mb-6!" style={{ backgroundColor: 'var(--sample-bg1)' }}>
          <div
            className="flex items-center justify-between px-4! py-4!"
            style={{ borderBottom: '1px solid var(--color-border)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-card-bg)' }}
              >
                <Moon className="w-4 h-4" style={{ color: 'var(--des-footer-text)' }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                  Dark Mode
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {isDark
                    ? 'Currently active with Midnight Forest theme'
                    : 'Switch to a darker interface for night reading'}
                </p>
              </div>
            </div>
            <Toggle enabled={isDark} onToggle={toggleTheme} />
          </div>

          <div className="flex items-center justify-between px-4! py-4!">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-card-bg)' }}
              >
                <Bell className="w-4 h-4" style={{ color: 'var(--des-footer-text)' }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                  Notifications
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Stay updated on your journey
                </p>
              </div>
            </div>
            <Toggle enabled={notifications} onToggle={() => setNotifications((prev) => !prev)} />
          </div>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden mb-6! p-6!"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <div className="absolute right-4 bottom-4 opacity-10">
            <Download className="w-24 h-24 text-white" />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-white text-lg font-bold mb-1!" style={{ fontFamily: "'Playfair Display', serif" }}>
                Experience Sri Lanka Offline
              </h3>
              <p className="text-white opacity-70 text-sm mb-4!">
                Download LankaExplorer to access curated boutique guides and heritage maps without an internet
                connection.
              </p>
              <button
                onClick={handleInstall}
                className="flex items-center gap-2 px-5! py-2! rounded-full text-white text-sm font-medium min-h-0! cursor-pointer"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                <Download className="w-4 h-4" />
                Install Now
              </button>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <Download className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-8!">
          {[
            { label: 'Help & Support', icon: HelpCircle, to: '/help' },
            { label: 'Privacy Policy', icon: Shield, to: '/privacy' },
          ].map(({ label, icon: Icon, to }) => (
            <button
              key={label}
              onClick={() => navigate(to)}
              className="w-full flex items-center justify-between gap-1! px-4! py-4! rounded-2xl min-h-0! transition-opacity hover:opacity-70"
              style={{ backgroundColor: 'var(--sample-bg1)' }}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text)' }}>
                  {label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
            </button>
          ))}
        </div>

        <div className="flex justify-center pb-8">
          <button
            onClick={handleLogOut}
            className="flex items-center gap-2 px-6! py-3! rounded-full text-sm font-medium min-h-0! cursor-pointer"
            style={{ border: '1px solid var(--color-border)', color: '#ef4444' }}
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
