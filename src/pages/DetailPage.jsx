import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, MapPin, Clock, Timer, TrendingUp, Mountain, Navigation, Share2, Compass } from 'lucide-react'
import { Heart } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { useLocation } from '../context/LocationContext'
import { useWeather } from '../hooks/useWeather'
import { useTheme } from '../context/ThemeContext'
import { Sun, Moon } from 'lucide-react'
import attractions from '../data/attractions.json'

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1586016413664-864c0dd76f53?w=800',
  'https://images.unsplash.com/photo-1567591370650-d6d4d45e5976?w=800',
  'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
]

function DetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { getFormattedDistanceTo } = useLocation()
  const { isDark, toggleTheme } = useTheme()

  const attraction = attractions.find((a) => a.id === parseInt(id))
  const { weather, loading: weatherLoading } = useWeather(attraction.lat, attraction.lng)
  const distance = getFormattedDistanceTo(attraction.lat, attraction.lng)
  const favorite = isFavorite(attraction.id)
  const galleryImages = attraction.images?.length ? attraction.images : FALLBACK_IMAGES

  if (!attraction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: 'var(--color-text-muted)' }}>Attraction not found</p>
      </div>
    )
  }

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${attraction.lat},${attraction.lng}`
    window.open(url, '_blank')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: attraction.name,
          text: attraction.description,
          url: window.location.href,
        })
      } catch (err) {
        if (err.name !== 'AbortError') throw err
      }
    }
  }

  const infoGrid = [
    { label: 'HOURS', value: attraction.openHours?.replace(' Daily', '') || '7am - 5pm', icon: Clock },
    { label: 'DURATION', value: attraction.duration || '3 - 4 Hours', icon: Timer },
    { label: 'DIFFICULTY', value: attraction.difficulty || 'Moderate', icon: TrendingUp },
    { label: 'ELEVATION', value: attraction.elevation || '200m', icon: Mountain },
  ]

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* ─── MOBILE LAYOUT ─── */}
      <div className="md:hidden mb-25!">
        <div className="relative">
          <img
            src={attraction.image || FALLBACK_IMAGES[0]}
            alt={attraction.name}
            className="w-full h-90 object-cover"
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{
              background: 'linear-gradient(to bottom, transparent, var(--color-bg))',
            }}
          />

          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4! pt-4!">
            <button
              onClick={() => navigate(-1)}
              className="rounded-full flex items-center justify-center min-h-0 min-w-0"
              style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="rounded-full flex items-center justify-center min-h-0 min-w-0"
                style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
              >
                {isDark ? <Sun className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-white" />}
              </button>
              <button
                onClick={() => toggleFavorite(attraction.id)}
                className="rounded-full flex items-center justify-center min-h-0 min-w-0"
                style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
              >
                <Heart
                  className="w-4 h-4"
                  style={{ color: favorite ? '#ef4444' : 'white' }}
                  fill={favorite ? '#ef4444' : 'none'}
                />
              </button>
            </div>
          </div>
          <div
            className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3! py-1.5! rounded-full"
            style={{ backgroundColor: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)' }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--des-footer-text)' }} />
            <span className="text-sm font-medium text-white">{attraction.category}</span>
          </div>
        </div>

        <div className="px-5! pt-4! ">
          <h1
            className="text-3xl font-bold mb-3!"
            style={{
              color: 'var(--des-footer-text)',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {attraction.name}
          </h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" style={{ color: 'var(--color-accent)' }} fill="currentColor" />
              <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                {attraction.rating}
              </span>
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                ({(attraction.reviews / 1000).toFixed(1)}k reviews)
              </span>
            </div>
            {distance && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--color-text-muted)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {distance} from Colombo
                </span>
              </div>
            )}
          </div>

          <div
            className="rounded-3xl px-6! py-7! my-5!"
            style={{ backgroundColor: 'var(--color-bg)', border: '1px solid #2A2A2A' }}
          >
            <h2
              className="text-xl font-semibold mb-2!"
              style={{
                color: 'var(--des-footer-text)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {attraction.subtitle || 'About This Place'}
            </h2>
            <p className="text-md leading-relaxed" style={{ color: 'var(--color-text-muted)', textAlign: 'justify' }}>
              {attraction.description}
            </p>
            <div className="my-6!" style={{ borderBottom: '1px solid var(--color-border)' }} />
            <div className="grid grid-cols-2 gap-5! mb-4">
              {infoGrid.map(({ label, value }) => (
                <div key={label} className="rounded-xl p-3" style={{}}>
                  <p className="text-xs mb-1! tracking-wider" style={{ color: 'var(--color-text)' }}>
                    {label}
                  </p>
                  <p className="text-sm font-medium" style={{ color: 'var(--des-footer-text)' }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {attraction.highlights?.length > 0 && (
            <div className="flex flex-col gap-2 mb-5!">
              {attraction.highlights.map((highlight, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3! rounded-3xl"
                  style={{ backgroundColor: 'var(--sample-bg1)' }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <Compass className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      {highlight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="rounded-4xl p-6! mb-5!" style={{ backgroundColor: 'var(--color-primary)' }}>
            <p className="text-xs mb-2! tracking-wider" style={{ color: 'var(--color-title-sub)' }}>
              Current Weather
            </p>
            {weatherLoading ? (
              <p className="text-sm" style={{ color: 'var(--color-title-sub)' }}>
                Loading...
              </p>
            ) : weather ? (
              <>
                <div className="flex items-center justify-between mb-3!">
                  <div>
                    <p className="text-4xl font-semibold" style={{ color: 'var(--color-title-sub)' }}>
                      {weather.temperature}°C
                    </p>
                    <p className="text-sm pt-1!" style={{ color: 'var(--color-title-sub)' }}>
                      {weather.condition}
                    </p>
                  </div>
                  <Sun className="w-10 h-10" style={{ color: 'var(--color-title-sub)' }} />
                </div>
                <div className="my-6!" style={{ borderBottom: '0.5px solid var(--color-title-sub)' }} />
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Humidity', value: `${weather.humidity}%` },
                    { label: 'Wind', value: `${weather.windspeed}km/h` },
                    { label: 'UV Index', value: weather.uvIndex },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs" style={{ color: 'var(--color-title-sub)' }}>
                        {label}
                      </p>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-title-sub)' }}>
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm" style={{ color: 'var(--color-title-sub)' }}>
                Weather unavailable
              </p>
            )}
          </div>

          <div className="rounded-4xl p-6! mb-5!" style={{ backgroundColor: 'var(--sample-bg1)' }}>
            <h3
              className="text-lg font-semibold mb-1!"
              style={{
                color: 'var(--des-footer-text)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Visit Destination
            </h3>
            <p className="text-sm mb-4!" style={{ color: 'var(--color-text-muted)' }}>
              Expert-led private tours available starting from $45 per person.
            </p>
            <button
              onClick={handleGetDirections}
              className="w-full py-3 rounded-full text-white font-medium text-sm flex items-center justify-center gap-2 mb-4! min-h-0 cursor-pointer!"
              style={{ backgroundColor: 'var(--des-footer-text)', color: 'var(--color-card-bg)' }}
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </button>
            <button
              onClick={handleShare}
              className="w-full rounded-full font-medium text-sm flex items-center justify-center gap-2 min-h-0 cursor-pointer"
              style={{
                border: '1px solid var(--des-footer-text)',
                color: 'var(--des-footer-text)',
                backgroundColor: 'transparent',
              }}
            >
              <Share2 className="w-4 h-4" />
              Share Journey
            </button>
          </div>

          <h3
            className="text-xl font-semibold mb-4! mt-6!"
            style={{
              color: 'var(--des-footer-text)',
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Visual Perspective
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2! scrollbar-hide">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${attraction.name} ${i + 1}`}
                className="w-48 h-36 object-cover rounded-xl shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─── DESKTOP LAYOUT ─── */}
      <div className="hidden md:block">
        <div
          className="mx-auto py-8"
          style={{
            paddingLeft: '5rem',
            paddingRight: '5rem',
            paddingTop: '6rem',
          }}
        >
          <div className="grid grid-cols-2 gap-12 mb-16 items-stretch">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={attraction.image || FALLBACK_IMAGES[0]}
                alt={attraction.name}
                className="w-full h-full object-cover"
              />
              {attraction.tags?.includes('UNESCO') && (
                <div
                  className="absolute bottom-4 left-4 px-3! py-1.5! rounded-full text-xs text-white font-medium"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  UNESCO World Heritage Site
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="px-3! py-1! rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: 'var(--sample-bg3)' }}
                >
                  {attraction.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" style={{ color: 'var(--color-accent)' }} fill="currentColor" />
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                    {attraction.rating}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    ({(attraction.reviews / 1000).toFixed(1)}k reviews)
                  </span>
                </div>
              </div>

              <h1
                className="text-4xl font-bold leading-tight"
                style={{
                  color: 'var(--des-footer-text)',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {attraction.name}
              </h1>

              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {attraction.distanceFromColombo} km from Colombo • {attraction.location}
                </span>
              </div>

              {weather && (
                <div
                  className="flex items-center justify-between p-4! rounded-3xl"
                  style={{ backgroundColor: 'var(--sample-bg1)' }}
                >
                  <div className="flex items-center gap-3">
                    <Sun className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                        {weather.condition}
                      </p>
                      <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                        {weather.temperature}°C
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      Best time to climb
                    </p>
                    <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
                      {attraction.bestTime?.split('(')[0] || '06:30 AM — 08:30 AM'}
                    </p>
                  </div>
                </div>
              )}

              <div
                className="rounded-3xl px-6! py-7! my-5!"
                style={{ backgroundColor: 'var(--color-bg)', border: '1px solid #2A2A2A' }}
              >
                <h2
                  className="text-xl font-semibold mb-2!"
                  style={{
                    color: 'var(--des-footer-text)',
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {attraction.subtitle || 'About This Place'}
                </h2>
                <p
                  className="text-md leading-relaxed"
                  style={{ color: 'var(--color-text-muted)', textAlign: 'justify' }}
                >
                  {attraction.description}
                </p>
                <div className="my-6!" style={{ borderBottom: '1px solid var(--color-border)' }} />
                <div className="grid grid-cols-2 gap-5! mb-4">
                  {infoGrid.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="rounded-xl p-3 flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
                      <div className="flex flex-col">
                        <p className="text-xs tracking-wider" style={{ color: 'var(--color-text)' }}>
                          {label}
                        </p>
                        <p className="text-sm font-medium" style={{ color: 'var(--des-footer-text)' }}>
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14! mb-12!" style={{ borderBottom: '1px solid var(--color-border)' }} />

          <div className="flex items-center justify-between mb-16!">
            <div className="max-w-lg">
              <h2
                className="text-2xl font-bold mb-4!"
                style={{
                  color: 'var(--des-footer-text',
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Visit Destination
              </h2>
              <p className="text-md" style={{ color: 'var(--color-text-muted)' }}>
                Plan your visit to {attraction.name}. Whether you're arriving by road, rail, or guided tour, we've
                mapped the most scenic routes and essential travel tips to make your journey seamless.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleGetDirections}
                className="flex items-center gap-2 px-6! py-3! rounded-full text-white font-medium text-sm min-h-0 cursor-pointer"
                style={{ backgroundColor: 'var(--des-footer-text)', color: 'var(--color-card-bg)' }}
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6! py-3! rounded-full font-medium text-sm min-h-0 cursor-pointer"
                style={{
                  border: '1px solid var(--des-footer-text)',
                  color: 'var(--des-footer-text)',
                  backgroundColor: 'transparent',
                }}
              >
                <Share2 className="w-4 h-4" />
                Share Journey
              </button>
            </div>
          </div>
          <div className="my-12!" style={{ borderBottom: '1px solid var(--color-border)' }} />

          <div className="mb-16!">
            <h2
              className="text-2xl font-bold mb-6!"
              style={{
                color: 'var(--des-footer-text)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Visual Perspective
            </h2>
            <div className="grid grid-cols-3 grid-rows-2 gap-4 h-125">
              <div className="row-span-2 rounded-2xl overflow-hidden">
                <img src={galleryImages[0]} alt="gallery 1" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src={galleryImages[1]} alt="gallery 2" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img src={galleryImages[2]} alt="gallery 3" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden col-start-2">
                <img
                  src={galleryImages[3] || galleryImages[0]}
                  alt="gallery 4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
