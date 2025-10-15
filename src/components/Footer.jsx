import React from 'react';
import { motion } from 'framer-motion';

// --- Icon Components (using inline SVG) ---
const Icon = ({ name, ...props }) => {
  const icons = {
    Email: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    Phone: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    Location: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    Send: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    Facebook: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    Twitter: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 3 5.2-9.7 7.7-14.7 2.4-14.7-2.4 2.8 1.1 4.5 1.4 6.2 0-3.3-1-4.4-4.5-4.4-4.5s-1.5 1.4-2.8 1.4c-2.8-1.7-4.2-4.5-4.2-4.5s1.5 1.1 2.8 .8c-2.3-2.1-3.3-5.2-1.9-6.5 4.3 4.9 9.3 7.8 15.3 8.3z"/></svg>,
    Instagram: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    Pinterest: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 8c-2.5 0-4.5 2-4.5 4.5 0 1.2.5 2.3 1.3 3.1-.2.6-.4 1.3-.5 1.8-.1.4-.2.8-.3 1.2-.2.6-.5 1.2-1 1.8-1.2 1.3-3.1 1.6-4.9.8-1.8-.8-2.9-2.5-2.9-4.6 0-3.3 2.7-6 6-6 3.3 0 6 2.7 6 6 0 .8-.1 1.5-.4 2.1.2-.6.3-1.2.3-1.8 0-1-.4-1.9-1.2-2.6C13.2 9.2 14.8 8 16.5 8c2 0 3.5 1.6 3.5 3.5 0 .8-.3 1.6-.7 2.2.1-.4.2-.8.2-1.2 0-.6-.2-1.2-.5-1.7-.3-.5-.7-1-1.2-1.3-.5-.3-1.1-.5-1.7-.5-1 0-1.8.5-2.3 1.3-.5.8-.7 1.8-.7 2.8 0 1.6 1.3 2.9 2.9 2.9.8 0 1.5-.4 2-1 .1-.3.2-.6.2-.9 0-.2 0-.4-.1-.6-.1-.2-.1-.4-.2-.6.4.2.8.3 1.2.3 1.3 0 2.3-1 2.3-2.3 0-1.3-1-2.3-2.3-2.3z"/></svg>,
  };
  const LucideIcon = icons[name];
  return LucideIcon ? LucideIcon(props) : null;
};

