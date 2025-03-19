
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, FileText, Building, Diamond, Package, Layers } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { MutualFund } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchMutualFunds } from "@/services/mockData";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

// Fund category definitions with icons and filtering logic
const fundCategories = [
  {
    id: "high-return",
    label: "High Return",
    icon: <TrendingUp className="h-4 w-4" />,
    filter: (fund: MutualFund) => fund.oneYearReturn > 15
  },
  {
    id: "tax-saving",
    label: "Tax Saving",
    icon: <FileText className="h-4 w-4" />,
    filter: (fund: MutualFund) => fund.subcategory.includes("Tax")
  },
  {
    id: "large-cap",
    label: "Large Cap",
    icon: <Building className="h-4 w-4" />,
    filter: (fund: MutualFund) => fund.subcategory.includes("Large Cap")
  },
  {
    id: "small-cap",
    label: "Small Cap",
    icon: <Diamond className="h-4 w-4" />,
    filter: (fund: MutualFund) => fund.subcategory.includes("Small Cap")
  },
  {
    id: "mid-cap",
    label: "Mid Cap",
    icon: <Package className="h-4 w-4" />,
    filter: (fund: MutualFund) => fund.subcategory.includes("Mid Cap")
  },
  {
    id: "multi-asset",
    label: "Multi Asset",
    icon: <Layers className="h-4 w-4" />,
    filter: (fund: MutualFund) => fund.subcategory.includes("Dynamic") || fund.category === "Hybrid"
  }
];

// Component for individual fund card
const FundCard = ({ fund }: { fund: MutualFund }) => {
  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <h4 className="font-medium text-sm line-clamp-2 h-10">{fund.name}</h4>
        <Separator className="my-2" />
        <div className="flex justify-between items-center mt-1">
          <div>
            <p className="text-xs text-gray-500">1Y Returns</p>
            <p className={`text-sm font-semibold ${fund.oneYearReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fund.oneYearReturn.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">NAV</p>
            <p className="text-sm font-semibold">₹{fund.nav.toFixed(2)}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/invest?fund=${fund.id}`}>
              Invest
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const PopularFunds = () => {
  const { data: funds = [], isLoading } = useQuery({
    queryKey: ['mutualFunds'],
    queryFn: fetchMutualFunds,
  });

  const [activeCategory, setActiveCategory] = useState("high-return");

  // Get filtered funds based on active category
  const getFilteredFunds = () => {
    const category = fundCategories.find(cat => cat.id === activeCategory);
    if (!category) return [];
    
    // For simplicity in the mock data, we'll just limit each category to a few funds
    // In real app, we would use the filter function from the category
    return funds.filter(category.filter).slice(0, 8);
  };

  const filteredFunds = getFilteredFunds();

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
        <Button variant="link" size="sm" asChild>
          <Link to="/invest" className="text-finance-primary">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="high-return" onValueChange={setActiveCategory} className="w-full">
        <div className="relative mb-4">
          <TabsList className="w-full md:w-auto bg-gray-100 overflow-x-auto flex-nowrap justify-start md:justify-center whitespace-nowrap">
            {fundCategories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center"
              >
                {category.icon}
                <span className="ml-1.5">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {fundCategories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            {filteredFunds.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No funds available in this category</p>
              </div>
            ) : (
              <div className="relative">
                <Carousel
                  opts={{
                    align: "start",
                    loop: false,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {filteredFunds.map(fund => (
                      <CarouselItem key={fund.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                        <FundCard fund={fund} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="hidden md:block">
                    <CarouselPrevious className="-left-6" />
                    <CarouselNext className="-right-6" />
                  </div>
                </Carousel>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
