import SkeletonCard from "./SkeletonCard";


const stats = [
{ label: "Today's Orders", value: 24 },
{ label: "Pending Orders", value: 6 },
{ label: "Reservations", value: 12 },
{ label: "Revenue", value: "₹8,450" },
];


export default function DashboardCards({ loading = false }) {
if (loading) {
return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
{[...Array(4)].map((_, i) => (
<SkeletonCard key={i} />
))}
</div>
);
}


return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
{stats.map((item) => (
<div
key={item.label}
className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition"
>
<p className="text-sm text-gray-500">{item.label}</p>
<p className="text-2xl font-bold mt-2">{item.value}</p>
</div>
))}
</div>
);
}