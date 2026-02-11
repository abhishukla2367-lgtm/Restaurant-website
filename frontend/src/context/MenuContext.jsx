import React, { createContext, useContext, useState } from "react";

/* ================= IMAGE IMPORTS ================= */
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

/* ================= CONTEXT ================= */
const MenuContext = createContext();

/* ================= INITIAL MENU ================= */
const initialMenu = [
  { id: 1, name: "Plain Dosa", category: "Breakfast", price: 165, veg: true, description: "Crispy rice crepe with sambar & chutney", image: plainDosa, available: true },
  { id: 2, name: "Idli (2 pcs)", category: "Breakfast", price: 120, veg: true, description: "Soft steamed rice cakes", image: idli, available: true },
  { id: 3, name: "Appam (2 pcs)", category: "Breakfast", price: 140, veg: true, description: "Kerala style pancakes", image: appam, available: true },
  { id: 4, name: "Rava Dosa", category: "Breakfast", price: 150, veg: true, description: "Thin semolina dosa", image: ravaDosa, available: true },
  { id: 5, name: "Set Dosa", category: "Breakfast", price: 160, veg: true, description: "Soft dosas", image: setDosa, available: true },
  { id: 6, name: "Medu Vada", category: "Breakfast", price: 130, veg: true, description: "Crispy lentil fritters", image: meduVada, available: true },
  { id: 7, name: "Upma", category: "Breakfast", price: 120, veg: true, description: "Savory semolina dish", image: upma, available: true },
  { id: 8, name: "Pongal", category: "Breakfast", price: 150, veg: true, description: "Rice & lentil comfort food", image: pongal, available: true },

  { id: 9, name: "Drumstick Soup", category: "Starters", price: 325, veg: true, description: "Herbal soup", image: drumstickSoup, available: true },
  { id: 10, name: "Tomato Soup", category: "Starters", price: 300, veg: true, description: "Spiced tomato soup", image: tomatoSoup, available: true },
  { id: 11, name: "Prawns Rasam", category: "Starters", price: 450, veg: false, description: "Tangy prawn rasam", image: prawnsRasam, available: true },
  { id: 12, name: "Paneer 65", category: "Starters", price: 350, veg: true, description: "Crispy paneer", image: paneer65, available: true },

  { id: 13, name: "Chicken Ghee Roast", category: "Main Course", price: 550, veg: false, description: "Spicy coastal curry", image: chickenGheeRoast, available: true },
  { id: 14, name: "Vegetable Korma", category: "Main Course", price: 420, veg: true, description: "Creamy veg curry", image: vegKorma, available: true },
  { id: 15, name: "Fish Curry", category: "Main Course", price: 520, veg: false, description: "Traditional fish curry", image: fishCurry, available: true },
  { id: 16, name: "Paneer Butter Masala", category: "Main Course", price: 450, veg: true, description: "Rich tomato gravy", image: paneerButterMasala, available: true },

  { id: 17, name: "Payasam", category: "Desserts", price: 180, veg: true, description: "Traditional sweet", image: payasam, available: true },
  { id: 18, name: "Kesari", category: "Desserts", price: 150, veg: true, description: "Semolina dessert", image: kesari, available: true },

  { id: 19, name: "Filter Coffee", category: "Beverages", price: 90, veg: true, description: "South Indian coffee", image: filterCoffee, available: true },
  { id: 20, name: "Fresh Lime Soda", category: "Beverages", price: 90, veg: true, description: "Refreshing drink", image: freshLime, available: true },
];

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(initialMenu);

  const toggleAvailability = (id) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );
  };

  return (
    <MenuContext.Provider value={{ menuItems, toggleAvailability }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
