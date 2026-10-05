import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const OrderCardSkeleton = () => {
  return (
    <Card className="overflow-hidden rounded-none border-0 border-b p-0 shadow-none">
      <CardContent className="p-3">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Image */}
          <div className="shrink-0">
            <Skeleton className="h-[72px] w-[72px] rounded-lg" />
          </div>

          {/* Main Information */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-2">
                {/* Gear name */}
                <Skeleton className="h-5 w-40" />

                {/* Brand + category */}
                <Skeleton className="h-4 w-32" />
              </div>

              {/* Mobile status */}
              <Skeleton className="h-6 w-20 rounded-full sm:hidden" />
            </div>

            {/* Provider / Customer */}
            <div className="mt-2 flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-28" />
            </div>

            {/* Rental Details */}
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
              {/* Rental */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-36" />
              </div>

              {/* Days */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-10" />
                <Skeleton className="h-4 w-8" />
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          </div>

          {/* Price + Status + Actions */}
          <div className="flex items-center justify-between gap-2 pt-3 sm:flex-col sm:items-end sm:pt-0">
            {/* Desktop status */}
            <Skeleton className="hidden h-6 w-20 rounded-full sm:flex" />

            {/* Price */}
            <div className="space-y-1 text-right">
              <Skeleton className="ml-auto h-6 w-24" />
              <Skeleton className="ml-auto h-3 w-20" />
            </div>

            {/* Actions */}
            <div className="pt-3 sm:pl-4 sm:pt-0">
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCardSkeleton;