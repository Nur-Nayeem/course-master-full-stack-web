const ListingSceletonLoading = () => {
  return (
    <div className="animate-pulse space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
};
export default ListingSceletonLoading;
