
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, FileText, Building, Diamond, Package, Layers, LayoutList, ArrowUpDown, LayoutGrid } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Fund } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchFundsList } from "@/services/fundService";
import { 
  Carousel as CarouselComponent,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Fund category definitions with icons and filtering logic
const fundCategories = [
  {
    id: "high-return",
    label: "High Return",
    icon: <TrendingUp className="h-4 w-4" />,
    filter: (fund: Fund) => fund.returns && fund.returns.oneYear > 15
  },
  {
    id: "tax-saving",
    label: "Tax Saving",
    icon: <FileText className="h-4 w-4" />,
    filter: (fund: Fund) => fund.category === 'elss' || fund.category?.includes("Tax")
  },
  {
    id: "large-cap",
    label: "Large Cap",
    icon: <Building className="h-4 w-4" />,
    filter: (fund: Fund) => fund.category === 'equity' && fund.category?.includes("Large Cap")
  },
  {
    id: "small-cap",
    label: "Small Cap",
    icon: <Diamond className="h-4 w-4" />,
    filter: (fund: Fund) => fund.category === 'equity' && fund.category?.includes("Small Cap")
  },
  {
    id: "mid-cap",
    label: "Mid Cap",
    icon: <Package className="h-4 w-4" />,
    filter: (fund: Fund) => fund.category === 'equity' && fund.category?.includes("Mid Cap")
  },
  {
    id: "multi-asset",
    label: "Multi Asset",
    icon: <Layers className="h-4 w-4" />,
    filter: (fund: Fund) => fund.category === 'hybrid' || fund.category?.includes("Dynamic")
  }
];

// Component for individual fund card
const FundCard = ({ fund }: { fund: Fund }) => {
  const oneYearReturn = fund.returns?.oneYear || 0;
  
  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <h4 className="font-medium text-sm line-clamp-2 h-10">{fund.schemeName}</h4>
        <Separator className="my-2" />
        <div className="flex justify-between items-center mt-1">
          <div>
            <p className="text-xs text-gray-500">1Y Returns</p>
            <p className={`text-sm font-semibold ${oneYearReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {oneYearReturn.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">NAV</p>
            <p className="text-sm font-semibold">₹{parseFloat(fund.nav).toFixed(2)}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/invest?fund=${fund.schemeCode}`}>
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
    queryFn: () => fetchFundsList('all', 'returns'),
  });

  const [activeCategory, setActiveCategory] = useState("high-return");
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: "returns" | "nav" | "schemeName";
    direction: "asc" | "desc";
  }>({
    key: "returns",
    direction: "desc",
  });

  const ITEMS_PER_PAGE = 5;

  // Get filtered funds based on active category
  const getFilteredFunds = () => {
    const category = fundCategories.find(cat => cat.id === activeCategory);
    if (!category) return [];
    
    return funds.filter(category.filter);
  };

  const filteredFunds = getFilteredFunds();

  // Sort funds based on sort configuration
  const sortedFunds = React.useMemo(() => {
    const sorted = [...filteredFunds];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        if (sortConfig.key === "returns") {
          const aReturn = a.returns?.oneYear || 0;
          const bReturn = b.returns?.oneYear || 0;
          return sortConfig.direction === "asc" ? aReturn - bReturn : bReturn - aReturn;
        }
        if (sortConfig.key === "nav") {
          const aNav = parseFloat(a.nav);
          const bNav = parseFloat(b.nav);
          return sortConfig.direction === "asc" ? aNav - bNav : bNav - aNav;
        }
        if (sortConfig.key === "schemeName") {
          return sortConfig.direction === "asc" 
            ? a.schemeName.localeCompare(b.schemeName) 
            : b.schemeName.localeCompare(a.schemeName);
        }
        return 0;
      });
    }
    return sorted;
  }, [filteredFunds, sortConfig]);

  // Get paginated funds for list view
  const paginatedFunds = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedFunds.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedFunds, currentPage]);

  // Get carousel funds for card view
  const carouselFunds = React.useMemo(() => {
    return sortedFunds.slice(0, 8);
  }, [sortedFunds]);

  const totalPages = Math.ceil(sortedFunds.length / ITEMS_PER_PAGE);

  const handleSort = (key: "returns" | "nav" | "schemeName") => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (key: "returns" | "nav" | "schemeName") => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-3 w-3 ml-1 opacity-50" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUpDown className="h-3 w-3 ml-1 text-finance-primary" />
    ) : (
      <ArrowUpDown className="h-3 w-3 ml-1 text-finance-primary rotate-180" />
    );
  };

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
            ) : viewMode === "cards" ? (
              <div className="relative">
                <CarouselComponent
                  opts={{
                    align: "start",
                    loop: false,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {carouselFunds.map(fund => (
                      <CarouselItem key={fund.schemeCode} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4">
                        <FundCard fund={fund} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="hidden md:block">
                    <CarouselPrevious className="-left-6" />
                    <CarouselNext className="-right-6" />
                  </div>
                </CarouselComponent>
              </div>
            ) : (
              <div className="relative">
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[220px]">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="font-medium p-0 h-auto" 
                            onClick={() => handleSort("schemeName")}
                          >
                            Fund Name {getSortIcon("schemeName")}
                          </Button>
                        </TableHead>
                        <TableHead className="w-[120px]">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="font-medium p-0 h-auto" 
                            onClick={() => handleSort("returns")}
                          >
                            1Y Return {getSortIcon("returns")}
                          </Button>
                        </TableHead>
                        <TableHead className="w-[120px]">
                          <span className="font-medium">3Y Return</span>
                        </TableHead>
                        <TableHead className="w-[120px]">
                          <span className="font-medium">5Y Return</span>
                        </TableHead>
                        <TableHead className="w-[100px]">
                          <span className="font-medium">NAV</span>
                        </TableHead>
                        <TableHead className="w-[90px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedFunds.map(fund => (
                        <TableRow key={fund.schemeCode}>
                          <TableCell className="font-medium">
                            <div>
                              <div className="truncate max-w-[220px]">{fund.schemeName}</div>
                              <div className="text-xs text-gray-500">{fund.fundHouse || fund.schemeName.split(' ')[0]}</div>
                            </div>
                          </TableCell>
                          <TableCell className={`${fund.returns?.oneYear && fund.returns.oneYear > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                            {fund.returns?.oneYear ? fund.returns.oneYear.toFixed(2) : '0.00'}%
                          </TableCell>
                          <TableCell className={`${fund.returns?.threeYear && fund.returns.threeYear > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                            {fund.returns?.threeYear ? fund.returns.threeYear.toFixed(2) : '0.00'}%
                          </TableCell>
                          <TableCell className={`${fund.returns?.fiveYear && fund.returns.fiveYear > 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                            {fund.returns?.fiveYear ? fund.returns.fiveYear.toFixed(2) : '0.00'}%
                          </TableCell>
                          <TableCell>₹{parseFloat(fund.nav).toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/invest?fund=${fund.schemeCode}`}>
                                Invest
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {totalPages > 1 && (
                    <div className="py-4 border-t">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious 
                              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                          {Array.from({ length: totalPages }).map((_, i) => (
                            <PaginationItem key={i}>
                              <PaginationLink
                                isActive={currentPage === i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                              >
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}
                          <PaginationItem>
                            <PaginationNext 
                              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PopularFunds;
