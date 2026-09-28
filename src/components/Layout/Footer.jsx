import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="hidden md:block"
      style={{
        backgroundColor: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        padding: '5rem 4rem 0 4rem',
      }}
    >
      <div className="max-w-7xl mx-auto" style={{ paddingBottom: '5rem' }}>
        <div className="flex justify-between">
          <div className="flex flex-col gap-4" style={{ maxWidth: '400px' }}>
            <h3
              className="text-xl font-semibold"
              style={{
                color: 'var(--des-footer-text)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              LankaExplorer
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Elevating travel to an art form through curated experiences in Sri Lanka's most exclusive corners.
            </p>
          </div>

          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-5!"
              style={{ color: 'var(--des-footer-text)' }}
            >
              Explore
            </h4>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="text-sm py-0! leading-5 hover:opacity-100 transition-opacity min-h-0 min-w-0"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Destinations
              </Link>

              <Link
                to="/favorites"
                className="text-sm py-0! leading-5 hover:opacity-100 transition-opacity min-h-0 min-w-0"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Saved Gems
              </Link>

              <Link
                to="/settings"
                className="text-sm py-0! leading-5 hover:opacity-100 transition-opacity min-h-0 min-w-0"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Settings
              </Link>
            </div>
          </div>

          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-5!"
              style={{ color: 'var(--des-footer-text)' }}
            >
              Information
            </h4>

            <div className="flex flex-col gap-3">
              <Link
                to="/help"
                className="text-sm py-0! leading-5 hover:opacity-100 transition-opacity min-h-0 min-w-0"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Help & Support
              </Link>

              <Link
                to="/privacy"
                className="text-sm py-0! leading-5 hover:opacity-100 transition-opacity min-h-0 min-w-0"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="border-t px-8 py-4 flex items-center justify-between"
        style={{ borderColor: 'var(--color-border)', paddingTop: '1rem' }}
      >
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          © {currentYear} LankaExplorer. All Rights Reserved.
        </p>
        <div className="flex gap-6">
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-xs hover:opacity-100 transition-opacity min-h-0 min-w-0"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Privacy Policy
            </Link>

            <Link
              to="/help"
              className="text-xs hover:opacity-100 transition-opacity min-h-0 min-w-0"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Help & Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
