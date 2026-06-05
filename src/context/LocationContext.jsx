import { createContext, useContext } from 'react'
import { useGeolocation } from '../hooks/useGeolocation'
import { getDistance, formatDistance } from '../utils/haversine'

const LocationContext = createContext(null)

export const LocationProvider = ({ children }) => {
  const { location, error, loading } = useGeolocation()

  const getDistanceTo = (lat, lng) => {
    if (!location) return null
    return getDistance(location.lat, location.lng, lat, lng)
  }

  const getFormattedDistanceTo = (lat, lng) => {
    const km = getDistanceTo(lat, lng)
    if (km === null) return null
    return formatDistance(km)
  }

  return (
    <LocationContext.Provider
      value={{
        location,
        locationError: error,
        locationLoading: loading,
        getDistanceTo,
        getFormattedDistanceTo,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export const useLocation = () => {
  const ctx = useContext(LocationContext)
  if (!ctx) throw new Error('useLocation must be used within LocationProvider')
  return ctx
}
