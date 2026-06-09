import { useOnlineStatus } from '../../hooks/useOnlineStatus'
import { WifiOff } from 'lucide-react'

function OfflineBanner() {
  const isOnline = useOnlineStatus()

  if (isOnline) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-2 py-2 px-4"
      style={{ backgroundColor: '#D97706' }}
    >
      <WifiOff className="w-3.5 h-3.5 text-white shrink-0" />
      <p className="text-white text-xs font-medium">You're offline — some features may be unavailable</p>
    </div>
  )
}

export default OfflineBanner
