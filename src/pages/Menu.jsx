import React, { useState } from "react";

/* ================= IMAGE IMPORTS ================= */
import southFoodHero from "../assets/images/hero/south-food.jpg";
/* Breakfast */
import plainDosa from "../assets/images/menu/breakfast/plain-dosa.jpg";
import idli from "../assets/images/menu/breakfast/idli.jpg";
import appam from "../assets/images/menu/breakfast/appam.jpg";
import ravaDosa from "../assets/images/menu/breakfast/rava-dosa.jpg";
import setDosa from "../assets/images/menu/breakfast/set-dosa.jpg";
import meduVada from "../assets/images/menu/breakfast/medu-vada.jpg";
import upma from "../assets/images/menu/breakfast/upma.jpg";
import pongal from "../assets/images/menu/breakfast/pongal.jpg";

/* Starters */
import drumstickSoup from "../assets/images/menu/starters/drumstick-soup.jpg";
import tomatoSoup from "../assets/images/menu/starters/tomato-soup.jpg";
import prawnsRasam from "../assets/images/menu/starters/prawns-rasam.jpg";
import broccoliTikka from "../assets/images/menu/starters/broccoli-tikka.jpg";
import mushroomFry from "../assets/images/menu/starters/mushroom-fry.jpg";
import eggRoast from "../assets/images/menu/starters/egg-roast.jpg";
import pepperChicken from "../assets/images/menu/starters/pepper-chicken.jpg";
import paneer65 from "../assets/images/menu/starters/paneer-65.jpg";

/* Main Course */
import chickenGheeRoast from "../assets/images/menu/main-course/chicken-ghee-roast.jpg";
import vegKorma from "../assets/images/menu/main-course/veg-korma.jpg";
import fishCurry from "../assets/images/menu/main-course/fish-curry.jpg";
import paneerButterMasala from "../assets/images/menu/main-course/paneer-butter-masala.jpg";

/* Desserts */
import payasam from "../assets/images/menu/desserts/payasam.jpg";
import kesari from "../assets/images/menu/desserts/kesari.jpg";
import gulabJamun from "../assets/images/menu/desserts/gulab-jamun.jpg";
import coconutLadoo from "../assets/images/menu/desserts/coconut-ladoo.jpg";

/* Beverages */
import filterCoffee from "../assets/images/menu/beverages/filter-coffee.jpg";
import masalaTea from "../assets/images/menu/beverages/masala-tea.jpg";
import butterMilk from "../assets/images/menu/beverages/buttermilk.jpg";
import freshLime from "../assets/images/menu/beverages/fresh-lime.jpg";

/* ================= MENU ITEMS ================= */

