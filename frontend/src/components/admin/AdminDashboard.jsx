import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../components/admin/Sidebar";
import DashboardCards from "../../components/admin/DashboardCards";
import MenuList from "../../components/admin/MenuList";
import OrdersList from "../../components/admin/OrdersList";
import ReservationsList from "../../components/admin/ReservationsList";
import SkeletonCard from "../../components/admin/SkeletonCard"; // Skeleton placeholder

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  // Simulate data fetching
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200); // fake fetch delay
    return () => clearTimeout(timer);
  }, [activeTab]);

  // Map tabs to components
  const contentMap = {
    dashboard: <DashboardCards loading={loading} />,
    menu: <MenuList loading={loading} />,
    orders: <OrdersList loading={loading} />,
    reservations: <ReservationsList loading={loading} />,
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar active={activeTab} onChange={setActiveTab} />

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 capitalize tracking-tight">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>

          {/* Loading Indicator */}
          {loading && (
            <div className="flex items-center mt-3 sm:mt-0 space-x-2">
              <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce"></div>
              <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce delay-150"></div>
              <div className="w-4 h-4 rounded-full bg-indigo-500 animate-bounce delay-300"></div>
              <span className="ml-2 text-gray-500 font-medium">Loading...</span>
            </div>
          )}
        </div>

        {/* Animated Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {/* Render skeleton while loading */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Example skeleton cards */}
                {[...Array(6)].map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              contentMap[activeTab] || <DashboardCards />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
