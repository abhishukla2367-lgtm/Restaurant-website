import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import PromotionsSection from "../components/PromotionsSection";
import { motion } from "framer-motion";




import dosa from "../assets/images/dishes/dosa.jpg";
import idli from "../assets/images/dishes/idli.jpg";
import meduvada from "../assets/images/dishes/medu-vada.jpg";


import gallery1 from "../assets/images/gallery/gallery1.jpg";
import gallery2 from "../assets/images/gallery/gallery2.jpg";
import gallery3 from "../assets/images/gallery/gallery3.jpg";
import gallery4 from "../assets/images/gallery/gallery4.jpg";
import gallery5 from "../assets/images/gallery/gallery5.jpg";
import gallery6 from "../assets/images/gallery/gallery6.jpg";

// Our Story Image
import aboutImage from "../assets/images/about/our-story.jpg";

/* ================= DATA ================= */
const heroImages = [
  "https://images.pexels.com/photos/35539315/pexels-photo-35539315.jpeg?auto=compress&cs=tinysrgb&w=1470",
  "https://images.pexels.com/photos/31199041/pexels-photo-31199041.jpeg?auto=compress&cs=tinysrgb&w=1470",
  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1470",
];



const dishes = [
  { img: dosa, name: "Masala Dosa", price: "₹160", veg: true },
  { img: idli, name: "Idli Sambar", price: "₹120", veg: true },
  { img: meduvada, name: "Medu Vada", price: "₹90", veg: true },
];

const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

/* ================= ANIMATION VARIANTS ================= */
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const fadeLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } };
const fadeRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } };
const scaleHover = { scale: 1.05 };