const menuItems = [
  /* Breakfast */
  { name: "Plain Dosa", category: "Breakfast", price: "₹165", veg: true, description: "Crispy rice crepe with sambar & chutney", image: plainDosa },
  { name: "Idli (2 pcs)", category: "Breakfast", price: "₹120", veg: true, description: "Soft steamed rice cakes with chutney & sambar", image: idli },
  { name: "Appam (2 pcs)", category: "Breakfast", price: "₹140", veg: true, description: "Soft lacy Kerala pancakes", image: appam },
  { name: "Rava Dosa", category: "Breakfast", price: "₹150", veg: true, description: "Thin semolina crepe", image: ravaDosa },
  { name: "Set Dosa", category: "Breakfast", price: "₹160", veg: true, description: "Soft spongy dosas (2 pcs)", image: setDosa },
  { name: "Medu Vada (2 pcs)", category: "Breakfast", price: "₹130", veg: true, description: "Crispy lentil fritters", image: meduVada },
  { name: "Upma", category: "Breakfast", price: "₹120", veg: true, description: "Savory semolina porridge", image: upma },
  { name: "Pongal", category: "Breakfast", price: "₹150", veg: true, description: "Comfort rice & lentil dish", image: pongal },

  /* Starters */
  { name: "Drumstick Coriander Soup", category: "Starters", price: "₹325", veg: true, description: "Earthy herbal soup", image: drumstickSoup },
  { name: "Madras Tomato Soup", category: "Starters", price: "₹300", veg: true, description: "Spiced tomato soup", image: tomatoSoup },
  { name: "Prawns Rasam", category: "Starters", price: "₹450", veg: false, description: "Tangy prawn rasam", image: prawnsRasam },
  { name: "Broccoli Tikka", category: "Starters", price: "₹350", veg: true, description: "Marinated grilled broccoli", image: broccoliTikka },
  { name: "Kanthari Mushroom Fry", category: "Starters", price: "₹380", veg: true, description: "Spicy sautéed mushrooms", image: mushroomFry },
  { name: "Egg Roast", category: "Starters", price: "₹280", veg: false, description: "Kerala-style egg roast", image: eggRoast },
  { name: "Pepper Fried Chicken", category: "Starters", price: "₹450", veg: false, description: "Peppery fried chicken", image: pepperChicken },
  { name: "Paneer 65", category: "Starters", price: "₹350", veg: true, description: "Crispy fried paneer", image: paneer65 },

  /* Main Course */
  { name: "Chicken Ghee Roast", category: "Main Course", price: "₹550", veg: false, description: "Spicy coastal ghee roast", image: chickenGheeRoast },
  { name: "Vegetable Korma", category: "Main Course", price: "₹420", veg: true, description: "Creamy mixed veg curry", image: vegKorma },
  { name: "Fish Curry", category: "Main Course", price: "₹520", veg: false, description: "Traditional South Indian fish curry", image: fishCurry },
  { name: "Paneer Butter Masala", category: "Main Course", price: "₹450", veg: true, description: "Rich tomato-based gravy", image: paneerButterMasala },

  /* Desserts */
  { name: "Payasam", category: "Desserts", price: "₹180", veg: true, description: "Traditional sweet pudding", image: payasam },
  { name: "Kesari", category: "Desserts", price: "₹150", veg: true, description: "Semolina saffron dessert", image: kesari },
  { name: "Gulab Jamun", category: "Desserts", price: "₹160", veg: true, description: "Soft syrupy dumplings", image: gulabJamun },
  { name: "Coconut Ladoo", category: "Desserts", price: "₹140", veg: true, description: "Fresh coconut sweets", image: coconutLadoo },

  /* Beverages */
  { name: "Filter Coffee", category: "Beverages", price: "₹90", veg: true, description: "Authentic South Indian coffee", image: filterCoffee },
  { name: "Masala Tea", category: "Beverages", price: "₹80", veg: true, description: "Spiced Indian chai", image: masalaTea },
  { name: "Buttermilk", category: "Beverages", price: "₹70", veg: true, description: "Refreshing spiced buttermilk", image: butterMilk },
  { name: "Fresh Lime Soda", category: "Beverages", price: "₹90", veg: true, description: "Chilled lime refreshment", image: freshLime },
];

/* ================= CATEGORIES ================= */

const categories = ["All", "Breakfast", "Starters", "Main Course", "Desserts", "Beverages"];

/* ================= MENU COMPONENT ================= */

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = menuItems.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-gray-100">
      {/* Navbar */}
      <nav className="bg-orange-700 text-white px-8 py-4 flex items-center justify-between">
        <div className="text-xl font-bold flex items-center gap-2">🍴 Restaurant</div>
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li className="hover:text-yellow-300 cursor-pointer">Home</li>
          <li className="hover:text-yellow-300 cursor-pointer">Menu</li>
          <li className="hover:text-yellow-300 cursor-pointer">Blog</li>
          <li className="hover:text-yellow-300 cursor-pointer">Reaction</li>
          <li className="hover:text-yellow-300 cursor-pointer">About</li>
          <li className="hover:text-yellow-300 cursor-pointer">Contact</li>
        </ul>
        <div className="bg-white rounded-full px-3 py-1 text-black text-sm">🔍</div>
      </nav>

      {/* Hero Section */}
      <section
      className="relative h-[450px] bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${southFoodHero})` }}
      >

        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-4">
          <p className="text-orange-400 italic text-lg mb-2">Delicious Food</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tasty and Healthy</h1>
          <p className="text-gray-300 max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar viverra blandit.
          </p>
          <div className="flex justify-center gap-2 mt-6">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            <span className="w-3 h-3 bg-white/50 rounded-full"></span>
            <span className="w-3 h-3 bg-white/50 rounded-full"></span>
          </div>
        </div>
      </section>

      {/* Search & Category */}
      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold text-center text-orange-500 mb-8">Our Menu</h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-full focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium ${
                selectedCategory === cat
                  ? "bg-orange-500 text-white"
                  : "bg-white text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((dish, index) => (
            <div key={index} className="bg-white rounded-xl shadow overflow-hidden">
              <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{dish.name}</h3>
                  <span className={`w-3 h-3 rounded-full ${dish.veg ? "bg-green-500" : "bg-red-500"}`} />
                </div>
                <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
                <span className="font-bold text-orange-500">{dish.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
