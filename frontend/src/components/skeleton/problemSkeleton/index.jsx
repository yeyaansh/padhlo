export default function SkeletonCard() {
  return (
    // Use the same outer styles as your real card for layout consistency
    <div className="bg-white rounded-xl p-6 sketch-border-1 animate-pulse">
      {/* Title Placeholder */}
      <div className="h-23 w-3/4 bg-gray-300 rounded-md mb-4"></div>

      {/* Difficulty & Acceptance Placeholder */}
      <div className="flex items-center gap-4 mb-6">
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-28 bg-gray-200 rounded-md"></div>
      </div>
      {/* Tags Placeholder */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
        <div className="h-6 w-28 bg-gray-200 rounded-full"></div>
      </div>

      {/* Button Placeholder */}
      <div className="pt-4 border-t-2 border-dashed border-gray-300 mt-auto">
        <div className="h-12 w-40 mx-auto bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
}