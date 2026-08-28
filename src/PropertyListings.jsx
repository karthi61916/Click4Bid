import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  MapPin, Phone, Mail, Share2, AtSign, Camera, Link2, Video,
  ChevronDown, Menu, X, Search, ShieldCheck, Landmark, Building2,
  Home as HomeIcon, Warehouse, Sprout, ArrowRight, ChevronLeft, ChevronRight,
} from "lucide-react";

/* lucide-react dropped brand/social icons (trademark reasons) —
   map the old names to close generic equivalents, matching Click4Bid.jsx */
const Facebook = Share2;
const Twitter = AtSign;
const Instagram = Camera;
const Linkedin = Link2;
const Youtube = Video;

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');";

const TYPE_ICON = {
  Residential: HomeIcon,
  Commercial: Building2,
  Industrial: Warehouse,
  Agricultural: Sprout,
};

/* Nav dropdown config — matches Click4Bid.jsx exactly so both pages
   share the same working links. */
const NAV_DROPDOWNS = [
  {
    label: "Property",
    items: [
      { label: "Property Listing", path: "/property-listing" },
      { label: "Property Details", path: null },
    ],
  },
  {
    label: "Auctions",
    items: [
      { label: "Running Auctions", path: null },
      { label: "Upcoming Auctions", path: null },
    ],
  },
  {
    label: "Banks",
    items: [
      { label: "SBI", path: null },
      { label: "HDFC", path: null },
      { label: "ICICI", path: null },
      { label: "AXIS", path: null },
    ],
  },
];

const PROPERTIES = [
  { id: 1, title: "Luxury Apartment", type: "Residential", status: "LIVE", location: "Bangalore, Karnataka", infoLabel: "Bedrooms", infoValue: "3 BHK", area: "1,850 Sq.Ft", reserve: "52,00,000", bank: "SBI" },
  { id: 2, title: "Commercial Office Space", type: "Commercial", status: "LIVE", location: "Hyderabad, Telangana", infoLabel: "Type", infoValue: "Office", area: "3,200 Sq.Ft", reserve: "1,25,00,000", bank: "HDFC" },
  { id: 3, title: "Industrial Warehouse", type: "Industrial", status: "LIVE", location: "Chennai, Tamil Nadu", infoLabel: "Type", infoValue: "Warehouse", area: "6,500 Sq.Ft", reserve: "95,00,000", bank: "ICICI" },
  { id: 4, title: "3 BHK Villa", type: "Residential", status: "UPCOMING", location: "Bengaluru, Karnataka", infoLabel: "Bedrooms", infoValue: "3 BHK", area: "2,450 Sq.Ft", reserve: "82,00,000", bank: "SBI" },
  { id: 5, title: "Commercial Complex", type: "Commercial", status: "UPCOMING", location: "Hyderabad, Telangana", infoLabel: "Type", infoValue: "Complex", area: "8,500 Sq.Ft", reserve: "1,60,00,000", bank: "Canara Bank" },
  { id: 6, title: "Industrial Land", type: "Industrial", status: "UPCOMING", location: "Chennai, Tamil Nadu", infoLabel: "Type", infoValue: "Land", area: "12,000 Sq.Ft", reserve: "2,05,00,000", bank: "Bank of Baroda" },
  { id: 7, title: "Independent House", type: "Residential", status: "LIVE", location: "Pune, Maharashtra", infoLabel: "Bedrooms", infoValue: "4 BHK", area: "2,100 Sq.Ft", reserve: "65,00,000", bank: "Axis Bank" },
  { id: 8, title: "Agricultural Land", type: "Agricultural", status: "LIVE", location: "Mysore, Karnataka", infoLabel: "Type", infoValue: "Land", area: "3 Acres", reserve: "35,00,000", bank: "PNB" },
  { id: 9, title: "Office Building", type: "Commercial", status: "LIVE", location: "Mumbai, Maharashtra", infoLabel: "Type", infoValue: "Building", area: "10,500 Sq.Ft", reserve: "2,15,00,000", bank: "HDFC" },
];

const PAGE_SIZE = 9;

function reserveToNumber(reserve) {
  // "1,25,00,000" -> 12500000
  return Number(reserve.replace(/,/g, ""));
}

