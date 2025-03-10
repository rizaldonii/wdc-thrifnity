import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Product Images Skeleton */}
        <div className="lg:w-3/5">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Thumbnails Skeleton */}
            <div className="flex flex-col gap-3 order-1">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-24 h-24 rounded-md" />
              ))}
            </div>

            {/* Main Image Skeleton */}
            <div className="flex-1 order-2">
              <Skeleton className="aspect-square md:aspect-[4/5] w-full rounded-lg" />
            </div>
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="lg:w-2/5">
          {/* Breadcrumbs Skeleton */}
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Title Skeleton */}
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-4" />

          {/* Rating Skeleton */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-4" />
              ))}
            </div>
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Price Skeleton */}
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>

          {/* Description Skeleton */}
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" />
          <Skeleton className="h-4 w-4/6 mb-6" />

          {/* Color Selection Skeleton */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="w-10 h-10 rounded-full" />
              ))}
            </div>
          </div>

          {/* Size Selection Skeleton */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="w-12 h-10 rounded-md" />
              ))}
            </div>
          </div>

          {/* Action Buttons Skeleton */}
          <Skeleton className="h-12 w-full mb-3" />
          <div className="flex gap-3 mb-8">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12" />
          </div>

          {/* Shipping Info Skeleton */}
          <Skeleton className="h-32 w-full mb-8" />

          {/* Seller Info Skeleton */}
          <Skeleton className="h-48 w-full mb-8" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="mt-12">
        <div className="flex gap-4 border-b mb-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-24" />
          ))}
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
      </div>
    </div>
  );
}
