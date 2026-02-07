import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";

export default function ReservationsList() {
  const error = false;

  const reservations = [
    { id: 1, name: "Arjun Mehta", guests: 2, time: "6:30 PM" },
    { id: 2, name: "Kavya Rao", guests: 4, time: "7:00 PM" },
    { id: 3, name: "Rohan Das", guests: 3, time: "7:30 PM" },
    { id: 4, name: "Simran Kaur", guests: 5, time: "8:00 PM" },
    { id: 5, name: "Aditya Jain", guests: 2, time: "8:15 PM" },
    { id: 6, name: "Nisha Kapoor", guests: 6, time: "8:30 PM" },
    { id: 7, name: "Mohit Aggarwal", guests: 4, time: "9:00 PM" },
    { id: 8, name: "Isha Malhotra", guests: 3, time: "9:15 PM" },
    { id: 9, name: "Suresh Reddy", guests: 2, time: "9:30 PM" },
    { id: 10, name: "Pallavi Joshi", guests: 5, time: "10:00 PM" }
  ];

  if (error) return <ErrorState />;
  if (!reservations.length) return <EmptyState />;

  return (
    <ul className="space-y-3">
      {reservations.map(res => (
        <li
          key={res.id}
          className="bg-white p-4 rounded-lg shadow flex justify-between"
        >
          <div>
            <p className="font-medium">{res.name}</p>
            <p className="text-sm text-gray-500">
              {res.guests} guests
            </p>
          </div>
          <span className="font-semibold">{res.time}</span>
        </li>
      ))}
    </ul>
  );
}
