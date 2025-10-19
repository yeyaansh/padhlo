
export default function ProfilePageSkeleton() {
  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-8 animate-pulse">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="bg-white rounded-xl sketch-border-1 p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-200"></div>
            <div className="space-y-3">
              <div className="h-8 w-48 bg-gray-300 rounded-md"></div>
              <div className="h-4 w-32 bg-gray-200 rounded-md"></div>
            </div>
          </div>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <div className="h-28 bg-gray-200 rounded-lg"></div>
            <div className="h-28 bg-gray-200 rounded-lg"></div>
            <div className="h-28 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        <div className="mt-8 md:grid md:grid-cols-12 md:gap-8">
          {/* Sidebar Skeleton */}
          <div className="md:col-span-3 mb-8 md:mb-0">
            <div className="bg-white p-4 rounded-xl sketch-border-1 space-y-2">
              <div className="h-16 bg-gray-200 rounded-lg"></div>
              <div className="h-16 bg-gray-200 rounded-lg"></div>
              <div className="h-16 bg-gray-200 rounded-lg"></div>
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          {/* Content Panel Skeleton */}
          <div className="md:col-span-9">
            <div className="bg-white p-8 rounded-xl sketch-border-1 h-96">
                <div className="h-8 w-1/3 bg-gray-300 rounded-md"></div>
                <div className="mt-6 h-10 w-full bg-gray-200 rounded-lg"></div>
                <div className="mt-4 h-10 w-1/2 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}