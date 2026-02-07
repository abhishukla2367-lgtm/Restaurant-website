export default function Sidebar({ active, onChange }) {
  const linkClass = (tab) =>
    `block w-full text-left px-4 py-2 rounded ${
      active === tab ? "bg-gray-200 font-semibold" : ""
    }`;

  return (
    <aside className="w-64 bg-white border-r">
      <nav className="p-4 space-y-2">
        <button className={linkClass("dashboard")} onClick={() => onChange("dashboard")}>
          Dashboard
        </button>
        <button className={linkClass("menu")} onClick={() => onChange("menu")}>
          Menu
        </button>
        <button className={linkClass("orders")} onClick={() => onChange("orders")}>
          Orders
        </button>
        <button className={linkClass("reservations")} onClick={() => onChange("reservations")}>
          Reservations
        </button>
      </nav>
    </aside>
  );
}
