import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- Icon Components (using inline SVG) ---
const Icon = ({ name, ...props }) => {
    const icons = {
        Airplane: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.3L12 14 6.2 19.3l-2.4-2.4 7-7L20.2 17l-2.4 2.3zM15 10l-3-3-3 3"/></svg>,
    };
    const LucideIcon = icons[name];
    return LucideIcon ? LucideIcon(props) : null;
};

// --- Continent Data (with simplified SVG paths for demonstration) ---
const continents = [
  { name: 'North America', icon: 'M18.8 4.2C17.5 3.3 16 3 14.5 3c-1.8 0-3.5 0.7-4.8 2C8.3 6.3 7 7.5 5.8 8.7c-0.8 0.7-1.6 1.4-2.2 2.3C3.2 11.4 3 12.2 3 13c0 1.2 0.7 2.3 1.8 3.2 1.1 0.9 2.5 1.4 3.9 1.4 1.5 0 2.9-0.5 4.1-1.4 1.2-0.9 2.1-2 2.8-3.3 0.7-1.3 1.1-2.7 1.1-4.2C16.7 8.3 16.3 6.9 15.6 5.6C14.9 4.3 14.1 3.2 13.1 2.3L12 1M12 21c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z' },
  { name: 'South America', icon: 'M13.5 21c-1.3 0-2.6-0.4-3.7-1.1C8.7 19.1 7.8 18.2 7 17.1c-0.8-1.1-1.2-2.3-1.2-3.6 0-1.4 0.4-2.8 1.2-4.1C7.8 8.1 8.7 7 9.8 6.2c1.1-0.7 2.4-1.1 3.7-1.1 1.3 0 2.6 0.4 3.7 1.1C18.3 7 19.2 8.1 20 9.2c0.8 1.3 1.2 2.7 1.2 4.1 0 1.4-0.4 2.7-1.2 3.9C19.2 18.9 18.3 20 17.2 20.7c-1.1 0.7-2.4 1.1-3.7 1.1zM12 21c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2-0.9 2-2 2z' },
  { name: 'Europe', icon: 'M12 2C9.8 2 7.8 2.8 6.2 4.2C4.7 5.7 3.8 7.6 3.8 9.8c0 2.2 0.9 4.2 2.4 5.6C7.8 16.9 9.8 17.7 12 17.7s4.2-0.9 5.8-2.3c1.5-1.4 2.4-3.4 2.4-5.6 0-2.2-0.9-4.2-2.4-5.6C16.2 2.8 14.2 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z' },
  { name: 'Asia', icon: 'M12 2C9.8 2 7.8 2.8 6.2 4.2C4.7 5.7 3.8 7.6 3.8 9.8c0 2.2 0.9 4.2 2.4 5.6C7.8 16.9 9.8 17.7 12 17.7s4.2-0.9 5.8-2.3c1.5-1.4 2.4-3.4 2.4-5.6 0-2.2-0.9-4.2-2.4-5.6C16.2 2.8 14.2 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z' },
  { name: 'Australia', icon: 'M12 2C9.8 2 7.8 2.8 6.2 4.2C4.7 5.7 3.8 7.6 3.8 9.8c0 2.2 0.9 4.2 2.4 5.6C7.8 16.9 9.8 17.7 12 17.7s4.2-0.9 5.8-2.3c1.5-1.4 2.4-3.4 2.4-5.6 0-2.2-0.9-4.2-2.4-5.6C16.2 2.8 14.2 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z' },
];

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const continentItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 10 } },
};

// --- DiscoverWorld Component ---
const DiscoverWorld = () => {
  return (
    <section id="discover" className="relative min-h-[90vh] bg-slate-950 text-white flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Header */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="container mx-auto md:text-left md:ml-53 text-center mb-8 md:mb-16 relative z-10"
      >
        <motion.p variants={itemVariants} className="text-indigo-400 font-semibold mb-2 uppercase tracking-wide">
          DISCOVER
        </motion.p>
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold leading-tight">
          Discover the world through
          <br />
          our eyes
        </motion.h2>
      </motion.div>

      {/* Continents - Desktop Layout */}
      <div className="relative w-full max-w-5xl my-16 hidden lg:flex justify-between items-center z-10">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 200">
          <path d="M 50 100 C 250 20, 750 20, 950 100" fill="none" stroke="url(#gradientPath)" strokeWidth="2" strokeDasharray="10 10" />
          <defs>
              <linearGradient id="gradientPath" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
          </defs>
        </svg>

        {continents.map((continent, index) => (
          <motion.div key={continent.name} variants={continentItemVariants} className="absolute flex flex-col items-center cursor-pointer group" style={{ left: `${10 + index * 20}%`, top: `${35 + (index % 2) * 20}%` }}>
            <motion.div className="bg-slate-800/60 backdrop-blur-sm p-3 rounded-full shadow-lg group-hover:bg-indigo-600 transition-colors duration-300" whileHover={{ scale: 1.1, rotate: 5 }}>
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d={continent.icon} /></svg>
            </motion.div>
            <p className="mt-2 text-sm text-slate-300 group-hover:text-white transition-colors duration-300">{continent.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Continents - Mobile Layout */}
       <div className="relative w-full max-w-sm my-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:hidden z-10">
          {continents.map((continent, index) => (
             <motion.div key={continent.name} initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} transition={{delay: index * 0.1}} viewport={{once: true}} className="flex items-center gap-3">
                 <motion.div className="bg-slate-800/60 backdrop-blur-sm p-3 rounded-full shadow-lg" whileHover={{ scale: 1.1, rotate: 5 }}>
                     <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><path d={continent.icon} /></svg>
                 </motion.div>
                 <p className="text-sm font-semibold text-slate-300">{continent.name}</p>
             </motion.div>
          ))}
       </div>


      {/* Book Now Button */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        className="relative z-10 mt-8 md:mt-16"
      >
        <Link to="/packages">
             <motion.button whileHover={{scale: 1.05}} whileTap={{scale: 0.95}} className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-bold py-3 px-8 rounded-full shadow-lg text-lg">
                Book Now
             </motion.button>
        </Link>
      </motion.div>

      {/* Bottom Illustration */}
      <div className="absolute bottom-0 left-0 w-full h-[250px] md:h-[400px] overflow-hidden">
        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
          <motion.path initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} d="M0 400 L0 250 C 150 200, 300 280, 500 200 C 700 120, 850 250, 1000 200 L1000 400 Z" fill="#1E293B" />
          <motion.path initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: 1 }} d="M0 400 L0 300 C 200 250, 400 320, 600 250 C 800 180, 1000 280, 1000 280 L1000 400 Z" fill="#2D3A4F" />
          <motion.g initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} transform="translate(450 150) scale(0.6)">
            <rect x="10" y="20" width="10" height="30" fill="#60A5FA" rx="3" />
            <circle cx="15" cy="15" r="8" fill="#9CA3AF" />
            <rect x="5" y="30" width="20" height="20" fill="#3B82F6" rx="5" />
            <line x1="15" y1="50" x2="25" y2="70" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
            <line x1="10" y1="50" x2="0" y2="70" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
            <line x1="15" y1="35" x2="30" y2="45" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
            <line x1="15" y1="35" x2="0" y2="45" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
            <line x1="30" y1="45" x2="40" y2="65" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round" />
          </motion.g>
        </svg>
      </div>
    </section>
  );
};

export default DiscoverWorld;

