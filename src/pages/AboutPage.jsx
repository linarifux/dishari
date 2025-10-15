import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- Icon Components ---
const Icon = ({ name, ...props }) => {
  const icons = {
    Leaf: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a7 7 0 0 1-7 7h-1z"/></svg>,
    ShieldCheck: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    Users: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    Plus: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    Minus: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    LinkedIn: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
    Compass: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
    Award: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
    Heart: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  };
  const LucideIcon = icons[name];
  return LucideIcon ? LucideIcon(props) : null;
};

// --- Mock Data ---
const timelineData = [
  { year: "2010", title: "The Spark", description: "Dishari was born from a passion for unexplored paths, founded by two friends in a small garage with a big dream.", image: "https://img.freepik.com/premium-photo/rustic-garage-workshop-with-scattered-tools-equipment-bathed-natural-light-from-large-window_1323182-21487.jpg?semt=ais_hybrid&w=740&q=80" },
  { year: "2014", title: "First International Trek", description: "We organized our first international adventure to the Annapurna Base Camp in Nepal, a milestone that set our global course.", image: "https://hikeontreks.com/wp-content/uploads/2018/07/abc-2-e1742367894486.jpg" },
  { year: "2018", title: "Eco-Tourism Award", description: "Recognized for our deep commitment to sustainable and responsible travel practices that protect the places we love.", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2072&auto=format&fit=crop" },
  { year: "2022", title: "10,000th Happy Traveler", description: "Celebrated a major milestone, having guided over ten thousand adventurers across the globe on life-changing journeys.", image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=2073&auto=format&fit=crop" },
  { year: "2025", title: "Expanding Horizons", description: "Launched thrilling new expeditions in South America and Africa, continuing our mission to explore the world's wonders.", image: "https://www.andeantrails.co.uk/wp-content/uploads/2017/03/rainbow-mountain-ausangate-peru.jpg" }
];
const teamData = [
  { name: "Alex Mercer", role: "Founder & Lead Guide", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop", bio: "The mountains are calling, and I must go. My mission is to share that call with the world." },
  { name: "Jasmine Kaur", role: "Logistics & Operations", image: "https://nylprofessionals.newyorklife.com/Production/Producer/Image/Standard/Agent_0229935_Image_37118.jpg", bio: "Every successful journey is built on a foundation of meticulous planning." },
  { name: "Samuel Chen", role: "Community Manager", image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2070&auto=format&fit=crop", bio: "Connecting fellow adventurers is as rewarding as reaching the summit." },
];
const valuesData = [
  { title: "Sustainable Travel", icon: "Leaf", content: "We are deeply committed to protecting the natural environments we explore. Our treks follow strict 'Leave No Trace' principles, we partner with local conservation projects, and we continuously work to offset our carbon footprint." },
  { title: "Uncompromised Safety", icon: "ShieldCheck", content: "Your safety is our highest priority. Our guides are certified wilderness first responders, our equipment is state-of-the-art, and we have rigorous safety protocols for every trek, ensuring you can adventure with peace of mind." },
  { title: "Community First", icon: "Users", content: "We believe in the power of travel to connect people. We work directly with local communities, ensuring they benefit from our presence, and we foster a welcoming, inclusive community among our travelers." }
];
const whyData = [
    { icon: "Compass", title: "Expert Guides", description: "Our guides aren't just leaders; they are seasoned explorers, storytellers, and safety experts who bring each destination to life." },
    { icon: "Award", title: "Award-Winning Itineraries", description: "We meticulously craft unique journeys that have been recognized by travel experts for their quality and originality." },
    { icon: "Heart", title: "Passion-Driven Service", description: "We love what we do, and that passion translates into unparalleled service and an unwavering commitment to your experience." }
];

// --- Sub-Components ---

const AboutHero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="./videos/about.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">Our Journey,</h1>
        <p className="text-4xl md:text-6xl font-light text-indigo-300">Your Adventure.</p>
      </motion.div>
    </section>
  );
};

const OurStory = () => {
    return (
        <section className="py-20 md:py-32 bg-slate-900 text-white">
            <div className="container mx-auto max-w-7xl px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                    className="text-center mb-20"
                >
                    <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-4xl md:text-5xl font-bold mb-4">The Story of Dishari</motion.h2>
                    <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-lg text-slate-400 max-w-3xl mx-auto">From a humble beginning to a global community of adventurers, our path has been guided by a single, unwavering passion: to share the transformative power of the trail.</motion.p>
                </motion.div>
                <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-slate-700/50 rounded-full hidden md:block"></div>
                    {timelineData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col md:flex-row items-center w-full mb-12 md:mb-20 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            <div className="w-full md:w-5/12 px-4">
                                <img src={item.image} alt={item.title} className="rounded-2xl shadow-2xl w-full h-64 object-cover" />
                            </div>
                            <div className="w-10 h-10 bg-indigo-600 rounded-full z-10 flex items-center justify-center shadow-indigo-500/50 shadow-lg my-4 md:my-0 flex-shrink-0">
                                <div className="w-4 h-4 bg-slate-900 rounded-full"></div>
                            </div>
                            <div className="w-full md:w-5/12 px-4">
                                <div className={`p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-lg text-center md:text-left ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <p className="text-indigo-400 font-bold text-xl mb-1">{item.year}</p>
                                    <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                                    <p className="text-slate-400">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const WhyTrekWithUs = () => {
    return (
        <section className="py-20 md:py-32 bg-slate-950 text-white">
            <div className="container mx-auto max-w-7xl px-4">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className="text-center mb-16">
                    <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-4xl md:text-5xl font-bold">Why Trek With Dishari?</motion.h2>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-8">
                    {whyData.map((item, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="text-center p-8 bg-slate-900 rounded-2xl">
                            <div className="inline-block p-4 bg-indigo-600/20 text-indigo-400 rounded-full mb-4">
                                <Icon name={item.icon} size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                            <p className="text-slate-400">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TeamCard = ({ member }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
        <motion.div className="w-full h-96 [perspective:1000px]" onHoverStart={() => setIsFlipped(true)} onHoverEnd={() => setIsFlipped(false)}>
            <motion.div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]" animate={{ rotateY: isFlipped ? 180 : 0 }}>
                <div className="absolute inset-0 [backface-visibility:hidden]">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-2xl"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="text-2xl font-bold">{member.name}</h3>
                        <p className="text-indigo-300">{member.role}</p>
                    </div>
                </div>
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                    <p className="text-lg italic text-slate-300 mb-4">"{member.bio}"</p>
                    <a href="#" className="text-indigo-400 hover:text-white"><Icon name="LinkedIn" /></a>
                </div>
            </motion.div>
        </motion.div>
    );
};

const MeetTheTeam = () => {
  return (
    <section className="py-20 md:py-32 bg-slate-950 text-white">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={{ visible: { transition: { staggerChildren: 0.2 } } }} className="text-center mb-16">
          <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-4xl md:text-5xl font-bold mb-4">The Guides Behind the Journey</motion.h2>
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-lg text-slate-400 max-w-3xl mx-auto">Our team is a small group of passionate explorers, logistics wizards, and storytellers dedicated to making your adventure unforgettable.</motion.p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member, index) => <TeamCard key={index} member={member} />)}
        </div>
      </div>
    </section>
  );
};

const AccordionItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <motion.div className="border-b border-slate-700">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-6 text-left">
                <span className="flex items-center gap-4 text-xl font-semibold">
                    <Icon name={item.icon} className="text-indigo-400" />
                    {item.title}
                </span>
                <motion.div animate={{ rotate: isOpen ? 45 : 0 }}><Icon name="Plus" /></motion.div>
            </button>
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} className="overflow-hidden">
                <p className="pb-6 text-slate-400 pr-10">{item.content}</p>
            </motion.div>
        </motion.div>
    );
};

const OurValues = () => {
    return (
        <section className="py-20 md:py-32 bg-slate-900 text-white">
            <div className="container mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-16 items-center">
                <div className="text-left">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold mb-6">Our Commitment to the Trail</motion.h2>
                    <div>
                        {valuesData.map((item, index) => <AccordionItem key={index} item={item} />)}
                    </div>
                </div>
                <div className="hidden md:block">
                     <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <img src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1974&auto=format&fit=crop" alt="Abstract representation of values" className="rounded-2xl shadow-2xl"/>
                     </motion.div>
                </div>
            </div>
        </section>
    );
};

const JoinCommunityCTA = () => {
    return (
        <section className="relative py-32 md:py-48 bg-slate-900 text-white">
             <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop" alt="Community of hikers" className="w-full h-full object-cover opacity-20"/>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
            </div>
            <div className="container mx-auto max-w-7xl px-4 text-center relative z-10">
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-bold mb-6">Join Our Adventure Community</motion.h2>
                <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">Your next great story is waiting to be written on the trail. Explore our packages and find the journey that's calling your name.</motion.p>
                <motion.button initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-bold py-4 px-10 rounded-full shadow-lg text-lg">
                    <Link to="/packages">Explore Packages</Link>
                </motion.button>
            </div>
        </section>
    );
};

// --- Main About Page Component ---
const AboutPage = () => {
  return (
    <main>
      <AboutHero />
      <OurStory />
      <WhyTrekWithUs />
      <MeetTheTeam />
      <OurValues />
      <JoinCommunityCTA />
    </main>
  );
};

export default AboutPage;

