export default function SkeletonCard() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg animate-pulse">
      <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
    </div>
  );
}
