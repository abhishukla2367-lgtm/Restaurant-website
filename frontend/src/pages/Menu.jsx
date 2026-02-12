import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../api/axiosConfig"; 

/* ================= IMAGE IMPORTS ================= */
import southFoodHero from "../assets/images/hero/south-food.jpg";
import southFoodHero2 from "../assets/images/hero/south-food2.jpg";
import southFoodHero3 from "../assets/images/hero/south-food3.jpg";

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

/* ================= MENU ITEMS WITH NUMERIC PRICES ================= */
const menuItems = [
  { name: "Plain Dosa", category: "Breakfast", price: 165, veg: true, description: "Crispy rice crepe with sambar & chutney", image: plainDosa },
  { name: "Idli (2 pcs)", category: "Breakfast", price: 120, veg: true, description: "Soft steamed rice cakes with chutney & sambar", image: idli },
  { name: "Appam (2 pcs)", category: "Breakfast", price: 140, veg: true, description: "Soft lacy Kerala pancakes", image: appam },
  { name: "Rava Dosa", category: "Breakfast", price: 150, veg: true, description: "Thin semolina crepe", image: ravaDosa },
  { name: "Set Dosa", category: "Breakfast", price: 160, veg: true, description: "Soft spongy dosas (2 pcs)", image: setDosa },
  { name: "Medu Vada (2 pcs)", category: "Breakfast", price: 130, veg: true, description: "Crispy lentil fritters", image: meduVada },
  { name: "Upma", category: "Breakfast", price: 120, veg: true, description: "Savory semolina porridge", image: upma },
  { name: "Pongal", category: "Breakfast", price: 150, veg: true, description: "Comfort rice & lentil dish", image: pongal },

  { name: "Drumstick Coriander Soup", category: "Starters", price: 325, veg: true, description: "Earthy herbal soup", image: drumstickSoup },
  { name: "Madras Tomato Soup", category: "Starters", price: 300, veg: true, description: "Spiced tomato soup", image: tomatoSoup },
  { name: "Prawns Rasam", category: "Starters", price: 450, veg: false, description: "Tangy prawn rasam", image: prawnsRasam },
  { name: "Broccoli Tikka", category: "Starters", price: 350, veg: true, description: "Marinated grilled broccoli", image: broccoliTikka },
  { name: "Kanthari Mushroom Fry", category: "Starters", price: 380, veg: true, description: "Spicy sautéed mushrooms", image: mushroomFry },
  { name: "Egg Roast", category: "Starters", price: 280, veg: false, description: "Kerala-style egg roast", image: eggRoast },
  { name: "Pepper Fried Chicken", category: "Starters", price: 450, veg: false, description: "Peppery fried chicken", image: pepperChicken },
  { name: "Paneer 65", category: "Starters", price: 350, veg: true, description: "Crispy fried paneer", image: paneer65 },

  { name: "Chicken Ghee Roast", category: "Main Course", price: 550, veg: false, description: "Spicy coastal ghee roast", image: chickenGheeRoast },
  { name: "Vegetable Korma", category: "Main Course", price: 420, veg: true, description: "Creamy mixed veg curry", image: vegKorma },
  { name: "Fish Curry", category: "Main Course", price: 520, veg: false, description: "Traditional South Indian fish curry", image: fishCurry },
  { name: "Paneer Butter Masala", category: "Main Course", price: 450, veg: true, description: "Rich tomato-based gravy", image: paneerButterMasala },

  { name: "Payasam", category: "Desserts", price: 180, veg: true, description: "Traditional sweet pudding", image: payasam },
  { name: "Kesari", category: "Desserts", price: 150, veg: true, description: "Semolina saffron dessert", image: kesari },
  { name: "Gulab Jamun", category: "Desserts", price: 160, veg: true, description: "Soft syrupy dumplings", image: gulabJamun },
  { name: "Coconut Ladoo", category: "Desserts", price: 140, veg: true, description: "Fresh coconut sweets", image: coconutLadoo },

  { name: "Filter Coffee", category: "Beverages", price: 90, veg: true, description: "Authentic South Indian coffee", image: filterCoffee },
  { name: "Masala Tea", category: "Beverages", price: 80, veg: true, description: "Spiced Indian chai", image: masalaTea },
  { name: "Buttermilk", category: "Beverages", price: 70, veg: true, description: "Refreshing spiced buttermilk", image: butterMilk },
  { name: "Fresh Lime Soda", category: "Beverages", price: 90, veg: true, description: "Chilled lime refreshment", image: freshLime },
];

