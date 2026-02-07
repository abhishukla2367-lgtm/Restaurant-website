function ErrorState({ onRetry }) {
  return (
    <div className="text-center py-10">
      <div className="text-4xl mb-3">⚠️</div>
      <h3 className="text-lg font-semibold text-red-600">
        Something went wrong
      </h3>
      <p className="text-gray-500 mt-1">
        We couldn’t load your data.
      </p>
      <button
        onClick={onRetry}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );
}