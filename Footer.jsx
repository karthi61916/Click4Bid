import { Link } from 'react-router-dom'
import { Gavel } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/70 mt-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 text-paper mb-3">
            <Gavel size={18} className="text-brass" strokeWidth={1.75} />
            <span className="font-serif text-lg">Click4Bid</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            A neutral online venue where partner banks list secured assets for sale
            under the SARFAESI Act, and registered bidders compete transparently.
          </p>
        </div>

        <div>
          <h4 className="text-paper text-sm mb-3">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/auctions" className="hover:text-paper">Browse Lots</Link></li>
            <li><Link to="/how-it-works" className="hover:text-paper">How It Works</Link></li>
            <li><Link to="/register" className="hover:text-paper">Register to Bid</Link></li>
            <li><Link to="/dashboard" className="hover:text-paper">My Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-paper text-sm mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-paper">Bidder's Guide (PDF)</a></li>
            <li><a href="#" className="hover:text-paper">EMD & Refund Policy</a></li>
            <li><a href="#" className="hover:text-paper">Terms of Sale</a></li>
            <li><Link to="/contact" className="hover:text-paper">Grievance Redressal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-paper text-sm mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>support@click4bid.example</li>
            <li>+91 80-4567-1200</li>
            <li>Mon–Sat, 9:30 AM – 6:30 PM IST</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-5 flex flex-col md:flex-row gap-2 justify-between text-xs text-paper/50">
          <p>© {new Date().getFullYear()} Click4Bid. All auction listings are published on behalf of respective secured creditors.</p>
          <p>Sample platform for demonstration — not an actual auction house.</p>
        </div>
      </div>
    </footer>
  )
}
