import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- Icon Components (using inline SVG) ---
const Icon = ({ name, ...props }) => {
  const icons = {
    ArrowLeft: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>,
    ArrowRight: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>,
    Star: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    Clock: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
    MapPin: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="3" /></svg>,
  };
  const LucideIcon = icons[name];
  return LucideIcon ? LucideIcon(props) : null;
};

// --- Mock Data for Packages ---
const packagesData = [
  { id: 1, title: "The Kesugi Ridge Trail", rating: 5, duration: "3 to 4 days", location: "Alaska, USA", image: "https://uploads.alaska.org/blog/Jeff-Schultz-Blog/Kesugi-Ridge/_2400xAUTO_fit_center-center_65_none/Jeff-Schultz-Kesugi-Ridge-2102901HighRes.jpg", color: "from-amber-400/80 to-yellow-600/80" },
  { id: 2, title: "The Santa Cruz Track", rating: 5, duration: "3 to 4 days", location: "Peru", image: "https://huaraztreks.com/wp-content/uploads/2020/01/santa-cruz-circuit.jpg", color: "from-cyan-400/80 to-blue-600/80" },
  { id: 3, title: "Tour Du Mont Blanc", rating: 5, duration: "7 to 11 days", location: "Europe", image: "https://pictures.altai-travel.com/1920x0/views-of-mont-blanc-adobe-stock-4067.jpg", color: "from-purple-500/80 to-indigo-700/80" },
  { id: 4, title: "Chamonix-Zermatt Route", rating: 4, duration: "12 days", location: "France, Switzerland", image: "https://www.dolomitiskirock.com/MTF/Content/Catalog/escursioni/catalogo/PRODUCTS/thumb/ch-07.jpg", color: "from-pink-500/80 to-purple-600/80" },
  { id: 5, title: "Milford Track", rating: 5, duration: "4 days", location: "New Zealand", image: "https://www.doc.govt.nz/thumbs/hero/globalassets/images/places/fiordland/milford-track/milford-hero-1920.jpg", color: "from-green-500/80 to-emerald-700/80" },
];

// --- Framer Motion Variants ---
const textVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };
const navButtonVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

const getCardStyle = (index, activeIndex, totalCards) => {
    const offset = index - activeIndex;
    const absOffset = Math.abs(offset);

    // More compact values for better responsiveness
    const zIndex = totalCards - absOffset;
    const rotation = offset * 3;
    let translateX = offset * 25; 
    const translateY = absOffset * 15;
    let scale = 1 - absOffset * 0.1;
    let opacity = 1 - absOffset * 0.4;
    
    opacity = Math.max(0, opacity);

    if (offset === 0) {
        return { zIndex, rotate: 0, translateX: 0, translateY: 0, scale: 1, opacity: 1 };
    }
    
    if (absOffset > 1) { // Hide cards that are more than 1 position away
        opacity = 0;
        scale = 0.8;
        translateX = offset > 0 ? 100 : -100;
    }

    return { zIndex, rotate: rotation, translateX, translateY, scale, opacity };
};

// --- Packages Component ---
const Packages = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const totalPackages = packagesData.length;
  const handleNext = () => setActiveIndex((prevIndex) => (prevIndex + 1) % totalPackages);
  const handlePrev = () => setActiveIndex((prevIndex) => (prevIndex - 1 + totalPackages) % totalPackages);

  return (
    <section id="packages" className="pt-24 md:pt-40 pb-20 bg-slate-950 text-white overflow-hidden min-h-screen">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-end mb-12 md:mb-16 relative z-20">
          <div className="text-center md:text-left">
            <motion.p variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-indigo-400 font-semibold mb-2 uppercase tracking-wide">PACKAGES</motion.p>
            <motion.h2 variants={textVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-4xl md:text-5xl font-bold leading-tight">Top packages<br />for you</motion.h2>
          </div>
          <motion.div variants={navButtonVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center space-x-4 mt-8 md:mt-0">
            <span className="text-xl font-medium">{String(activeIndex + 1).padStart(2, '0')}</span>
            <div className="w-12 h-0.5 bg-gray-600"><div className="w-4 h-0.5 bg-white -ml-2"></div></div>
            <span className="text-xl font-medium">{String(totalPackages).padStart(2, '0')}</span>
            <button onClick={handlePrev} className="glass-card p-3 transition-colors hover:bg-white/20"><Icon name="ArrowLeft" className="w-6 h-6" /></button>
            <button onClick={handleNext} className="glass-card p-3 transition-colors hover:bg-white/20"><Icon name="ArrowRight" className="w-6 h-6" /></button>
          </motion.div>
        </div>
        <div className="relative h-[550px] md:h-[650px] flex justify-center items-center w-full mt-8 md:mt-0">
          <AnimatePresence initial={false}>
            {packagesData.map((pkg, index) => {
              const styles = getCardStyle(index, activeIndex, totalPackages);
              const cardContent = (
                <motion.div
                  key={pkg.id}
                  className="absolute w-[280px] h-[420px] md:w-[350px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                  initial={{...styles, opacity: 0, scale: 0.8}}
                  animate={styles}
                  exit={{...styles, opacity: 0, scale: 0.8}}
                  transition={{ type: "spring", stiffness: 400, damping: 40 }}
                  onClick={() => index !== activeIndex && setActiveIndex(index)}
                  style={{ transformOrigin: 'center bottom' }}
                >
                  <img src={pkg.image} alt={pkg.title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${pkg.color} from-black/80 via-transparent to-transparent`}></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                    <div className="flex text-yellow-400 mb-2">{Array(pkg.rating).fill(0).map((_, i) => <Icon key={i} name="Star" className="w-5 h-5" />)}</div>
                    <h3 className="text-2xl font-bold leading-tight mb-3">{pkg.title}</h3>
                    <div className="flex items-center text-sm text-slate-200 mb-2"><Icon name="Clock" className="w-4 h-4 mr-2 opacity-70" /><span>{pkg.duration}</span></div>
                    <div className="flex items-center text-sm text-slate-200"><Icon name="MapPin" className="w-4 h-4 mr-2 opacity-70" /><span>{pkg.location}</span></div>
                  </div>
                </motion.div>
              );
              
              if (index === activeIndex) {
                return <Link key={pkg.id} to={`/packages/${pkg.id}`}>{cardContent}</Link>;
              }
              return cardContent;
            })}
          </AnimatePresence>
        </div>
      </div>
      <style>{`
        .glass-card { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 9999px; }
      `}</style>
    </section>
  );
};

export default Packages;

