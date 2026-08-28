import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MapPin, Phone, Mail, Share2, AtSign, Camera, Link2,
  ChevronDown, Menu, X, Gavel, ShieldCheck, CheckCircle2, Wallet,
  Building2, Landmark, Users, Headphones, Smartphone, Star,
} from "lucide-react";

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');";

const features = [
  { icon: Gavel, title: "Transparent Auctions", subtitle: "Fair & open process" },
  { icon: ShieldCheck, title: "RBI & Bank Authorized", subtitle: "Trusted & compliant" },
  { icon: CheckCircle2, title: "Verified Properties", subtitle: "100% authentic" },
  { icon: Wallet, title: "Secure Payments", subtitle: "Safe & reliable" },
];

const stats = [
  { icon: Building2, value: "10K+", label: "Properties" },
  { icon: Landmark, value: "500+", label: "Partner banks" },
  { icon: Gavel, value: "15K+", label: "Auctions conducted" },
  { icon: Users, value: "100K+", label: "Happy bidders" },
];

const whyUs = [
  { icon: ShieldCheck, title: "100% Secure", text: "Safe online bidding with complete transparency and verified auction process." },
  { icon: CheckCircle2, title: "Verified Properties", text: "All properties are verified directly from banks and financial institutions." },
  { icon: Headphones, title: "24×7 Support", text: "Dedicated customer support before, during and after every auction." },
  { icon: Smartphone, title: "Easy Online Bidding", text: "Participate in auctions from anywhere using desktop or mobile." },
];

const team = [
  { name: "Rajesh Kumar", role: "Chief Executive Officer", text: "15+ years of experience in Banking, Real Estate and Digital Auctions." },
  { name: "Priya Sharma", role: "Operations Manager", text: "Ensures every auction runs smoothly with complete transparency." },
  { name: "Amit Verma", role: "Technology Head", text: "Leads platform development and secure online bidding solutions." },
  { name: "Neha Reddy", role: "Customer Support", text: "Helping buyers and banks with quick and reliable assistance." },
];

const banks = ["SBI", "HDFC", "ICICI", "PNB", "Bank of Baroda"];

const testimonials = [
  { name: "Rahul Sharma", city: "Bengaluru", text: "Click4Bid made buying my first apartment simple and transparent. Highly recommended." },
  { name: "Priya Nair", city: "Hyderabad", text: "The bidding process was smooth and secure. Excellent customer support." },
  { name: "Arun Kumar", city: "Chennai", text: "Verified properties and transparent pricing. Best auction platform." },
];

/* Nav dropdown config — each item can carry a real router "path".
   Items without a path (not built yet) still render as "#" placeholders. */
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

function Initials({ name }) {
  return (
    <div className="h-14 w-14 rounded-full bg-slate-900 text-amber-400 font-display font-bold flex items-center justify-center text-base shrink-0">
      {name.split(" ").map((n) => n[0]).join("")}
    </div>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
      ))}
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

/* Renders a dropdown item as a router Link when it has a real path,
   otherwise falls back to a "#" placeholder anchor. */
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

