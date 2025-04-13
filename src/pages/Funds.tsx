
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageLayout from "@/components/layout/PageLayout";
import { FundCard } from "@/components/funds/FundCard";
import { FundFilters } from "@/components/funds/FundFilters";
import { LoadingSkeleton } from "@/components/funds/LoadingSkeleton";
import { fetchFundsList } from "@/services/fundService";
import { Fund } from "@/types";

const Funds = () => {
  const [category, setCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('returns');
  
  useEffect(() => {
    document.title = "Explore Funds | Keberiti";
  }, []);

  const { data: funds, isLoading, error } = useQuery({
    queryKey: ['funds', category, sortBy],
    queryFn: () => fetchFundsList(category, sortBy),
  });

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
  };

  return (
    <PageLayout 
      title="Explore Mutual Funds" 
      subtitle="Discover and compare top-performing mutual funds to grow your investments"
    >
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <FundFilters 
          activeCategory={category} 
          onCategoryChange={handleCategoryChange}
          activeSortBy={sortBy}
          onSortChange={handleSortChange}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-500">Error loading funds. Please try again later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {funds?.map((fund: Fund) => (
            <FundCard key={fund.schemeCode} fund={fund} />
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default Funds;
