export default function PlaylistPageSkeleton() {
  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-8 animate-pulse">
      <div className="max-w-4xl mx-auto">
        {/* Header Skeleton */}
        <div className="bg-white rounded-xl sketch-border-1 overflow-hidden">
          <div className="w-full h-50 bg-gray-200"></div>
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-5 -mt-24">
              <div className="w-32 h-32 bg-gray-300 rounded-xl border-4 border-white shadow-lg flex-shrink-0"></div>
              <div className="pt-16 sm:pt-6 w-full">
                <div className="h-10 w-1/2 bg-gray-300 rounded-md"></div>
                <div className="h-5 w-3/4 bg-gray-200 rounded-md mt-5"></div>
              </div>
            </div>
          </div>
        </div>

        {/* List Skeleton */}
        <div className="mt-8">
          {/* <div className="h-8 w-1/3 bg-gray-300 rounded-md mb-4"></div> */}
          <div className="space-y-4">
            <div className="h-24 bg-white rounded-xl sketch-border-1">
              <div className="ml-5 h-5 w-1/3 bg-gray-200 rounded-md mt-5"></div>
              <div className="ml-5 h-5 w-1/10 bg-gray-200 rounded-md mt-3"></div>
            </div>
            <div className="h-24 bg-white rounded-xl sketch-border-1">
              <div className="ml-5 h-5 w-1/3 bg-gray-200 rounded-md mt-5"></div>
              <div className="ml-5 h-5 w-1/10 bg-gray-200 rounded-md mt-3"></div>
            </div>
            <div className="h-24 bg-white rounded-xl sketch-border-1">
              <div className="ml-5 h-5 w-1/3 bg-gray-200 rounded-md mt-5"></div>
              <div className="ml-5 h-5 w-1/10 bg-gray-200 rounded-md mt-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
