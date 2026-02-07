export default function Sidebar({ active, onChange }) {
  const itemClass = (tab) =>
    `cursor-pointer px-4 py-2 rounded-md text-sm font-medium
     ${active === tab ? "bg-orange-100 text-orange-600" : "text-gray-700 hover:bg-gray-100"}`;

  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <div className="p-4 font-bold text-lg">Admin Panel</div>

      <nav className="flex flex-col gap-2 px-2">
        <div className={itemClass("dashboard")} onClick={() => onChange("dashboard")}>
          Dashboard
        </div>

        <div className={itemClass("menu")} onClick={() => onChange("menu")}>
          Menu
        </div>

        <div className={itemClass("orders")} onClick={() => onChange("orders")}>
          Orders
        </div>

        <div className={itemClass("reservations")} onClick={() => onChange("reservations")}>
          Reservations
        </div>
      </nav>
    </aside>
  );
}
