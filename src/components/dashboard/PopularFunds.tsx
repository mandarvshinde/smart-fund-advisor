
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutGrid, LayoutList } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFundsList } from "@/services/fundService";
import { useFundDisplay } from "@/hooks/useFundDisplay";
import { FundCategories, fundCategories } from "./FundCategories";
import FundCarousel from "./FundCarousel";
import FundListTable from "./FundListTable";

export const PopularFunds = () => {
  const { data: funds = [], isLoading } = useQuery({
    queryKey: ['mutualFunds'],
    queryFn: () => fetchFundsList('all', 'returns'),
  });

  const {
    activeCategory,
    setActiveCategory,
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    sortConfig,
    filteredFunds,
    paginatedFunds,
    carouselFunds,
    totalPages,
    handleSort
  } = useFundDisplay(funds);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Popular Funds</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="w-full h-32 shadow-sm">
              <CardContent className="p-4">
                <div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-16 w-full bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Popular Funds</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center border rounded overflow-hidden">
            <Button
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("cards")}
              className="rounded-none"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-none"
            >
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="link" size="sm" asChild>
            <Link to="/invest" className="text-finance-primary">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="high-return" onValueChange={setActiveCategory} className="w-full">
        <div className="relative mb-4">
          <FundCategories activeCategory={activeCategory} />
        </div>

        {fundCategories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            {filteredFunds.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No funds available in this category</p>
              </div>
            ) : viewMode === "cards" ? (
              <FundCarousel funds={carouselFunds} />
            ) : (
              <FundListTable 
                funds={paginatedFunds}
                currentPage={currentPage}
                totalPages={totalPages}
                sortConfig={sortConfig}
                onSort={handleSort}
                onPageChange={setCurrentPage}
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PopularFunds;
