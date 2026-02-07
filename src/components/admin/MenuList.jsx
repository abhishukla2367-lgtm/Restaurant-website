import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";

export default function MenuList() {
  const error = false;

  const menuItems = [
    { id: 1, name: "Paneer Butter Masala", price: 320 },
    { id: 2, name: "Chicken Tikka Masala", price: 380 },
    { id: 3, name: "Veg Biryani", price: 260 },
    { id: 4, name: "Chicken Biryani", price: 320 },
    { id: 5, name: "Butter Naan", price: 45 },
    { id: 6, name: "Garlic Naan", price: 55 },
    { id: 7, name: "Dal Makhani", price: 280 },
    { id: 8, name: "Masala Dosa", price: 180 },
    { id: 9, name: "Gulab Jamun", price: 120 },
    { id: 10, name: "Cold Coffee", price: 150 }
  ];

  if (error) return <ErrorState />;
  if (!menuItems.length) return <EmptyState />;

  return (
    <ul className="space-y-3">
      {menuItems.map(item => (
        <li
          key={item.id}
          className="bg-white p-4 rounded-lg shadow flex justify-between"
        >
          <span className="font-medium">{item.name}</span>
          <span className="font-semibold">₹{item.price}</span>
        </li>
      ))}
    </ul>
  );
}
