import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Gavel, UserRound } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const LINKS = [
  { to: '/auctions', label: 'Browse Lots' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `text-sm tracking-wide transition-colors ${isActive ? 'text-brass-dark' : 'text-ink/80 hover:text-ink'}`

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-ink/10">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Gavel size={20} className="text-brass-dark" strokeWidth={1.75} />
            <span className="font-serif text-xl tracking-tightest">Click4Bid</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="text-sm inline-flex items-center gap-1.5 text-ink/80 hover:text-ink">
                  <UserRound size={16} /> {user.name}
                </Link>
                <button
                  onClick={() => {
                    logout()
                    navigate('/')
                  }}
                  className="btn-ghost !px-4 !py-2 text-xs"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost !px-4 !py-2 text-xs">
                  Sign in
                </Link>
                <Link to="/register" className="btn-primary !px-4 !py-2 text-xs">
                  Register to Bid
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden p-2 -mr-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-paper">
          <div className="px-4 py-4 flex flex-col gap-4">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
                {l.label}
              </NavLink>
            ))}
            <div className="rule pt-4 flex flex-col gap-3">
              {user ? (
                <>
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="text-sm text-ink/80">
                    My Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setOpen(false)
                      navigate('/')
                    }}
                    className="btn-ghost text-xs w-full"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-ghost text-xs w-full">
                    Sign in
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="btn-primary text-xs w-full">
                    Register to Bid
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
