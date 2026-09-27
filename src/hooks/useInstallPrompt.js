import { useEffect, useState } from 'react'

const INSTALLED_KEY = 'lanka_pwa_installed'

export const useInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null)

  const [isInstalled, setIsInstalled] = useState(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true

    const previouslyInstalled = localStorage.getItem(INSTALLED_KEY) === 'true'

    return standalone || previouslyInstalled
  })

  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()

      // If the browser offers installation again,
      // the app should be treated as not currently installed.
      localStorage.removeItem(INSTALLED_KEY)

      setIsInstalled(false)
      setDeferredPrompt(event)
      setIsInstallable(true)
    }

    const handleAppInstalled = () => {
      localStorage.setItem(INSTALLED_KEY, 'true')

      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
    }

    const displayMode = window.matchMedia('(display-mode: standalone)')

    const handleDisplayModeChange = (event) => {
      if (event.matches) {
        localStorage.setItem(INSTALLED_KEY, 'true')

        setIsInstalled(true)
        setIsInstallable(false)
        setDeferredPrompt(null)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    window.addEventListener('appinstalled', handleAppInstalled)

    displayMode.addEventListener('change', handleDisplayModeChange)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

      window.removeEventListener('appinstalled', handleAppInstalled)

      displayMode.removeEventListener('change', handleDisplayModeChange)
    }
  }, [])

  const promptInstall = async () => {
    if (!deferredPrompt) {
      return false
    }

    deferredPrompt.prompt()

    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      // Do not mark it installed here.
      // The appinstalled event will confirm successful installation.
      setIsInstallable(false)
      setDeferredPrompt(null)

      return true
    }

    return false
  }

  return {
    isInstallable,
    isInstalled,
    promptInstall,
  }
}
