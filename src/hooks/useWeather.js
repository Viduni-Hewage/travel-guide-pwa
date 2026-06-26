import { useState, useEffect } from 'react'
import { fetchWeather } from '../services/weatherApi.js'

export const useWeather = (lat, lng) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (lat == null || lng == null) return

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchWeather(lat, lng)
        setWeather(data)
      } catch (err) {
        setError('Weather unavailable')
        console.error('Weather fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [lat, lng])

  return { weather, loading, error }
}
