import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Helper Components ---

// Icon Component for inline SVGs
const Icon = ({ name, ...props }) => {
  const icons = {
    TrendingUp: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>,
    Camp: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 5 9-3 9 3v11l-9 3-9-3z" /><path d="m12 11 9 3" /><path d="m12 11-9 3" /><path d="m12 19-9-3" /><path d="m21 16-9-3" /><path d="m3.5 6 8.5 3.1 8.5-3.1" /><path d="M12 22V11" /></svg>,
    ShieldAlert: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>,
    ArrowRight: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>,
  };
  const LucideIcon = icons[name];
  return LucideIcon ? LucideIcon(props) : null;
};

// --- Mock Data for the Slider ---
const tourData = [
  { id: 0, title: "The Himalayas Mountain", description: "We organize professional adventures in the most dangerous corners of our planet.", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop" },
  { id: 1, title: "The Andes Expedition", description: "Traverse the longest continental mountain range in the world, a journey of discovery.", image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1974&auto=format&fit=crop" },
  { id: 2, title: "The Alps Discovery", description: "Experience the heart of Europe's most famous mountains, from serene valleys to iconic peaks.", image: "https://cparici.com/wp-content/uploads/2024/08/Alpes-vue-sur-le-Mont-Blanc.jpg" },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
  }),
};

const childVariants = {
  hidden: { opacity: 0, y: 100, transition: { type: "spring", damping: 12, stiffness: 100 } },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
};

const statCardContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
};

const statCardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


// --- Hero Component ---
const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tourData.length);
  };

  const currentTour = tourData[currentIndex];
  const title = "FIND YOUR TRAIL";

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden p-4 sm:p-8">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('./images/hero-background.png')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/30" />
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full container mx-auto max-w-7xl flex flex-col justify-between lg:gap-60 h-full pt-24 pb-8">
        {/* Main Title */}
        <div className="flex-grow flex items-center justify-center">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white text-center uppercase tracking-wider"
            style={{ textShadow: "2px 2px 10px rgba(0,0,0,0.5)" }}
          >
            {title.split("").map((char, index) => (
              <motion.span key={index} variants={childVariants} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Bottom Content Area */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-8">
          {/* Stat Cards */}
          <motion.div
              variants={statCardContainerVariants}
              initial="hidden"
              animate="visible"
              className="w-full md:w-auto flex flex-row justify-center md:justify-start gap-4"
          >
            <motion.div variants={statCardVariants} className="stat-card glass-card w-32 h-32 flex flex-col justify-center items-center p-4">
              <Icon name="TrendingUp" className="w-8 h-8 text-green-400 mb-2" />
              <p className="text-xl font-bold text-white">10k+</p>
              <p className="text-xs text-slate-400">Clients</p>
            </motion.div>
            <motion.div variants={statCardVariants} className="stat-card glass-card w-32 h-32 flex flex-col justify-center items-center p-4">
              <Icon name="Camp" className="w-8 h-8 text-yellow-400 mb-2" />
              <p className="text-xl font-bold text-white">500+</p>
              <p className="text-xs text-slate-400">Camps</p>
            </motion.div>
            <motion.div variants={statCardVariants} className="stat-card glass-card w-32 h-32 flex flex-col justify-center items-center p-4">
              <Icon name="ShieldAlert" className="w-8 h-8 text-red-400 mb-2" />
              <p className="text-xl font-bold text-white">0</p>
              <p className="text-xs text-slate-400">Incidents</p>
            </motion.div>
          </motion.div>

          {/* Tour Slider Card */}
          <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex-shrink-0 w-full md:w-auto"
          >
              <AnimatePresence mode="wait">
                  <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="glass-card rounded-2xl p-4 flex items-center gap-4 max-w-lg mx-auto md:mx-0"
                  >
                      <img src={currentTour.image} alt={currentTour.title} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-grow">
                          <h3 className="font-bold text-md sm:text-lg text-white">{currentTour.title}</h3>
                          <p className="text-sm text-slate-400 mt-1 mb-3">{currentTour.description}</p>
                      </div>
                      <button onClick={handleNext} className="bg-white/10 hover:bg-white/20 transition-colors rounded-full p-3 flex-shrink-0 self-center">
                          <Icon name="ArrowRight" className="w-6 h-6 text-white" />
                      </button>
                  </motion.div>
              </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <style>{`
        .glass-card {
          background: rgba(22, 30, 46, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </section>
  );
};

export default Hero;

