import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Heart, Star, Navigation, Sun, Compass, Landmark, Leaf, Waves, Building2 } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { useLocation } from '../context/LocationContext'
import { useWeather } from '../hooks/useWeather'
import attractions from '../data/attractions.json'
import homeBg from '../assets/images/home-bg.png'
import Loader from '../components/UI/Loader.jsx'

const categories = ['All', 'Historical', 'Nature', 'Beaches', 'Hotels']

function AttractionCard({ attraction }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { getFormattedDistanceTo } = useLocation()
  const navigate = useNavigate()
  const distance = getFormattedDistanceTo(attraction.lat, attraction.lng)
  const favorite = isFavorite(attraction.id)

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer group pb-1!"
      style={{
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
      onClick={() => navigate(`/attraction/${attraction.id}`)}
    >
      <div className="relative mb-1!">
        <img
          src={attraction.image || 'https://images.unsplash.com/photo-1586016413664-864c0dd76f53?w=800'}
          alt={attraction.name}
          className="w-full h-52 object-cover md:h-48"
        />

        {distance && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1 px-2! py-1! rounded-full text-xs text-white"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <Navigation className="w-3 h-3" />
            {distance}
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(attraction.id)
          }}
          className="absolute top-3 right-3 rounded-full flex items-center justify-center min-h-0 min-w-0"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}
        >
          <Heart
            className="w-5 h-5"
            style={{ color: favorite ? '#ef4444' : '#ffffff' }}
            fill={favorite ? '#ef4444' : 'none'}
          />
        </button>
      </div>

      <div className="p-4!">
        <div className="flex items-start justify-between gap-2 mb-1!">
          <h3
            className="text-base font-semibold leading-tight"
            style={{
              color: 'var(--color-text)',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {attraction.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} fill="currentColor" />
            <span className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
              {attraction.rating}
            </span>
          </div>
        </div>

        <p className="text-sm line-clamp-2 mb-1!" style={{ color: 'var(--color-text-muted)' }}>
          {attraction.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2 flex-wrap">
            {attraction.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2! py-1! rounded-full"
                style={{
                  backgroundColor: 'var(--color-text3)',
                  color: 'var(--des-footer-text)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-xs whitespace-nowrap" style={{ color: 'var(--des-footer-text)' }}>
            View Details →
          </span>
        </div>
      </div>
    </div>
  )
}

function DesktopAttractionCard({ attraction }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { getFormattedDistanceTo } = useLocation()
  const navigate = useNavigate()
  const distance = getFormattedDistanceTo(attraction.lat, attraction.lng)
  const favorite = isFavorite(attraction.id)

  return (
    <div
      className="overflow-hidden cursor-pointer group"
      style={{ backgroundColor: 'var(--color-bg)' }}
      onClick={() => navigate(`/attraction/${attraction.id}`)}
    >
      <div className="relative overflow-hidden rounded-2xl mb-1!">
        <img
          src={attraction.image || 'https://images.unsplash.com/photo-1586016413664-864c0dd76f53?w=800'}
          alt={attraction.name}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {distance && (
          <div
            className="absolute top-3 left-3 flex items-center gap-1 px-2! py-1! rounded-full text-xs text-white"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <Navigation className="w-3 h-3" />
            {distance}
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(attraction.id)
          }}
          className="absolute top-3 right-3 rounded-full flex items-center justify-center min-h-0 min-w-0"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}
        >
          <Heart
            className="w-5 h-5"
            style={{ color: favorite ? '#ef4444' : '#ffffff' }}
            fill={favorite ? '#ef4444' : 'none'}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3
            className="text-base font-semibold"
            style={{
              color: 'var(--color-text)',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {attraction.name}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5" style={{ color: 'var(--color-accent)' }} fill="currentColor" />
            <span className="text-sm" style={{ color: 'var(--color-accent)' }}>
              {attraction.rating}
            </span>
          </div>
        </div>
        <p className="text-sm mb-1 flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
          <MapPin className="w-3 h-3" />
          {attraction.nearestCity}
        </p>
        <p className="text-sm font-medium" style={{ color: 'var(--color-text2)' }}>
          From ${attraction.entryFee?.match(/\d+/)?.[0] || '45'} / night
        </p>
      </div>
    </div>
  )
}

function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  const { location } = useLocation()
  const { weather } = useWeather(location?.lat, location?.lng)

  const filtered = attractions.filter((a) => {
    const matchesCategory = activeCategory === 'All' || a.category === activeCategory
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const categoryIcons = {
    Explore: Compass,
    Historical: Landmark,
    Nature: Leaf,
    Beaches: Waves,
    Hotels: Building2,
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* ─── MOBILE LAYOUT ─── */}
      <div className="md:hidden px-5! py-6!" style={{ marginBottom: '2.5rem' }}>
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-1 mb-1">
            <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--color-text2)' }} />
            <span className="text-xs" style={{ color: 'var(--color-text2)' }}>
              Colombo, Sri Lanka
            </span>
          </div>
          <h1
            className="text-3xl font-bold my-1!"
            style={{
              color: 'var(--nav-text)',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Discover the Pearl
          </h1>

          {weather && (
            <div
              className="inline-flex items-center gap-2 px-3! py-1.5! rounded-full"
              style={{ backgroundColor: 'var(--sample-bg1)' }}
            >
              <Sun className="w-4 h-4" style={{ color: '#b14207' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                {weather.temperature}°C
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)', lineHeight: 1 }}>
                |
              </span>

              <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                {weather.condition}
              </span>
            </div>
          )}

          <div
            className="flex items-center gap-2 px-4! py-3! rounded-3xl my-8!"
            style={{
              backgroundColor: 'var(--sample-bg1)',
              border: '1px solid var(--color-border)',
            }}
          >
            <Search className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
            <input
              id="search-input"
              type="text"
              placeholder="Search experiences, destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: 'var(--color-text)' }}
            />
          </div>

          <div
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-5! scroll-smooth"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {categories.map((cat) => {
              const Icon = categoryIcons[cat]
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="flex items-center gap-1.5 px-5! py-0! rounded-full text-sm whitespace-nowrap transition-all min-h-0 min-w-0 flex-shrink-0"
                  style={{
                    backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'var(--sample-bg2)',
                    color: activeCategory === cat ? '#ffffff' : 'var(--nav-text)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        <div className="px-4 flex flex-col gap-4 mt-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p style={{ color: 'var(--color-text-muted)' }}>No attractions found</p>
            </div>
          ) : loading ? (
            <Loader />
          ) : (
            filtered.map((attraction) => <AttractionCard key={attraction.id} attraction={attraction} />)
          )}
        </div>

        <div
          className="mx-4 my-8! p-10! rounded-2xl"
          style={{ backgroundColor: 'var(--color-primary)', marginBottom: '1rem' }}
        >
          <h2 className="text-white text-3xl font-semibold mb-4!" style={{ fontFamily: "'Playfair Display', serif" }}>
            Plan Your Elite Escape
          </h2>
          <p className="text-white opacity-80 text-md mb-6!">
            Access hand-picked boutique villas and curated local experiences tailored for the discerning traveler.
          </p>
          <button
            className="px-6! py-3! rounded-full text-white font-medium text-sm min-h-0"
            style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-surface-2)' }}
          >
            Start Customizing
          </button>
        </div>
      </div>

      {/* ─── DESKTOP LAYOUT ─── */}
      <div className="hidden md:block">
        <div
          className="relative h-[90vh] bg-center bg-no-repeat px-22! flex flex-col justify-center items-end "
          style={{
            backgroundImage: `url(${homeBg})`,
            backgroundSize: '100% 100%',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)',
            }}
          />

          <div className="relative z-10 w-full px-16 pb-4">
            <h1
              className="text-5xl font-bold mb-4! max-w-3xl leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: 'white' }}
            >
              Discover the soul of the Emerald Isle.
            </h1>
            <p className="text-white opacity-80 text-lg! mb-12! max-w-3xl">
              Curated boutique journeys through heritage ruins, mist-covered mountains, and pristine coastal escapes.
            </p>

            <div className="flex items-center gap-4 max-w-3xl">
              <div
                className="flex items-center gap-5 px-5! py-3! rounded-full flex-1"
                style={{ backgroundColor: 'var(--sample-bg1)' }}
              >
                <Search className="w-6 h-6" style={{ color: 'var(--des-footer-text)' }} />
                <input
                  id="search-input-desktop"
                  type="text"
                  placeholder="Where would you like to escape?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-md"
                  style={{ color: 'var(--color-text)' }}
                />
                <button
                  className="px-9! py-3! rounded-full text-white text-md font-medium min-h-0 min-w-0"
                  style={{ backgroundColor: 'var(--des-footer-text)' }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto! py-8! px-7!">
          <div className="flex gap-3 mb-8!">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5! rounded-full text-sm font-medium transition-all min-h-0 min-w-0 cursor-pointer"
                style={{
                  backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'var(--sample-bg1)',
                  color: activeCategory === cat ? '#ffffff' : 'var(--color-text)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-end justify-between mb-6">
            <div>
              <h2
                className="text-2xl font-bold mb-2!"
                style={{
                  color: 'var(--des-footer-text)',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Hand-picked Destinations
              </h2>
              <p className="text-sm max-w-lg mb-8!" style={{ color: 'var(--color-text-muted)' }}>
                Our editors' choice of the most exclusive and culturally rich experiences across the island.
              </p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16!">
              <p style={{ color: 'var(--color-text-muted)' }}>No attractions found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12!">
              {loading ? (
                <div className="col-span-full">
                  <Loader />
                </div>
              ) : (
                filtered.map((attraction) => <DesktopAttractionCard key={attraction.id} attraction={attraction} />)
              )}
            </div>
          )}

          <div className="rounded-2xl p-12! text-center mb-12" style={{ backgroundColor: 'var(--color-primary)' }}>
            <h2 className="text-white text-3xl font-bold mb-6!" style={{ fontFamily: "'Playfair Display', serif" }}>
              Plan Your Tailored Journey
            </h2>
            <p className="text-white opacity-80 mb-6! mx-auto">
              Connect with our local travel designers to craft an itinerary that matches your taste for discovery and
              luxury.
            </p>
            <div className="">
              <button
                className="px-6! py-2! rounded-full text-md min-h-0"
                style={{
                  border: '1px solid rgba(255,255,255,0.5)',
                  color: '#ffffff',
                  backgroundColor: 'transparent',
                }}
              >
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
