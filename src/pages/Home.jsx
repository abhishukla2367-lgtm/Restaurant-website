import React from "react";

// ===== Local Images =====
import masalaDosa from "../assets/masaladosa.jpg";
import meduVada from "../assets/medu-vada.jpg";
import chettinadCurry from "../assets/chettinad-curry.jpg";
import filterCoffee from "../assets/filter-coffee.jpg";
import idliSambar from "../assets/idli-sambar.jpg";
import heroImage from "../assets/hero-bg.jpg";

const Home = () => {
  const headerHeight = 64; // h-16 fixed header

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[#FFF7ED] scroll-smooth m-0">

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center text-center overflow-hidden"
      >
        {/* Background Image */}
        <img
          src={heroImage}
          alt="South Indian Food"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Southern Tales
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-6">
            Where every bite tells a story
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("featured")}
              className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition"
            >
              Explore Dishes
            </button>
            <button
              onClick={() => scrollToSection("reservation")}
              className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition"
            >
              Reserve Table
            </button>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="min-h-screen bg-yellow-100 flex items-center justify-center text-center px-6"
      >
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-gray-700">
            Southern Tales brings authentic South Indian flavors using traditional
            recipes, fresh ingredients, and time-honored cooking methods.
          </p>
        </div>
      </section>

      {/* ================= FEATURED DISHES ================= */}
      <section id="featured" className="py-20 bg-orange-100">
        <h2 className="text-3xl font-bold text-center mb-12">
          Popular Dishes
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          <DishCard img={masalaDosa} name="Masala Dosa" />
          <DishCard
            img="https://images.unsplash.com/photo-1589302168068-964664d93dc0"
            name="Hyderabadi Biryani"
          />
          <DishCard img={chettinadCurry} name="Chettinad Curry" />
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section id="gallery" className="py-20 bg-orange-50">
        <h2 className="text-3xl font-bold text-center mb-12">Gallery</h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          <GalleryCard img={masalaDosa} title="Masala Dosa" />
          <GalleryCard img={meduVada} title="Medu Vada" />
          <GalleryCard img={chettinadCurry} title="Chettinad Curry" />
          <GalleryCard img={idliSambar} title="Idli Sambar" />
          <GalleryCard img={filterCoffee} title="Filter Coffee" />
          <GalleryCard
            img="https://images.unsplash.com/photo-1589302168068-964664d93dc0"
            title="Hyderabadi Biryani"
          />
        </div>
      </section>

      {/* ================= RESERVATION ================= */}
      <section
  id="reservation"
  className="bg-orange-500 flex items-center justify-center text-center px-6"
  style={{ minHeight: "350px" }} // optional: keeps previous size
>
  <div className="max-w-2xl">
    <h2 className="text-4xl font-bold mb-4">Weekend Special 🎉</h2>
    <p className="text-lg mb-6">Flat 20% off on family dining</p>
    <button className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
      Book Now
    </button>
  </div>
</section>


      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="min-h-screen bg-orange-400 flex items-center justify-center text-center text-white"
      >
        <div>
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p>contact@southerntales.com</p>
          <p>+91 98765 43210</p>
        </div>
      </section>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const DishCard = ({ img, name }) => (
  <div className="bg-white rounded-xl shadow hover:scale-105 transition p-6 text-center">
    <img
      src={img}
      alt={name}
      className="h-48 w-full object-cover rounded-lg mb-4"
    />
    <h3 className="text-xl font-semibold">{name}</h3>
  </div>
);

const GalleryCard = ({ img, title }) => (
  <div className="bg-white rounded-xl shadow hover:scale-105 transition overflow-hidden">
    <img src={img} alt={title} className="h-64 w-full object-cover" />
    <p className="p-4 font-semibold text-center">{title}</p>
  </div>
);

export default Home;
