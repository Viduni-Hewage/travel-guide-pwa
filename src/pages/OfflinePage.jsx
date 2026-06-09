import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'
import attractions from '../data/attractions.json'
import { WifiOff, Heart, ChevronRight, Map } from 'lucide-react'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1586016413664-864c0dd76f53?w=800'
const HERO_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
const FEATURED_IMAGE = 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
const HERITAGE_IMAGE = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800'

function OfflinePage() {
  const navigate = useNavigate()
  const { favorites } = useFavorites()
  const savedAttractions = attractions.filter((a) => favorites.includes(a.id)).slice(0, 4)

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', paddingBottom: '3rem' }}>
      <div className="max-w-4xl mx-auto! px-4! md:px-8! py-4! md:pt-16!">
        <div className="relative rounded-2xl overflow-hidden mb-4! h-52 md:h-62">
          <img src={HERO_IMAGE} alt="Timeless Ceylon" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 p-4!">
            <h2 className="text-white text-xl font-bold mb-1!" style={{ fontFamily: "'Playfair Display', serif" }}>
              Timeless Ceylon
            </h2>
            <p className="text-white opacity-80 text-xs mb-3!">
              Discover the heritage, wild landscapes, and boutique sanctuaries of the pearl of the Indian Ocean, even
              when you're off the grid.
            </p>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3! px-4! py-2! rounded-full text-white text-sm font-medium min-h-0!"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Continue Discovery →
            </button>
          </div>
        </div>

        <div className="rounded-2xl p-4! mb-4!" style={{ backgroundColor: 'var(--sample-bg1)' }}>
          <div className="flex items-center justify-between mb-2!">
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4" style={{ color: 'var(--color-text)' }} />
              <span className="text-base font-semibold" style={{ color: 'var(--des-footer-text)' }}>
                Colombo
              </span>
            </div>
            <span
              className="text-xs px-2! py-0.5! rounded-full font-medium"
              style={{
                backgroundColor: 'var(--color-surface-2)',
                color: 'var(--des-footer-text)',
              }}
            >
              OFFLINE
            </span>
          </div>
          <p className="text-xs mb-3!" style={{ color: 'var(--color-text-muted)' }}>
            Last updated 2h ago
          </p>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-0.5 rounded" style={{ backgroundColor: 'var(--color-border)' }} />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-border)' }} />
          </div>
          <p className="text-xs italic" style={{ color: 'var(--color-text-muted)' }}>
            Weather data unavailable offline
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden mb-4! h-48 md:h-58">
          <img src={FEATURED_IMAGE} alt="Featured" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)',
            }}
          />
          <button
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center min-h-0 min-w-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <Heart className="w-4 h-4 text-white" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-4!">
            <p className="text-xs tracking-widest mb-1! uppercase" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Featured Sanctuary
            </p>
            <h3 className="text-white text-xl font-bold mb-1!" style={{ fontFamily: "'Playfair Display', serif" }}>
              Amangalla Interiors
            </h3>
            <p className="text-white opacity-70 text-xs">Galle Fort's most storied boutique retreat.</p>
          </div>
        </div>

        <div className="rounded-2xl p-4! mb-3!" style={{ backgroundColor: 'var(--sample-bg1)' }}>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4!"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <Map className="w-5 h-5" style={{ color: 'var(--color-text)' }} />
          </div>
          <h3
            className="text-white text-lg font-bold mb-1!"
            style={{ fontFamily: "'Playfair Display', serif", color: 'var(--des-footer-text)' }}
          >
            Cached Itinerary
          </h3>
          <p className="text-white opacity-70 text-sm mb-2!" style={{ color: 'var(--color-text-muted)' }}>
            Your Southern Coast route is available for offline navigation.
          </p>
          <button
            className="flex items-center gap-1 text-sm font-medium min-h-0 min-w-0"
            style={{ color: 'var(--des-footer-text)' }}
          >
            VIEW MAPS ↗
          </button>
        </div>

        <div className="rounded-2xl overflow-hidden mb-6!">
          <img src={HERITAGE_IMAGE} alt="Heritage" className="w-full h-44 md:h-54 object-cover" />
          <div className="p-4!" style={{ backgroundColor: 'var(--sample-bg1)' }}>
            <p className="text-xs font-medium mb-1!" style={{ color: 'var(--color-accent)' }}>
              Heritage Experience
            </p>
            <h3
              className="text-lg font-bold mb-1!"
              style={{
                color: 'var(--color-text)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Tea Trails Journey
            </h3>
            <p className="text-sm mb-3!" style={{ color: 'var(--color-text-muted)' }}>
              A private tour of high-grown estates and colonial bungalows in Hatton.
            </p>
            <div className="flex gap-2">
              {['Eco-friendly', 'Elite'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3! py-1! rounded-full"
                  style={{
                    backgroundColor: 'var(--color-surface-2)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6!">
          <div className="flex items-center justify-between mb-4!">
            <h3
              className="text-xl font-bold"
              style={{
                color: 'var(--des-footer-text)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Offline Favorites
            </h3>
            <button
              onClick={() => navigate('/favorites')}
              className="flex items-center gap-1 text-xs font-medium min-h-0 min-w-0"
              style={{ color: 'var(--color-text-muted)' }}
            >
              ALL SAVED
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {savedAttractions.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {savedAttractions.map((attraction) => (
                <div
                  key={attraction.id}
                  className="relative rounded-xl overflow-hidden h-32 md:h-50 cursor-pointer"
                  onClick={() => navigate(`/attraction/${attraction.id}`)}
                >
                  <img
                    src={attraction.image || FALLBACK_IMAGE}
                    alt={attraction.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)',
                    }}
                  />
                  <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium">{attraction.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl p-6! text-center" style={{ backgroundColor: 'var(--color-surface)' }}>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                No saved attractions yet. Save some gems to view them offline.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OfflinePage
