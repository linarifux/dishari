import React from "react";
import { motion } from "framer-motion";

// --- Framer Motion Variants ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const textContentVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const imageContainerVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut", delay: 0.2 },
  },
};

const typographyVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.6 },
  },
};

// --- AboutUs Component ---
const AboutUs = () => {
  return (
    <section
      id="about-us"
      className="py-20 md:py-32 bg-slate-950 text-white overflow-hidden"
    >
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }} // Trigger animation when 40% is visible
        className="container mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-12 items-center"
      >
        {/* Text Content */}
        <motion.div variants={textContentVariants} className="text-left">
          <p className="text-indigo-400 font-semibold mb-2 uppercase tracking-wide">
            ABOUT US
          </p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            We are Trail
            <br />
            Makers
          </h2>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              Founded in 1996 in Amsterdam, Trail Makers has grown from a small
              Dutch start-up to one of the world's leading digital travel
              companies. Our mission is to make it easier for everyone to
              experience the world.
            </p>
            <p>
              By investing in technology that takes the friction out of travel,
              we seamlessly connect millions of travelers to memorable
              experiences, a variety of transportation options, and incredible
              places to stay.
            </p>
          </div>
        </motion.div>

        {/* Image with Typography */}
        <motion.div
          variants={imageContainerVariants}
          className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop"
            alt="Hiker looking over a mountain range"
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>

          {/* Typography content */}
          <div className="absolute inset-0 flex flex-col justify-end items-start p-8 md:p-10">
            <motion.div
              variants={typographyVariants}
              className="w-16 h-1 bg-indigo-500 mb-4"
            ></motion.div>
            <motion.h3
              variants={typographyVariants}
              className="text-3xl md:text-4xl font-bold text-white leading-tight"
              style={{ textShadow: "1px 1px 5px rgba(0,0,0,0.5)" }}
            >
              Your Journey
              <br />
              Begins Here.
            </motion.h3>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
