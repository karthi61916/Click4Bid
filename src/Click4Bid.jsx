import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MapPin, Phone, Mail, Share2, AtSign, Camera, Link2, Video,
  ChevronDown, Menu, X, Search, Gavel, ShieldCheck, Headphones, TrendingUp,
  Wallet, Landmark, CheckCircle2, Star, StarHalf, Building2, Home as HomeIcon,
  Warehouse, Sprout, Clock, ArrowRight,
} from "lucide-react";

/* lucide-react dropped brand/social icons (trademark reasons) —
   map the old names to close generic equivalents so the rest of
   the file (which references Facebook, Twitter, etc.) still works */
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

const featured = [
  { type: "Residential", title: "Luxury Apartment", location: "Bangalore, Karnataka", price: "52,00,000" },
  { type: "Commercial", title: "Office Space", location: "Hyderabad", price: "1,25,00,000" },
  { type: "Industrial", title: "Warehouse", location: "Chennai", price: "95,00,000" },
];

const running = [
  { type: "Residential", title: "2 BHK Apartment", location: "Bangalore", reserve: "45,00,000", ends: "12 Aug 2026" },
  { type: "Commercial", title: "Commercial Shop", location: "Hyderabad", reserve: "80,00,000", ends: "15 Aug 2026" },
  { type: "Industrial", title: "Warehouse", location: "Chennai", reserve: "1,20,00,000", ends: "18 Aug 2026" },
  { type: "Residential", title: "Independent House", location: "Pune", reserve: "65,00,000", ends: "19 Aug 2026" },
  { type: "Commercial", title: "Office Building", location: "Mumbai", reserve: "2,15,00,000", ends: "20 Aug 2026" },
  { type: "Agricultural", title: "Agricultural Land", location: "Mysore", reserve: "35,00,000", ends: "22 Aug 2026" },
];

const upcoming = [
  { date: "25 AUG 2026", title: "3 BHK Villa", location: "Bengaluru, Karnataka", reserve: "82,00,000", bank: "SBI" },
  { date: "28 AUG 2026", title: "Commercial Complex", location: "Hyderabad", reserve: "1,60,00,000", bank: "Canara Bank" },
  { date: "30 AUG 2026", title: "Industrial Land", location: "Chennai", reserve: "2,05,00,000", bank: "Bank of Baroda" },
];

const whyUs = [
  { icon: Landmark, title: "Verified Bank Auctions", text: "All properties are verified and listed by authorized banks and financial institutions." },
  { icon: Gavel, title: "Transparent Bidding", text: "Participate in fair and secure online property auctions with complete transparency." },
  { icon: ShieldCheck, title: "100% Secure", text: "Your information and bidding process are protected using advanced security." },
  { icon: Headphones, title: "24×7 Support", text: "Dedicated customer support team available to assist you throughout the auction process." },
  { icon: Wallet, title: "Best Property Deals", text: "Buy residential and commercial properties at competitive auction prices." },
  { icon: TrendingUp, title: "Easy Online Process", text: "Search, register, bid and win properties from anywhere in India." },
];

const banks = ["SBI", "HDFC", "ICICI", "AXIS", "Canara Bank", "PNB", "Bank of Baroda", "Indian Bank"];

const stats = [
  { icon: HomeIcon, value: "15,000+", label: "Properties Listed" },
  { icon: Landmark, value: "100+", label: "Banking Partners" },
  { icon: Building2, value: "25,000+", label: "Happy Customers" },
  { icon: ShieldCheck, value: "10+", label: "Years Experience" },
];

const testimonials = [
  { name: "Rahul Sharma", role: "Property Buyer", stars: 5, text: "Click4Bid made purchasing my first home very easy. The auction process was transparent and hassle-free." },
  { name: "Priya Verma", role: "Business Owner", stars: 5, text: "Excellent service and genuine listings. I successfully purchased my commercial property through Click4Bid." },
  { name: "Anita Patel", role: "Investor", stars: 4.5, text: "Highly recommended platform for bank auction properties. Professional support throughout the bidding process." },
];

