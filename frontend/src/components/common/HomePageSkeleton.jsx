import React from "react";

// A single pulsing card skeleton
const StatCardSkeleton = () => (
  <div className="bg-white p-5 rounded-lg sketch-border-1 h-28 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
    <div className="h-10 bg-gray-300 rounded w-1/2"></div>
  </div>
);

// A skeleton for the problem cards
const ProblemCardSkeleton = () => (
  <div className="bg-white rounded-xl sketch-border-1 p-5 w-80 flex-shrink-0 h-32 animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
  </div>
);

export default function HomePageSkeleton() {
  return (
    <div className="p-6 md:p-10 font-['Comic_Neue'] pt-10">
      {/* 1. Greeting Skeleton */}
      <div className="h-12 bg-gray-300 rounded w-1/2 mb-3 animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>

      {/* 2. Stats Skeleton */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* 3. Continue Skeleton */}
      <section className="mt-12">
        <div className="h-8 bg-gray-300 rounded w-1/4 mb-4 animate-pulse"></div>
        <div className="bg-gray-200 p-8 rounded-xl sketch-border-1 h-36 animate-pulse"></div>
      </section>

      {/* 4. New Quests Skeleton */}
      <section className="mt-12">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-4 animate-pulse"></div>
        <div className="flex gap-6 pb-4 -mx-6 px-6 overflow-x-auto">
          <ProblemCardSkeleton />
          <ProblemCardSkeleton />
          <ProblemCardSkeleton />
        </div>
      </section>
    </div>
  );
}
