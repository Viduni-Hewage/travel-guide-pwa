import { useCallback, useEffect, useState } from 'react'

const LOCATION_ENABLED_KEY = 'lanka_location_enabled'

export const useGeolocation = () => {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const requestLocation = useCallback(() => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser')
        setLoading(false)
        resolve(false)
        return
      }

      setLoading(true)
      setError(null)

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
          })

          localStorage.setItem(LOCATION_ENABLED_KEY, 'true')

          setLoading(false)
          resolve(true)
        },

        (err) => {
          const messages = {
            1: 'Location permission denied',
            2: 'Location unavailable',
            3: 'Location request timed out',
          }

          setLocation(null)
          setError(messages[err.code] ?? 'Unknown location error')

          localStorage.removeItem(LOCATION_ENABLED_KEY)

          setLoading(false)
          resolve(false)
        },

        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      )
    })
  }, [])

  useEffect(() => {
    const locationEnabled = localStorage.getItem(LOCATION_ENABLED_KEY) === 'true'

    if (locationEnabled) {
      requestLocation()
    }
  }, [requestLocation])

  return {
    location,
    error,
    loading,
    requestLocation,
  }
}
