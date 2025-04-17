
import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSkeleton = () => {
  return (
    <Card className="overflow-hidden border border-teal-100">
      <CardHeader className="bg-gradient-to-r from-teal-400 to-teal-300 px-5 py-4">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-2 w-full">
            <Skeleton className="h-5 w-4/5 bg-teal-200" />
            <Skeleton className="h-3 w-2/5 bg-teal-200" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full bg-teal-200" />
        </div>
      </CardHeader>
      <CardContent className="p-5 bg-white">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Skeleton className="h-4 w-16 mb-2 bg-teal-100" />
            <Skeleton className="h-7 w-24 bg-teal-100" />
          </div>
          <div>
            <Skeleton className="h-4 w-16 mb-2 bg-teal-100" />
            <Skeleton className="h-7 w-24 bg-teal-100" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-teal-50 px-5 py-3 flex justify-between">
        <Skeleton className="h-8 w-24 bg-teal-100" />
        <Skeleton className="h-8 w-24 bg-teal-100" />
      </CardFooter>
    </Card>
  );
};

export default LoadingSkeleton;
