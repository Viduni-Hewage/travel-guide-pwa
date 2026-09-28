import { createContext, useContext, useEffect, useState } from 'react'
import { useGeolocation } from '../hooks/useGeolocation'
import { getDistance, formatDistance } from '../utils/haversine'
import { getLocationName } from '../services/reverseGeocodeApi'

const LocationContext = createContext(null)

export const LocationProvider = ({ children }) => {
  const { location, error, loading, requestLocation } = useGeolocation()

  const [resolvedLocation, setResolvedLocation] = useState(null)

  const locationKey = location ? `${location.lat},${location.lng}` : null

  const locationName = resolvedLocation?.key === locationKey ? resolvedLocation.name : null

  const locationNameLoading = Boolean(location) && resolvedLocation?.key !== locationKey

  useEffect(() => {
    if (!location) return

    let cancelled = false

    const resolveLocationName = async () => {
      const name = await getLocationName(location.lat, location.lng)

      if (!cancelled) {
        setResolvedLocation({
          key: `${location.lat},${location.lng}`,
          name,
        })
      }
    }

    resolveLocationName()

    return () => {
      cancelled = true
    }
  }, [location])

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
        locationName,
        locationNameLoading,
        locationError: error,
        locationLoading: loading,
        requestLocation,
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

  if (!ctx) {
    throw new Error('useLocation must be used within LocationProvider')
  }

  return ctx
}
