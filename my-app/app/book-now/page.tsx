"use client";

import { useState } from "react";
import Link from "next/link";

const IMGS = {
  logo: "/logo.png",
  hero: "https://images.squarespace-cdn.com/content/v1/65cec61119c06337bea7a946/68dfbc5a-7570-4655-8931-499fc2d58a0b/DSCF3334-HIGHRES-2.jpg",
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Book Now", href: "/book-now" },
  { label: "About", href: "/#about" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export default function BookNow() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white" style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fdf6ec]/90 backdrop-blur-sm border-b border-[#e8d9c3]">
        <div className="max-w-6xl mx-auto px-6 p-0 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img src={IMGS.logo} alt="Tanned Co." className="h-28 object-contain" />
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider uppercase">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`transition-colors ${
                  l.href === "/book-now"
                    ? "text-[#1a1a1a] border-b-2 border-[#b08850] pb-0.5"
                    : "text-[#5a4a3a] hover:text-[#1a1a1a]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <a
            href="https://tannedco.gymmasteronline.com/portal/book/service?serviceid=211107"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center bg-[#1a1a1a] text-white text-sm px-5 py-2.5 rounded-full font-medium hover:bg-[#3a2e24] transition-colors"
          >
            Book Now
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#1a1a1a] transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#1a1a1a] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#1a1a1a] transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#fdf6ec] border-t border-[#e8d9c3] px-6 py-6 flex flex-col gap-5">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium tracking-wider uppercase text-[#5a4a3a]"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://tannedco.gymmasteronline.com/portal/book/service?serviceid=211107"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-center bg-[#1a1a1a] text-white text-sm px-5 py-3 rounded-full font-medium"
            >
              Book Now
            </a>
          </div>
        )}
      </nav>

      {/* FULL-SCREEN HERO WITH BACKGROUND IMAGE */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center">
        {/* Background image */}
        <img
          src={IMGS.hero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content overlay */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 flex flex-col items-center pt-28 pb-16">
          {/* Label */}
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#b08850] mb-6">
            Book Your Session
          </p>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight text-white mb-3">
            Book Your Glow at
          </h1>
          {/* Tanned Co logo */}
          <img src="/logo_transparent.png" alt="Tanned Co." className="w-full max-w-md brightness-0 invert mb-4" />

          {/* Subtitle */}
          <p className="text-lg md:text-xl font-medium tracking-widest text-white/80 mb-10">
            Private. Automated. Flawless.
          </p>

          {/* Choose location heading */}
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#b08850] mb-3">
            Step 1
          </p>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-white mb-6">
            Choose Your Location & Time
          </h2>

          {/* BOOK NOW button */}
          <a
            href="https://tannedco.gymmasteronline.com/portal/book/service?serviceid=211107"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#1a1a1a] hover:bg-[#3a2e24] text-white text-sm font-semibold uppercase tracking-wider px-10 py-3.5 rounded-full transition-colors"
          >
            Book Now →
          </a>

          {/* Divider */}
          <div className="w-12 h-px bg-white/20 my-10" />

          {/* Download App */}
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#b08850] mb-3">
            Step 2
          </p>
          <h2 className="text-2xl md:text-3xl font-black uppercase text-white mb-6">
            Download Our App
          </h2>

          {/* App buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://apps.apple.com/us/app/tannedco/id1659547172"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white text-sm font-semibold uppercase tracking-wider px-8 py-3.5 rounded-full border border-white/20 transition-colors"
            >
              Apple App
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.treshna.memberportal.tannedco"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white text-sm font-semibold uppercase tracking-wider px-8 py-3.5 rounded-full border border-white/20 transition-colors"
            >
              Android App
            </a>
          </div>

          {/* App description text */}
          <p className="text-white/60 text-sm max-w-md mt-6 leading-relaxed">
            Booking a casual session or using your membership is easy, just use the Tanned Co. app. Tap the links to go straight to the booking page.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
          <img src={IMGS.logo} alt="Tanned Co." className="h-6 object-contain brightness-0 invert opacity-50" />
          <p className="text-white/40 text-xs text-center">
            © {new Date().getFullYear()} Tanned Co. All rights reserved.
          </p>
          <a
            href="https://www.tannedco.com.au/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 text-xs hover:text-white/60 transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  );
}
