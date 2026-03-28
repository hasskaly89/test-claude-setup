"use client";

import { useState, useEffect, useCallback } from "react";

interface InstaPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
}

const IMGS = {
  logo: "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/c6ba16dc-3499-4154-9bc6-df2a036460bb/Cement+-+Full+Logo.png",
  hero: "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/a6acf6e3-1c59-4391-a994-838fd0f2b527/DSC05771-Enhanced-NR.jpg",
  about: "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/3cf5ec7f-4427-4be7-8939-b5fae3ceeac9/MK100322.jpg",
  gallery1: "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/dfeb0cc8-6e33-4219-8c2c-ec39195d9b62/DSC05732-Enhanced-NR.jpg",
  gallery2: "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/ebf38dd0-41d5-4880-8222-e2af8c1a8c55/DSC05698-Enhanced-NR.jpg",
  gallery3: "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/1eafcbc6-919f-4b0b-9875-9aab3d01aad5/DSC05711-Enhanced-NR.jpg",
  gallery4: "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/bcb146ff-fc98-4512-bb19-af398233cb7a/IMG_0182.jpg",
  gallery5: "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/2e1580a4-b97f-4856-91f6-a17036fbdb6f/DSC05685-Enhanced-NR.jpg",
  gallery6: "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/e70a4b6d-801d-4b9a-a003-f66c19e147ff/DSC05742-Enhanced-NR.jpg",
  studio1: "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/4e582cc2-4527-4fbb-8bf2-bb0aa9bebff9/MK100336.jpg",
  studio2: "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/5ff92577-ed29-4a34-a050-7d20d44bb2c5/MK100293.jpg",
  appStore: "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/e8003bfe-8d5b-460a-a5ec-ecd8bd65e8d1/available-on-the-app-store-logo-svg-vector.png",
  googlePlay: "https://images.squarespace-cdn.com/content/v1/6763f441230f596466629739/8372998c-4788-42ba-9e8d-7e7fe8c65561/Google_Play_Store_badge_EN.png",
};

const classes = [
  { name: "Balanced", level: "All Levels", tag: "01", desc: "A foundational full-body class building strength, flexibility and mind-body connection through alignment and controlled movement.", accent: "#e1ccbe" },
  { name: "Recharge", level: "All Levels", tag: "02", desc: "A stretch-focused class designed to increase flexibility, enhance mobility, and release tension using the Reformer for support.", accent: "#c9d9e8" },
  { name: "Power", level: "Intermediate – Advanced", tag: "03", desc: "High-intensity strength using higher tension springs and weights to challenge muscles through dynamic and isometric holds.", accent: "#f0c8b0" },
  { name: "Sculpt", level: "All Levels", tag: "04", desc: "Lower-body focused targeting legs and glutes through isolated exercises, pulses and leg lifts with Reformer-assisted resistance.", accent: "#d4c8e8" },
  { name: "Ignite HIIT", level: "Intermediate – Advanced", tag: "05", desc: "Fusion of Pilates core work with HIIT — cardio meets strength in a fast-paced, music-driven full-body format.", accent: "#f0e0b0" },
];

const faqs = [
  { q: "Do I need experience to join?", a: "Not at all! Our classes are designed for all fitness levels. Our instructors provide modifications and progressions so everyone can participate regardless of experience." },
  { q: "What should I wear?", a: "Comfortable activewear that allows freedom of movement. Grip socks are recommended (available to purchase at the studio if needed)." },
  { q: "How do I book a class?", a: "Download the Reformd app or visit our website to book. We recommend booking in advance as our classes fill up quickly!" },
  { q: "Do you offer childcare?", a: "Yes! Our creche is available Monday–Friday at 8:30am and 9:30am sessions. Free for Foundation Members, $5 for all others. Book through the Reformd app." },
  { q: "What is a Reformer?", a: "A Reformer is a specialised Pilates machine with a sliding carriage, springs, ropes and pulleys. It enables a full range of motion and can be adjusted to suit any fitness level." },
];

const ticker = ["REFORMD", "STRENGTH", "SCULPT", "RECHARGE", "POWER", "IGNITE", "REFORM YOUR BODY", "COMMUNITY", "BOUTIQUE PILATES"];

