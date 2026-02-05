import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [orderType, setOrderType] = useState("delivery"); // NEW: Delivery / Pickup

  const addToCart = (item) => {
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
        item.name === name
          ? { ...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0 }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
        0
      ),
    [cartItems]
  );

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
        orderType,    // NEW
        setOrderType, // NEW
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
