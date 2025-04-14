
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, FileText, Building, Diamond, Package, Layers } from "lucide-react";
import { Fund } from "@/types";

// Fund category definitions with icons and filtering logic
export const fundCategories = [
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

interface FundCategoriesProps {
  activeCategory: string;
}

export const FundCategories = ({ activeCategory }: FundCategoriesProps) => {
  return (
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
  );
};

export default FundCategories;
