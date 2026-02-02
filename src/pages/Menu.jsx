import React, { useState } from "react";

const menuItems = [
  { id: 1, name: "Masala Dosa", category: "Breakfast", price: "₹120" },
  { id: 2, name: "Idli Sambar", category: "Breakfast", price: "₹100" },
  { id: 3, name: "Paneer 65", category: "Starters", price: "₹180" },
  { id: 4, name: "Chicken Chettinad", category: "Main Course", price: "₹260" },
  { id: 5, name: "Payasam", category: "Desserts", price: "₹80" },
  { id: 6, name: "Filter Coffee", category: "Beverages", price: "₹50" },
];

const categories = ["All", "Breakfast", "Starters", "Main Course", "Desserts", "Beverages"];

const Menu = () => {
  const [filter, setFilter] = useState("All");
  const filteredItems =
    filter === "All" ? menuItems : menuItems.filter(item => item.category === filter);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10">Our Menu</h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg border-2 font-medium transition ${
              filter === cat
                ? "bg-orange-500 border-orange-500 text-white"
                : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="flex justify-between p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
          >
            <span className="font-semibold text-gray-800">{item.name}</span>
            <span className="font-bold text-orange-500">{item.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
