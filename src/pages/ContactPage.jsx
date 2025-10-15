import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- Icon Components ---
const Icon = ({ name, ...props }) => {
  const icons = {
    Send: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    Phone: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    Mail: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    MapPin: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    Plus: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    Facebook: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    Twitter: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 3 5.2-9.7 7.7-14.7 2.4-14.7-2.4 2.8 1.1 4.5 1.4 6.2 0-3.3-1-4.4-4.5-4.4-4.5s-1.5 1.4-2.8 1.4c-2.8-1.7-4.2-4.5-4.2-4.5s1.5 1.1 2.8 .8c-2.3-2.1-3.3-5.2-1.9-6.5 4.3 4.9 9.3 7.8 15.3 8.3z"/></svg>,
    Instagram: (p) => <svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  };
  const LucideIcon = icons[name];
  return LucideIcon ? LucideIcon(props) : null;
};

// --- Mock Data ---
const contactInfo = [
    { icon: "Mail", title: "General Inquiries", detail: "contact@dishari.com" },
    { icon: "Phone", title: "Booking Hotline", detail: "+1 (234) 567-8901" },
    { icon: "MapPin", title: "Head Office", detail: "123 Adventure Ave, Boulder, CO" },
];
const faqs = [
    { q: "What are your office hours?", a: "Our support team is available 24/7 via email. Our office is open from 9 AM to 6 PM, Monday to Friday." },
    { q: "How long does it take to get a response?", a: "We strive to respond to all inquiries within 24 hours. For urgent booking-related questions, please call our hotline." },
    { q: "Can I customize a trip?", a: "Absolutely! Fill out the contact form with your desired destination and requirements, and our team will craft a custom itinerary for you." },
];

// --- Sub-Components ---

const ContactHero = () => (
    <section className="relative h-[70vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop" alt="Serene lake and mountains" className="w-full h-full object-cover"/>
            <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold">Get In Touch</h1>
            <p className="text-lg md:text-xl text-slate-300 mt-4">We're here to help you plan your next unforgettable adventure.</p>
        </motion.div>
    </section>
);

const ContactDetails = () => (
    <section className="py-20 md:py-24 bg-slate-900 text-white">
        <div className="container mx-auto max-w-7xl px-4">
            <div className="grid md:grid-cols-3 gap-8">
                {contactInfo.map((item, index) => (
                    <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.1 }} className="text-center bg-slate-800/50 p-8 rounded-lg">
                        <div className="inline-block p-4 bg-indigo-600/20 text-indigo-400 rounded-full mb-4"><Icon name={item.icon} size={32} /></div>
                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-slate-400 text-lg">{item.detail}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

const ContactFormAndMap = () => (
    <section className="py-20 md:py-24 bg-slate-950 text-white">
        <div className="container mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-16 items-start">
            <div>
                <h2 className="text-4xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-slate-400 mb-8">Have a question or a brilliant idea? We'd love to hear from you.</p>
                <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <input type="text" placeholder="Your Name" className="form-input" />
                        <input type="email" placeholder="Your Email" className="form-input" />
                    </div>
                    <select className="form-input">
                        <option>General Inquiry</option>
                        <option>Booking Question</option>
                        <option>Partnership</option>
                        <option>Feedback</option>
                    </select>
                    <textarea placeholder="Your Message" rows="6" className="form-input"></textarea>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="w-full bg-indigo-600 text-white font-bold py-4 rounded-lg text-lg flex items-center justify-center gap-2">
                        <Icon name="Send"/> Send Message
                    </motion.button>
                </form>
            </div>
            <div className="h-full">
                <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="block h-full w-full rounded-2xl overflow-hidden relative group">
                    <img src="https://www.maptiler.com/img/maps/outdoor-v2.png" alt="Map of office location" className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <motion.div initial={{ scale: 0 }} animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-6 h-6 bg-indigo-500 rounded-full border-4 border-white"></motion.div>
                    </div>
                </a>
            </div>
        </div>
    </section>
);

const FAQItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-800">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-5 text-left">
                <span className="text-lg font-semibold">{item.q}</span>
                <motion.div animate={{ rotate: isOpen ? 45 : 0 }}><Icon name="Plus"/></motion.div>
            </button>
            <motion.div initial={false} animate={{ height: isOpen ? 'auto' : 0 }} className="overflow-hidden">
                <p className="pb-5 text-slate-400">{item.a}</p>
            </motion.div>
        </div>
    );
};

const ContactFAQ = () => (
    <section className="py-20 md:py-24 bg-slate-900 text-white">
        <div className="container mx-auto max-w-4xl px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Quick Answers</h2>
            <div className="space-y-2">{faqs.map((faq, index) => <FAQItem key={index} item={faq}/>)}</div>
        </div>
    </section>
);

const SocialConnect = () => (
    <section className="py-20 md:py-24 bg-slate-950 text-white">
        <div className="container mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Connect With Us on Social Media</h2>
            <p className="text-slate-400 mb-8">Follow our adventures and share your own with the #DishariAdventures community.</p>
            <div className="flex justify-center space-x-6">
                <SocialIcon name="Facebook" />
                <SocialIcon name="Instagram" />
                <SocialIcon name="Twitter" />
            </div>
        </div>
    </section>
);

const SocialIcon = ({ name }) => (
    <motion.a href="#" whileHover={{ y: -5 }} className="p-4 bg-slate-800/50 rounded-full text-white hover:text-indigo-400 transition-colors">
        <Icon name={name} size={28} />
    </motion.a>
);

// --- Main Contact Page Component ---
const ContactPage = () => {
  return (
    <>
      <main>
        <ContactHero />
        <ContactDetails />
        <ContactFormAndMap />
        <ContactFAQ />
        <SocialConnect />
      </main>
      <style>{`.form-input { width: 100%; background-color: rgb(30 41 59 / 0.5); border: 1px solid rgb(51 65 85); border-radius: 0.5rem; padding: 0.75rem 1rem; color: white; transition: all 0.2s; } .form-input:focus { outline: none; ring: 2px; ring-color: rgb(99 102 241); border-color: rgb(99 102 241); }`}</style>
    </>
  );
};

export default ContactPage;
