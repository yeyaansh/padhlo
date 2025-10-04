import React from "react";

export const LoadingState = () => {
  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-5rem)] font-['Comic_Neue'] bg-slate-100 gap-2 p-2 animate-pulse">
      {/* Left Panel Skeleton */}
      <div className="flex flex-col md:w-2/5 bg-white rounded-xl sketch-border-1 p-5 space-y-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-28 bg-gray-200 rounded-lg"></div>
          <div className="h-8 w-28 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="h-10 w-3/4 bg-gray-300 rounded-lg"></div>
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-5/6 bg-gray-200 rounded-md"></div>
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
        </div>
        <div className="h-24 w-full bg-gray-200 rounded-lg"></div>
      </div>

      {/* Center Handle Skeleton */}
      <div className="hidden md:flex items-center justify-center">
        <div className="w-1.5 h-16 bg-gray-200 rounded-full"></div>
      </div>

      {/* Right Panel Skeleton */}
      <div className="flex flex-col flex-1 bg-white rounded-xl sketch-border-1">
        <div className="p-2 border-b-2 border-dashed flex items-center gap-2">
          <div className="h-7 w-24 bg-gray-200 rounded-lg"></div>
          <div className="h-7 w-20 bg-gray-200 rounded-lg"></div>
          <div className="h-7 w-16 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="flex-grow bg-gray-700 p-4">
          <div className="h-5 w-1/2 bg-gray-500 rounded-md"></div>
          <div className="h-5 w-1/3 bg-gray-500 rounded-md mt-4"></div>
        </div>
        <div className="p-3 bg-slate-50 border-t-2 border-dashed flex justify-end gap-3">
          <div className="h-10 w-24 bg-gray-300 rounded-lg"></div>
          <div className="h-10 w-24 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};
