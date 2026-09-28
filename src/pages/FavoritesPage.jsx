import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, SlidersHorizontal, Navigation, Heart, ChevronDown, Check } from 'lucide-react'

import { useFavorites } from '../context/FavoritesContext'
import { useLocation } from '../context/LocationContext'
import attractions from '../data/attractions.json'

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1586016413664-864c0dd76f53?w=800'

function FavoriteCard({ attraction, onRemove }) {
  const navigate = useNavigate()
  const { getFormattedDistanceTo } = useLocation()
  const distance = getFormattedDistanceTo(attraction.lat, attraction.lng)

  return (
    <div
      className="rounded-2xl overflow-hidden group pb-1!"
      style={{
        backgroundColor: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div className="relative">
        <img
          src={attraction.image || FALLBACK_IMAGE}
          alt={attraction.name}
          className="w-full h-48 md:h-70 object-cover"
        />

        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span
            className="px-3! py-1! rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: 'var(--sample-bg3)' }}
          >
            {attraction.category}
          </span>
          {distance && (
            <span
              className="px-2! py-1! gap-1 flex items-center rounded-full text-xs text-white"
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            >
              <Navigation className="w-3 h-3" />
              {distance}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove(attraction.id, attraction.name)
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center min-h-0 min-w-0 cursor-pointer"
          style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}
        >
          <Heart className="w-5 h-5" style={{ color: '#ef4444' }} fill="#ef4444" />
        </button>
      </div>

      <div className="p-4!">
        <div className="flex items-start justify-between gap-2 mb-2!">
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
            <Star className="w-3.5 h-3.5" fill="currentColor" style={{ color: 'var(--color-accent)' }} />
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

          <button
            type="button"
            className="text-xs whitespace-nowrap cursor-pointer min-h-0 min-w-0"
            style={{
              color: 'var(--des-footer-text)',
            }}
            onClick={() => navigate(`/attraction/${attraction.id}`)}
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  )
}

function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites()
  const navigate = useNavigate()

  const [selectedCategory, setSelectedCategory] = useState('All')

  const [filterOpen, setFilterOpen] = useState(false)

  const categories = ['All', 'Historical', 'Nature', 'Beaches', 'Hotels']

  const savedAttractions = attractions.filter((attraction) => favorites.includes(attraction.id))

  const filteredSavedAttractions =
    selectedCategory === 'All'
      ? savedAttractions
      : savedAttractions.filter((attraction) => attraction.category === selectedCategory)

  return (
    <div className="min-h-screen pb-15! md:pb-4!" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto! px-4! md:px-8! py-6!">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1
              className="text-xl md:text-3xl font-bold mb-2! md:mt-2!"
              style={{
                color: 'var(--des-footer-text)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Your Saved Gems
            </h1>
            <p className="text-sm md:text-base md:pb-3!" style={{ color: 'var(--color-text-muted)' }}>
              {savedAttractions.length > 0
                ? 'Hand-picked destinations for your ultimate Sri Lankan journey.'
                : 'Start exploring and save places you love.'}
            </p>
          </div>

          {savedAttractions.length > 0 && (
            <div className="hidden md:block relative">
              <button
                type="button"
                onClick={() => setFilterOpen((open) => !open)}
                className="flex items-center gap-3 px-5! py-2.5! rounded-full text-sm font-medium cursor-pointer min-h-0"
                style={{
                  color: 'var(--color-text)',
                  backgroundColor: 'var(--sample-bg1)',
                  border: '1px solid var(--color-border)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
              >
                <SlidersHorizontal
                  className="w-4 h-4"
                  style={{
                    color: 'var(--color-text-muted)',
                  }}
                />

                <span>{selectedCategory === 'All' ? 'All Categories' : selectedCategory}</span>

                <ChevronDown
                  className={`w-4 h-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`}
                  style={{
                    color: 'var(--color-text-muted)',
                  }}
                />
              </button>

              {filterOpen && (
                <div
                  className="absolute right-0 mt-2! w-52 rounded-2xl p-2! z-50"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  }}
                >
                  {categories.map((category) => {
                    const active = selectedCategory === category

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(category)
                          setFilterOpen(false)
                        }}
                        className="w-full flex items-center justify-between px-4! py-2.5! rounded-xl text-sm cursor-pointer min-h-0 transition-colors"
                        style={{
                          color: active ? 'var(--color-primary)' : 'var(--color-text)',
                          backgroundColor: active ? 'var(--sample-bg2)' : 'transparent',
                        }}
                      >
                        <span>{category === 'All' ? 'All Categories' : category}</span>

                        {active && (
                          <Check
                            className="w-4 h-4"
                            style={{
                              color: 'var(--color-primary)',
                            }}
                          />
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {savedAttractions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24! gap-4!">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              🏝️
            </div>
            <h2
              className="text-xl font-medium"
              style={{
                color: 'var(--color-text)',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              No saved gems yet
            </h2>
            <p className="text-sm text-center max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
              Start exploring Sri Lanka and save the places that speak to your soul.
            </p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6! py-3! rounded-full text-white text-sm font-medium min-h-0 cursor-pointer"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginTop: '5rem' }}>
              {filteredSavedAttractions.length === 0 ? (
                <div className="flex flex-col items-center text-center">
                  <p
                    className="text-base font-medium mb-2!"
                    style={{
                      color: 'var(--color-text)',
                    }}
                  >
                    No saved {selectedCategory} places yet.
                  </p>

                  <p
                    className="text-sm mb-5!"
                    style={{
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    Try another category or explore more destinations.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedCategory('All')}
                    className="px-6! py-2.5! rounded-full text-sm font-medium cursor-pointer min-h-0"
                    style={{
                      color: 'var(--color-primary)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg)',
                    }}
                  >
                    Show All Saved
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredSavedAttractions.map((attraction) => (
                    <FavoriteCard key={attraction.id} attraction={attraction} onRemove={toggleFavorite} />
                  ))}
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div
              className="text-center flex flex-col items-center"
              style={{
                marginTop: filteredSavedAttractions.length === 0 ? '10rem' : '3.5rem',
              }}
            >
              <p
                className="text-base font-medium mb-2!"
                style={{
                  color: 'var(--des-footer-text)',
                }}
              >
                Want more recommendations?
              </p>

              <p
                className="text-sm mb-6! w-full max-w-md px-4!"
                style={{
                  color: 'var(--color-text-muted)',
                }}
              >
                Our local curators have hand-picked several new boutique villas and hidden waterfall trails that align
                with your interests.
              </p>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-8! py-2! rounded-full text-sm font-medium min-h-0 cursor-pointer"
                style={{
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  backgroundColor: 'transparent',
                }}
              >
                Explore More Gems →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default FavoritesPage
