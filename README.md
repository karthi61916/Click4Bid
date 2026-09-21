# Click4Bid — E-Auction Platform Frontend

A React frontend for **Click4Bid**, an online e-auction platform for the sale of
bank-seized (SARFAESI) immovable properties: apartments, commercial units, land,
industrial sheds, and agricultural land listed by partner banks/NBFCs.

This is a **frontend-only** build. All data (properties, bids, sessions) is mocked
in `src/data` and `src/context` so the full user journey can be reviewed and
demoed before a backend is wired up. Swapping in real APIs means replacing the
functions in `src/context/*.jsx` and `src/data/properties.js` — no component
needs to change shape.

## Tech stack

- **React 18** + **Vite** — fast dev server and build
- **React Router v6** — client-side routing
- **Tailwind CSS** — utility-first styling, themed via `tailwind.config.js`
- **lucide-react** — icon set

## Getting started

```bash
npm install
npm run dev       # starts the dev server at http://localhost:5173
npm run build      # production build to /dist
npm run preview    # preview the production build locally
```

## Project structure

```
click4bid/
├── index.html
├── tailwind.config.js       # design tokens: colors, fonts, spacing
├── postcss.config.js
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              # app entry, providers, router
    ├── App.jsx                # route table
    ├── index.css              # Tailwind layers + shared component classes
    ├── data/
    │   └── properties.js      # mock lot dataset + formatting helpers
    ├── context/
    │   ├── AuthContext.jsx    # mock login/register/session (localStorage)
    │   └── BidContext.jsx     # in-memory live bidding state per lot
    ├── components/
    │   ├── Layout.jsx         # Navbar + Footer + <Outlet/>
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ProtectedRoute.jsx # redirects unauthenticated users to /login
    │   ├── PropertyCard.jsx   # lot card used in grids
    │   ├── StatusBadge.jsx    # live / upcoming / closed indicator
    │   ├── CountdownTimer.jsx # live countdown to auction close
    │   └── BidHistory.jsx     # bid activity list on the detail page
    └── pages/
        ├── Home.jsx
        ├── Auctions.jsx       # listing grid with search/filter/sort
        ├── PropertyDetail.jsx # lot detail + live bidding panel
        ├── HowItWorks.jsx
        ├── About.jsx
        ├── Contact.jsx
        ├── Login.jsx
        ├── Register.jsx
        ├── Dashboard.jsx      # protected: bidder's own activity
        └── NotFound.jsx
```

## Design direction

The visual language draws from the subject matter — bank sale notices, legal
auction documents, and ledgers — rather than a generic SaaS look:

- **Palette:** ink navy (`#0F1B2D`), paper white (`#FAF9F6`), brass/gold accent
  (`#B8905A`) evoking an auction seal, plus a forecast green and rust red for
  live/urgent auction states.
- **Type:** Source Serif 4 for headings (authority, legal-document feel) paired
  with Inter for UI text, and IBM Plex Mono for lot numbers and countdowns —
  reinforcing the "official record" tone.
- **Structure:** every lot carries a visible **Lot ID** (`C4B-YYYY-NNNN`) styled
  like a document reference, hairline rules instead of card shadows, and no
  rounded-corner card kit — closer to a printed sale-notice ledger than a
  storefront.

## Wiring up a real backend

Everything currently mocked has a single seam to replace:

| Concern | File | Replace with |
|---|---|---|
| Property/lot listings | `src/data/properties.js` | `GET /api/lots`, `GET /api/lots/:id` |
| Auth (login/register/session) | `src/context/AuthContext.jsx` | Real auth API + secure session storage |
| Live bidding & bid history | `src/context/BidContext.jsx` | WebSocket/SSE feed + `POST /api/lots/:id/bids` |
| Document downloads | `PropertyDetail.jsx` document list | Signed URLs from document storage |

## Notes for the client review

- Currency formatting uses `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`.
- Countdown timers, bid validation (minimum increment), and the protected
  dashboard route are all functional against the mock data — the full bidding
  flow can be demoed without a backend.
- Placeholder listing photography is pulled from a public image service and
  should be replaced with real property photography before go-live.
