import { useEffect, useState } from 'react'

function getRemaining(target) {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) return null
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { days, hours, minutes, seconds }
}

export default function CountdownTimer({ target, compact = false }) {
  const [remaining, setRemaining] = useState(() => getRemaining(target))

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  if (!remaining) {
    return <span className="font-mono text-xs text-ink-soft">Auction closed</span>
  }

  const { days, hours, minutes, seconds } = remaining
  const urgent = days === 0 && hours < 3

  if (compact) {
    return (
      <span className={`font-mono text-xs ${urgent ? 'text-rust' : 'text-ink-soft'}`}>
        {days > 0 ? `${days}d ` : ''}
        {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    )
  }

  return (
    <div className={`flex gap-4 font-mono ${urgent ? 'text-rust' : 'text-ink'}`}>
      {[
        ['Days', days],
        ['Hrs', hours],
        ['Min', minutes],
        ['Sec', seconds]
      ].map(([label, value]) => (
        <div key={label} className="text-center">
          <div className="text-2xl md:text-3xl leading-none">{String(value).padStart(2, '0')}</div>
          <div className="text-[10px] uppercase tracking-widest text-ink-soft mt-1">{label}</div>
        </div>
      ))}
    </div>
  )
}
