import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // PERSISTENCE: Initialize from LocalStorage so cart survives page refreshes
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("restro_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [orderType, setOrderType] = useState("delivery");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();

  // Sync cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("restro_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // AUTH AWARENESS & CART LOGIC (Requirement 4 & 8)
  const addToCart = (item, user) => {
    // If user is not logged in, redirect to login (Task Requirement #4)
    if (!user) {
      alert("Please login to add items to your cart.");
      navigate("/login");
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (name) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  const increaseQty = (name) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (name) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("restro_cart");
  };

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
        0
      ),
    [cartItems]
  );

  // ORDER SUBMISSION LOGIC (Requirement 8)
  // Connects to MongoDB via your Backend API
  const placeOrder = async (user) => {
    if (!user) return { success: false, message: "User not authenticated" };
    if (cartItems.length === 0) return { success: false, message: "Cart is empty" };

    setIsPlacingOrder(true);
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id, // Assumes user object has _id from MongoDB
          customerName: user.name,
          items: cartItems,
          totalAmount: totalPrice,
          orderType: orderType,
          status: "Pending",
          createdAt: new Date()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        clearCart(); // Requirement: Remove items from cart after order
        navigate("/profile"); // Redirect to My Orders
        return { success: true, message: "Order placed successfully!" };
      } else {
        throw new Error(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Order Error:", error);
      return { success: false, message: error.message };
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice,
        orderType,
        setOrderType,
        placeOrder,
        isPlacingOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
