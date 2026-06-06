import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SplashPage() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const hasVisited = localStorage.getItem('lanka_visited')

    if (hasVisited) {
      navigate('/', { replace: true })
      return
    }

    let current = 0
    const progressInterval = setInterval(() => {
      current += 1
      setProgress(current)
      if (current >= 100) {
        clearInterval(progressInterval)
      }
    }, 25)

    const timer = setTimeout(() => {
      localStorage.setItem('lanka_visited', 'true')
      navigate('/permission', { replace: true })
    }, 2600)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(timer)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      <div className="flex flex-col items-center gap-6 px-8 w-full max-w-sm">
        <h1 className="text-white text-3xl tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
          LankaExplorer
        </h1>

        <div className="w-12 h-px bg-white opacity-40" />

        <p className="text-white text-lg text-center opacity-80" style={{ fontFamily: "'Playfair Display', serif" }}>
          Discover the Pearl of the Indian Ocean
        </p>

        <div className="w-full relative h-0.5">
          <div className="absolute inset-0 opacity-20" style={{ backgroundColor: '#ffffff' }} />
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: 'var(--color-accent)',
              transition: 'width 40ms linear',
            }}
          />
        </div>

        <p className="text-white text-xs opacity-40 uppercase" style={{ letterSpacing: '0.25em' }}>
          Boutique Heritage Travels
        </p>
      </div>
    </div>
  )
}

export default SplashPage
