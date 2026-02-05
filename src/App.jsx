import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Context
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider> {/* Wrap the entire app so all components can access the cart */}
      <Router>
        {/* Header always visible */}
        <Header />

        {/* Main content */}
        <main className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order-summary" element={<OrderSummaryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Cart route */}
            <Route path="/cart" element={<CartDrawer />} />

            {/* Optional: fallback to home for unknown routes */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Footer always visible */}
        <Footer />
      </Router>
    </CartProvider>
  );
}
