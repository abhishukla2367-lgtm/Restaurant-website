export default function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="text-xl font-semibold text-red-600">
        Something went wrong
      </h2>
      <p className="text-gray-500 mt-2">
        Please try again later.
      </p>
    </div>
  );
}
