import EmptyState from "../../components/admin/EmptyState";
import Sidebar from "../../components/admin/Sidebar";


export default function MenuPage() {
const items = [];


if (items.length === 0) {
return (
<EmptyState
title="No menu items"
message="Add your first dish to get started"
action={
<button className="px-4 py-2 bg-orange-500 text-white rounded">
Add Item
</button>
}
/>
);
}


return <div>Menu List</div>;
}