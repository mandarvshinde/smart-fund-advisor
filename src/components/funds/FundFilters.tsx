
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

interface FundFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  activeSortBy: string;
  onSortChange: (sortBy: string) => void;
}

export const FundFilters = ({
  activeCategory,
  onCategoryChange,
  activeSortBy,
  onSortChange,
}: FundFiltersProps) => {
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

        <div className="min-w-36">
          <h3 className="text-sm font-medium mb-2 text-gray-700">Sort By</h3>
          <Select value={activeSortBy} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="returns">Highest Returns</SelectItem>
              <SelectItem value="returns-asc">Lowest Returns</SelectItem>
              <SelectItem value="nav">Highest NAV</SelectItem>
              <SelectItem value="nav-asc">Lowest NAV</SelectItem>
              <SelectItem value="alpha">Fund Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
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
      className={isActive ? "bg-[#8D6E63] hover:bg-[#6D4C41]" : ""}
    >
      {children}
    </Button>
  );
};
