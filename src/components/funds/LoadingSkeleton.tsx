
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export const LoadingSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-[#F6F2F0] px-5 py-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-2/3 mt-2" />
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-500">Latest NAV</div>
            <Skeleton className="h-6 w-20 mt-1" />
            <Skeleton className="h-3 w-24 mt-1" />
          </div>
          <div>
            <div className="text-sm text-gray-500">1Y Returns</div>
            <Skeleton className="h-6 w-16 mt-1" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-5 py-3 flex justify-between">
        <Button variant="outline" size="sm" disabled>
          <Skeleton className="h-4 w-20" />
        </Button>
        <Button size="sm" disabled>
          <Skeleton className="h-4 w-16" />
        </Button>
      </CardFooter>
    </Card>
  );
};
