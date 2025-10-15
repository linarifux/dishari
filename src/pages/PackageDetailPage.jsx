import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- (You would reuse the same Icon and allPackages components/data) ---

const Icon = ({ name, ...props }) => {
  const icons = {
    Star: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    Plus: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    CheckCircle: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    XCircle: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
    Shield: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    Mountain: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>,
    CloudDrizzle: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M8 19v1"/><path d="M8 14v1"/><path d="M12 19v1"/><path d="M12 15v1"/><path d="M16 19v1"/><path d="M16 14v1"/></svg>,
  };
  const LucideIcon = icons[name];
  return LucideIcon ? LucideIcon(props) : null;
};

const allPackages = [ { id: 1, title: "Everest Base Camp", region: "Asia", duration: 14, difficulty: "Hard", price: 3500, rating: 5, image: "https://images.unsplash.com/photo-1589824783473-243329190538?q=80&w=1974&auto=format&fit=crop" }, { id: 2, title: "Annapurna Circuit", region: "Asia", duration: 18, difficulty: "Hard", price: 3200, rating: 5, image: "https://images.unsplash.com/photo-1544026601-38aa887018d3?q=80&w=2070&auto=format&fit=crop" }, { id: 3, title: "Patagonia's Fitz Roy", region: "South America", duration: 10, difficulty: "Moderate", price: 4500, rating: 5, image: "https://images.unsplash.com/photo-1540194098668-3f5f3e9f4a56?q=80&w=1974&auto=format&fit=crop" }, { id: 4, title: "Tour du Mont Blanc", region: "Europe", duration: 11, difficulty: "Moderate", price: 4000, rating: 5, image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop" }, { id: 5, title: "Kilimanjaro Climb", region: "Africa", duration: 7, difficulty: "Hard", price: 5000, rating: 5, image: "https://images.unsplash.com/photo-1563829023157-bc0951660420?q=80&w=1974&auto=format&fit=crop" }, { id: 6, title: "Inca Trail to Machu Picchu", region: "South America", duration: 4, difficulty: "Moderate", price: 2800, rating: 5, image: "https://images.unsplash.com/photo-1526748883584-33d151972a9a?q=80&w=2070&auto=format&fit=crop" } ];

// --- Sub-Components for the Detail Page ---

const DetailSection = ({ title, children, id }) => (
    <motion.div id={id} className="mb-16 scroll-mt-24" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
        <h2 className="text-3xl font-bold border-b-2 border-indigo-500 pb-3 mb-6">{title}</h2>
        {children}
    </motion.div>
);

const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-800">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-4 text-left">
                <span className="text-lg font-semibold">{title}</span>
                <motion.div animate={{ rotate: isOpen ? 45 : 0 }}><Icon name="Plus"/></motion.div>
            </button>
            <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0 }} className="overflow-hidden">
                <p className="px-2 pb-4 text-slate-400">{content}</p>
            </motion.div>
        </div>
    );
};

