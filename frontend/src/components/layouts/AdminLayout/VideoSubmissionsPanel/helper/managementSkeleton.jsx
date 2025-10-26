import React from "react";

const SkeletonCard = () => (
  <div className="bg-slate-50 p-4 rounded-lg border-2 border-dashed flex flex-col sm:flex-row justify-between sm:items-center gap-4 animate-pulse">
    <div className="flex-1">
      <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
      <div className="h-4 w-1/2 bg-gray-200 rounded mt-2"></div>
    </div>
    <div className="flex gap-2 flex-shrink-0">
      <div className="h-9 w-24 bg-gray-300 rounded-lg"></div>{" "}
      {/* Adjusted height */}
    </div>
  </div>
);

export default function ManagementListSkeleton({ count = 3 }) {
  // Added optional count prop
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
