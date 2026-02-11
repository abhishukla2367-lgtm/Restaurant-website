import React from "react";
import { motion } from "framer-motion";

// Promotions Data
const promotions = [
  {
    type: "youtube",
    src: "https://www.youtube.com/shorts/S5kIYwCoh1w", 
    title: "Chef in Action",
    description: "Watch our chefs prepare delicious dishes."
  },
  {
    type: "youtube",
    src: "https://www.youtube.com/shorts/Vu21dyMDtUM",
    title: "Restaurant Vibes",
    description: "Experience the vibe and comfort of Southern Tales."
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/35539315/pexels-photo-35539315.jpeg",
    title: "Weekend Special",
    description: "Enjoy 20% off on all South Indian dishes every weekend!"
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/31199041/pexels-photo-31199041.jpeg",
    title: "Buy 1 Get 1 Free",
    description: "On all Filter Coffee and beverages during happy hours."
  }
];

// Animations
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const scaleHover = { scale: 1.05 };

// Helper: Get YouTube ID (works with Shorts & standard links)
const getYouTubeID = (url) => {
  const regExp =
    /(?:youtube\.com\/(?:.*\/)?(?:watch\?v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const PromotionsSection = () => {
  return (
    <section className="py-20 bg-yellow-50 px-6">
      {/* Section Title */}
      <motion.h2
        className="text-4xl font-bold text-center mb-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        Promotions and Offers
      </motion.h2>

      {/* Promotions Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {promotions.map((promo, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
            whileHover={scaleHover}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: idx * 0.2 }}
          >
            {/* Render based on type */}
            {promo.type === "image" && (
              <img
                src={promo.src}
                alt={promo.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            {promo.type === "video" && (
              <video
                src={promo.src}
                controls
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}
            {promo.type === "youtube" && (
              <div className="relative w-full h-64">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${getYouTubeID(promo.src)}`}
                  title={promo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Promo Text */}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{promo.title}</h3>
              <p className="text-gray-700 text-sm">{promo.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PromotionsSection;
