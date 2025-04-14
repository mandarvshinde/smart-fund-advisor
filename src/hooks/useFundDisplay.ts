
import { useState, useMemo } from "react";
import { Fund } from "@/types";
import { fundCategories } from "@/components/dashboard/FundCategories";

export const useFundDisplay = (funds: Fund[] = []) => {
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
  const filteredFunds = useMemo(() => {
    const category = fundCategories.find(cat => cat.id === activeCategory);
    if (!category) return [];
    
    return funds.filter(category.filter);
  }, [funds, activeCategory]);

  // Sort funds based on sort configuration
  const sortedFunds = useMemo(() => {
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
  const paginatedFunds = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedFunds.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedFunds, currentPage]);

  // Get carousel funds for card view
  const carouselFunds = useMemo(() => {
    return sortedFunds.slice(0, 8);
  }, [sortedFunds]);

  const totalPages = Math.ceil(sortedFunds.length / ITEMS_PER_PAGE);

  const handleSort = (key: "returns" | "nav" | "schemeName") => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }));
  };

  return {
    activeCategory,
    setActiveCategory,
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    sortConfig,
    filteredFunds,
    sortedFunds,
    paginatedFunds,
    carouselFunds,
    totalPages,
    handleSort
  };
};
