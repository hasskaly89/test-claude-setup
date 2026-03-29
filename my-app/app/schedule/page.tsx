"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const LOGO = "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/c6ba16dc-3499-4154-9bc6-df2a036460bb/Cement+-+Full+Logo.png";

const LOCATIONS = [
  { id: "cecil-hills", name: "Cecil Hills", widgetId: "047812b344", address: "Shop 1A Cecil Hills Shopping Centre, 1 Lancaster Ave" },
  { id: "kings-park",  name: "Kings Park",  widgetId: "0415144b344", address: "6/2 Garling Rd, Kings Park NSW 2148" },
];

export default function SchedulePage() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [activeTab, setActiveTab]   = useState(0);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Re-initialise the widget whenever the active tab changes
  useEffect(() => {
    if (!scriptReady) return;
    // Small delay to let the DOM update, then re-fire widget init if available
    const t = setTimeout(() => {
      // The Mindbody branded web script auto-scans the DOM on load;
      // on tab switch we trigger a CustomEvent so it re-scans
      window.dispatchEvent(new Event("mindbody-reinit"));
    }, 100);
    return () => clearTimeout(t);
  }, [activeTab, scriptReady]);

  const navLinks: [string, string][] = [
    ["/#about","About"],
    ["/#classes","Classes"],
    ["/#pricing","Pricing"],
    ["/schedule","Schedule"],
    ["/#locations","Locations"],
    ["/#faq","FAQ"],
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5efe6", fontFamily: "Arial, sans-serif", overflowX: "hidden" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: scrolled ? "rgba(12,12,12,0.97)" : "rgba(12,12,12,0.88)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(225,204,190,0.12)",
        transition: "background 0.4s",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/"><img src={LOGO} alt="Reformd Pilates" style={{ height: 36, objectFit: "contain", filter: "brightness(0) invert(1)" }} /></a>

          {/* desktop links */}
          <div className="d-nav" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {navLinks.map(([href, label]) => (
              <a key={href} href={href} style={{
                color: href === "/schedule" ? "#e1ccbe" : "rgba(255,255,255,0.65)",
                fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
                textTransform: "uppercase", textDecoration: "none",
                borderBottom: href === "/schedule" ? "2px solid #e1ccbe" : "2px solid transparent",
                paddingBottom: 2, transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#e1ccbe")}
              onMouseLeave={e => (e.currentTarget.style.color = href === "/schedule" ? "#e1ccbe" : "rgba(255,255,255,0.65)")}>
                {label}
              </a>
            ))}
          </div>

          <a href="https://clients.mindbodyonline.com/ASP/su1.asp?studioid=5756614" target="_blank" rel="noopener noreferrer" className="d-nav"
            style={{ backgroundColor: "#e1ccbe", color: "#4f3e33", fontSize: 11, fontWeight: 800, padding: "11px 22px", borderRadius: 99, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none" }}>
            Book Now
          </a>

          {/* hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="m-btn"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none", flexDirection: "column", gap: 5 }} aria-label="Menu">
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 24, height: 2, backgroundColor: "#fff", borderRadius: 2,
                opacity: i === 1 && menuOpen ? 0 : 1,
                transform: i === 0 && menuOpen ? "rotate(45deg) translate(5px,5px)" : i === 2 && menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none",
                transition: "all 0.3s",
              }} />
            ))}
          </button>
        </div>

        {/* mobile drawer */}
        <div className="m-drawer" style={{ overflow: "hidden", maxHeight: menuOpen ? 520 : 0, transition: "max-height 0.35s ease", backgroundColor: "rgba(12,12,12,0.98)" }}>
          <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
            {navLinks.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{
                color: href === "/schedule" ? "#e1ccbe" : "rgba(255,255,255,0.85)",
                fontSize: 18, fontWeight: 800, letterSpacing: "0.12em",
                textTransform: "uppercase", textDecoration: "none",
                borderBottom: "1px solid rgba(225,204,190,0.1)", paddingBottom: 14,
              }}>{label}</a>
            ))}
            <a href="https://clients.mindbodyonline.com/ASP/su1.asp?studioid=5756614" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
              style={{ backgroundColor: "#e1ccbe", color: "#4f3e33", textAlign: "center", padding: "14px 0", borderRadius: 99, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none", marginTop: 6 }}>
              Book a Class
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "#0c0c0c", paddingTop: 68 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 28px 48px" }}>
          <p style={{ color: "#e1ccbe", fontSize: 11, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 12 }}>
            Cecil Hills &amp; Kings Park
          </p>
          <h1 style={{ fontSize: "clamp(42px, 9vw, 96px)", fontWeight: 900, textTransform: "uppercase", color: "#fff", lineHeight: 0.88, letterSpacing: "-0.03em", marginBottom: 20 }}>
            Class<br /><span style={{ color: "#e1ccbe" }}>Schedule</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, lineHeight: 1.75, maxWidth: 460, marginBottom: 32 }}>
            Browse and book upcoming classes across both studios. Classes fill quickly — book early to secure your spot!
          </p>

          {/* Class type pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              { name: "Balanced",    color: "#e1ccbe" },
              { name: "Recharge",    color: "#c9d9e8" },
              { name: "Power",       color: "#f0c8b0" },
              { name: "Sculpt",      color: "#d4c8e8" },
              { name: "Ignite HIIT", color: "#f0e0b0" },
            ].map(cls => (
              <span key={cls.name} style={{ backgroundColor: cls.color, color: "#4f3e33", fontSize: 10, fontWeight: 800, padding: "5px 14px", borderRadius: 99, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                {cls.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ backgroundColor: "#e1ccbe", padding: "10px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", animation: "ticker 28s linear infinite", whiteSpace: "nowrap" }}>
          {[...Array(4)].flatMap((_, ri) =>
            ["BALANCED","RECHARGE","POWER","SCULPT","IGNITE HIIT","BOOK YOUR SPOT","CECIL HILLS","KINGS PARK"].map((item, i) => (
              <span key={`${ri}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: 14, color: "#4f3e33", fontSize: 10, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", paddingRight: 28 }}>
                {item}
                <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "rgba(79,62,51,0.3)", display: "inline-block" }} />
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── SCHEDULE WIDGET ── */}
      <section style={{ backgroundColor: "#f5efe6", padding: "60px 0 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>

          {/* Location tabs */}
          <div style={{ display: "inline-flex", gap: 4, marginBottom: 24, backgroundColor: "rgba(79,62,51,0.1)", borderRadius: 99, padding: 4 }}>
            {LOCATIONS.map((loc, idx) => (
              <button key={loc.id} onClick={() => setActiveTab(idx)} style={{
                backgroundColor: activeTab === idx ? "#4f3e33" : "transparent",
                color: activeTab === idx ? "#e1ccbe" : "#4f3e33",
                border: "none",
                borderRadius: 99, padding: "10px 28px", cursor: "pointer",
                fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em",
                transition: "all 0.25s",
              }}>
                {loc.name}
              </button>
            ))}
          </div>

          {/* Info badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
            {[
              { icon: "🕐", label: "Classes run 45–50 mins" },
              { icon: "🧦", label: "Grip socks required" },
              { icon: "📅", label: "Book up to 7 days ahead" },
              { icon: "👶", label: "Creche Mon–Fri 8:30 & 9:30am" },
            ].map(badge => (
              <div key={badge.label} style={{
                display: "flex", alignItems: "center", gap: 8,
                backgroundColor: "#fff",
                border: "1.5px solid rgba(79,62,51,0.12)",
                borderRadius: 99, padding: "9px 16px",
              }}>
                <span style={{ fontSize: 15, lineHeight: 1 }}>{badge.icon}</span>
                <span style={{ color: "#4f3e33", fontSize: 12, fontWeight: 600 }}>{badge.label}</span>
              </div>
            ))}
          </div>

          {/* Active location info */}
          <div style={{ marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <span style={{ color: "#4f3e33", fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                📍 {LOCATIONS[activeTab].address}
              </span>
            </div>
            <a href="https://clients.mindbodyonline.com/ASP/su1.asp?studioid=5756614" target="_blank" rel="noopener noreferrer"
              style={{ backgroundColor: "#4f3e33", color: "#e1ccbe", fontSize: 11, fontWeight: 800, padding: "10px 20px", borderRadius: 99, textTransform: "uppercase", letterSpacing: "0.12em", textDecoration: "none" }}>
              Book on MindBody →
            </a>
          </div>

          {/* Widget panels — both rendered, only one visible */}
          {LOCATIONS.map((loc, idx) => (
            <div key={loc.id} style={{
              display: activeTab === idx ? "block" : "none",
              backgroundColor: "#fff",
              borderRadius: 28,
              overflow: "hidden",
              border: "2px solid rgba(79,62,51,0.1)",
              boxShadow: "0 8px 60px rgba(79,62,51,0.07)",
              minHeight: 620,
            }}>
              <div
                className="mindbody-widget"
                data-widget-type="Schedules"
                data-widget-id={loc.widgetId}
                style={{ width: "100%", minHeight: 620 }}
              />
            </div>
          ))}

          <p style={{ color: "rgba(79,62,51,0.4)", fontSize: 13, marginTop: 20, textAlign: "center" }}>
            Widget not loading?{" "}
            <a href="https://clients.mindbodyonline.com/ASP/su1.asp?studioid=5756614" target="_blank" rel="noopener noreferrer"
              style={{ color: "#4f3e33", fontWeight: 700, textDecoration: "underline" }}>
              Open MindBody directly →
            </a>
          </p>
        </div>
      </section>

      {/* ── INFO STRIP ── */}
      <section style={{ backgroundColor: "#0c0c0c", padding: "64px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="i-grid">
          {[
            { icon: "📅", title: "Book Early",        desc: "Classes fill fast — we recommend booking at least 24 hrs in advance to secure your spot." },
            { icon: "👶", title: "Creche Available",  desc: "Mon–Fri 8:30am & 9:30am. Free for Foundation Members, $5 for all others. Book via the Reformd app." },
            { icon: "📱", title: "Reformd App",       desc: "Download the app for the easiest way to book, manage and track your classes on the go." },
          ].map(item => (
            <div key={item.title} style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(225,204,190,0.1)", borderRadius: 24, padding: "28px 24px" }}>
              <span style={{ fontSize: 28, display: "block", marginBottom: 14 }}>{item.icon}</span>
              <h3 style={{ color: "#e1ccbe", fontSize: 15, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>{item.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTRO OFFER CTA ── */}
      <section style={{ backgroundColor: "#4f3e33", padding: "80px 28px", textAlign: "center" }}>
        <p style={{ color: "rgba(225,204,190,0.45)", fontSize: 11, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>New to Reformd?</p>
        <h2 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, textTransform: "uppercase", color: "#e1ccbe", lineHeight: 0.92, marginBottom: 20 }}>
          Try Our Intro Offer
        </h2>
        <p style={{ color: "rgba(225,204,190,0.5)", fontSize: 16, marginBottom: 36, maxWidth: 400, margin: "0 auto 36px" }}>
          3 classes in your first 2 weeks — available to first-time clients across both locations.
        </p>
        <a href="https://clients.mindbodyonline.com/ASP/su1.asp?studioid=5756614" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", backgroundColor: "#e1ccbe", color: "#4f3e33", fontSize: 13, fontWeight: 800, padding: "16px 40px", borderRadius: 99, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none" }}>
          Get Started →
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: "#0c0c0c", padding: "40px 28px", borderTop: "1px solid rgba(225,204,190,0.08)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <img src={LOGO} alt="Reformd Pilates" style={{ height: 28, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>© {new Date().getFullYear()} Reformd Pilates. All rights reserved.</p>
          <a href="/" style={{ color: "#e1ccbe", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none" }}>← Back to Home</a>
        </div>
      </footer>

      {/* MindBody branded-web widget script */}
      <Script
        src="https://brandedweb.mindbodyonline.com/embed/widget.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .d-nav   { display: flex !important; }
        .m-btn   { display: none !important; }
        .m-drawer { display: block !important; }
        @media (max-width: 768px) {
          .d-nav    { display: none !important; }
          .m-btn    { display: flex !important; }
          .i-grid   { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