// --- Framer Motion Variants ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// --- Footer Component ---
const Footer = () => {
  return (
    <footer className="relative bg-slate-950 text-white pt-24 pb-48 md:pb-64 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Top Contact Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pb-16 border-b border-slate-800">
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="p-3 bg-slate-800/50 rounded-full text-indigo-400"><Icon name="Email" /></div>
              <div>
                <p className="font-bold">Email</p>
                <a href="mailto:contact@trailmakers.com" className="text-slate-400 hover:text-white transition-colors">contact@trailmakers.com</a>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="p-3 bg-slate-800/50 rounded-full text-indigo-400"><Icon name="Phone" /></div>
              <div>
                <p className="font-bold">Call us</p>
                <a href="tel:+412541657425" className="text-slate-400 hover:text-white transition-colors">+41 2541 6574 25</a>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="p-3 bg-slate-800/50 rounded-full text-indigo-400"><Icon name="Location" /></div>
              <div>
                <p className="font-bold">Head Office</p>
                <p className="text-slate-400">E 7th, St North Little Rock AR 72114-4973, USA</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="relative hidden lg:block">
              {/* World Map SVG */}
              <svg className="w-full h-full" viewBox="0 0 200 100">
                <path d="M100 0 C 50 0, 0 50, 0 100 M100 0 C 150 0, 200 50, 200 100 M 50 50 C 75 25, 125 25, 150 50 M 50 50 C 25 75, 75 100, 100 100 M150 50 C 175 75, 125 100, 100 100" fill="none" stroke="#374151" strokeWidth="1" />
                <circle cx="55" cy="45" r="3" fill="#A78BFA" />
                <circle cx="80" cy="55" r="3" fill="#F472B6" />
                <circle cx="105" cy="40" r="3" fill="#60A5FA" />
                <circle cx="130" cy="50" r="3" fill="#A78BFA" />
                <circle cx="155" cy="42" r="3" fill="#F472B6" />
              </svg>
            </motion.div>
          </div>

          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pt-16">
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">Trail Makers seamlessly connects millions of travelers to memorable experiences, a variety of transportation options.</p>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-slate-800/50 rounded-full hover:bg-indigo-600 transition-colors"><Icon name="Facebook" /></a>
                <a href="#" className="p-2 bg-slate-800/50 rounded-full hover:bg-indigo-600 transition-colors"><Icon name="Twitter" /></a>
                <a href="#" className="p-2 bg-slate-800/50 rounded-full hover:bg-indigo-600 transition-colors"><Icon name="Instagram" /></a>
                <a href="#" className="p-2 bg-slate-800/50 rounded-full hover:bg-indigo-600 transition-colors"><Icon name="Pinterest" /></a>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-4">Services</h3>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Trek Packages</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Classic Tent Camping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Family Tent Camping</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Special Offer Packages</a></li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-4">&nbsp;</h3> {/* Spacer for alignment */}
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Need a career?</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Latest News & Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Core Feature</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Meet Our Team</a></li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-4">Newsletter</h3>
              <p className="text-slate-400 mb-6">Which of us ever undertake laborious physical exercise expect to obtain.</p>
              <form className="relative">
                <input type="email" placeholder="Enter Email Address" className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-3 px-6 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <button type="submit" className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors" aria-label="Subscribe">
                  <Icon name="Send" className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom SVG Illustration */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] md:h-[400px]" style={{ pointerEvents: 'none' }}>
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 400">
          {/* Mountains */}
          <path d="M0 400 L0 250 Q 180 180, 360 250 T 720 250 T 1080 250 T 1440 250 L 1440 400 Z" fill="#374151" />
          <path d="M0 400 L0 300 Q 180 220, 360 300 T 720 300 T 1080 300 T 1440 300 L 1440 400 Z" fill="#4B5563" />

          {/* Trees */}
          <g transform="translate(1100 220) scale(1.2)">
            <path d="M25 100 L0 50 L50 50 Z" fill="#1F2937" />
            <path d="M25 50 L0 0 L50 0 Z" fill="#374151" />
          </g>
          <g transform="translate(200 280) scale(0.8)">
            <path d="M25 100 L0 50 L50 50 Z" fill="#1F2937" />
            <path d="M25 50 L0 0 L50 0 Z" fill="#374151" />
          </g>
          
          {/* Tents */}
          <g transform="translate(850 280)">
             <path d="M 0 100 L 50 0 L 100 100 Z" fill="#9F1239" />
             <path d="M 50 0 L 75 100 L 100 100 Z" fill="#BE123C" />
          </g>
          <g transform="translate(600 280)">
             <path d="M 0 100 L 50 0 L 100 100 Z" fill="#9F1239" />
             <path d="M 50 0 L 75 100 L 100 100 Z" fill="#BE123C" />
          </g>

          {/* Campfire */}
          <g transform="translate(750 330)">
            <motion.path 
                d="M 20 50 C 10 40, 10 20, 20 10 C 30 20, 30 40, 20 50 Z" 
                fill="#FBBF24"
                animate={{ scaleY: [1, 1.1, 1], y: [0, -5, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            />
             <motion.path 
                d="M 20 50 C 15 45, 15 25, 20 15 C 25 25, 25 45, 20 50 Z" 
                fill="#F59E0B"
                animate={{ scaleY: [1, 1.05, 1], y: [0, -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <circle cx="20" cy="50" r="10" fill="#78350F" />
            <circle cx="10" cy="52" r="5" fill="#451A03" />
            <circle cx="30" cy="52" r="5" fill="#451A03" />
          </g>
        </svg>
      </div>
    </footer>
  );
};

export default Footer;