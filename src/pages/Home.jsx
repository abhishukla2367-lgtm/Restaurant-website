import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Angular arrows

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

/* ================= DATA ================= */

// Hero Images (KEEP AS URLS)
const heroImages = [
  "https://images.pexels.com/photos/35539315/pexels-photo-35539315.jpeg?auto=compress&cs=tinysrgb&w=1470",
  "https://images.pexels.com/photos/31199041/pexels-photo-31199041.jpeg?auto=compress&cs=tinysrgb&w=1470",
  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1470",
];

// Promotional Offers
const offers = [
  {
    img: offer1,
    title: "Weekend Special: 20% Off",
    description: "Enjoy 20% off on all South Indian dishes every weekend!",
  },
  {
    img: offer2,
    title: "Buy 1 Get 1 Free",
    description: "On all Filter Coffee and beverages during happy hours (5-7 PM).",
  },
  {
    img: offer3,
    title: "Lunch Combo Offer",
    description: "Get a free dessert with any Main Course combo meal!",
  },
];

// Popular Dishes
const dishes = [
  { img: dosa, name: "Masala Dosa", price: "₹160", veg: true },
  { img: idli, name: "Idli Sambar", price: "₹120", veg: true },
  { img: meduvada, name: "Medu Vada", price: "₹90", veg: true },
];

// Gallery Images
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
        <div className="absolute inset-0 bg-black/60" />

        {/* Angular Left & Right Arrows */}
        <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
          <button
            onClick={() =>
              setCurrentHero((prev) => (prev - 1 + heroImages.length) % heroImages.length)
            }
            className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
          >
            <ArrowLeft size={32} />
          </button>
          <button
            onClick={() =>
              setCurrentHero((prev) => (prev + 1) % heroImages.length)
            }
            className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition"
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
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/menu")}
              className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600"
            >
              Explore Menu
            </button>
            <button
              onClick={() => scrollToId("reservation")}
              className="border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black"
            >
              Reserve Table
            </button>
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <section id="offers" className="py-20 bg-yellow-50">
        <h2 className="text-3xl font-bold text-center mb-12">Promotional Offers</h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 px-6">
          {offers.map((offer, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow hover:scale-105 transition">
              <img src={offer.img} alt={offer.title} className="h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                <p className="text-gray-700">{offer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 bg-yellow-100 text-center px-6">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          Southern Tales brings authentic South Indian flavors using traditional
          recipes, fresh ingredients, and time-honored cooking methods.
        </p>
      </section>

      {/* POPULAR DISHES */}
      <section id="popular" className="py-20 bg-yellow-50">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Dishes</h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {dishes.map((dish, idx) => (
            <DishCard key={idx} {...dish} />
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 bg-gray-100 text-center px-6">
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
      <section id="reservation" className="py-20 bg-yellow-50 text-center px-6">
        <h2 className="text-4xl font-bold mb-8">Reservation</h2>
        <form className="bg-white max-w-lg mx-auto p-6 rounded-xl shadow space-y-4">
          <input className="w-full border px-4 py-2 rounded" placeholder="Name" />
          <input className="w-full border px-4 py-2 rounded" placeholder="Email" />
          <input className="w-full border px-4 py-2 rounded" type="date" />
          <input className="w-full border px-4 py-2 rounded" type="time" />
          <button className="w-full bg-orange-500 text-white py-2 rounded font-semibold">
            Reserve
          </button>
        </form>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 bg-yellow-100 text-center px-6">
        <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
        <p className="text-lg text-gray-700 mb-2">📞 Phone: +91 98765 43210</p>
        <p className="text-lg text-gray-700">✉️ Email: contact@southerntales.com</p>
      </section>
    </div>
  );
};

const DishCard = ({ img, name, price, veg }) => (
  <div className="bg-white rounded-xl shadow hover:scale-105 transition p-6 text-center">
    <img src={img} alt={name} className="h-48 w-full object-cover rounded-lg mb-4" />
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-xl font-semibold">{name}</h3>
      <span className={`w-3 h-3 rounded-full ${veg ? "bg-green-500" : "bg-red-500"}`} />
    </div>
    <p className="text-orange-500 font-bold">{price}</p>
  </div>
);

export default Home;
