
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import PageLayout from "@/components/layout/PageLayout";
import { FundCard } from "@/components/funds/FundCard";
import { FundFilters } from "@/components/funds/FundFilters";
import { LoadingSkeleton } from "@/components/funds/LoadingSkeleton";
import { fetchFundsList } from "@/services/fundService";
import { Fund } from "@/types";
import { AlertCircle } from 'lucide-react';

const Funds = () => {
  const [category, setCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('returns');
  
  useEffect(() => {
    document.title = "Explore Funds | Keberiti";
  }, []);

  const { data: funds, isLoading, error, isFetching } = useQuery({
    queryKey: ['funds', category, sortBy],
    queryFn: () => fetchFundsList(category, sortBy),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
    onSettled: (data, error) => {
      if (error) {
        toast.error("Failed to load funds. Please try again later.", {
          duration: 5000,
        });
      }
    }
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
      subtitle="Discover and compare top-performing regular mutual funds to grow your investments"
    >
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <FundFilters 
          activeCategory={category} 
          onCategoryChange={handleCategoryChange}
          activeSortBy={sortBy}
          onSortChange={handleSortChange}
        />
      </div>

      {isLoading || isFetching ? (
        <div>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <div>
                <h3 className="font-medium text-amber-800">Loading funds</h3>
                <p className="text-sm text-amber-700">
                  We're fetching the latest mutual fund data. This usually takes just a moment...
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-10 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-red-800 mb-1">Error loading funds</h3>
          <p className="text-red-600 mb-4">We couldn't load the mutual fund data. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : funds?.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-1">No funds found</h3>
          <p className="text-gray-600 mb-4">
            We couldn't find any mutual funds matching your criteria. Try changing your filters.
          </p>
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
