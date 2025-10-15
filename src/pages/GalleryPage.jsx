import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Icon Components ---
const Icon = ({ name, ...props }) => {
  const icons = {
    Play: (p) => (
      <svg
        {...p}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
      >
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
    X: (p) => (
      <svg
        {...p}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    ),
    Camera: (p) => (
      <svg
        {...p}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
    Send: (p) => (
      <svg
        {...p}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  };
  const LucideIcon = icons[name];
  return LucideIcon ? LucideIcon(props) : null;
};

// --- Mock Data ---
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    category: "mountains",
    title: "Alpine Sunrise",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1974&auto=format&fit=crop",
    category: "forests",
    title: "Misty Woodlands",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
    category: "lakes",
    title: "Azure Reflections",
  },
  {
    id: 4,
    src: "https://static.vecteezy.com/system/resources/previews/070/363/174/non_2x/majestic-mountain-range-at-sunrise-panoramic-view-of-crimson-peaks-and-serene-sky-free-photo.jpg",
    category: "mountains",
    title: "Crimson Peaks",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop",
    category: "forests",
    title: "Sunbeam Path",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    category: "lakes",
    title: "Serene Dock",
  },
  {
    id: 7,
    src: "https://img.freepik.com/premium-photo/lone-climber-scales-rocky-mountain-peak-with-stunning-panoramic-views-surrounding-mountain-range_1352884-3608.jpg",
    category: "mountains",
    title: "Lone Climber",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=2070&auto=format&fit=crop",
    category: "forests",
    title: "River Through the Woods",
  },
];
const userImages = [
  {
    src: "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: "@alex_hikes",
  },
  {
    src: "https://www.adventurealternative.com/wp-content/uploads/2024/07/nepal_himalaya-gavin-bate-on-peak-1.jpg.webp",
    user: "@jenny_explores",
  },
  {
    src: "https://images.unsplash.com/photo-1552083375-1447ce886485?q=80&w=2070&auto=format&fit=crop",
    user: "@mountain_mike",
  },
  {
    src: "https://static.vecteezy.com/system/resources/previews/001/369/776/non_2x/the-eiffel-tower-in-paris-free-photo.jpg",
    user: "@sara_on_sabbatical",
  },
];

const videoData = {
  id: "mB1dE0FotdY", // YouTube Video ID
  thumbnail:
    "https://images.squarespace-cdn.com/content/v1/5e32e627ccedf542f8a04147/d061ae7e-c2b4-4393-a6f3-fdd3a85d1004/DSC_3095small.jpg",
  title: "Our Epic Journey Through the Alps",
  description:
    "Experience the breathtaking beauty and thrilling challenge of our guided tour through the Alps. From serene lakes to majestic peaks, this is a journey you'll never forget.",
};

// --- Sub-Components ---

const GalleryHero = () => (
  <section className="relative h-[80vh] flex items-center justify-center text-white">
    <div className="absolute inset-0 z-0 overflow-hidden">
      <motion.div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1554176259-aa961fc32671?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMG1vdW50YWlufGVufDB8fDB8fHww&fm=jpg&q=60&w=3000')",
        }}
        animate={{
          scale: [1, 1.1, 1],
          transition: { duration: 20, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <div className="absolute inset-0 bg-black/60"></div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-10 text-center px-4"
    >
      <h1 className="text-5xl md:text-7xl font-bold">Moments from the Trail</h1>
      <p className="text-lg md:text-xl text-slate-300 mt-4">
        A collection of breathtaking views and unforgettable memories.
      </p>
    </motion.div>
  </section>
);

const PhotoGallery = () => {
  const [filter, setFilter] = useState("all");
  const [selectedImg, setSelectedImg] = useState(null);

  const filters = ["all", "mountains", "forests", "lakes"];
  const filteredImages =
    filter === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  return (
    <section className="py-20 md:py-32 bg-slate-900 text-white">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`capitalize px-6 py-2 rounded-full text-lg transition-colors ${
                filter === f
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-lg cursor-pointer h-64 group"
                onClick={() => setSelectedImg(img)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <h3 className="text-white font-bold text-lg">{img.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <motion.img
              layoutId={selectedImg.id}
              src={selectedImg.src}
              alt={selectedImg.title}
              className="max-w-full max-h-full rounded-lg shadow-2xl"
            />
            <motion.button
              onClick={() => setSelectedImg(null)}
              className="absolute top-4 right-4 text-white"
            >
              <Icon name="X" size={32} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const VideoShowcase = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="py-20 md:py-32 bg-slate-950 text-white">
      <div className="container mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-12 items-center">
        <div
          className="relative cursor-pointer group"
          onClick={() => setIsVideoOpen(true)}
        >
          <img
            src={videoData.thumbnail}
            alt={videoData.title}
            className="rounded-2xl shadow-2xl w-full h-auto"
          />
          <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
            <div className="w-24 h-24 bg-indigo-600/50 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <Icon name="Play" className="text-white w-12 h-12" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {videoData.title}
          </h2>
          <p className="text-lg text-slate-400">{videoData.description}</p>
        </div>
      </div>
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="w-full max-w-4xl aspect-video bg-black"
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoData.id}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-white"
            >
              <Icon name="X" size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ShareStory = () => {
  return (
    <section className="py-20 md:py-32 bg-slate-900 text-white">
      <div className="container mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Share Your Story
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12">
          You've made the memories, now share the magic. Tag your photos with
          #DishariAdventures to be featured in our gallery.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {userImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              <img
                src={img.src}
                alt={`Photo by ${img.user}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                <p className="text-white font-bold text-lg">{img.user}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-12 bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg flex items-center gap-2 mx-auto"
        >
          <Icon name="Camera" />
          Share Your Photo
        </motion.button>
      </div>
    </section>
  );
};

const NewsletterCTA = () => (
  <section className="py-20 md:py-32 bg-slate-950 text-white">
    <div className="container mx-auto max-w-3xl px-4 text-center">
      <h2 className="text-4xl font-bold mb-4">
        Get Inspired for Your Next Trip
      </h2>
      <p className="text-slate-400 mb-8">
        Subscribe to our newsletter for the latest travel stories, tips, and
        exclusive offers.
      </p>
      <form className="relative max-w-lg mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full bg-slate-800 border border-slate-700 rounded-full py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-2 -translate-y-1/2 p-3 bg-indigo-600 rounded-full hover:bg-indigo-500 transition-colors"
        >
          <Icon name="Send" />
        </button>
      </form>
    </div>
  </section>
);

// --- Main Gallery Page Component ---
const GalleryPage = () => {
  return (
    <main>
      <GalleryHero />
      <PhotoGallery />
      <VideoShowcase />
      <ShareStory />
      <NewsletterCTA />
    </main>
  );
};

export default GalleryPage;
