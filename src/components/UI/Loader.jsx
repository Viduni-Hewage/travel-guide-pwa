function Loader({ fullScreen = false }) {
  return (
    <div className={`flex justify-center items-center mx-auto! ${fullScreen ? 'h-screen' : 'h-64'}`}>
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: 'var(--color-primary)',
              animation: 'dotPulse 1.2s ease-in-out infinite',
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Loader
