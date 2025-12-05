import React from "react";

const LoadingSimple = () => {
  return (
    <div className="flex h-[600px] items-center justify-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary/80" />
    </div>
  );
};

export default LoadingSimple;
