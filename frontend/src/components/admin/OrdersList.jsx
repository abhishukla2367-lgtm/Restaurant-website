import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";

export default function OrdersList() {
  const error = false;

  const orders = [
    { id: "#ORD101", customer: "Rahul Sharma", total: 540, status: "Pending" },
    { id: "#ORD102", customer: "Ananya Verma", total: 780, status: "Completed" },
    { id: "#ORD103", customer: "Karan Singh", total: 320, status: "Preparing" },
    { id: "#ORD104", customer: "Neha Gupta", total: 610, status: "Pending" },
    { id: "#ORD105", customer: "Amit Patel", total: 450, status: "Completed" },
    { id: "#ORD106", customer: "Pooja Mehta", total: 890, status: "Pending" },
    { id: "#ORD107", customer: "Rohit Khanna", total: 270, status: "Completed" },
    { id: "#ORD108", customer: "Sneha Iyer", total: 520, status: "Preparing" },
    { id: "#ORD109", customer: "Vikas Malhotra", total: 660, status: "Pending" },
    { id: "#ORD110", customer: "Priya Nair", total: 430, status: "Completed" }
  ];

  if (error) return <ErrorState />;
  if (!orders.length) return <EmptyState />;

  return (
    <ul className="space-y-3">
      {orders.map(order => (
        <li
          key={order.id}
          className="bg-white p-4 rounded-lg shadow flex justify-between"
        >
          <div>
            <p className="font-medium">{order.customer}</p>
            <p className="text-sm text-gray-500">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">₹{order.total}</p>
            <p className="text-sm text-gray-500">{order.status}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