function Stars({ count }) {
  const full = Math.floor(count);
  const half = count % 1 !== 0;
  return (
    <div className="flex gap-0.5 text-amber-500">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
      ))}
      {half && <StarHalf size={15} fill="currentColor" strokeWidth={0} />}
    </div>
  );
}

function TypeTile({ type, size = "normal" }) {
  const Icon = TYPE_ICON[type] || Building2;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${
        size === "normal" ? "h-40" : "h-32"
      } bg-slate-900`}
    >
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

export default function Click4Bid() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }} className="bg-slate-50 text-slate-800 min-h-screen">
      <style>{`
        ${FONT_IMPORT}
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono-data { font-family: 'JetBrains Mono', monospace; }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker { animation: ticker 22s linear infinite; }
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
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: floatSlow 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-ticker, .pulse-dot, .animate-fade-in-down, .animate-float { animation: none; }
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
            Click<span className="text-amber-500">4</span>Bid
          </Link>

          <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
            <li><Link to="/" className="text-amber-500">Home</Link></li>
            <li><Link to="/about" className="hover:text-amber-500 transition-colors">About Us</Link></li>
            {[
              { label: "Property", items: ["Property Listing", "Property Details"] },
              { label: "Auctions", items: ["Running Auctions", "Upcoming Auctions"] },
              { label: "Banks", items: ["SBI", "HDFC", "ICICI", "AXIS"] },
            ].map((d) => (
              <li key={d.label} className="relative group">
                <button className="flex items-center gap-1 hover:text-amber-500 transition-colors">
                  {d.label} <ChevronDown size={14} />
                </button>
                <ul className="absolute left-0 top-full mt-2 w-48 rounded-lg bg-white shadow-lg border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {d.items.map((it) => (
                    <li key={it}>
                      <a href="#" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-amber-500">{it}</a>
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
            {[
              { label: "Property", items: ["Property Listing", "Property Details"] },
              { label: "Auctions", items: ["Running Auctions", "Upcoming Auctions"] },
              { label: "Banks", items: ["SBI", "HDFC", "ICICI", "AXIS"] },
            ].map((d) => (
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
                    {d.items.map((it) => <a key={it} href="#" className="block py-1">{it}</a>)}
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

      {/* ================= LIVE TICKER ================= */}
      <div className="bg-emerald-600 text-white overflow-hidden py-2">
        <div className="flex w-max animate-ticker font-mono-data text-xs tracking-wide">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex items-center gap-10 pr-10">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white pulse-dot" /> LIVE — 3BHK Villa · Bangalore
              </span>
              <span>Commercial Complex · Hyderabad</span>
              <span>Industrial Land · Bangalore</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= HERO ================= */}
      <section className="relative bg-slate-900 pt-16 pb-28 px-6 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-500/10" />
        <div className="absolute right-10 bottom-0 h-64 w-64 rotate-12 bg-amber-500/5" />
        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-down">
            <p className="font-mono-data text-amber-400 text-sm tracking-widest uppercase mb-3">India's Most Trusted</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
              Bank Auction <span className="text-amber-400">Platform</span>
            </h1>
            <p className="text-slate-300 mt-5 text-lg max-w-md">
              Discover verified properties and bid securely online.
            </p>
            <a href="#" className="group inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-md bg-amber-500 text-slate-900 font-semibold hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-300">
              Explore Properties <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { icon: HomeIcon, label: "Residential", value: "₹52.0L" },
              { icon: Building2, label: "Commercial", value: "₹1.25Cr" },
              { icon: Warehouse, label: "Industrial", value: "₹95.0L" },
              { icon: Sprout, label: "Agricultural", value: "₹35.0L" },
            ].map((c, i) => (
              <div
                key={c.label}
                className={`rounded-xl bg-slate-800 border border-slate-700 p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/60 hover:shadow-xl hover:shadow-black/20 ${i % 2 ? "mt-6" : ""} ${i % 3 === 0 ? "animate-float" : ""}`}
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <c.icon className="text-amber-400" size={26} strokeWidth={1.5} />
                <p className="text-slate-400 text-xs mt-3">{c.label}</p>
                <p className="font-mono-data text-white font-semibold text-lg">{c.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SEARCH / BID FINDER ================= */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto -mt-14 relative z-10 bg-white rounded-xl shadow-xl border-l-4 border-amber-500 p-6 grid md:grid-cols-5 gap-4 animate-fade-in-down transition-shadow duration-300 hover:shadow-2xl" style={{ animationDelay: "0.2s" }}>
          {[
            { label: "Property Type", options: ["All Properties", "Residential", "Commercial", "Industrial", "Agricultural"] },
            { label: "State", options: ["Select State", "Karnataka", "Maharashtra", "Telangana", "Tamil Nadu"] },
            { label: "City", options: ["Select City", "Bangalore", "Mysore", "Hubli", "Belgaum"] },
            { label: "Budget", options: ["Any Budget", "Below ₹10 Lakhs", "₹10 - ₹25 Lakhs", "₹25 - ₹50 Lakhs", "Above ₹50 Lakhs"] },
          ].map((f) => (
            <div key={f.label}>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">{f.label}</label>
              <select className="w-full border border-slate-200 rounded-md px-3 py-2.5 text-sm text-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 hover:border-amber-300">
                {f.options.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div className="flex items-end">
            <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md py-2.5 text-sm font-semibold transition-all duration-300 hover:shadow-lg active:scale-95">
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROPERTIES ================= */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <Reveal className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900">Featured Properties</h2>
          <p className="text-slate-500 mt-2">Explore the latest bank auction properties across India.</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-7">
          {featured.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="group rounded-xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                <TypeTile type={p.type} />
                <div className="p-5">
                  <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-amber-100 text-amber-700">{p.type}</span>
                  <h3 className="font-display font-semibold text-lg text-slate-900 mt-3">{p.title}</h3>
                  <p className="text-slate-500 text-sm flex items-center gap-1.5 mt-1"><MapPin size={14} /> {p.location}</p>
                  <p className="font-mono-data font-semibold text-slate-900 mt-3">₹{p.price}</p>
                  <a href="#" className="inline-flex items-center gap-1 text-amber-600 font-semibold text-sm mt-3 hover:gap-2 transition-all">
                    View Details <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= RUNNING AUCTIONS ================= */}
      <section className="bg-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900">Running Auctions</h2>
            <p className="text-slate-500 mt-2">Bid now on live bank auction properties.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {running.map((a, i) => (
              <Reveal key={a.title + a.location} delay={(i % 3) * 100}>
                <div className="group rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
                  <div className="relative">
                    <TypeTile type={a.type} />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-white pulse-dot" /> LIVE
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-lg text-slate-900">{a.title}</h3>
                    <p className="text-slate-500 text-sm flex items-center gap-1.5 mt-1"><MapPin size={14} /> {a.location}</p>
                    <p className="text-xs text-slate-400 mt-3">Reserve Price</p>
                    <p className="font-mono-data font-bold text-slate-900 text-lg">₹{a.reserve}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-2"><Clock size={13} /> Ends {a.ends}</p>
                    <a href="#" className="block text-center mt-4 bg-slate-900 hover:bg-amber-500 hover:text-slate-900 text-white font-semibold text-sm py-2.5 rounded-md transition-all duration-300 hover:shadow-lg">
                      Bid Now
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= UPCOMING AUCTIONS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <Reveal className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900">Upcoming Auctions</h2>
          <p className="text-slate-500 mt-2">Plan your bidding with our upcoming auction schedule.</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-7">
          {upcoming.map((u, i) => (
            <Reveal key={u.title} delay={i * 100}>
              <div className="rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-6">
                <span className="font-mono-data text-xs font-bold text-amber-600 tracking-widest">{u.date}</span>
                <h3 className="font-display font-semibold text-lg text-slate-900 mt-2">{u.title}</h3>
                <p className="text-slate-500 text-sm flex items-center gap-1.5 mt-1"><MapPin size={14} /> {u.location}</p>
                <div className="mt-4 space-y-1 text-sm">
                  <p className="text-slate-600"><span className="font-semibold text-slate-900">Reserve Price:</span> <span className="font-mono-data">₹{u.reserve}</span></p>
                  <p className="text-slate-600"><span className="font-semibold text-slate-900">Bank:</span> {u.bank}</p>
                </div>
                <a href="#" className="inline-flex items-center gap-1 text-amber-600 font-semibold text-sm mt-4 hover:gap-2 transition-all">
                  View Details <ArrowRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-slate-900 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-white">Why Choose Click4Bid?</h2>
            <p className="text-slate-400 mt-2">India's trusted platform for transparent bank property auctions.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 100}>
                <div className="rounded-xl bg-slate-800 border border-slate-700 p-6 transition-all duration-300 hover:border-amber-500/60 hover:-translate-y-1 hover:bg-slate-800/80">
                  <w.icon className="text-amber-400 transition-transform duration-300 hover:scale-110" size={28} strokeWidth={1.5} />
                  <h3 className="font-display font-semibold text-white mt-4">{w.title}</h3>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BANKING PARTNERS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <Reveal className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900">Our Banking Partners</h2>
          <p className="text-slate-500 mt-2">Properties from India's leading Banks &amp; Financial Institutions</p>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {banks.map((b, i) => (
            <Reveal key={b} delay={(i % 4) * 80}>
              <div className="flex items-center justify-center h-20 rounded-lg border border-slate-200 bg-white text-slate-600 font-display font-semibold text-sm transition-all duration-300 hover:border-amber-400 hover:text-amber-600 hover:-translate-y-1 hover:shadow-md">
                {b}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section className="bg-amber-500 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="transition-transform duration-300 hover:scale-105">
                <s.icon className="mx-auto text-slate-900" size={30} strokeWidth={1.5} />
                <p className="font-mono-data font-bold text-3xl text-slate-900 mt-3">{s.value}</p>
                <p className="text-slate-800 text-sm mt-1">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= SUCCESS STORY ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div className="rounded-2xl bg-slate-900 aspect-[4/3] flex items-center justify-center relative overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-amber-500/10" />
            <Gavel className="text-amber-400 animate-float" size={64} strokeWidth={1} />
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div>
            <span className="font-mono-data text-amber-600 text-xs tracking-widest uppercase font-bold">Success Story</span>
            <h2 className="font-display text-3xl font-bold text-slate-900 mt-3">Find Your Dream Property Through Click4Bid</h2>
            <p className="text-slate-600 mt-5 leading-relaxed">
              Click4Bid has helped thousands of buyers purchase residential, commercial and industrial properties directly from leading banks through transparent online auctions.
            </p>
            <p className="text-slate-600 mt-4 leading-relaxed">
              Our platform provides verified property details, secure bidding, easy registration and complete transparency during every auction.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 mt-6">
              {["Verified Bank Properties", "Safe & Secure Bidding", "Trusted by Thousands", "Fast Registration Process"].map((li) => (
                <li key={li} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" /> {li}
                </li>
              ))}
            </ul>
            <a href="#" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-md bg-slate-900 text-white font-semibold hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
              Know More <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900">What Our Clients Say</h2>
            <p className="text-slate-500 mt-2">Thousands of customers trust Click4Bid for secure property auctions.</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-7">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-slate-900 text-amber-400 font-display font-bold flex items-center justify-center text-sm">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-slate-900 text-sm">{t.name}</h3>
                      <span className="text-xs text-slate-500">{t.role}</span>
                    </div>
                  </div>
                  <div className="mt-4"><Stars count={t.stars} /></div>
                  <p className="text-slate-600 text-sm mt-3 leading-relaxed">"{t.text}"</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-6 px-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <a href="#" className="flex items-center gap-2 font-display font-bold text-lg text-white mb-4">
              <span className="grid place-items-center h-8 w-8 rounded bg-amber-500 text-slate-900 font-mono-data text-xs">C4</span>
              Click4Bid
            </a>
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
              {["Home", "About Us", "Property Listing", "Running Auctions", "Upcoming Auctions", "Contact Us"].map((l) => (
                <li key={l}><a href="#" className="hover:text-amber-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Property Categories</h3>
            <ul className="space-y-2 text-sm">
              {["Residential", "Commercial", "Industrial", "Agricultural", "Plots", "Apartments"].map((l) => (
                <li key={l}><a href="#" className="hover:text-amber-400 transition-colors">{l}</a></li>
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