export default function AboutUs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }} className="bg-slate-50 text-slate-800 min-h-screen">
      <style>{`
        ${FONT_IMPORT}
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono-data { font-family: 'JetBrains Mono', monospace; }
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
          .animate-fade-in-down, .animate-float { animation: none; }
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
            <Share2 size={13} className="hover:text-amber-500 cursor-pointer" />
            <AtSign size={13} className="hover:text-amber-500 cursor-pointer" />
            <Camera size={13} className="hover:text-amber-500 cursor-pointer" />
            <Link2 size={13} className="hover:text-amber-500 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3.5">
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-slate-900">
            <span className="grid place-items-center h-9 w-9 rounded bg-slate-900 text-amber-400 font-mono-data text-sm">C4</span>
            Click<span className="text-amber-500">4</span>Bid
          </Link>

          <ul className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700">
            <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
            <li><Link to="/about" className="text-amber-500">About Us</Link></li>
            {NAV_DROPDOWNS.map((d) => (
              <li key={d.label} className="relative group">
                <button className="flex items-center gap-1 hover:text-amber-500 transition-colors">
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
            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-amber-500 transition-colors">Login</Link>
            <Link to="/register" className="px-5 py-2 text-sm font-semibold rounded-md bg-amber-500 text-slate-900 hover:bg-amber-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 active:scale-95">Register</Link>
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
              <Link to="/login" className="flex-1 text-center px-4 py-2 rounded-md border border-slate-200 font-semibold" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="flex-1 text-center px-4 py-2 rounded-md bg-amber-500 text-slate-900 font-semibold" onClick={() => setMenuOpen(false)}>Register</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ================= ABOUT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <div className="animate-fade-in-down">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            About <span className="text-amber-500">Click4Bid</span>
          </h1>
          <p className="text-slate-600 mt-5 leading-relaxed">
            Click4Bid is India's most trusted E-Auction and Real Estate Marketplace designed to bring transparency, security and convenience to property auctions. We enable banks, financial institutions, NBFCs and government organizations to sell verified properties through an easy and secure online platform.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 100}>
                <div className="rounded-xl bg-white border border-slate-200 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-amber-300">
                  <f.icon className="text-amber-500 transition-transform duration-300 hover:scale-110" size={26} strokeWidth={1.5} />
                  <h4 className="font-display font-semibold text-slate-900 text-sm mt-3">{f.title}</h4>
                  <p className="text-slate-500 text-xs mt-1">{f.subtitle}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={150}>
          <div className="rounded-2xl bg-slate-900 aspect-[4/3] flex items-center justify-center relative overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-500/10" />
            <div className="absolute -left-8 -bottom-8 h-32 w-32 rotate-12 bg-amber-500/5" />
            <Landmark className="text-amber-400 relative animate-float" size={72} strokeWidth={1} />
          </div>
        </Reveal>
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

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-slate-900 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-white">
              Why Choose <span className="text-amber-400">Click4Bid</span>
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl mx-auto">
              India's leading online property auction platform providing transparency, trust and secure bidding experience.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={(i % 4) * 100}>
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

      {/* ================= TEAM ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <Reveal className="text-center mb-14">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Meet Our <span className="text-amber-500">Expert Team</span>
          </h2>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto">
            Dedicated professionals committed to making property auctions transparent, secure, and successful.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {team.map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) * 100}>
              <div className="rounded-xl bg-white border border-slate-100 shadow-sm p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
                <div className="flex justify-center">
                  <Initials name={t.name} />
                </div>
                <h3 className="font-display font-semibold text-slate-900 mt-4">{t.name}</h3>
                <h5 className="text-amber-600 text-xs font-semibold mt-1">{t.role}</h5>
                <p className="text-slate-500 text-sm mt-3 leading-relaxed">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= PARTNER BANKS ================= */}
      <section className="bg-slate-100 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Our <span className="text-amber-500">Partner Banks</span>
            </h2>
            <p className="text-slate-500 mt-2">Trusted by India's leading Banks and Financial Institutions.</p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
            {banks.map((b, i) => (
              <Reveal key={b} delay={(i % 5) * 80}>
                <div className="flex items-center justify-center h-20 rounded-lg border border-slate-200 bg-white text-slate-600 font-display font-semibold text-sm transition-all duration-300 hover:border-amber-400 hover:text-amber-600 hover:-translate-y-1 hover:shadow-md">
                  {b}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <Reveal className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            What Our <span className="text-amber-500">Clients Say</span>
          </h2>
          <p className="text-slate-500 mt-2">Thousands of happy customers trust Click4Bid for property auctions.</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <Initials name={t.name} />
                  <div>
                    <h3 className="font-display font-semibold text-slate-900 text-sm">{t.name}</h3>
                    <span className="text-xs text-slate-500">{t.city}</span>
                  </div>
                </div>
                <div className="mt-4"><Stars /></div>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">"{t.text}"</p>
              </div>
            </Reveal>
          ))}
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
              Click4Bid is India's trusted online property auction platform offering transparent, secure and hassle-free bidding experiences for buyers, banks and financial institutions.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-amber-400 transition-colors">About Us</Link></li>
              <li><Link to="/property-listing" className="hover:text-amber-400 transition-colors">Properties</Link></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Running Auctions</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Property Types</h3>
            <ul className="space-y-2 text-sm">
              {["Residential", "Commercial", "Industrial", "Agricultural", "Plots"].map((l) => (
                <li key={l}><a href="#" className="hover:text-amber-400 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0 text-amber-500" /> Bengaluru, Karnataka, India</li>
              <li className="flex items-center gap-2"><Phone size={15} className="text-amber-500" /> +91 98765 43210</li>
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
