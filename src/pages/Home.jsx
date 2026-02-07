import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";

/* ================= IMAGE IMPORTS ================= */

// Offers
import offer1 from "../assets/images/offers/offer1.jpg";
import offer2 from "../assets/images/offers/offer2.jpg";
import offer3 from "../assets/images/offers/offer3.jpg";

// Dishes
import dosa from "../assets/images/dishes/dosa.jpg";
import idli from "../assets/images/dishes/idli.jpg";
import meduvada from "../assets/images/dishes/medu-vada.jpg";

// Gallery
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

const offers = [
  {
    img: offer1,
    title: "Weekend Special: 20% Off",
    description: "Enjoy 20% off on all South Indian dishes every weekend!",
  },
  {
    img: offer2,
    title: "Buy 1 Get 1 Free",
    description:
      "On all Filter Coffee and beverages during happy hours (5–7 PM).",
  },
  {
    img: offer3,
    title: "Lunch Combo Offer",
    description: "Get a free dessert with any Main Course combo meal!",
  },
];

const dishes = [
  { img: dosa, name: "Masala Dosa", price: "₹160", veg: true },
  { img: idli, name: "Idli Sambar", price: "₹120", veg: true },
  { img: meduvada, name: "Medu Vada", price: "₹90", veg: true },
];

const galleryImages = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
];

/* ================= COMPONENT ================= */

const Home = () => {
  const navigate = useNavigate();
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 72;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="bg-[#FFF7ED] scroll-smooth m-0">
      {/* HERO */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImages[currentHero]})` }}
      >
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-between px-4 z-20 pointer-events-none">
          <button
            onClick={() =>
              setCurrentHero(
                (prev) =>
                  (prev - 1 + heroImages.length) % heroImages.length
              )
            }
            className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition pointer-events-auto"
          >
            <ArrowLeft size={32} />
          </button>

          <button
            onClick={() =>
              setCurrentHero((prev) => (prev + 1) % heroImages.length)
            }
            className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition pointer-events-auto"
          >
            <ArrowRight size={32} />
          </button>
        </div>

        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Southern Tales
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            Where every bite tells a story
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/menu")}
              className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600"
            >
              Explore Menu
            </button>
            <button
              onClick={() => (window.location.href = "tel:+919876543210")}
              className="flex items-center gap-2 border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black"
            >
              <Phone size={18} />
              Call Now
            </button>
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section id="offers" className="py-20 bg-yellow-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          Promotional Offers
        </h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 px-6">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow hover:scale-105 transition"
            >
              <img
                src={offer.img}
                alt={offer.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-700">{offer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
          <div
            className="w-full h-full rounded-xl shadow-lg bg-cover bg-center"
            style={{ backgroundImage: `url(${aboutImage})` }}
          />

          <div className="flex flex-col justify-center bg-yellow-100 p-6 rounded-xl space-y-4">
            <h2 className="text-4xl font-bold">Our Story</h2>
            <h3 className="text-2xl font-semibold text-orange-500">
              A Taste of Southern Heritage
            </h3>

            <p>
              Welcome to Southern Tales, where every dish tells a story of
              tradition, flavor, and the rich culinary heritage of South India.
            </p>
            <p>
              Nestled in the heart of CBD Belapur, we bring you an authentic
              dining experience celebrating flavors from Kerala, Tamil Nadu,
              Karnataka, and Andhra Pradesh.
            </p>
            <p>
              Our chefs craft each dish using time-honored recipes passed down
              through generations, with the freshest ingredients and
              traditional spices.
            </p>
            <p>
              From crispy dosas to aromatic biryanis, every bite is a journey
              through the vibrant streets of the South.
            </p>
            <p>
              We combine culinary expertise with passion to create an
              unforgettable gastronomic experience.
            </p>
            <p>
              Our warm ambiance and attentive service ensure a memorable dining
              experience for all guests.
            </p>
            <p>
              Join the thousands of happy customers who have experienced the
              taste, tradition, and hospitality of Southern Tales.
            </p>

            <div className="flex gap-12 mt-6">
              <Stat value="15+" label="Years Experience" />
              <Stat value="50+" label="Signature Dishes" />
              <Stat value="10K+" label="Happy Customers" />
            </div>
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section id="services" className="py-24 bg-[#1E293B] px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#F9FAF7]">
            Our Services
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <ServiceCard emoji="🍽️" title="Dine-In Experience" />
            <ServiceCard emoji="🥡" title="Takeaway & Pickup" />
            <ServiceCard emoji="🎉" title="Catering Services" />
            <ServiceCard emoji="📦" title="Online Orders" />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why-choose-us" className="py-20 bg-yellow-50 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Us
        </h2>
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <WhyCard emoji="🍛" title="Authentic Taste" />
          <WhyCard emoji="🥬" title="Fresh Ingredients" />
          <WhyCard emoji="🤝" title="Warm Hospitality" />
        </div>
      </section>

      {/* POPULAR DISHES */}
      <section id="popular" className="py-10 bg-yellow-100">
        <h2 className="text-3xl font-bold text-center mb-12">
          Popular Dishes
        </h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {dishes.map((dish, idx) => (
            <DishCard key={idx} {...dish} />
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section
        id="gallery"
        className="py-20 bg-[#0F3D3E] text-[#F9FAF7] text-center px-6"
      >
        <h2 className="text-4xl font-bold mb-10">Gallery</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleryImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Gallery ${idx + 1}`}
              className="h-48 w-full object-cover rounded-lg hover:scale-105 transition"
            />
          ))}
        </div>
      </section>

      {/* RESERVATION */}
      <section
        id="reservation"
        className="py-24 px-6 bg-gradient-to-r from-[#7A1F2A] via-[#8B2C2C] to-[#9C5A2E]"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-[#F9FAF7]">
            <p className="text-yellow-400 font-semibold mb-2">
              RESERVE YOUR EXPERIENCE
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Book Your Table Today
            </h2>
            <p className="text-lg mb-8">
              Join us for an unforgettable dining experience.
            </p>
            <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold">
              Make a Reservation
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-yellow-100 text-center px-6">
        <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
        <p className="text-lg">📞 +91 98765 43210</p>
        <p className="text-lg">✉️ contact@southerntales.com</p>
      </section>
    </div>
  );
};

/* ================= SUB COMPONENTS ================= */

const DishCard = ({ img, name, price, veg }) => (
  <div className="bg-white rounded-xl shadow hover:scale-105 transition p-6 text-center">
    <img
      src={img}
      alt={name}
      className="h-48 w-full object-cover rounded-lg mb-4"
    />
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-xl font-semibold">{name}</h3>
      <span
        className={`w-3 h-3 rounded-full ${
          veg ? "bg-green-500" : "bg-red-500"
        }`}
      />
    </div>
    <p className="text-orange-500 font-bold">{price}</p>
  </div>
);

const Stat = ({ value, label }) => (
  <div className="text-center">
    <h4 className="text-2xl font-bold text-orange-500">{value}</h4>
    <p className="text-gray-700 font-medium">{label}</p>
  </div>
);

const ServiceCard = ({ emoji, title }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition">
    <div className="text-5xl mb-5">{emoji}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-700">
      Premium service crafted for your comfort and convenience.
    </p>
  </div>
);

const WhyCard = ({ emoji, title }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition">
    <div className="text-5xl mb-4">{emoji}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-700">
      Quality, care, and consistency in every experience.
    </p>
  </div>
);

export default Home;
