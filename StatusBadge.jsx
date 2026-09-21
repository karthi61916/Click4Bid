const STYLES = {
  live: { label: 'Live', dot: 'bg-forecast', text: 'text-forecast' },
  upcoming: { label: 'Upcoming', dot: 'bg-brass-dark', text: 'text-brass-dark' },
  closed: { label: 'Closed', dot: 'bg-ink-soft', text: 'text-ink-soft' }
}

export default function StatusBadge({ status }) {
  const s = STYLES[status] || STYLES.closed
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${s.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot} ${status === 'live' ? 'animate-pulse' : ''}`} />
      {s.label}
    </span>
  )
}
