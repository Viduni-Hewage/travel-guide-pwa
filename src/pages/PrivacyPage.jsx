import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const sections = [
  {
    title: 'Information We Collect',
    content:
      'LankaExplorer collects your device location (with permission) to calculate distances to attractions and fetch local weather data. Your display name and preferences are stored locally on your device and never transmitted to our servers.',
  },
  {
    title: 'How We Use Your Data',
    content:
      "Location data is used solely to calculate distances and fetch weather from Open Meteo API. We do not store, sell, or share your location with third parties. All app preferences including favorites, dark mode, and display name are stored in your browser's local storage.",
  },
  {
    title: 'Third Party Services',
    content:
      'We use Open Meteo (open-meteo.com) for weather data — a free, open-source weather API that does not require personal data. We use Google Maps URL deep linking for directions — clicking Get Directions opens Google Maps with coordinates only.',
  },
  {
    title: 'Data Storage',
    content:
      'All your data is stored locally on your device using browser LocalStorage. This data never leaves your device. Clearing your browser data or uninstalling the app will remove all stored preferences.',
  },
  {
    title: 'Your Rights',
    content:
      'You can clear all app data at any time by tapping Log Out in Settings, which clears all locally stored data. You can revoke location permission at any time through your browser settings.',
  },
  {
    title: 'Contact',
    content:
      'For privacy concerns, contact us at privacy@lankaexplorer.com. This privacy policy was last updated June 2024.',
  },
]

function PrivacyPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-4xl mx-auto! px-4! md:px-8! md:py-10! py-2! mb-22!">
        {/* Back button */}
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 mb-2! min-h-0 min-w-0"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Settings</span>
        </button>

        <h1
          className="text-3xl font-bold mb-3!"
          style={{
            color: 'var(--des-footer-text)',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Privacy Policy
        </h1>
        <p className="text-sm mb-8!" style={{ color: 'var(--color-text-muted)' }}>
          Last updated: June 2024
        </p>

        <div className="flex flex-col gap-6">
          {sections.map(({ title, content }) => (
            <div key={title} className="rounded-2xl p-5!" style={{ backgroundColor: 'var(--sample-bg1)' }}>
              <h2
                className="text-base font-semibold mb-2!"
                style={{
                  color: 'var(--color-text)',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage
