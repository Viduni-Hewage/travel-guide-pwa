import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const sections = [
  {
    title: 'Information We Collect',
    content:
      'LankaExplorer accesses your device location only after you grant permission through your browser. Your location is used to calculate distances to destinations, retrieve local weather information, and determine your approximate city or locality. Your display name, favorites, theme preference, and other app preferences are stored locally in your browser.',
  },
  {
    title: 'How We Use Your Data',
    content:
      'Your location coordinates are used to calculate distances between you and destinations. When location-based features are enabled, coordinates are also sent to external services to retrieve weather information and determine an approximate location name. LankaExplorer does not operate its own backend database for storing your location.',
  },
  {
    title: 'Third Party Services',
    content:
      'LankaExplorer uses Open-Meteo to retrieve weather information and BigDataCloud to convert location coordinates into an approximate city or locality name. When you use Get Directions, LankaExplorer opens Google Maps using destination coordinates. These third-party services may process information according to their own privacy policies.',
  },
  {
    title: 'Data Storage',
    content:
      'App preferences such as favorites, display name, theme settings, notification preferences, and location-enabled status are stored locally on your device using browser LocalStorage. LankaExplorer does not maintain its own user account database or server-side storage for this information. Location coordinates used for external weather and location-name requests are not permanently stored by LankaExplorer.',
  },
  {
    title: 'Your Choices',
    content:
      'You can deny or revoke location permission at any time through your browser or device settings. If location access is unavailable, LankaExplorer can still be used, but features such as current-location distances, local weather, and your location name may not be available. You can also clear locally stored app data through the app settings or your browser settings.',
  },
  {
    title: 'Contact',
    content:
      'For privacy concerns, contact us at privacy@lankaexplorer.com. This privacy policy was last updated September 2026.',
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
          Last updated: September 2026
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
