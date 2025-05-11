import { Separator } from "@/components/ui/separator";

// Skeleton Loader Component
 export const SkeletonLoader = () => {
  return (
    <div className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
      <div className="flex gap-2 flex-col md:flex-row">
        {/* Left Section (Image and Details) */}
        <div className="md:w-3/12">
          <div className="w-10/12 mx-auto">
            <div className="relative my-5 w-52 h-80 mx-auto bg-gray-300 rounded"></div>
            <div className="flex flex-col gap-3">
              <div className="h-10 bg-gray-300 rounded"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
            <div className="bg-gray-300/20 p-3 rounded mt-4">
              <div className="grid grid-cols-2 mt-1 gap-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
              <hr className="my-3" />
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="flex gap-1 flex-wrap mt-1">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
              <hr className="my-3" />
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="flex gap-1 flex-wrap mt-1">
                <div className="h-6 w-20 bg-gray-300 rounded"></div>
                <div className="h-6 w-20 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Section (Movie Details and Reviews) */}
        <div className="md:w-9/12 p-4 md:p-0">
          <div className="h-6 w-32 bg-gray-300 rounded mb-5"></div>
          <div className="h-4 w-40 bg-gray-300 rounded mb-3"></div>
          <div className="h-8 w-64 bg-gray-300 rounded mb-2"></div>
          <div className="flex gap-4 mb-2">
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
            <div className="h-4 w-20 bg-gray-300 rounded"></div>
          </div>
          <div className="h-16 bg-gray-300 rounded mb-5"></div>
          <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
          <div className="flex flex-wrap gap-2 mt-1">
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
          </div>
          <div className="my-10 bg-gray-300/20 p-3 rounded">
            <div className="flex justify-between mb-3">
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
              <div className="h-10 w-32 bg-gray-300 rounded"></div>
            </div>
            <Separator className="mb-3" />
            <div className="space-y-4">
              <div className="h-24 bg-gray-300 rounded"></div>
              <div className="h-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};