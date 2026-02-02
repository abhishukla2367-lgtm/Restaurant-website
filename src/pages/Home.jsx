import React from "react";
import { useNavigate } from "react-router-dom";
import HeroImg from "./restaurant-hero.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main>
      <section
        className="relative bg-cover bg-center h-screen flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${HeroImg})` }}
        aria-label="Hero image of Southern Tales Restaurant"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-3xl mx-auto px-4 py-20 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Southern Tales
          </h1>
          <p className="text-lg md:text-2xl mb-8">
            Authentic South Indian Cuisine
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/menu")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              View Full Menu
            </button>
            <a
              href="tel:+917400032323"
              className="border-2 border-white px-6 py-3 rounded-lg hover:bg-white hover:text-orange-500 transition font-medium"
            >
              Call To Book
            </a>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Experience the rich flavours of South India — from dosas and sambar to
          spicy curries and traditional desserts prepared fresh daily.
        </p>
      </section>
      <section className="py-20 px-4 text-center bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Featured Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <article className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Masala Dosa</h3>
            <p className="text-gray-600">Crispy rice crepe with spiced potatoes and chutneys.</p>
          </article>
          <article className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Chicken Chettinad</h3>
            <p className="text-gray-600">Spicy, aromatic chicken curry with authentic masalas.</p>
          </article>
          <article className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Filter Coffee</h3>
            <p className="text-gray-600">Rich South Indian filter coffee served hot.</p>
          </article>
        </div>
      </section>
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Hungry?</h2>
        <button
          onClick={() => navigate("/menu")}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Explore Our Menu
        </button>
      </section>
    </main>
  );
};

export default Home;