const categories = ["All", "Breakfast", "Starters", "Main Course", "Desserts", "Beverages"];

export default function Menu() {
 const { cart = [], addToCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVeg, setSelectedVeg] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [activeHero, setActiveHero] = useState(0);
  const [isOrdering, setIsOrdering] = useState(false);

  const heroImages = [southFoodHero, southFoodHero2, southFoodHero3];

  useEffect(() => {
    const interval = setInterval(() => setActiveHero((prev) => (prev + 1) % heroImages.length), 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Task 4 & 6: Integration Logic
 const handlePlaceOrder = async () => {
  try {
    // Calculate total from cartItems (ensure this name matches your Context)
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const orderData = {
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: totalAmount
    };

    // This request MUST succeed for data to show on the profile
    const res = await API.post("/orders", orderData);
    console.log("Order Response:", res.data); // Debug: Check if 'user' field is present here

    alert("Order placed successfully!");
    clearCart();
    navigate("/profile"); 
  } catch (err) {
    console.error("Order failed:", err.response?.data || err.message);
    alert("Could not place order. Check console for details.");
  }
};


  const filteredItems = menuItems.filter((item) => {
    const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchVeg = selectedVeg === "All" || (selectedVeg === "Veg" && item.veg) || (selectedVeg === "NonVeg" && !item.veg);
    const priceNum = Number(item.price);
    let matchPrice = true;
    if (selectedPrice === "Under200") matchPrice = priceNum < 200;
    else if (selectedPrice === "200to400") matchPrice = priceNum >= 200 && priceNum <= 400;
    else if (selectedPrice === "Above400") matchPrice = priceNum > 400;
    return matchCategory && matchSearch && matchVeg && matchPrice;
  });

  return (
    <div className="bg-[#fcfaf8] pb-32">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        {heroImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt="Southern Tales"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${idx === activeHero ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white md:text-6xl">Our Menu</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Filters */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${selectedCategory === cat ? "bg-[#f5c27a] text-[#1f1b16]" : "bg-white text-gray-400 border border-gray-100 hover:border-[#f5c27a]"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search favorites..."
            className="w-full max-w-xs rounded-xl border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-[#f5c27a]/30 md:w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredItems.map((item, idx) => (
            <div key={idx} className="group flex flex-col rounded-3xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-xl">
              <div className="relative h-44 overflow-hidden rounded-2xl">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute top-2 right-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold">
                  {item.veg ? "🟢 Veg" : "🔴 Non-Veg"}
                </div>
              </div>
              <div className="mt-4 flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-[#1f1b16]">{item.name}</h3>
                  <p className="font-bold text-[#eab366]">₹{item.price}</p>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-gray-400">{item.description}</p>
              </div>
              <button
                onClick={() => addToCart(item)}
                className="mt-4 w-full rounded-xl bg-[#1f1b16] py-3 text-xs font-bold text-white transition-colors hover:bg-[#332d26]"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Task 6: Sticky Checkout Button */}
        {(cart?.length || 0) > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
            <button
              onClick={handlePlaceOrder}
              disabled={isOrdering}
              className="flex items-center gap-6 rounded-full bg-[#f5c27a] px-10 py-4 font-bold text-[#1f1b16] shadow-2xl transition-transform hover:scale-105 active:scale-95"
            >
              <span>🛒 {cart.length} Items</span>
              <span className="h-6 w-[1px] bg-[#1f1b16]/10"></span>
              <span>{isOrdering ? "Placing Order..." : "Checkout Now"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}