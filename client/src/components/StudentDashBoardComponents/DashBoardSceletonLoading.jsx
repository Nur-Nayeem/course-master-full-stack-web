import React from "react";

const DashBoardSceletonLoading = () => {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-32 bg-gray-200 rounded-xl w-full"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
};

export default DashBoardSceletonLoading;
