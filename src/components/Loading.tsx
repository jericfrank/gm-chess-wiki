function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-300 text-lg font-semibold">Loading, please wait...</p>
      </div>
    </div>
  );
}

export default Loading;