const Home = () => {
  const navigate = useNavigate();
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentHero((prev) => (prev + 1) % heroImages.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="scroll-smooth m-0">
     {/* HERO */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImages[currentHero]})` }}
      >
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-between px-4 z-20 pointer-events-none">
          <button
            onClick={() => setCurrentHero((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
            className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition pointer-events-auto"
          >
            <ArrowLeft size={32} />
          </button>

          <button
            onClick={() => setCurrentHero((prev) => (prev + 1) % heroImages.length)}
            className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition pointer-events-auto"
          >
            <ArrowRight size={32} />
          </button>
        </div>

        <motion.div
          className="relative z-10 max-w-2xl px-6"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Southern Tales</h1>
          <p className="text-lg text-gray-200 mb-6">Where every bite tells a story</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              whileHover={scaleHover}
              onClick={() => navigate("/menu")}
              className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
            >
              Explore Menu
            </motion.button>
            <motion.button
              whileHover={scaleHover}
              onClick={() => (window.location.href = "tel:+919876543210")}
              className="flex items-center gap-2 border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition"
            >
              <Phone size={18} />
              Call Now
            </motion.button>
          </div>
        </motion.div>
      </section>

     <PromotionsSection />

      {/* OUR STORY */}
      <motion.section
        id="about"
        className="py-20 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">
          <motion.div
            className="w-full h-full rounded-xl shadow-lg bg-cover bg-center transform transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url(${aboutImage})` }}
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className="flex flex-col justify-center bg-white p-6 rounded-xl space-y-4 h-full"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold">Our Story</h2>
            <h3 className="text-2xl font-semibold text-orange-500">A Taste of Southern Heritage</h3>
            <p>Welcome to Southern Tales, where every dish tells a story of tradition, flavor, and the rich culinary heritage of South India.</p>
            <p>Nestled in the heart of CBD Belapur, we bring you an authentic dining experience celebrating flavors from Kerala, Tamil Nadu, Karnataka, and Andhra Pradesh.</p>
            <p>Our chefs craft each dish using time-honored recipes passed down through generations, with the freshest ingredients and traditional spices.</p>
            <p>From crispy dosas to aromatic biryanis, every bite is a journey through the vibrant streets of the South.</p>
            <p>We combine culinary expertise with passion to create an unforgettable gastronomic experience.</p>
            <p>Our warm ambiance and attentive service ensure a memorable dining experience for all guests.</p>
            <p>Join the thousands of happy customers who have experienced the taste, tradition, and hospitality of Southern Tales.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/about")}
              className="mt-4 self-start bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Know More
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* SERVICES */}
      <motion.section
        id="services"
        className="py-24 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-4xl font-bold text-center mb-16 text-[#F9FAF7]">Our Services</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          <ServiceCard emoji="🍽️" title="Dine-In Experience" />
          <ServiceCard emoji="🥡" title="Takeaway & Pickup" />
          <ServiceCard emoji="🎉" title="Catering Services" />
          <ServiceCard emoji="📦" title="Online Orders" />
        </div>
      </motion.section>

      {/* WHY CHOOSE US */}
      <motion.section
        id="why-choose-us"
        className="py-20 bg-yellow-50 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <WhyCard emoji="🍛" title="Authentic Taste" />
          <WhyCard emoji="🥬" title="Fresh Ingredients" />
          <WhyCard emoji="🤝" title="Warm Hospitality" />
        </div>
      </motion.section>

      {/* POPULAR DISHES */}
      <motion.section
        id="popular"
        className="py-10 bg-yellow-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Popular Dishes</h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {dishes.map((dish, idx) => (
            <DishCard key={idx} {...dish} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={scaleHover}
            onClick={() => navigate("/menu")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition"
          >
            Explore Menu
          </motion.button>
        </div>
      </motion.section>

      {/* GALLERY */}
      <motion.section
        id="gallery"
        className="py-20 bg-[#0F3D3E] text-[#F9FAF7] text-center px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-4xl font-bold mb-10">Gallery</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleryImages.map((img, idx) => (
            <motion.img
              key={idx}
              src={img}
              alt={`Gallery ${idx + 1}`}
              className="h-48 w-full object-cover rounded-lg hover:scale-105 transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
            />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <motion.button
            whileHover={scaleHover}
            onClick={() => navigate("/gallery")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition"
          >
            More to Gallery
          </motion.button>
        </div>
      </motion.section>

      {/* RESERVATION */}
      <motion.section
        id="reservation"
        className="py-24 px-6 bg-gradient-to-r from-[#7A1F2A] via-[#8B2C2C] to-[#9C5A2E]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-[#F9FAF7]">
            <p className="text-yellow-400 font-semibold mb-2">RESERVE YOUR EXPERIENCE</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Book Your Table Today</h2>
            <p className="text-lg mb-8">Join us for an unforgettable dining experience.</p>
            <motion.button
              whileHover={scaleHover}
              onClick={() => navigate("/reservation")}
              className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition"
            >
              Make a Reservation
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        className="py-20 bg-yellow-100 text-center px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
        <p className="text-lg mb-2">📞 +91 98765 43210</p>
        <p className="text-lg mb-6">✉️ contact@southerntales.com</p>
        <div className="flex justify-center gap-6 mt-4 flex-wrap">
          <button
    onClick={() => {
      alert("Call on this number:- +91 98765 43210");
      window.location.href = "tel:+919876543210";
    }}
    className="flex items-center gap-2 bg-yellow-400 text-black font-semibold px-5 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition"
  >
    {/* Phone Icon (standard) */}
    <svg
       xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.72 11.72 0 003.66.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.58 3.66 1 1 0 01-.21 1.11l-2.2 2.2z" />
    </svg>
    Call Now
  </button>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="w-5 h-5"
            />
            WhatsApp
          </a>
        </div>
      </motion.section>
    </div>
  );
};

/* ================= SUB COMPONENTS ================= */
const DishCard = ({ img, name, price, veg }) => (
  <motion.div
    className="bg-white rounded-xl shadow hover:scale-105 transition p-6 text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <img src={img} alt={name} className="h-48 w-full object-cover rounded-lg mb-4" />
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-xl font-semibold">{name}</h3>
      <span className={`w-3 h-3 rounded-full ${veg ? "bg-green-500" : "bg-red-500"}`} />
    </div>
    <p className="text-orange-500 font-bold">{price}</p>
  </motion.div>
);

const ServiceCard = ({ emoji, title }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:scale-105 transition"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-5xl mb-5">{emoji}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-700">Premium service crafted for your comfort and convenience.</p>
  </motion.div>
);

const WhyCard = ({ emoji, title }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:scale-105 transition"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-5xl mb-4">{emoji}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-700">Quality, care, and consistency in every experience.</p>
  </motion.div>
);

export default Home;
