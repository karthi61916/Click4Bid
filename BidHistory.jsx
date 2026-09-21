import { formatINR } from '../data/properties'

export default function BidHistory({ activity }) {
  if (activity.length === 0) {
    return <p className="text-sm text-ink-soft py-6">No bids placed yet. Be the first to bid on this lot.</p>
  }

  return (
    <ul className="divide-y divide-ink/10">
      {activity.map((a, i) => (
        <li key={i} className="flex items-center justify-between py-3 text-sm">
          <div>
            <span className="text-ink">{a.bidder}</span>
            <span className="text-ink-soft ml-2">
              {new Date(a.time).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <span className="font-mono text-ink">{formatINR(a.amount)}</span>
        </li>
      ))}
    </ul>
  )
}
