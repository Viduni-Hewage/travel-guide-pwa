import { useState, useEffect } from 'react'

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    let cancelled = false

    const checkConnection = async () => {
      try {
        await fetch('/manifest.webmanifest', {
          method: 'HEAD',
          cache: 'no-store',
        })
        if (!cancelled) setIsOnline(true)
      } catch {
        if (!cancelled) setIsOnline(false)
      }
    }

    checkConnection()

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    const interval = setInterval(checkConnection, 2000)

    return () => {
      cancelled = true
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      clearInterval(interval)
    }
  }, [])

  return isOnline
}