// --- Main Package Detail Page Component ---
const PackageDetailPage = () => {
    const { id } = useParams();
    const pkg = allPackages.find(p => p.id === parseInt(id));

    // Sticky Nav Logic
    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            // Adjust this value based on your hero section's height
            if (window.scrollY > window.innerHeight * 0.6) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Parallax hero image effect
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    if (!pkg) {
        return <div className="h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">Package not found.</div>;
    }
    
    const navItems = ["Overview", "Itinerary", "Gallery", "Safety", "Reviews", "FAQ"];

    return (
        <main className="bg-slate-950 text-white">
            {/* Hero */}
            <section className="relative h-[70vh] overflow-hidden">
                <motion.img src={pkg.image} alt={pkg.title} className="absolute inset-0 w-full h-full object-cover" style={{ y }} />
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-bold">{pkg.title}</motion.h1>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="flex flex-wrap gap-x-8 gap-y-2 mt-4 text-lg">
                        <span>{pkg.duration} Days</span>
                        <span className="text-indigo-300">{pkg.difficulty}</span>
                        <span>{pkg.region}</span>
                    </motion.div>
                </div>
            </section>
            
            {/* Sticky Sub-Navigation */}
            <nav className={`sticky top-0 z-30 transition-colors duration-300 ${isSticky ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="flex justify-center space-x-4 md:space-x-8 overflow-x-auto py-4 scrollbar-hide">
                         {navItems.map(item => (
                             <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-300 hover:text-white transition-colors flex-shrink-0 px-2">{item}</a>
                         ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto max-w-7xl px-4 py-16 grid lg:grid-cols-3 gap-12">
                {/* Left/Main Column */}
                <div className="lg:col-span-2">
                    <DetailSection id="overview" title="Overview">
                        <p className="text-slate-300 leading-relaxed text-lg">Embark on the legendary trek to {pkg.title}, a journey that promises not just breathtaking landscapes but a profound experience of culture and personal achievement. This trek is rated as '{pkg.difficulty}' and spans {pkg.duration} unforgettable days through the heart of {pkg.region}. You'll witness towering peaks, ancient glaciers, and vibrant local communities, creating memories that will last a lifetime.</p>
                    </DetailSection>
                    
                    <DetailSection id="itinerary" title="Day-by-Day Itinerary">
                        <div className="space-y-2">
                            <AccordionItem title="Day 1: Arrival & Acclimatization" content="Arrive at the starting point, meet your guides and fellow trekkers. We'll have a briefing and gear check, followed by a welcome dinner. Spend the day acclimatizing to the altitude." />
                            <AccordionItem title={`Day 2 - ${pkg.duration - 1}: The Heart of the Trek`} content={`These days form the core of your adventure. You will trek through stunning valleys, cross high mountain passes, and stay in traditional local tea houses or comfortable camps. Each day offers unique challenges, from steep ascents to river crossings, and incredible rewards in the form of unparalleled panoramic views.`} />
                            <AccordionItem title={`Day ${pkg.duration}: Summit/Destination & Departure`} content="An early start to reach the final destination of your trek for a magical sunrise. After celebrating your achievement with the team, you will begin your descent. Prepare for departure with a farewell dinner in the evening." />
                        </div>
                    </DetailSection>

                    <DetailSection id="gallery" title="Memories from the Trail">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {/* Dummy gallery images */}
                            {[pkg.image, ...allPackages.filter(p => p.id !== pkg.id).slice(0, 5).map(p => p.image)].map((img, i) => (
                                <motion.div key={i} className="overflow-hidden rounded-lg aspect-square" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                                    <img src={img} alt={`Gallery image ${i+1}`} className="w-full h-full object-cover"/>
                                </motion.div>
                            ))}
                        </div>
                    </DetailSection>

                    <DetailSection id="safety" title="Safety & Preparation">
                        <div className="grid md:grid-cols-2 gap-6 text-slate-300">
                           <div className="flex items-start gap-4"><Icon name="Shield" className="text-green-400 flex-shrink-0 mt-1"/><p>Our guides are certified in Wilderness First Aid and have extensive high-altitude experience.</p></div>
                           <div className="flex items-start gap-4"><Icon name="Mountain" className="text-blue-400 flex-shrink-0 mt-1"/><p>We conduct daily health checks (oxygen levels, heart rate) to monitor acclimatization.</p></div>
                           <div className="flex items-start gap-4"><Icon name="CloudDrizzle" className="text-yellow-400 flex-shrink-0 mt-1"/><p>Pre-trek briefing on weather conditions, trail etiquette, and emergency procedures.</p></div>
                           <div className="flex items-start gap-4"><Icon name="FileText" className="text-purple-400 flex-shrink-0 mt-1"/><p>A comprehensive gear list will be provided. Proper acclimatization is crucial for a safe and enjoyable trek.</p></div>
                        </div>
                    </DetailSection>

                    <DetailSection id="reviews" title="What Trekkers Say">
                        {/* Dummy Reviews */}
                        <div className="space-y-8">
                            <div className="bg-slate-900 p-6 rounded-lg">
                                <div className="flex items-center mb-2"><div className="flex text-yellow-400">{Array(5).fill(0).map((_,i)=><Icon key={i} name="Star"/>)}</div></div>
                                <p className="italic text-slate-300">"An absolutely life-changing experience. The guides were phenomenal."</p>
                                <p className="text-right font-bold mt-2">- Sarah L.</p>
                            </div>
                            <div className="bg-slate-900 p-6 rounded-lg">
                                <div className="flex items-center mb-2"><div className="flex text-yellow-400">{Array(5).fill(0).map((_,i)=><Icon key={i} name="Star"/>)}</div></div>
                                <p className="italic text-slate-300">"Tough but incredibly rewarding. The views from the top were worth every step."</p>
                                <p className="text-right font-bold mt-2">- Mark T.</p>
                            </div>
                        </div>
                    </DetailSection>

                    <DetailSection id="faq" title="Package FAQ">
                        <div className="space-y-2">
                            <AccordionItem title="What is the group size?" content="We keep our groups small to ensure a personal experience, typically between 8-12 trekkers."/>
                            <AccordionItem title="Is travel insurance required?" content="Yes, comprehensive travel insurance that covers emergency evacuation is mandatory for all our treks."/>
                        </div>
                    </DetailSection>
                </div>

                {/* Right/Sticky Column */}
                <aside className="lg:sticky top-28 h-fit">
                    <div className="bg-slate-900 p-8 rounded-2xl shadow-lg">
                        <p className="text-4xl font-bold mb-2">${pkg.price}</p>
                        <p className="text-slate-400 mb-6">per person</p>
                        <h3 className="text-xl font-bold mb-4">Current Offers</h3>
                        <div className="bg-yellow-400/10 text-yellow-300 p-4 rounded-lg mb-6">
                            <p className="font-bold">Early Bird Discount!</p>
                            <p className="text-sm">Book 3 months in advance and get 15% off.</p>
                        </div>
                        <button className="w-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-bold py-4 rounded-lg text-lg">Book This Trek</button>
                    </div>
                </aside>
            </div>
            <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </main>
    );
};

export default PackageDetailPage;

