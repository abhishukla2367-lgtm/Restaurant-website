import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardCards from "./DashboardCards";
import MenuList from "./MenuList";
import OrdersList from "./OrdersList";
import ReservationsList from "./ReservationsList";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuItems = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Menu Item ${i + 1}`,
    price: 100 + i * 20
  }));

  const error = false;

  const renderContent = () => {
    if (error) return <ErrorState />;

    switch (activeTab) {
      case "dashboard":
        return <DashboardCards />;

      case "menu":
        return menuItems.length === 0
          ? <EmptyState />
          : <MenuList data={menuItems} />;

      case "orders":
        return <OrdersList />;

      case "reservations":
        return <ReservationsList />;

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar active={activeTab} onChange={setActiveTab} />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 capitalize">
          {activeTab}
        </h1>
        {renderContent()}
      </main>
    </div>
  );
}
