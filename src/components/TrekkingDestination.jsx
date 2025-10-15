import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- Icon Components (using inline SVG) ---
const Icon = ({ name, ...props }) => {
  const icons = {
    ArrowLeft: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>,
    ArrowRight: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>, // FIXED: Correct SVG path
    DollarSign: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
    Clock: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  };
  const LucideIcon = icons[name];
  return LucideIcon ? LucideIcon(props) : null;
};

// --- Mock Data ---
const trekkingDestinations = [
  { id: 1, name: "Everest Base Camp, Nepal", price: 3500, duration: "2 weeks", tagline: "Best trek for: would-be mountaineers", image: "https://cdn.kimkim.com/files/a/content_articles/featured_photos/5f822d365f96543dde67704140435bded73dd4a4/big-765b561e5a4e79304f85b4c271969fb3.jpg" },
  { id: 2, name: "Markha Valley Trek, Ladakh", price: 2800, duration: "1 week", tagline: "Best trek for: culture enthusiasts", image: "https://trekthehimalayas.com/images/MarkhaValleyTrek/GalleryDesktop/Autumn/03eeaeab-3526-4529-a897-67d002acc116_Markha-Valley-3.webp" },
  { id: 3, name: "Annapurna Circuit, Nepal", price: 3200, duration: "2 weeks", tagline: "Best trek for: diverse landscapes", image: "https://www.andbeyond.com/wp-content/uploads/sites/5/trekking-annapurnas-nepal.jpg" },
  { id: 4, name: "Fitz Roy Trek, Patagonia", price: 4500, duration: "10 days", tagline: "Best trek for: stunning peaks", image: "https://static1.squarespace.com/static/62c0775122eb33013a877b3a/t/63da471da7f2065ee54afeda/1675249442676/Mount-Fitz-Roy-El-Chalten-Hike-Patagonia-3.jpg?format=1500w" },
  { id: 5, name: "Kilimanjaro, Tanzania", price: 5000, duration: "7 days", tagline: "Best trek for: African summit", image: "https://cdn.britannica.com/33/153433-050-F76BDF75/Sunrise-Mount-Kilimanjaro-Tanzania.jpg" },
];

// --- Framer Motion Variants ---
const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
};

const titleVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }};
const subtitleVariants = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }};
const navigationVariants = { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }};
const cardVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }};
const bookButtonVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 }};


// --- Individual Trekking Card Component ---
const TrekkingCard = ({ destination, scrollXProgress }) => {
    // Parallax effect for the image
    const x = useTransform(scrollXProgress, [0, 1], ["-20%", "20%"]);

    return (
        <motion.div
          variants={cardVariants}
          className="flex-none w-80 md:w-96 snap-center bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg group py-12"
          whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
        >
          <div className="relative h-48 w-full overflow-hidden">
            <motion.img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full relative"
              style={{ x }} // Apply parallax effect
              whileHover={{ scale: 1.5 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 text-xl font-bold flex items-center gap-1">
              <Icon name="DollarSign" className="w-5 h-5" />
              {destination.price.toLocaleString()}
            </span>
          </div>
          <div className="p-6 relative">
            <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
            <p className="text-slate-400 text-sm mb-4">{destination.tagline}</p>
            <div className="flex items-center text-indigo-300 text-sm">
              <Icon name="Clock" className="w-4 h-4 mr-2" />
              <span>{destination.duration}</span>
            </div>
            <motion.div
              variants={bookButtonVariants}
              initial="hidden"
              whileInView="visible"
              className="absolute -bottom-6 right-6 opacity-0 group-hover:opacity-100 group-hover:-bottom-4 transition-all duration-300"
            >
                <Link className="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg shadow-lg hover:bg-indigo-500 transition-colors" to="/packages">
                    Book Now
                </Link>
            </motion.div>
          </div>
        </motion.div>
    );
};


// --- TrekkingDestination Component ---
const TrekkingDestination = () => {
  const scrollRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: scrollRef });
  
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = trekkingDestinations.length; 
  const scrollAmount = 380; // Approximate width of a card + gap

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    }
  };

  return (
    <section id="popular-treks" className="py-20 md:py-32 bg-slate-900 text-white overflow-hidden">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto max-w-7xl px-4"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <motion.p variants={subtitleVariants} className="text-indigo-400 font-semibold mb-2 uppercase tracking-wide">POPULARLY</motion.p>
            <motion.h2 variants={titleVariants} className="text-4xl md:text-5xl font-bold leading-tight">Most Popular<br />Trekking Destination</motion.h2>
          </div>
          <motion.div variants={navigationVariants} className="flex items-center space-x-4 mt-8 md:mt-0">
            <span className="text-xl font-medium">{String(currentPage).padStart(2, '0')}</span>
            <div className="w-12 h-0.5 bg-gray-600"><div className="w-4 h-0.5 bg-white -ml-2"></div></div>
            <span className="text-xl font-medium">{String(totalPages).padStart(2, '0')}</span>
            <button onClick={scrollLeft} className="glass-card p-3 transition-colors hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Previous destination" disabled={currentPage === 1}><Icon name="ArrowLeft" className="w-6 h-6" /></button>
            <button onClick={scrollRight} className="glass-card p-3 transition-colors hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Next destination" disabled={currentPage === totalPages}><Icon name="ArrowRight" className="w-6 h-6" /></button>
          </motion.div>
        </div>

        <motion.div
          ref={scrollRef}
          variants={sectionVariants}
          className="flex space-x-8 overflow-x-auto scrollbar-hide py-4 snap-x snap-mandatory"
        >
          {trekkingDestinations.map((destination) => (
            <TrekkingCard key={destination.id} destination={destination} scrollXProgress={scrollXProgress} />
          ))}
        </motion.div>
      </motion.div>

      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </section>
  );
};

export default TrekkingDestination;