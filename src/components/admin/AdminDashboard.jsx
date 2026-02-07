import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import DashboardCards from "../../components/admin/DashboardCards";
import MenuList from "../../components/admin/MenuList";
import OrdersList from "../../components/admin/OrdersList";
import ReservationsList from "../../components/admin/ReservationsList";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "menu":
        return <MenuList />;
      case "orders":
        return <OrdersList />;
      case "reservations":
        return <ReservationsList />;
      default:
        return <DashboardCards />;
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
