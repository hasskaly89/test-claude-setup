"use client";

import { useState } from "react";
import Image from "next/image";

const IMGS = {
  logo: "/logo.png",
  hero: "https://images.squarespace-cdn.com/content/v1/65cec61119c06337bea7a946/b1474ec4-23ae-4f11-9e38-66d88c73ace9/DSCF3371.jpg",
  about: "https://images.squarespace-cdn.com/content/v1/65cec61119c06337bea7a946/c9ff8e92-b68d-4078-8398-61dd12ded903/DSCF3278.jpg",
  booth1: "https://images.squarespace-cdn.com/content/v1/65cec61119c06337bea7a946/fa36c942-482e-468e-b580-694d88148ed1/DSCF2508.jpg",
  booth2: "https://images.squarespace-cdn.com/content/v1/65cec61119c06337bea7a946/6ae36374-746b-43fd-b97f-5fb84eafdc85/DSCF3500.jpg",
  gallery1: "https://images.squarespace-cdn.com/content/v1/65cec61119c06337bea7a946/3be460b8-ced1-4e5d-b1b7-91af7a52d9a2/DSCF2919-HIGHRES-2.jpg",
  gallery2: "https://images.squarespace-cdn.com/content/v1/65cec61119c06337bea7a946/6e0af7d9-de31-4d94-a420-faafd0084f70/DSCF3334-HIGHRES-2.jpg",
  gallery3: "https://images.squarespace-cdn.com/content/v1/65cec61119c06337bea7a946/2b8046e0-e9f5-424e-9f55-58d06dc9689f/DSCF3275.jpg",
  gallery4: "https://images.squarespace-cdn.com/content/v1/65cec61119c06337bea7a946/6ca1781a-e596-4b4b-ba4b-125cf568e0b8/DSCF2180.jpg",
  appStore: "https://images.squarespace-cdn.com/content/v1/65cec61119c06337bea7a946/30dbd149-cefb-41e2-8446-dd541b0258cd/vecteezy_app-store-download-button-in-white-colors-download-on-the_12871374.png",
  googlePlay: "https://images.squarespace-cdn.com/content/v1/65cec61119c06337bea7a946/f164d0f3-0f48-4705-a026-27464c82c4d9/vecteezy_google-play-store-download-button-in-white-colors-download_12871364.png",
};

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Book Now", href: "/book-now" },
  { label: "About", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const faqs = [
  {
    q: "What is a contactless spray tan booth?",
    a: "We use state of the art spray tan booths that provide a custom spray tanning experience in your own private room. Once you've stepped into the booth, it will sense your height and guide you into 4 different positions with 3 spray nozzles for full-body coverage. The open booth is comfortably heated — even in winter you'll stay warm. Our booths self-clean between sessions.",
  },
  {
    q: "How do I select my tan?",
    a: "Our booths have 4 colour options with 3 colour depths. In our tanning rooms you'll find a tan menu so you can customise your experience. If you're unsure which colour is right for you, feel free to contact us and we'll help recommend an option!",
  },
  {
    q: "How long do I leave my tan on before showering?",
    a: "We recommend leaving your tan on for 6–8 hours. For a darker result you can sleep in it — just wash your hands and face with a gentle cleanser 30 minutes after your session. We also offer a 2-hour rapid clear solution that develops into a deep sunkissed glow and needs to be washed off after 2–3 hours max.",
  },
  {
    q: "How do spray tans work?",
    a: "When your sunless tan is applied, Dihydroxyacetone (DHA) reacts with proteins in the skin to form a golden-brown colour. After 2–3 hours your skin darkens and reaches peak colour within 24 hours. Your tan will gradually fade due to natural exfoliation.",
  },
];

const locations = [
  { name: "349B Kingsway, Caringbah", maps: "https://www.google.com/maps/search/?api=1&query=349B+Kingsway+Caringbah+NSW" },
  { name: "Shop 6/207 Edensor Rd, Edensor Park", maps: "https://www.google.com/maps/search/?api=1&query=Shop+6%2F207+Edensor+Rd+Edensor+Park+NSW" },
  { name: "6/2 Garling Rd, Kings Park", maps: "https://www.google.com/maps/search/?api=1&query=6%2F2+Garling+Rd+Kings+Park+NSW" },
  { name: "1/73-77 Anderson Rd, Smeaton Grange", maps: "https://www.google.com/maps/search/?api=1&query=1%2F73-77+Anderson+Rd+Smeaton+Grange+NSW" },
  { name: "8 Oxford St, Woollahra", maps: "https://www.google.com/maps/search/?api=1&query=8+Oxford+St+Woollahra+NSW" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#fdf6ec] text-[#1a1a1a] font-sans">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fdf6ec]/90 backdrop-blur-sm border-b border-[#e8d9c3]">
        <div className="max-w-6xl mx-auto px-6 p-0 flex items-center justify-between">
          <a href="#home" className="flex items-center">
            <img src={IMGS.logo} alt="Tanned Co." className="h-28 object-contain" />
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider uppercase">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-[#5a4a3a] hover:text-[#1a1a1a] transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <a
            href="/book-now"
            className="hidden md:inline-flex items-center bg-[#1a1a1a] text-white text-sm px-5 py-2.5 rounded-full font-medium hover:bg-[#3a2e24] transition-colors"
          >
            Book Now
          </a>

          {/* Mobile hamburger */}
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

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#fdf6ec] border-t border-[#e8d9c3] px-6 py-6 flex flex-col gap-5">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium tracking-wider uppercase text-[#5a4a3a]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/book-now"
              className="mt-2 text-center bg-[#1a1a1a] text-white text-sm px-5 py-3 rounded-full font-medium"
            >
              Book Now
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative h-screen min-h-[600px] flex items-end">
        <img
          src={IMGS.hero}
          alt="Tanned Co. studio"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-20 md:pb-28">
          <img src="/logo_transparent.png" alt="Tanned Co." className="w-full max-w-3xl brightness-0 invert mb-6" />
          <p className="text-white/90 text-lg md:text-xl max-w-md mb-8">
            Sydney&apos;s first automated spray tanning studio. Private booths. Perfect results. 7 days a week.
          </p>
          <a
            href="/book-now"
            className="inline-flex items-center bg-white text-[#1a1a1a] text-sm md:text-base px-8 py-3.5 rounded-full font-semibold hover:bg-[#f5e6cc] transition-colors"
          >
            Book Your Tan →
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#b08850] mb-4">Your Go-To Destination</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-6">
              Luxury Tanning, Your Way
            </h2>
            <p className="text-[#5a4a3a] text-lg leading-relaxed mb-6">
              Welcome to Tanned Co — Sydney&apos;s first automated spray tanning studio. We offer a luxurious and private experience for both men and women.
            </p>
            <p className="text-[#5a4a3a] text-lg leading-relaxed mb-10">
              Achieve your desired tan in our private booths, open 7 days a week. Book your appointment today for the ultimate tanning and skincare experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-[#f5e6cc] rounded-2xl px-6 py-4 text-center">
                <p className="text-2xl font-black text-[#b08850]">5</p>
                <p className="text-xs uppercase tracking-widest text-[#5a4a3a] mt-1">Locations</p>
              </div>
              <div className="bg-[#f5e6cc] rounded-2xl px-6 py-4 text-center">
                <p className="text-2xl font-black text-[#b08850]">7</p>
                <p className="text-xs uppercase tracking-widest text-[#5a4a3a] mt-1">Days a Week</p>
              </div>
              <div className="bg-[#f5e6cc] rounded-2xl px-6 py-4 text-center">
                <p className="text-2xl font-black text-[#b08850]">4</p>
                <p className="text-xs uppercase tracking-widest text-[#5a4a3a] mt-1">Colour Shades</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/5]">
            <img src={IMGS.about} alt="Tanned Co. result" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-2">
          {[IMGS.gallery1, IMGS.gallery2, IMGS.gallery3, IMGS.gallery4].map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-xl">
              <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28 bg-[#1a1a1a] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#b08850] mb-4 text-center">Simple & Fast</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Book Online", desc: "Choose your location, date, and preferred tan shade through our easy online booking or app." },
              { num: "02", title: "Step Into Your Booth", desc: "Enter your private tanning room. The booth senses your height and guides you through 4 positions for full coverage." },
              { num: "03", title: "Walk Out Glowing", desc: "Develop for 6–8 hours, shower, and reveal your beautiful sun kissed glow.\n\nIn a rush? Try our rapid clear solution - on and off in 2–3 hours with the same sun kissed result." },
            ].map(({ num, title, desc }) => (
              <div key={num} className="border border-white/10 rounded-3xl p-8 hover:border-[#b08850] transition-colors">
                <p className="text-4xl font-black text-[#b08850] mb-4">{num}</p>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-white/60 leading-relaxed whitespace-pre-line">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 md:py-28 bg-[#fdf0d5]">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#b08850] mb-4 text-center">Transparent & Simple</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-center mb-4">Our Pricing</h2>
          <p className="text-center text-[#5a4a3a] mb-16 max-w-md mx-auto">No hidden fees. Just beautiful tans at honest prices.</p>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Casual */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e8d9c3] flex flex-col">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#b08850] mb-3">Casual Tan</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-5xl font-black">$35</span>
                <span className="text-[#5a4a3a] mb-1.5">/ session</span>
              </div>
              <ul className="space-y-3 text-[#5a4a3a] text-sm flex-1 mb-8">
                <li className="flex items-start gap-2"><span className="text-[#b08850] mt-0.5">✓</span> 1x automated spray tan session</li>
                <li className="flex items-start gap-2"><span className="text-[#b08850] mt-0.5">✓</span> Valid for 2 months</li>
                <li className="flex items-start gap-2"><span className="text-[#b08850] mt-0.5">✓</span> Private booth experience</li>
                <li className="flex items-start gap-2"><span className="text-[#b08850] mt-0.5">✓</span> Choose your shade & depth</li>
              </ul>
              <a href="https://www.tannedco.com.au/pricing" target="_blank" rel="noopener noreferrer" className="block text-center border-2 border-[#1a1a1a] text-[#1a1a1a] py-3 rounded-full font-semibold hover:bg-[#1a1a1a] hover:text-white transition-colors text-sm">
                Buy Now
              </a>
            </div>

            {/* 5 Pack */}
            <div className="bg-[#1a1a1a] text-white rounded-3xl p-8 shadow-xl flex flex-col relative overflow-hidden">
              <div className="absolute top-5 right-5 bg-[#b08850] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Popular</div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#b08850] mb-3">5 Pack</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-black">$160</span>
              </div>
              <p className="text-white/50 text-sm mb-6">$33 per tan · Save $15</p>
              <ul className="space-y-3 text-white/70 text-sm flex-1 mb-8">
                <li className="flex items-start gap-2"><span className="text-[#b08850] mt-0.5">✓</span> 5x automated spray tan sessions</li>
                <li className="flex items-start gap-2"><span className="text-[#b08850] mt-0.5">✓</span> Valid for 5 months</li>
                <li className="flex items-start gap-2"><span className="text-[#b08850] mt-0.5">✓</span> Name-specific booking</li>
                <li className="flex items-start gap-2"><span className="text-[#b08850] mt-0.5">✓</span> Private booth experience</li>
              </ul>
              <a href="https://www.tannedco.com.au/pricing" target="_blank" rel="noopener noreferrer" className="block text-center bg-[#b08850] text-white py-3 rounded-full font-semibold hover:bg-[#8a6830] transition-colors text-sm">
                Buy Now
              </a>
            </div>

            {/* 10 Pack */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#e8d9c3] flex flex-col">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#b08850] mb-3">10 Pack</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-5xl font-black">$300</span>
              </div>
              <p className="text-[#5a4a3a] text-sm mb-6">$30 per tan · Save $50</p>
              <ul className="space-y-3 text-[#5a4a3a] text-sm flex-1 mb-8">
                <li className="flex items-start gap-2"><span className="text-[#b08850] mt-0.5">✓</span> 10x automated spray tan sessions</li>
                <li className="flex items-start gap-2"><span className="text-[#b08850] mt-0.5">✓</span> Valid for 10 months</li>
                <li className="flex items-start gap-2"><span className="text-[#b08850] mt-0.5">✓</span> Name-specific booking</li>
                <li className="flex items-start gap-2"><span className="text-[#b08850] mt-0.5">✓</span> Best value per session</li>
              </ul>
              <a href="https://www.tannedco.com.au/pricing" target="_blank" rel="noopener noreferrer" className="block text-center border-2 border-[#1a1a1a] text-[#1a1a1a] py-3 rounded-full font-semibold hover:bg-[#1a1a1a] hover:text-white transition-colors text-sm">
                Buy Now
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* BEFORE/AFTER BOOTHS */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden aspect-[3/4]">
              <img src={IMGS.booth1} alt="Tanning booth" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[3/4] mt-8">
              <img src={IMGS.booth2} alt="Tanning booth result" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#b08850] mb-4">Before You Come In</p>
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight mb-6">
              Be Prepared. Get the Best Tan.
            </h2>
            <p className="text-[#5a4a3a] text-lg leading-relaxed mb-8">
              Watch our how-to video to make sure you get the most out of your session. From prep tips to aftercare, we've got you covered.
            </p>
            <a
              href="https://www.tannedco.com.au/how-to"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1a1a1a] text-white px-7 py-3.5 rounded-full font-semibold hover:bg-[#3a2e24] transition-colors"
            >
              See Our How To's →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28 bg-[#fdf0d5]">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#b08850] mb-4 text-center">Got Questions?</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-center mb-14">FAQ</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#e8d9c3]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-[#1a1a1a] hover:bg-[#fdf6ec] transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <span className={`text-[#b08850] text-xl font-black flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-[#5a4a3a] leading-relaxed text-sm border-t border-[#e8d9c3] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="https://www.tannedco.com.au/faqs" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold tracking-wider uppercase text-[#b08850] border-b-2 border-[#b08850] pb-0.5 hover:text-[#8a6830] hover:border-[#8a6830] transition-colors">
              See More FAQ's
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 md:py-28 bg-[#1a1a1a] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#b08850] mb-4 text-center">Find Us</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-center mb-16">Visit Us</h2>
          <div className="grid md:grid-cols-2 gap-12">

            {/* Locations */}
            <div>
              <h3 className="text-lg font-bold uppercase tracking-widest mb-6 text-[#b08850]">Our Locations</h3>
              <div className="space-y-1">
                {locations.map((loc) => (
                  <a key={loc.name} href={loc.maps} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 border-b border-white/10 pb-1 hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors">
                    <span className="text-[#b08850] mt-0.5">📍</span>
                    <p className="text-white/80 hover:text-white">{loc.name}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-4 text-[#b08850]">Get In Touch</h3>
                <div className="space-y-3">
                  <a href="mailto:hello@tannedco.com.au" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                    <span>✉️</span> hello@tannedco.com.au
                  </a>
                  <a href="tel:1300826633" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                    <span>📞</span> 1300 826 633
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-4 text-[#b08850]">Download Our App</h3>
                <div className="flex flex-wrap gap-3">
                  <a href="https://apps.apple.com/us/app/tannedco/id1659547172" target="_blank" rel="noopener noreferrer">
                    <img src={IMGS.appStore} alt="Download on App Store" className="h-10 object-contain" />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.treshna.memberportal.tannedco" target="_blank" rel="noopener noreferrer">
                    <img src={IMGS.googlePlay} alt="Get it on Google Play" className="h-10 object-contain" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-4 text-[#b08850]">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="http://instagram.com/tannedco_" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors font-medium text-sm uppercase tracking-wider border border-white/20 rounded-full px-4 py-2 hover:border-white/60">Instagram</a>
                  <a href="https://www.tiktok.com/@tannedco_" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors font-medium text-sm uppercase tracking-wider border border-white/20 rounded-full px-4 py-2 hover:border-white/60">TikTok</a>
                  <a href="https://www.facebook.com/profile.php?id=100086326464692" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors font-medium text-sm uppercase tracking-wider border border-white/20 rounded-full px-4 py-2 hover:border-white/60">Facebook</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
          <img src={IMGS.logo} alt="Tanned Co." className="h-6 object-contain brightness-0 invert opacity-50" />
          <p className="text-white/40 text-xs text-center">© {new Date().getFullYear()} Tanned Co. All rights reserved.</p>
          <a href="https://www.tannedco.com.au/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-white/40 text-xs hover:text-white/60 transition-colors">Privacy Policy</a>
        </div>
      </footer>

    </div>
  );
}
