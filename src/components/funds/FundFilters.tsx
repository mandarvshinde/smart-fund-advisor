
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, Building, Filter } from "lucide-react";
import { getFundHouses } from "@/services/fundService";

interface FundFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeSortBy: string;
  onSortChange: (sortBy: string) => void;
  activeFundHouse?: string;
  onFundHouseChange?: (fundHouse: string) => void;
}

export const FundFilters = ({
  activeCategory,
  onCategoryChange,
  activeSortBy,
  onSortChange,
  activeFundHouse = "all",
  onFundHouseChange,
}: FundFiltersProps) => {
  const [fundHouses, setFundHouses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadFundHouses = async () => {
      setIsLoading(true);
      try {
        const houses = await getFundHouses();
        setFundHouses(houses);
      } catch (error) {
        console.error("Failed to load fund houses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFundHouses();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div>
          <h3 className="text-sm font-medium mb-2 text-gray-700">Fund Category</h3>
          <div className="flex flex-wrap gap-2">
            <CategoryButton
              isActive={activeCategory === "all"}
              onClick={() => onCategoryChange("all")}
            >
              All Funds
            </CategoryButton>
            <CategoryButton
              isActive={activeCategory === "equity"}
              onClick={() => onCategoryChange("equity")}
            >
              Equity
            </CategoryButton>
            <CategoryButton
              isActive={activeCategory === "debt"}
              onClick={() => onCategoryChange("debt")}
            >
              Debt
            </CategoryButton>
            <CategoryButton
              isActive={activeCategory === "hybrid"}
              onClick={() => onCategoryChange("hybrid")}
            >
              Hybrid
            </CategoryButton>
            <CategoryButton
              isActive={activeCategory === "index"}
              onClick={() => onCategoryChange("index")}
            >
              Index
            </CategoryButton>
            <CategoryButton
              isActive={activeCategory === "elss"}
              onClick={() => onCategoryChange("elss")}
            >
              ELSS (Tax Saving)
            </CategoryButton>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {onFundHouseChange && (
            <div className="min-w-48">
              <h3 className="text-sm font-medium mb-2 text-gray-700">Fund House</h3>
              <Select 
                value={activeFundHouse} 
                onValueChange={onFundHouseChange}
                disabled={isLoading}
              >
                <SelectTrigger className="w-full">
                  <Building className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="All Fund Houses" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <SelectItem value="all">All Fund Houses</SelectItem>
                  {fundHouses.map((house) => (
                    <SelectItem key={house} value={house}>
                      {house}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="min-w-36">
            <h3 className="text-sm font-medium mb-2 text-gray-700">Sort By</h3>
            <Select value={activeSortBy} onValueChange={onSortChange}>
              <SelectTrigger>
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="returns">Highest Returns</SelectItem>
                <SelectItem value="returns-asc">Lowest Returns</SelectItem>
                <SelectItem value="nav">Highest NAV</SelectItem>
                <SelectItem value="nav-asc">Lowest NAV</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CategoryButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const CategoryButton = ({ isActive, onClick, children }: CategoryButtonProps) => {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={isActive ? "bg-teal-600 hover:bg-teal-700 text-white" : "border-teal-200 text-teal-700 hover:bg-teal-50"}
    >
      {children}
    </Button>
  );
};
