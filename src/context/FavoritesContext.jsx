import { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const FavoritesContext = createContext(null)

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage('lanka_favorites', [])

  const toggleFavorite = (attractionId) => {
    setFavorites((prev) =>
      prev.includes(attractionId) ? prev.filter((id) => id !== attractionId) : [...prev, attractionId]
    )
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
