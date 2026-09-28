import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import permissionBg from '../assets/images/permission-bg.png'
import { useLocation } from '../context/LocationContext.jsx'

function PermissionPage() {
  const navigate = useNavigate()
  const { requestLocation, locationLoading, locationError } = useLocation()

  const handleAllow = async () => {
    const granted = await requestLocation()

    if (!granted) {
      return
    }

    localStorage.setItem('lanka_visited', 'true')
    navigate('/', { replace: true })
  }

  const handleSkip = () => {
    localStorage.setItem('lanka_visited', 'true')
    navigate('/', { replace: true })
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${permissionBg})` }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(6,78,59,0.2) 0%, rgba(6,78,59,0.45) 50%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-end pb-24 px-6 md:justify-center md:pb-0 md:px-8">
        <div className="flex flex-col items-center gap-6 w-full max-w-sm">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(6, 78, 59, 0.8)' }}
          >
            <MapPin className="w-7 h-7 text-white" />
          </div>

          <h1
            className="text-white text-3xl font-semibold text-center leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Find hidden gems near you.
          </h1>

          <p
            className="text-white text-center opacity-80 text-base leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Allow LankaExplorer to use your location for real-time distance and weather.
          </p>

          {locationError && <p className="text-sm text-center text-red-200">{locationError}</p>}

          <button
            onClick={handleAllow}
            disabled={locationLoading}
            className="w-full py-4 rounded-full text-white font-medium text-base flex items-center justify-center gap-2 transition-opacity hover:opacity-90 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--color-primary)',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {locationLoading ? 'Requesting Location...' : 'Allow Location →'}
          </button>

          <button
            onClick={handleSkip}
            className="text-white opacity-60 text-base hover:opacity-100 transition-opacity min-h-[48px] cursor-pointer"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Maybe Later
          </button>

          <div className="w-24 h-1 rounded-full opacity-40 mt-4" style={{ backgroundColor: '#D97706' }} />
        </div>
      </div>
    </div>
  )
}

export default PermissionPage
