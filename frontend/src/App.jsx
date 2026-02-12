import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Task 4 Logic

// Pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Reservation from "./pages/Reservation";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile"; 

// Admin Components
import AdminDashboard from "./components/admin/AdminDashboard";
import MenuList from "./components/admin/MenuList";
import OrdersList from "./components/admin/OrdersList";
import ReservationsList from "./components/admin/ReservationsList";

// Contexts
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext"; // ✅ Task 3 & 5 State

/* Scroll to top on route change */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

/* Main Layout - Task 1: Professional UI Consistency */
const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className={isAdminRoute ? "min-h-screen bg-gray-100" : "min-h-screen bg-background text-textPrimary"}>
      {!isAdminRoute && <Header />} {/* Task 3: Header handles Login/Profile toggle */}
      <main className={isAdminRoute ? "min-h-screen" : "min-h-[80vh]"}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider> {/* Wraps App for Task 5 & 6 Auth Persistence */}
      <CartProvider>
        <Router 
          future={{ 
            v7_startTransition: true, 
            v7_relativeSplatPath: true 
          }}
        >
          <ScrollToTop />
          <Layout>
            <Routes>
              {/* PUBLIC ROUTES - Task 4: Browse without login */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/cart" element={<CartDrawer />} />
              
              {/* AUTH ROUTES - Task 5: Register & Login */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* PROTECTED ROUTES - Task 4: Login required for these actions */}
              <Route 
                path="/reservation" 
                element={<ProtectedRoute><Reservation /></ProtectedRoute>} 
              />
              <Route 
                path="/order-summary" 
                element={<ProtectedRoute><OrderSummaryPage /></ProtectedRoute>} 
              />

              {/* PROFILE ROUTE - Task 6: Show User details/Orders/Reservations */}
              <Route 
                path="/profile" 
                element={<ProtectedRoute><Profile /></ProtectedRoute>} 
              />

              {/* ADMIN ROUTES */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/menu" element={<MenuList />} />
              <Route path="/admin/orders" element={<OrdersList />} />
              <Route path="/admin/reservations" element={<ReservationsList />} />

              {/* 404 Redirect */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
