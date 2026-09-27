import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { sendNotification } from '../utils/notifications'

const FavoritesContext = createContext(null)

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage('lanka_favorites', [])

  const toggleFavorite = (attractionId, attractionName) => {
    setFavorites((prev) => {
      const isAdding = !prev.includes(attractionId)

      const notificationsEnabled = localStorage.getItem('lanka_notifications') === 'true'

      if (notificationsEnabled && attractionName) {
        if (isAdding) {
          sendNotification('Added to Favorites ❤️', {
            body: `${attractionName} has been saved to your travel list.`,
          })
        } else {
          sendNotification('Removed from Favorites', {
            body: `${attractionName} has been removed from your travel list.`,
          })
        }
      }

      return isAdding ? [...prev, attractionId] : prev.filter((id) => id !== attractionId)
    })
  }

  const isFavorite = (attractionId) => favorites.includes(attractionId)

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>{children}</FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
