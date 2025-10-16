import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- Icon Components ---
const Icon = ({ name, ...props }) => {
  const icons = {
    Star: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    ArrowLeft: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>,
    ArrowRight: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>,
    Quote: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z"/></svg>,
    Ticket: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>,
  };
  const LucideIcon = icons[name];
  return LucideIcon ? LucideIcon(props) : null;
};

// --- Mock Data for Testimonials ---
const testimonialsData = [
  { id: 1, name: "Eva Chance", review: "The tours are great. I had been really enjoying with my family! The team is very professional and taking care of the customers. Will surely recommend!", rating: 5, image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, name: "Johnathan Smith", review: "An unforgettable adventure from start to finish. The guides were knowledgeable and made sure we were safe and having a great time. The views were breathtaking.", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop" },
  { id: 3, name: "Alisha Williams", review: "I was nervous about my first big trek, but Trail Makers made everything so easy and accessible. The pre-trip support was fantastic. Highly recommended for beginners!", rating: 5, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" },
];

// --- Framer Motion Variants ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

// --- TestimonialCarousel Component ---
const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const activeTestimonial = testimonialsData[activeIndex];

  return (
    <section id="testimonial-carousel" className="py-20 md:py-32 bg-slate-950 text-white overflow-hidden">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="container mx-auto max-w-7xl px-4"
      >
        {/* Header */}
        <div className="text-center md:text-left mb-12">
          <motion.p variants={textVariants} className="text-indigo-400 font-semibold mb-2 uppercase tracking-wide">
            REVIEW
          </motion.p>
          <motion.h2 variants={textVariants} className="text-4xl md:text-5xl font-bold leading-tight">
            What our clients say
          </motion.h2>
        </div>

        {/* Carousel Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Column: Client Image */}
          <div className="relative h-80 sm:h-96 md:h-[500px] w-full">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeTestimonial.id}
                src={activeTestimonial.image}
                alt={activeTestimonial.name}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
            </AnimatePresence>
          </div>

          {/* Right Column: Testimonial & Coupons */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <Icon name="Quote" className="text-slate-700/80 mb-4" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <p className="text-lg md:text-xl text-center md:text-left italic text-slate-300 mb-6">
                    "{activeTestimonial.review}"
                  </p>
                  <div className="flex text-yellow-400 mb-2 justify-center md:justify-start">
                    {Array(activeTestimonial.rating).fill(0).map((_, i) => <Icon key={i} name="Star" />)}
                  </div>
                  <p className="font-bold text-indigo-300 text-lg text-center md:text-left">{activeTestimonial.name}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Coupon and Navigation */}
            <div className="mt-8">
              {/* Coupon Codes */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center mb-6">
                  <div className="text-center sm:text-left flex-grow">
                      <p className="font-bold text-lg text-yellow-400">Monsoon Discount</p>
                      <p className="text-sm text-slate-400">Use code for 50% off on your next trek!</p>
                  </div>
                  <div className="relative bg-slate-700 text-yellow-300 font-mono text-lg py-2 px-6 rounded-lg border-2 border-dashed border-slate-500 flex-shrink-0">
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-950 rounded-full"></div>
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-950 rounded-full"></div>
                    MONSOON50
                  </div>
              </div>
              
              {/* Navigation */}
              <div className="flex items-center space-x-4">
                <span className="text-xl font-medium">{String(activeIndex + 1).padStart(2, '0')}</span>
                <div className="flex-grow h-0.5 bg-gray-600"></div>
                <span className="text-xl font-medium">{String(testimonialsData.length).padStart(2, '0')}</span>
                <button onClick={handlePrev} className="glass-card p-3 transition-colors hover:bg-white/20" aria-label="Previous testimonial">
                  <Icon name="ArrowLeft" className="w-6 h-6" />
                </button>
                <button onClick={handleNext} className="glass-card p-3 transition-colors hover:bg-white/20" aria-label="Next testimonial">
                  <Icon name="ArrowRight" className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
        }
      `}</style>
    </section>
  );
};

export default TestimonialCarousel;

