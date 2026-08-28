import { useState } from "react";
import { Link } from "react-router-dom";
import { Gavel, User, Mail, Phone, Lock, ShieldCheck, UserPlus } from "lucide-react";

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');";

/* Password must be at least 8 characters and include:
   - one uppercase letter
   - one lowercase letter
   - one number
   - one special character (@$!%*?&) */
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const PASSWORD_HINT =
  "Min 8 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextValue = type === "checkbox" ? checked : value;
    setForm((prev) => ({ ...prev, [name]: nextValue }));

    if (name === "password") {
      setPasswordError(
        nextValue && !PASSWORD_REGEX.test(nextValue) ? PASSWORD_HINT : ""
      );
      if (form.confirmPassword) {
        setConfirmError(nextValue !== form.confirmPassword ? "Passwords do not match" : "");
      }
    }

    if (name === "confirmPassword") {
      setConfirmError(nextValue !== form.password ? "Passwords do not match" : "");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!PASSWORD_REGEX.test(form.password)) {
      setPasswordError(PASSWORD_HINT);
      return;
    }
    if (form.password !== form.confirmPassword) {
      setConfirmError("Passwords do not match");
      return;
    }

    // TODO: wire this up to your actual registration API
    console.log("Register form submitted:", form);
  };

  return (
    <div
      style={{ fontFamily: "Inter, sans-serif" }}
      className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden px-6 py-12"
    >
      <style>{`
        ${FONT_IMPORT}
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        @keyframes floatCircle {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        .circle {
          position: absolute;
          border-radius: 9999px;
          background: rgba(245, 158, 11, 0.12);
          animation: floatCircle 8s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .circle { animation: none; }
        }
      `}</style>

      {/* ================= ANIMATED BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="circle" style={{ width: 260, height: 260, top: "-60px", left: "-60px", animationDelay: "0s" }} />
        <span className="circle" style={{ width: 180, height: 180, bottom: "10%", left: "8%", animationDelay: "1.5s" }} />
        <span className="circle" style={{ width: 320, height: 320, bottom: "-100px", right: "-80px", animationDelay: "3s" }} />
        <span className="circle" style={{ width: 140, height: 140, top: "15%", right: "12%", animationDelay: "4.5s" }} />
      </div>

      {/* ================= REGISTER CARD ================= */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-2xl px-8 py-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="grid place-items-center h-11 w-11 rounded-full bg-amber-500 text-slate-900">
            <Gavel size={20} strokeWidth={2} />
          </div>
          <div className="font-display font-bold text-xl text-slate-900">
            Click<span className="text-amber-500">4</span>Bid
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold text-slate-900 text-center">Create Account</h2>
        <p className="text-slate-500 text-sm text-center mt-1.5">Join Click4Bid and start bidding</p>

        <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4">
          {/* Name */}
          <div className="flex items-center gap-3 border border-slate-200 rounded-md px-3.5 py-2.5 transition-colors focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
            <User size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 border border-slate-200 rounded-md px-3.5 py-2.5 transition-colors focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
            <Mail size={16} className="text-slate-400 shrink-0" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-3 border border-slate-200 rounded-md px-3.5 py-2.5 transition-colors focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
            <Phone size={16} className="text-slate-400 shrink-0" />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              pattern="[0-9]{10}"
              maxLength={10}
              required
              value={form.mobile}
              onChange={handleChange}
              className="w-full text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Password */}
          <div>
            <div className={`flex items-center gap-3 border rounded-md px-3.5 py-2.5 transition-colors focus-within:ring-2 ${
              passwordError ? "border-red-300 focus-within:border-red-400 focus-within:ring-red-100" : "border-slate-200 focus-within:border-amber-400 focus-within:ring-amber-100"
            }`}>
              <Lock size={16} className="text-slate-400 shrink-0" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                pattern={PASSWORD_REGEX.source}
                title={PASSWORD_HINT}
                value={form.password}
                onChange={handleChange}
                className="w-full text-sm outline-none placeholder:text-slate-400"
              />
            </div>
            {passwordError ? (
              <p className="text-xs text-red-500 mt-1.5 leading-snug">{passwordError}</p>
            ) : (
              <p className="text-xs text-slate-400 mt-1.5 leading-snug">{PASSWORD_HINT}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <div className={`flex items-center gap-3 border rounded-md px-3.5 py-2.5 transition-colors focus-within:ring-2 ${
              confirmError ? "border-red-300 focus-within:border-red-400 focus-within:ring-red-100" : "border-slate-200 focus-within:border-amber-400 focus-within:ring-amber-100"
            }`}>
              <ShieldCheck size={16} className="text-slate-400 shrink-0" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full text-sm outline-none placeholder:text-slate-400"
              />
            </div>
            {confirmError && <p className="text-xs text-red-500 mt-1.5">{confirmError}</p>}
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 text-xs text-slate-500 pt-1">
            <input
              type="checkbox"
              name="agreed"
              required
              checked={form.agreed}
              onChange={handleChange}
              className="mt-0.5 accent-amber-500"
            />
            <span>
              I agree to <a href="#" className="text-amber-600 font-semibold hover:underline">Terms &amp; Conditions</a>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="group w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm py-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95"
          >
            Create Account
            <UserPlus size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </form>

        {/* Switch to login */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-600 font-semibold hover:underline">
            Login
          </Link>
        </p>

        <div className="text-center text-xs text-slate-400 mt-6">
          Powered by <strong className="text-slate-500">Intelliclouds Systems</strong>
        </div>
      </div>
    </div>
  );
}