const locations = [
  { name: "Cecil Hills", address: "Shop 1A Cecil Hills Shopping Centre, 1 Lancaster Ave, Cecil Hills NSW 2171", maps: "https://g.co/kgs/h57qtpQ" },
  { name: "Kings Park", address: "6/2 Garling Rd, Kings Park NSW 2148", maps: "https://www.google.com/maps/search/?api=1&query=6%2F2+Garling+Rd+Kings+Park+NSW" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [instaPosts, setInstaPosts] = useState<InstaPost[]>([]);
  const [instaLoaded, setInstaLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch Instagram feed
  useEffect(() => {
    fetch("/api/instagram")
      .then((res) => res.json())
      .then((data) => {
        if (data.posts && data.posts.length > 0) {
          setInstaPosts(data.posts.slice(0, 6));
        }
        setInstaLoaded(true);
      })
      .catch(() => setInstaLoaded(true));
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ fontFamily: "'Arial', sans-serif", backgroundColor: "#f5efe6" }}>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: scrolled ? "rgba(12,12,12,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(225,204,190,0.15)" : "none",
        transition: "all 0.4s ease",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#home">
            <img src={IMGS.logo} alt="Reformd Pilates" style={{ height: 36, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          </a>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
            {[["#about","About"],["#classes","Classes"],["#pricing","Pricing"],["#locations","Locations"],["#faq","FAQ"]].map(([href, label]) => (
              <a key={href} href={href} style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#e1ccbe")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}>
                {label}
              </a>
            ))}
          </div>

          <a href="https://clients.mindbodyonline.com/ASP/su1.asp?studioid=5756614" target="_blank" rel="noopener noreferrer" className="desktop-nav"
            style={{ backgroundColor: "#e1ccbe", color: "#4f3e33", fontSize: 11, fontWeight: 800, padding: "11px 22px", borderRadius: 99, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#e1ccbe"; }}>
            Book Now
          </a>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }} className="mobile-menu-btn" aria-label="Menu">
            <div style={{ width: 24, height: 2, backgroundColor: "#fff", marginBottom: 5, borderRadius: 2, transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none", transition: "all 0.3s" }} />
            <div style={{ width: 24, height: 2, backgroundColor: "#fff", marginBottom: 5, borderRadius: 2, opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
            <div style={{ width: 24, height: 2, backgroundColor: "#fff", borderRadius: 2, transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none", transition: "all 0.3s" }} />
          </button>
        </div>

        {/* Mobile menu */}
        <div style={{ overflow: "hidden", maxHeight: menuOpen ? 480 : 0, transition: "max-height 0.35s ease", backgroundColor: "rgba(12,12,12,0.98)", backdropFilter: "blur(16px)" }} className="mobile-menu">
          <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
            {[["#about","About"],["#classes","Classes"],["#pricing","Pricing"],["#locations","Locations"],["#faq","FAQ"]].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}
                style={{ color: "rgba(255,255,255,0.85)", fontSize: 18, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid rgba(225,204,190,0.1)", paddingBottom: 16 }}>
                {label}
              </a>
            ))}
            <a href="https://clients.mindbodyonline.com/ASP/su1.asp?studioid=5756614" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
              style={{ backgroundColor: "#e1ccbe", color: "#4f3e33", textAlign: "center", padding: "14px 0", borderRadius: 99, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none", marginTop: 8 }}>
              Book a Class
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section id="home" style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden", backgroundColor: "#0c0c0c" }}>
        <img src={IMGS.hero} alt="Reformd Pilates" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(12,12,12,0.7) 0%, rgba(12,12,12,0.3) 50%, rgba(12,12,12,0.75) 100%)" }} />

        {/* Giant background wordmark */}
        <div style={{ position: "absolute", bottom: -20, left: -10, right: 0, fontSize: "clamp(100px, 22vw, 280px)", fontWeight: 900, textTransform: "uppercase", color: "rgba(225,204,190,0.06)", lineHeight: 1, letterSpacing: "-0.04em", whiteSpace: "nowrap", userSelect: "none", zIndex: 1 }}>
          REFORMD
        </div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 28px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 80 }}>
          <div>
            {/* Location pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "#e1ccbe", color: "#4f3e33", fontSize: 10, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", padding: "8px 16px", borderRadius: 99, marginBottom: 24 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#4f3e33", display: "inline-block" }} />
              Cecil Hills &amp; Kings Park
            </div>

            <h1 style={{ fontSize: "clamp(52px, 10vw, 110px)", fontWeight: 900, textTransform: "uppercase", color: "#fff", lineHeight: 0.88, letterSpacing: "-0.03em", marginBottom: 28 }}>
              Redefine<br />
              <span style={{ color: "#e1ccbe", WebkitTextStroke: "1px #e1ccbe" }}>Strength.</span><br />
              Reform<br />Your Body.
            </h1>

            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 16, lineHeight: 1.7, maxWidth: 360, marginBottom: 36 }}>
              Boutique reformer pilates for every body. Owner-operated with 10+ years of fitness experience.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="https://clients.mindbodyonline.com/ASP/su1.asp?studioid=5756614" target="_blank" rel="noopener noreferrer"
                style={{ backgroundColor: "#e1ccbe", color: "#4f3e33", fontWeight: 800, padding: "15px 32px", borderRadius: 99, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none" }}>
                Book a Class →
              </a>
              <a href="#classes"
                style={{ border: "2px solid rgba(255,255,255,0.3)", color: "#fff", fontWeight: 700, padding: "15px 32px", borderRadius: 99, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none" }}>
                Our Classes
              </a>
            </div>
          </div>

          {/* Bottom scroll hint */}
          <div style={{ position: "absolute", right: 32, bottom: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</span>
            <div style={{ width: 1, height: 60, backgroundColor: "rgba(255,255,255,0.15)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40%", backgroundColor: "#e1ccbe", animation: "scrollPulse 1.8s ease-in-out infinite" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TICKER ─── */}
      <div style={{ backgroundColor: "#0c0c0c", padding: "14px 0", overflow: "hidden", borderTop: "1px solid rgba(225,204,190,0.2)" }}>
        <div style={{ display: "flex", animation: "marquee 25s linear infinite", whiteSpace: "nowrap" }}>
          {[...ticker, ...ticker, ...ticker].map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 16, color: "#e1ccbe", fontSize: 11, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", paddingRight: 32 }}>
              {item}
              <span style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#4f3e33", display: "inline-block" }} />
            </span>
          ))}
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <section id="about" style={{ backgroundColor: "#f5efe6", padding: "100px 0 80px", position: "relative", clipPath: "polygon(0 0, 100% 0, 100% 96%, 0 100%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
          {/* Oversize section label */}
          <div style={{ fontSize: "clamp(80px, 16vw, 180px)", fontWeight: 900, color: "rgba(79,62,51,0.06)", lineHeight: 1, letterSpacing: "-0.05em", textTransform: "uppercase", marginBottom: -40, userSelect: "none" }}>
            ABOUT
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="about-grid">
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: 32, overflow: "hidden", aspectRatio: "4/5" }}>
                <img src={IMGS.about} alt="Reformd Pilates studio" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              {/* Floating badge */}
              <div style={{ position: "absolute", bottom: -20, right: -20, backgroundColor: "#4f3e33", color: "#e1ccbe", borderRadius: 24, padding: "20px 24px", textAlign: "center", boxShadow: "0 20px 60px rgba(79,62,51,0.3)" }}>
                <p style={{ fontSize: 36, fontWeight: 900, lineHeight: 1 }}>10+</p>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>Years Experience</p>
              </div>
            </div>

            <div>
              <span style={{ color: "#4f3e33", fontSize: 11, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", display: "block", marginBottom: 20 }}>Owner Operated</span>
              <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, textTransform: "uppercase", color: "#0c0c0c", lineHeight: 0.92, letterSpacing: "-0.02em", marginBottom: 24 }}>
                Where Fitness<br />Meets <span style={{ color: "#4f3e33" }}>Luxury.</span>
              </h2>
              <p style={{ color: "rgba(12,12,12,0.55)", fontSize: 16, lineHeight: 1.75, marginBottom: 16 }}>
                Reformd Pilates is a boutique studio with over 10 years of experience in the fitness industry. We believe fitness should be accessible to everyone — whether you&apos;re a complete beginner or a seasoned athlete.
              </p>
              <p style={{ color: "rgba(12,12,12,0.55)", fontSize: 16, lineHeight: 1.75, marginBottom: 40 }}>
                Our luxe, boutique environment blends comfort, elegance and functionality. Small class sizes ensure you get the personalised attention you deserve.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[["2", "Locations"], ["5", "Class Types"], ["Creche", "Available"]].map(([stat, label]) => (
                  <div key={label} style={{ border: "2px solid rgba(79,62,51,0.15)", borderRadius: 20, padding: "20px 16px", textAlign: "center", backgroundColor: "rgba(225,204,190,0.2)" }}>
                    <p style={{ fontSize: 26, fontWeight: 900, color: "#4f3e33" }}>{stat}</p>
                    <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(79,62,51,0.5)", marginTop: 4 }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INSTAGRAM FEED / GALLERY STRIP ─── */}
      <section style={{ backgroundColor: "#f5efe6", padding: "0 16px 80px" }}>
        {/* Section heading */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <a
            href="https://www.instagram.com/reformdpilatesstudio"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4f3e33", fontSize: 11, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            Follow Us on Instagram
          </a>
        </div>

        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }} className="gallery-grid">
          {instaPosts.length > 0
            ? /* Live Instagram posts */
              instaPosts.map((post, i) => (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ borderRadius: 20, overflow: "hidden", aspectRatio: i < 3 ? "3/4" : "1/1", display: "block", position: "relative" }}
                >
                  <img
                    src={post.media_url}
                    alt={post.caption || `Instagram post ${i + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  {/* Hover overlay with Instagram icon */}
                  <div
                    style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.3s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="white" stroke="none" />
                    </svg>
                  </div>
                </a>
              ))
            : /* Fallback to static gallery images */
              [
                { src: IMGS.gallery1, aspect: "3/4" },
                { src: IMGS.gallery2, aspect: "3/4" },
                { src: IMGS.gallery3, aspect: "3/4" },
                { src: IMGS.gallery4, aspect: "1/1" },
                { src: IMGS.gallery5, aspect: "1/1" },
                { src: IMGS.gallery6, aspect: "1/1" },
              ].map(({ src, aspect }, i) => (
                <div key={i} style={{ borderRadius: 20, overflow: "hidden", aspectRatio: aspect }}>
                  <img src={src} alt={`Studio ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                </div>
              ))
          }
        </div>
      </section>

      {/* ─── CLASSES ─── */}
      <section id="classes" style={{ backgroundColor: "#0c0c0c", padding: "100px 0 120px", position: "relative" }}>
        {/* Background decoration */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", background: "linear-gradient(to bottom, rgba(225,204,190,0.03), transparent)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ color: "#e1ccbe", fontSize: 11, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 12 }}>On The Schedule</p>
              <h2 style={{ fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 900, textTransform: "uppercase", color: "#fff", lineHeight: 0.9, letterSpacing: "-0.03em" }}>
                Our<br />Classes
              </h2>
            </div>
            <a href="https://clients.mindbodyonline.com/ASP/su1.asp?studioid=5756614" target="_blank" rel="noopener noreferrer"
              style={{ border: "2px solid rgba(225,204,190,0.25)", color: "#e1ccbe", padding: "12px 24px", borderRadius: 99, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none" }}>
              View Full Schedule →
            </a>
          </div>

          {/* Classes grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {classes.map((cls) => (
              <div key={cls.name} style={{ borderRadius: 28, padding: 28, border: "1px solid rgba(255,255,255,0.08)", backgroundColor: "rgba(255,255,255,0.03)", cursor: "default", transition: "all 0.3s", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = cls.accent;
                  el.style.borderColor = cls.accent;
                  const num = el.querySelector(".cls-num") as HTMLElement;
                  const name = el.querySelector(".cls-name") as HTMLElement;
                  const desc = el.querySelector(".cls-desc") as HTMLElement;
                  const lvl = el.querySelector(".cls-lvl") as HTMLElement;
                  if (num) num.style.color = "rgba(0,0,0,0.08)";
                  if (name) { name.style.color = "#0c0c0c"; }
                  if (desc) desc.style.color = "rgba(0,0,0,0.6)";
                  if (lvl) { lvl.style.backgroundColor = "rgba(0,0,0,0.12)"; lvl.style.color = "#0c0c0c"; }
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = "rgba(255,255,255,0.03)";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  const num = el.querySelector(".cls-num") as HTMLElement;
                  const name = el.querySelector(".cls-name") as HTMLElement;
                  const desc = el.querySelector(".cls-desc") as HTMLElement;
                  const lvl = el.querySelector(".cls-lvl") as HTMLElement;
                  if (num) num.style.color = "rgba(225,204,190,0.12)";
                  if (name) name.style.color = "#fff";
                  if (desc) desc.style.color = "rgba(255,255,255,0.45)";
                  if (lvl) { lvl.style.backgroundColor = "rgba(255,255,255,0.08)"; lvl.style.color = "rgba(255,255,255,0.6)"; }
                }}>
                {/* Big background number */}
                <div className="cls-num" style={{ position: "absolute", top: -10, right: 12, fontSize: 100, fontWeight: 900, color: "rgba(225,204,190,0.12)", lineHeight: 1, userSelect: "none", transition: "color 0.3s" }}>
                  {cls.tag}
                </div>

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ marginBottom: 20 }}>
                    <span className="cls-lvl" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", backgroundColor: "rgba(255,255,255,0.08)", padding: "5px 12px", borderRadius: 99, transition: "all 0.3s" }}>
                      {cls.level}
                    </span>
                  </div>
                  <h3 className="cls-name" style={{ fontSize: 28, fontWeight: 900, textTransform: "uppercase", color: "#fff", marginBottom: 12, letterSpacing: "-0.01em", transition: "color 0.3s" }}>
                    {cls.name}
                  </h3>
                  <p className="cls-desc" style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.45)", transition: "color 0.3s" }}>
                    {cls.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* CTA card */}
            <div style={{ borderRadius: 28, padding: 28, backgroundColor: "#e1ccbe", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <p style={{ color: "rgba(79,62,51,0.6)", fontSize: 10, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>Ready to start?</p>
                <h3 style={{ fontSize: 26, fontWeight: 900, textTransform: "uppercase", color: "#4f3e33", lineHeight: 1.1, marginBottom: 12 }}>Find Your Perfect Class</h3>
                <p style={{ fontSize: 14, color: "rgba(79,62,51,0.65)", lineHeight: 1.65 }}>New to Reformd? Try our Intro Offer — 3 classes in your first 2 weeks.</p>
              </div>
              <a href="https://clients.mindbodyonline.com/ASP/su1.asp?studioid=5756614" target="_blank" rel="noopener noreferrer"
                style={{ display: "block", textAlign: "center", backgroundColor: "#0c0c0c", color: "#e1ccbe", padding: "14px 0", borderRadius: 99, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none", marginTop: 24 }}>
                Book Now →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STUDIO PHOTOS ─── */}
      <section style={{ backgroundColor: "#0c0c0c", padding: "0 16px 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="studio-grid">
          {[IMGS.studio1, IMGS.studio2].map((src, i) => (
            <div key={i} style={{ borderRadius: 28, overflow: "hidden", aspectRatio: "16/10" }}>
              <img src={src} alt={`Studio ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" style={{ backgroundColor: "#f5efe6", padding: "100px 0 120px", clipPath: "polygon(0 4%, 100% 0, 100% 100%, 0 100%)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ marginBottom: 60, textAlign: "center" }}>
            <p style={{ color: "#4f3e33", fontSize: 11, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 12 }}>Flexible Options</p>
            <h2 style={{ fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 900, textTransform: "uppercase", color: "#0c0c0c", lineHeight: 0.9, letterSpacing: "-0.03em", marginBottom: 16 }}>Pricing</h2>
            <p style={{ color: "rgba(12,12,12,0.5)", fontSize: 16, maxWidth: 380, margin: "0 auto" }}>Membership and class pack options available at both locations.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="pricing-grid">
            {/* Intro Offer */}
            <div style={{ backgroundColor: "#4f3e33", borderRadius: 32, padding: 32, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
              <span style={{ position: "absolute", top: 20, right: 20, backgroundColor: "#e1ccbe", color: "#4f3e33", fontSize: 9, fontWeight: 900, padding: "5px 12px", borderRadius: 99, textTransform: "uppercase", letterSpacing: "0.15em" }}>New Clients</span>
              <div style={{ fontSize: 80, fontWeight: 900, color: "rgba(225,204,190,0.1)", lineHeight: 1, position: "absolute", bottom: -10, right: 16, userSelect: "none" }}>★</div>
              <p style={{ color: "rgba(225,204,190,0.5)", fontSize: 10, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Best place to start</p>
              <h3 style={{ fontSize: 34, fontWeight: 900, color: "#e1ccbe", textTransform: "uppercase", marginBottom: 6 }}>Intro Offer</h3>
              <p style={{ color: "rgba(225,204,190,0.55)", fontSize: 14, marginBottom: 24 }}>Your first 2 weeks at Reformd</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1, marginBottom: 28 }}>
                {["3 classes in your first 2 weeks", "Available to first-time clients", "Use at Cecil Hills or Kings Park", "All class types included"].map(item => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "rgba(225,204,190,0.75)", fontSize: 14, marginBottom: 12 }}>
                    <span style={{ color: "#e1ccbe", fontWeight: 900, marginTop: 1 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <a href="https://clients.mindbodyonline.com/ASP/su1.asp?studioid=5756614" target="_blank" rel="noopener noreferrer"
                style={{ display: "block", textAlign: "center", backgroundColor: "#e1ccbe", color: "#4f3e33", padding: "14px 0", borderRadius: 99, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none" }}>
                Get Started
              </a>
            </div>

            {/* Memberships */}
            <div style={{ backgroundColor: "#fff", borderRadius: 32, padding: 32, display: "flex", flexDirection: "column", border: "2px solid rgba(79,62,51,0.1)" }}>
              <p style={{ color: "#4f3e33", fontSize: 10, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Recurring</p>
              <h3 style={{ fontSize: 34, fontWeight: 900, color: "#0c0c0c", textTransform: "uppercase", marginBottom: 6 }}>Memberships</h3>
              <p style={{ color: "rgba(12,12,12,0.4)", fontSize: 14, marginBottom: 24 }}>Unlimited or limited weekly classes</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1, marginBottom: 28 }}>
                {["Foundation & Premium tiers", "Weekly direct debit", "Free or discounted creche access", "Best value for regulars"].map(item => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "rgba(12,12,12,0.6)", fontSize: 14, marginBottom: 12 }}>
                    <span style={{ color: "#4f3e33", fontWeight: 900, marginTop: 1 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <a href="https://www.reformdpilates.com.au/pricing" target="_blank" rel="noopener noreferrer"
                style={{ display: "block", textAlign: "center", border: "2px solid rgba(79,62,51,0.25)", color: "#4f3e33", padding: "14px 0", borderRadius: 99, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none" }}>
                View Plans
              </a>
            </div>

            {/* Class Packs */}
            <div style={{ backgroundColor: "#fff", borderRadius: 32, padding: 32, display: "flex", flexDirection: "column", border: "2px solid rgba(79,62,51,0.1)" }}>
              <p style={{ color: "#4f3e33", fontSize: 10, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Flexible</p>
              <h3 style={{ fontSize: 34, fontWeight: 900, color: "#0c0c0c", textTransform: "uppercase", marginBottom: 6 }}>Class Packs</h3>
              <p style={{ color: "rgba(12,12,12,0.4)", fontSize: 14, marginBottom: 24 }}>Book on your own schedule</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1, marginBottom: 28 }}>
                {["5, 10 & 20 class options", "No commitment required", "Use at both locations", "Extended validity period"].map(item => (
                  <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "rgba(12,12,12,0.6)", fontSize: 14, marginBottom: 12 }}>
                    <span style={{ color: "#4f3e33", fontWeight: 900, marginTop: 1 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <a href="https://www.reformdpilates.com.au/pricing" target="_blank" rel="noopener noreferrer"
                style={{ display: "block", textAlign: "center", border: "2px solid rgba(79,62,51,0.25)", color: "#4f3e33", padding: "14px 0", borderRadius: 99, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none" }}>
                View Packs
              </a>
            </div>
          </div>

          {/* Private sessions banner */}
          <div style={{ marginTop: 16, backgroundColor: "#e1ccbe", borderRadius: 28, padding: "28px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ color: "rgba(79,62,51,0.6)", fontSize: 10, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>One-on-One</p>
              <h3 style={{ fontSize: 26, fontWeight: 900, color: "#4f3e33", textTransform: "uppercase", marginBottom: 6 }}>Private Sessions</h3>
              <p style={{ color: "rgba(79,62,51,0.65)", fontSize: 14, maxWidth: 480 }}>Personal training on the Reformer. Tailored to your goals, injury history and fitness level with dedicated instructor attention.</p>
            </div>
            <a href="https://www.reformdpilates.com.au/pricing" target="_blank" rel="noopener noreferrer"
              style={{ flexShrink: 0, backgroundColor: "#4f3e33", color: "#e1ccbe", padding: "14px 28px", borderRadius: 99, fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none" }}>
              Enquire →
            </a>
          </div>
        </div>
      </section>

      {/* ─── CRECHE ─── */}
      <section style={{ backgroundColor: "#0c0c0c", padding: "80px 16px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ borderRadius: 36, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" }} className="creche-grid">
            <div style={{ backgroundColor: "#4f3e33", padding: "60px 52px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ color: "rgba(225,204,190,0.5)", fontSize: 10, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>For Mums &amp; Dads</p>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, textTransform: "uppercase", color: "#e1ccbe", lineHeight: 0.92, marginBottom: 20 }}>
                Soundproof<br />Creche<br />Facility
              </h2>
              <p style={{ color: "rgba(225,204,190,0.6)", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                Don&apos;t let childcare stop you from moving. Our supervised creche runs Monday–Friday at 8:30am and 9:30am.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                {[["Foundation Members", "Free of charge"], ["All Others", "$5 per session"]].map(([title, val]) => (
                  <div key={title} style={{ backgroundColor: "rgba(225,204,190,0.1)", borderRadius: 16, padding: "16px 18px" }}>
                    <p style={{ color: "#e1ccbe", fontWeight: 800, fontSize: 14, marginBottom: 4 }}>{title}</p>
                    <p style={{ color: "rgba(225,204,190,0.55)", fontSize: 13 }}>{val}</p>
                  </div>
                ))}
              </div>
              <p style={{ color: "rgba(225,204,190,0.35)", fontSize: 12 }}>Book through the Reformd app · Advance booking required</p>
            </div>
            <div style={{ position: "relative", minHeight: 360 }}>
              <img src={IMGS.gallery3} alt="Reformd Pilates creche" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" style={{ backgroundColor: "#f5efe6", padding: "100px 28px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ color: "#4f3e33", fontSize: 11, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 12 }}>Got Questions?</p>
            <h2 style={{ fontSize: "clamp(42px, 7vw, 72px)", fontWeight: 900, textTransform: "uppercase", color: "#0c0c0c", lineHeight: 0.9, letterSpacing: "-0.03em" }}>FAQ</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderRadius: 20, backgroundColor: "#fff", border: "2px solid rgba(79,62,51,0.08)", overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 28px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ color: "#0c0c0c", fontSize: 15, fontWeight: 700, paddingRight: 16, lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ color: "#4f3e33", fontSize: 22, fontWeight: 900, flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.25s", lineHeight: 1 }}>+</span>
                </button>
                <div style={{ overflow: "hidden", maxHeight: openFaq === i ? 200 : 0, opacity: openFaq === i ? 1 : 0, transition: "max-height 0.35s ease, opacity 0.25s" }}>
                  <div style={{ padding: "0 28px 24px", color: "rgba(12,12,12,0.55)", fontSize: 14, lineHeight: 1.75, borderTop: "1px solid rgba(79,62,51,0.08)", paddingTop: 16 }}>
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOCATIONS ─── */}
      <section id="locations" style={{ backgroundColor: "#0c0c0c", padding: "100px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ color: "#e1ccbe", fontSize: 11, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 12 }}>Two Studios</p>
            <h2 style={{ fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 900, textTransform: "uppercase", color: "#fff", lineHeight: 0.9, letterSpacing: "-0.03em" }}>Find Us</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="loc-grid">
            {locations.map((loc) => (
              <a key={loc.name} href={loc.maps} target="_blank" rel="noopener noreferrer"
                style={{ borderRadius: 28, border: "2px solid rgba(225,204,190,0.12)", padding: 36, display: "flex", flexDirection: "column", gap: 16, textDecoration: "none", transition: "all 0.3s", backgroundColor: "rgba(255,255,255,0.03)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(225,204,190,0.4)"; e.currentTarget.style.backgroundColor = "rgba(225,204,190,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(225,204,190,0.12)"; e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ color: "rgba(225,204,190,0.5)", fontSize: 10, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Location</p>
                    <h3 style={{ fontSize: 28, fontWeight: 900, textTransform: "uppercase", color: "#fff" }}>{loc.name}</h3>
                  </div>
                  <span style={{ fontSize: 28, lineHeight: 1 }}>📍</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.7 }}>{loc.address}</p>
                <span style={{ color: "#e1ccbe", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Get Directions →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APP DOWNLOAD ─── */}
      <section style={{ backgroundColor: "#f5efe6", padding: "80px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ borderRadius: 36, backgroundColor: "#4f3e33", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr auto", gap: 0, alignItems: "stretch" }} className="app-grid">
            <div style={{ padding: "60px 52px" }}>
              <p style={{ color: "rgba(225,204,190,0.5)", fontSize: 11, fontWeight: 900, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 16 }}>Book on the go</p>
              <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, textTransform: "uppercase", color: "#e1ccbe", lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: 20 }}>
                Download<br />The App
              </h2>
              <p style={{ color: "rgba(225,204,190,0.55)", fontSize: 15, lineHeight: 1.75, marginBottom: 32, maxWidth: 380 }}>
                Book classes, manage your membership, track your attendance and book creche — all from your phone.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
                  <img src={IMGS.appStore} alt="App Store" style={{ height: 44, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                </a>
                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
                  <img src={IMGS.googlePlay} alt="Google Play" style={{ height: 44, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                </a>
              </div>
            </div>
            <div style={{ width: 280, position: "relative", overflow: "hidden" }} className="app-img">
              <img src={IMGS.gallery4} alt="Reformd app" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer id="contact" style={{ backgroundColor: "#0c0c0c", padding: "72px 28px 40px", borderTop: "1px solid rgba(225,204,190,0.1)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Big brand statement */}
          <div style={{ fontSize: "clamp(36px, 8vw, 100px)", fontWeight: 900, textTransform: "uppercase", color: "rgba(225,204,190,0.06)", lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: 56, userSelect: "none" }}>
            REFORMD<br />PILATES
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 40 }} className="footer-grid">
            <div>
              <img src={IMGS.logo} alt="Reformd Pilates" style={{ height: 32, objectFit: "contain", filter: "brightness(0) invert(1)", marginBottom: 20 }} />
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, lineHeight: 1.75, maxWidth: 280 }}>
                Boutique reformer pilates studio. Owner-operated. Community focused. Fitness for every body.
              </p>
            </div>
            <div>
              <h4 style={{ color: "#e1ccbe", fontSize: 10, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>Navigate</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[["#about","About"],["#classes","Classes"],["#pricing","Pricing"],["#locations","Locations"],["#faq","FAQ"]].map(([href, label]) => (
                  <a key={href} href={href} style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#e1ccbe")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color: "#e1ccbe", fontSize: 10, fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20 }}>Connect</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  ["tel:+61430496626", "+61 430 496 626"],
                  ["https://www.instagram.com/reformdpilatesstudio", "Instagram"],
                  ["https://www.facebook.com/reformdpilatesstudio", "Facebook"],
                  ["https://www.tiktok.com/@reformd.pilates", "TikTok"],
                ].map(([href, label]) => (
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#e1ccbe")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>© {new Date().getFullYear()} Reformd Pilates. All rights reserved.</p>
            <a href="https://clients.mindbodyonline.com/ASP/su1.asp?studioid=5756614" target="_blank" rel="noopener noreferrer"
              style={{ color: "#e1ccbe", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none" }}>
              Book a Class →
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scrollPulse {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }

        /* Desktop nav / mobile toggling */
        .desktop-nav { display: flex !important; }
        .mobile-menu-btn { display: none !important; }
        .mobile-menu { display: block !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; flex-direction: column; gap: 5px; }
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .studio-grid { grid-template-columns: 1fr !important; }
          .creche-grid { grid-template-columns: 1fr !important; }
          .loc-grid { grid-template-columns: 1fr !important; }
          .app-grid { grid-template-columns: 1fr !important; }
          .app-img { display: none !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }

        @media (max-width: 640px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
