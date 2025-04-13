
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  onSortChange
}: FundFiltersProps) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue={activeCategory} onValueChange={onCategoryChange} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
          <TabsTrigger value="all">All Funds</TabsTrigger>
          <TabsTrigger value="equity">Equity</TabsTrigger>
          <TabsTrigger value="debt">Debt</TabsTrigger>
          <TabsTrigger value="hybrid">Hybrid</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">Mutual Funds</span> based on your preferences
        </div>
        
        <Select value={activeSortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="returns">1Y Returns (High to Low)</SelectItem>
            <SelectItem value="returns-asc">1Y Returns (Low to High)</SelectItem>
            <SelectItem value="nav">NAV (High to Low)</SelectItem>
            <SelectItem value="nav-asc">NAV (Low to High)</SelectItem>
            <SelectItem value="alpha">Alphabetical (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
