import React, { useState, useEffect, useRef } from "react";
import Hero from "../components/Hero";
import TrekkingDestination from "../components/TrekkingDestination";
import DiscoverWorld from "../components/DiscoverWorld";
import AboutUs from "../components/AboutUs";
import Packages from "../components/Packages";
import Testimonial from "../components/Testimonial";

// --- GSAP and ScrollTrigger setup ---
// This code assumes GSAP is available globally (e.g., via a script tag in your index.html)
const gsap = window.gsap;
if (gsap && !gsap.plugins.ScrollTrigger) {
  gsap.registerPlugin(window.ScrollTrigger);
}

// --- Icon Components (using inline SVG) ---
// I've added the new icons (TrendingUp, Camp, ShieldAlert) here.
const Icon = ({ name, ...props }) => {
  const icons = {
    // Icons for the new Hero section
    TrendingUp: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
    Camp: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 5 9-3 9 3v11l-9 3-9-3z"/><path d="m12 11 9 3"/><path d="m12 11-9 3"/><path d="m12 19-9-3"/><path d="m21 16-9-3"/><path d="m3.5 6 8.5 3.1 8.5-3.1"/><path d="M12 22V11"/></svg>,
    ShieldAlert: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>,
    
    // Original Icons
    MapPin: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
    Mountain: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z" /></svg>,
    Compass: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>,
    ShieldCheck: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>,
    Users: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    Sparkles: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a2.39 2.39 0 0 0-1.5 4.1L5 12l5.6 5.9A2.39 2.39 0 0 0 12 22a2.39 2.39 0 0 0 1.5-4.1L19 12l-5.6-5.9A2.39 2.39 0 0 0 12 2Z" /></svg>,
    ArrowRight: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>,
    Twitter: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 3 5.2-9.7 7.7-14.7 2.4-14.7-2.4 2.8 1.1 4.5 1.4 6.2 0-3.3-1-4.4-4.5-4.4-4.5s-1.5 1.4-2.8 1.4c-2.8-1.7-4.2-4.5-4.2-4.5s1.5 1.1 2.8 .8c-2.3-2.1-3.3-5.2-1.9-6.5 4.3 4.9 9.3 7.8 15.3 8.3z" /></svg>,
    Github: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6.1a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.7 2.7 5.8 5.5 6.1-.6.6-.6 1.2-.5 2V21" /></svg>,
    Instagram: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>,
  };
  const LucideIcon = icons[name];
  return LucideIcon ? LucideIcon(props) : null;
};

// --- Data ---
const mockTrails = [ { id: 1, name: "Whispering Pines", location: "Mountain Valley", image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop", difficulty: "Moderate", }, { id: 2, name: "Azure Lake Loop", location: "Coastal Range", image: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?q=80&w=1974&auto=format&fit=crop", difficulty: "Easy", }, { id: 3, name: "Summit Chaser", location: "Alpine Peaks", image: "https://images.unsplash.com/photo-1589824783473-243329190538?q=80&w=1974&auto=format&fit=crop", difficulty: "Hard", }, { id: 4, name: "Canyon's Echo", location: "Desert Highlands", image: "https://images.unsplash.com/photo-1471295253337-3ce95ca41ae2?q=80&w=2070&auto=format&fit=crop", difficulty: "Moderate", },];
const tourData = [ { title: "The Himalayas Mountain", description: "We organize professional adventures in the most dangerous corners of our planet. People change after our tours. Forever.", image: "https://images.unsplash.com/photo-1525498227091-56db992af6ee?q=80&w=2070&auto=format&fit=crop" }, { title: "The Andes Expedition", description: "Traverse the longest continental mountain range in the world, a journey of discovery and endurance.", image: "https://images.unsplash.com/photo-1598424262842-16a71544a469?q=80&w=2070&auto=format&fit=crop" }, { title: "The Alps Discovery", description: "Experience the heart of Europe's most famous mountains, from serene valleys to iconic peaks.", image: "https://images.unsplash.com/photo-1537522325619-3a3f0a71b2ac?q=80&w=1974&auto=format&fit=crop" }];

// --- Reusable Button Component ---
const Button = ({ children, className = "", ...props }) => (
  <button
    className={`btn-gradient text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// --- Section Components ---



const TrailCard = ({ trail, index }) => {
  const cardRef = useRef(null);
  useEffect(() => {
    if (!gsap || !cardRef.current) return;
    gsap.from(cardRef.current, {
      scrollTrigger: { trigger: cardRef.current, start: "top 90%" },
      opacity: 0, y: 60, duration: 0.8, delay: index * 0.1, ease: "power3.out",
    });
  }, []);

  return (
    <div ref={cardRef} className="claymorphism p-4 group overflow-hidden transition-transform duration-300 hover:-translate-y-2">
      <div className="overflow-hidden rounded-3xl">
        <img src={trail.image} alt={trail.name} className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-500"/>
      </div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{trail.name}</h3>
        <p className="text-indigo-400 mb-4 flex items-center justify-center gap-2">
          <Icon name="MapPin" size={16} /> {trail.location}
        </p>
        <span className="bg-slate-700 text-slate-300 text-sm font-medium me-2 px-3 py-1 rounded-full">{trail.difficulty}</span>
      </div>
    </div>
  );
};



// --- Main HomePage Component ---
const HomePage = () => {
  return (
    <>
      {/* These styles would typically be in a global CSS file */}
      <style>{`
        :root { --scroll-behavior: smooth !important; }
        .claymorphism {
          background: #1E293B;
          border-radius: 50px;
          box-shadow: inset 5px 5px 10px #151d2e, inset -5px -5px 10px #273548, 10px 10px 20px rgba(0,0,0,0.3);
        }
        .hero-gradient-text {
          background: -webkit-linear-gradient(45deg, #818CF8, #C084FC, #F472B6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .feature-card:before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 1rem; border: 2px solid transparent;
          background: linear-gradient(45deg, #8B5CF6, #EC4899) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          z-index: -1;
        }
        /* Style for the new Hero's stat cards */
        .glass-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 1rem; /* 16px */
        }
      `}</style>

      <main>
        <Hero />
        <TrekkingDestination />
        <DiscoverWorld />
        <AboutUs />
        <Packages />
        <Testimonial />
      </main>
    </>
  );
};

export default HomePage;