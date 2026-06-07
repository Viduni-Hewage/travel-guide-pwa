import { Globe, Share2, X } from 'lucide-react'

function Footer() {
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

            <div className="flex gap-3 mt-2">
              {[Globe, X, Share2].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full border flex items-center justify-center min-h-0 min-w-0"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--des-footer-text)',
                  }}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-4!"
              style={{ color: 'var(--des-footer-text)' }}
            >
              Explore
            </h4>
            <div className="flex flex-col gap-0">
              {['Boutique Villas', 'Heritage Tours', 'Wildlife Expeditions', 'Coastal Retreats'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm hover:opacity-100 transition-opacity min-h-0 min-w-0"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4
              className="text-xs font-semibold tracking-widest uppercase mb-4!"
              style={{ color: 'var(--des-footer-text)' }}
            >
              Our Agency
            </h4>
            <div className="flex flex-col gap-0">
              {['About Us', 'Journal', 'Sustainability', 'Contact'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm hover:opacity-100 transition-opacity min-h-0 min-w-0"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="border-t px-8 py-4 flex items-center justify-between"
        style={{ borderColor: 'var(--color-border)', paddingTop: '1rem' }}
      >
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          © 2024 LankaExplorer. All Rights Reserved.
        </p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs hover:opacity-100 transition-opacity min-h-0 min-w-0"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
