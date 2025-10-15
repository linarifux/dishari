import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; // Import HashLink
import { motion } from 'framer-motion';

// --- (Icon and Button components remain the same) ---

const Icon = ({ name, ...props }) => { /* ... existing Icon code ... */ };
const Button = ({ children, ...props }) => { /* ... existing Button code ... */ };

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // The navLinks now use 'to' instead of 'href' and specify full paths
  const navLinks = [
    { title: 'Home', to: '/' },
    { title: 'About', to: '/about' }, // This now links to the About Us page
    { title: 'Gallery', to: '/gallery' },
    { title: 'Packages', to: '/packages' },
    { title: 'Contact us', to: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 p-4 font-sans"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-between items-center h-16 glass-nav rounded-2xl px-6">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white">
            <Icon name="Mountain" className="text-indigo-400" />
            <span>Dishari</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <HashLink
                key={link.title}
                to={link.to}
                smooth // Enables smooth scrolling
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {link.title}
              </HashLink>
            ))}
          </div>

          <div className="hidden md:block">
            <Button>Join Traveller</Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <Icon name={isOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-2 glass-nav rounded-2xl p-4"
        >
          <div className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <HashLink
                key={link.title}
                to={link.to}
                smooth
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white transition-colors duration-300 block w-full text-center py-2"
              >
                {link.title}
              </HashLink>
            ))}
            <Button className="w-full mt-2">Join Traveller</Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;