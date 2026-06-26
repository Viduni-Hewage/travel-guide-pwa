import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, FileText } from 'lucide-react'

function HelpPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-4xl mx-auto! px-4! md:px-8! md:py-10! py-2! mb-22!">
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
          Help & Support
        </h1>
        <p className="text-sm mb-8!" style={{ color: 'var(--color-text-muted)' }}>
          We're here to help you explore Sri Lanka with ease.
        </p>

        <div className="rounded-2xl overflow-hidden mb-6! p-6!" style={{ backgroundColor: 'var(--sample-bg1)' }}>
          {[
            {
              q: 'How do I save an attraction?',
              a: 'Tap the heart icon on any attraction card to save it to your Saved Gems.',
            },
            {
              q: 'How does distance calculation work?',
              a: 'We use your device location and calculate the straight-line distance to each attraction using the Haversine formula.',
            },
            {
              q: 'Does the app work offline?',
              a: 'Yes — install LankaExplorer as a PWA and previously viewed content will be available offline.',
            },
            {
              q: 'How do I get directions?',
              a: 'Open any attraction detail page and tap Get Directions — this opens Google Maps with the destination pre-filled.',
            },
            {
              q: 'How do I change my display name?',
              a: 'Go to Settings and tap the Display Name field to edit it.',
            },
          ].map(({ q, a }, i, arr) => (
            <div
              key={i}
              className="py-3!"
              style={{
                borderBottom: i < arr.length - 1 ? '1px solid var(--color-text)' : 'none',
              }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
                {q}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {a}
              </p>
            </div>
          ))}
        </div>

        <h2
          className="text-lg font-semibold mb-4!"
          style={{
            color: 'var(--des-footer-text)',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Contact Us
        </h2>
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--sample-bg1)' }}>
          {[
            { icon: Mail, label: 'Email Support', value: 'support@lankaexplorer.com' },
            { icon: FileText, label: 'Documentation', value: 'View full guides' },
          ].map(({ icon: Icon, label, value }, i, arr) => (
            <div
              key={label}
              className="flex items-center gap-3 px-4! py-4!"
              style={{
                borderBottom: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--sample-bg1)' }}
              >
                <Icon className="w-4 h-4" style={{ color: 'var(--des-footer-text)' }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                  {label}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HelpPage