function TypeTile({ type }) {
  const Icon = TYPE_ICON[type] || Building2;
  return (
    <div className="relative flex items-center justify-center overflow-hidden h-40 bg-slate-900">
      <div className="absolute -right-6 -top-8 h-28 w-28 rotate-12 bg-amber-500/20 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110" />
      <div className="absolute -left-4 -bottom-10 h-24 w-24 rotate-45 bg-amber-500/10" />
      <Icon className="relative text-amber-400 transition-transform duration-500 group-hover:scale-110" size={44} strokeWidth={1.5} />
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function DropdownItem({ item, className, onClick }) {
  if (item.path) {
    return (
      <Link to={item.path} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href="#" className={className} onClick={onClick}>
      {item.label}
    </a>
  );
}

export default function PropertyListings() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const [typeFilter, setTypeFilter] = useState("All Properties");
  const [stateFilter, setStateFilter] = useState("Select State");
  const [cityFilter, setCityFilter] = useState("Select City");
  const [budgetFilter, setBudgetFilter] = useState("Any Budget");
  const [sortBy, setSortBy] = useState("Sort By: Latest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = useMemo(() => {
    let list = [...PROPERTIES];

    if (typeFilter !== "All Properties") {
      list = list.filter((p) => p.type === typeFilter);
    }
    if (cityFilter !== "Select City") {
      list = list.filter((p) => p.location.toLowerCase().includes(cityFilter.toLowerCase()));
    }
    if (stateFilter !== "Select State") {
      list = list.filter((p) => p.location.toLowerCase().includes(stateFilter.toLowerCase()));
    }
    if (budgetFilter !== "Any Budget") {
      list = list.filter((p) => {
        const val = reserveToNumber(p.reserve);
        if (budgetFilter === "Below ₹25 Lakhs") return val < 2500000;
        if (budgetFilter === "₹25 - ₹50 Lakhs") return val >= 2500000 && val <= 5000000;
        if (budgetFilter === "₹50 Lakhs - ₹1 Crore") return val > 5000000 && val <= 10000000;
        if (budgetFilter === "Above ₹1 Crore") return val > 10000000;
        return true;
      });
    }

    if (sortBy === "Price: Low to High") {
      list.sort((a, b) => reserveToNumber(a.reserve) - reserveToNumber(b.reserve));
    } else if (sortBy === "Price: High to Low") {
      list.sort((a, b) => reserveToNumber(b.reserve) - reserveToNumber(a.reserve));
    }

    return list;
  }, [typeFilter, stateFilter, cityFilter, budgetFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }} className="bg-slate-50 text-slate-800 min-h-screen">
      <style>{`
        ${FONT_IMPORT}
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono-data { font-family: 'JetBrains Mono', monospace; }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.55); }
          70% { box-shadow: 0 0 0 7px rgba(16,185,129,0); }
        }
        .pulse-dot { animation: pulseDot 1.8s infinite; }
        html { scroll-behavior: smooth; }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fadeInDown 0.7s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .pulse-dot, .animate-fade-in-down { animation: none; }
          html { scroll-behavior: auto; }
        }
      `}</style>

      {/* ================= TOP UTILITY BAR ================= */}
      <div className="hidden sm:flex items-center justify-between bg-slate-950 text-slate-300 text-xs px-6 py-2">
        <div className="flex items-center gap-1.5">
          <MapPin size={13} className="text-amber-500" />
          India's Most Trusted E-Auction Platform
        </div>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5"><Phone size={13} className="text-amber-500" /> +91 9876543210</span>
          <span className="flex items-center gap-1.5"><Mail size={13} className="text-amber-500" /> support@click4bid.com</span>
          <div className="flex items-center gap-3 border-l border-slate-700 pl-4">
            <Facebook size={13} className="hover:text-amber-500 cursor-pointer" />
            <Twitter size={13} className="hover:text-amber-500 cursor-pointer" />
            <Instagram size={13} className="hover:text-amber-500 cursor-pointer" />
            <Linkedin size={13} className="hover:text-amber-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className={`sticky top-0 z-40 bg-white transition-shadow ${scrolled ? "shadow-md" : "shadow-sm"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-slate-900">
            <span className="grid place-items-center h-9 w-9 rounded bg-slate-900 text-amber-400 font-mono-data text-sm">C4</span>
            Click4Bid
          </Link>

          <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
            <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-amber-500 transition-colors">About Us</Link></li>
            {NAV_DROPDOWNS.map((d) => (
              <li key={d.label} className="relative group">
                <button className={`flex items-center gap-1 transition-colors ${d.label === "Property" ? "text-amber-500" : "hover:text-amber-500"}`}>
                  {d.label} <ChevronDown size={14} />
                </button>
                <ul className="absolute left-0 top-full mt-2 w-48 rounded-lg bg-white shadow-lg border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {d.items.map((it) => (
                    <li key={it.label}>
                      <DropdownItem
                        item={it}
                        className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-amber-500"
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li><a href="#" className="hover:text-amber-500 transition-colors">Contact Us</a></li>
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-amber-500 transition-colors">Login</button>
            <button className="px-5 py-2 text-sm font-semibold rounded-md bg-amber-500 text-slate-900 hover:bg-amber-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 active:scale-95">Register</button>
          </div>

          <button className="lg:hidden text-slate-800" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-slate-100 px-6 py-4 space-y-1 text-sm font-medium text-slate-700">
            <Link to="/" className="block py-2" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" className="block py-2" onClick={() => setMenuOpen(false)}>About Us</Link>
            <a href="#" className="block py-2">Contact Us</a>
            {NAV_DROPDOWNS.map((d) => (
              <div key={d.label}>
                <button
                  className="flex w-full items-center justify-between py-2"
                  onClick={() => setOpenDropdown(openDropdown === d.label ? null : d.label)}
                >
                  {d.label}
                  <ChevronDown size={14} className={`transition-transform ${openDropdown === d.label ? "rotate-180" : ""}`} />
                </button>
                {openDropdown === d.label && (
                  <div className="pl-4 pb-2 space-y-1 text-slate-500">
                    {d.items.map((it) => (
                      <DropdownItem
                        key={it.label}
                        item={it}
                        className="block py-1"
                        onClick={() => setMenuOpen(false)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex gap-3 pt-3">
              <button className="flex-1 px-4 py-2 rounded-md border border-slate-200 font-semibold">Login</button>
              <button className="flex-1 px-4 py-2 rounded-md bg-amber-500 text-slate-900 font-semibold">Register</button>
            </div>
          </div>
        )}
      </nav>

      {/* ================= PAGE HEADER ================= */}
      <section className="relative bg-slate-900 pt-16 pb-24 px-6 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-500/10" />
        <div className="absolute right-10 bottom-0 h-64 w-64 rotate-12 bg-amber-500/5" />
        <div className="relative max-w-7xl mx-auto text-center animate-fade-in-down">
          <p className="font-mono-data text-amber-400 text-sm tracking-widest uppercase mb-3">Browse All Listings</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
            Property <span className="text-amber-400">Listings</span>
          </h1>
          <p className="text-slate-300 mt-5 text-lg max-w-xl mx-auto">
            Explore verified bank auction properties across India.
          </p>
        </div>
      </section>

      {/* ================= SEARCH / FILTER BAR ================= */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto -mt-14 relative z-10 bg-white rounded-xl shadow-xl border-l-4 border-amber-500 p-6 grid md:grid-cols-5 gap-4 animate-fade-in-down transition-shadow duration-300 hover:shadow-2xl">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Property Type</label>
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
              className="w-full border border-slate-200 rounded-md px-3 py-2.5 text-sm text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 hover:border-amber-300"
            >
              {["All Properties", "Residential", "Commercial", "Industrial", "Agricultural"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">State</label>
            <select
              value={stateFilter}
              onChange={(e) => { setStateFilter(e.target.value); setPage(1); }}
              className="w-full border border-slate-200 rounded-md px-3 py-2.5 text-sm text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 hover:border-amber-300"
            >
              {["Select State", "Karnataka", "Telangana", "Tamil Nadu", "Maharashtra"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">City</label>
            <select
              value={cityFilter}
              onChange={(e) => { setCityFilter(e.target.value); setPage(1); }}
              className="w-full border border-slate-200 rounded-md px-3 py-2.5 text-sm text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 hover:border-amber-300"
            >
              {["Select City", "Bangalore", "Hyderabad", "Chennai", "Mumbai", "Pune", "Mysore"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Budget</label>
            <select
              value={budgetFilter}
              onChange={(e) => { setBudgetFilter(e.target.value); setPage(1); }}
              className="w-full border border-slate-200 rounded-md px-3 py-2.5 text-sm text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 hover:border-amber-300"
            >
              {["Any Budget", "Below ₹25 Lakhs", "₹25 - ₹50 Lakhs", "₹50 Lakhs - ₹1 Crore", "Above ₹1 Crore"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setPage(1)}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md py-2.5 text-sm font-semibold transition-all duration-300 hover:shadow-lg active:scale-95"
            >
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* ================= LISTINGS ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24">
        <Reveal className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Available <span className="text-amber-500">Properties</span>
            </h2>
            <p className="text-slate-500 text-sm mt-1">{filtered.length} propert{filtered.length === 1 ? "y" : "ies"} found</p>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-slate-200 rounded-md px-4 py-2.5 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 hover:border-amber-300 transition-colors"
          >
            {["Sort By: Latest", "Price: Low to High", "Price: High to Low"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </Reveal>

        {paginated.length === 0 ? (
          <Reveal className="text-center py-20 bg-white rounded-xl border border-slate-100 shadow-sm">
            <p className="text-slate-500">No properties match your filters. Try widening your search.</p>
          </Reveal>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {paginated.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 100}>
                <div className="group rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                  <div className="relative">
                    <TypeTile type={p.type} />
                    <span className="absolute top-3 left-3 inline-block text-xs font-semibold px-2.5 py-1 rounded bg-white text-slate-900 shadow-sm">
                      {p.type}
                    </span>
                    <span
                      className={`absolute top-3 right-3 inline-flex items-center gap-1.5 text-white text-xs font-bold px-2.5 py-1 rounded-full ${
                        p.status === "LIVE" ? "bg-emerald-600" : "bg-slate-700"
                      }`}
                    >
                      {p.status === "LIVE" && <span className="h-1.5 w-1.5 rounded-full bg-white pulse-dot" />}
                      {p.status}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display font-semibold text-lg text-slate-900">{p.title}</h3>
                    <p className="text-slate-500 text-sm flex items-center gap-1.5 mt-1">
                      <MapPin size={14} /> {p.location}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mt-4 border-t border-b border-slate-100 py-3">
                      <div>
                        <p className="font-display font-semibold text-slate-900 text-sm">{p.infoValue}</p>
                        <p className="text-xs text-slate-400">{p.infoLabel}</p>
                      </div>
                      <div>
                        <p className="font-display font-semibold text-slate-900 text-sm">{p.area}</p>
                        <p className="text-xs text-slate-400">Area</p>
                      </div>
                      <div>
                        <p className="font-mono-data font-semibold text-slate-900 text-sm">₹{p.reserve}</p>
                        <p className="text-xs text-slate-400">Reserve</p>
                      </div>
                    </div>

                    <p className="font-mono-data font-bold text-slate-900 text-xl mt-3">₹{p.reserve}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                      <Landmark size={13} className="text-amber-500" /> Bank: {p.bank}
                    </p>

                    <div className="flex gap-3 mt-4">
                      <a
                        href="#"
                        className="flex-1 text-center border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white text-sm font-semibold py-2.5 rounded-md transition-all duration-300"
                      >
                        View Details
                      </a>
                      <a
                        href="#"
                        className="flex-1 text-center bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white text-sm font-semibold py-2.5 rounded-md transition-all duration-300 hover:shadow-lg"
                      >
                        Bid Now
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-14">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-9 w-9 grid place-items-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-amber-400 hover:text-amber-600 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-9 w-9 grid place-items-center rounded-md text-sm font-semibold transition-colors ${
                  currentPage === i + 1
                    ? "bg-amber-500 text-slate-900"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-amber-400 hover:text-amber-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="h-9 w-9 grid place-items-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-amber-400 hover:text-amber-600 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="bg-slate-900 py-14 px-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="text-amber-400" size={28} strokeWidth={1.5} />
            <p className="text-white font-display font-semibold mt-3">Verified Listings</p>
            <p className="text-slate-400 text-sm mt-1">Every property is bank-verified before listing.</p>
          </div>
          <div className="flex flex-col items-center">
            <Landmark className="text-amber-400" size={28} strokeWidth={1.5} />
            <p className="text-white font-display font-semibold mt-3">100+ Banking Partners</p>
            <p className="text-slate-400 text-sm mt-1">Direct listings from India's leading banks.</p>
          </div>
          <div className="flex flex-col items-center">
            <HomeIcon className="text-amber-400" size={28} strokeWidth={1.5} />
            <p className="text-white font-display font-semibold mt-3">15,000+ Properties</p>
            <p className="text-slate-400 text-sm mt-1">Residential, commercial, industrial &amp; agricultural.</p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-6 px-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg text-white mb-4">
              <span className="grid place-items-center h-8 w-8 rounded bg-amber-500 text-slate-900 font-mono-data text-xs">C4</span>
              Click4Bid
            </Link>
            <p className="text-sm leading-relaxed">
              Click4Bid is India's trusted online property auction platform connecting buyers with verified bank auction properties across the country.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-8 w-8 grid place-items-center rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-900 transition-colors">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link to="/property-listing" className="hover:text-amber-400 transition-colors">Property Listing</Link></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Running Auctions</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Upcoming Auctions</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Property Categories</h3>
            <ul className="space-y-2 text-sm">
              {["Residential", "Commercial", "Industrial", "Agricultural", "Plots", "Apartments"].map((l) => (
                <li key={l}>
                  <button
                    onClick={() => { setTypeFilter(l === "Plots" || l === "Apartments" ? "All Properties" : l); setPage(1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0 text-amber-500" /> Bengaluru, Karnataka, India</li>
              <li className="flex items-center gap-2"><Phone size={15} className="text-amber-500" /> +91 9876543210</li>
              <li className="flex items-center gap-2"><Mail size={15} className="text-amber-500" /> support@click4bid.com</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-10 pt-6 text-center text-xs text-slate-500">
          © 2026 Click4Bid. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
