export default function EmptyState({ title, message, action }) {
  return (
    <div className="text-center py-16 text-gray-500">
      <p className="text-lg font-medium">{title}</p>
      <p className="text-sm mt-2">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
