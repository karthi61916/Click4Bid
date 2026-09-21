import { Link } from 'react-router-dom'
import { MapPin, Ruler } from 'lucide-react'
import StatusBadge from './StatusBadge'
import CountdownTimer from './CountdownTimer'
import { formatINR } from '../data/properties'

export default function PropertyCard({ lot }) {
  return (
    <Link
      to={`/auctions/${lot.id}`}
      className="group block border border-ink/10 bg-white hover:border-brass transition-colors"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-light">
        <img
          src={lot.images[0]}
          alt={lot.title}
          loading="lazy"
          className="h-full w-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-[filter] duration-300"
        />
        <div className="absolute top-3 left-3 bg-paper/95 px-2 py-1">
          <span className="lot-number">LOT {lot.id}</span>
        </div>
        <div className="absolute top-3 right-3 bg-paper/95 px-2 py-1">
          <StatusBadge status={lot.status} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base leading-snug mb-1.5 group-hover:text-brass-dark transition-colors">
          {lot.title}
        </h3>
        <div className="flex items-center gap-3 text-xs text-ink-soft mb-3">
          <span className="inline-flex items-center gap-1">
            <MapPin size={12} /> {lot.city}, {lot.state}
          </span>
          <span className="inline-flex items-center gap-1">
            <Ruler size={12} /> {lot.area.toLocaleString('en-IN')} {lot.areaUnit}
          </span>
        </div>

        <div className="rule pt-3 flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-ink-soft">
              {lot.bidCount > 0 ? 'Current bid' : 'Reserve price'}
            </div>
            <div className="font-serif text-lg text-ink">
              {formatINR(lot.bidCount > 0 ? lot.currentBid : lot.reservePrice)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest text-ink-soft mb-0.5">
              {lot.status === 'closed' ? 'Ended' : 'Closes in'}
            </div>
            <CountdownTimer target={lot.auctionEnd} compact />
          </div>
        </div>
      </div>
    </Link>
  )
}
