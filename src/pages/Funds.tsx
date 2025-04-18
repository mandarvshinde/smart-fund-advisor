
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import PageLayout from "@/components/layout/PageLayout";
import { FundCard } from "@/components/funds/FundCard";
import { FundFilters } from "@/components/funds/FundFilters";
import { LoadingSkeleton } from "@/components/funds/LoadingSkeleton";
import { fetchFundsList } from "@/services/fundService";
import { Fund } from "@/types";
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Funds = () => {
  const [category, setCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('returns');
  const [fundHouse, setFundHouse] = useState<string>('all');
  
  useEffect(() => {
    document.title = "Explore Funds | Keberiti";
  }, []);

  const { data: funds, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ['funds', category, sortBy, fundHouse],
    queryFn: () => fetchFundsList(category, sortBy, fundHouse),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    meta: {
      onError: () => {
        toast.error("Failed to load funds data from AMFI and MFAPI. Please try again later.", {
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

  const handleFundHouseChange = (newFundHouse: string) => {
    setFundHouse(newFundHouse);
  };

  const handleRefetch = () => {
    toast.info("Refreshing funds data...");
    refetch();
  };

  return (
    <PageLayout 
      title="Explore Mutual Funds" 
      subtitle="Discover and compare top-performing regular mutual funds to grow your investments"
    >
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg shadow-sm p-6 mb-6 border border-teal-100">
        <FundFilters 
          activeCategory={category} 
          onCategoryChange={handleCategoryChange}
          activeSortBy={sortBy}
          onSortChange={handleSortChange}
          activeFundHouse={fundHouse}
          onFundHouseChange={handleFundHouseChange}
        />
        <div className="mt-4 flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefetch} 
            disabled={isLoading || isFetching}
            className="text-teal-700 border-teal-200 hover:bg-teal-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>
      </div>

      {isLoading || isFetching ? (
        <div>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <div>
                <h3 className="font-medium text-amber-800">Loading funds</h3>
                <p className="text-sm text-amber-700">
                  We're fetching the latest mutual fund data from AMFI and MFAPI. This may take a moment...
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
          <p className="text-red-600 mb-4">We couldn't fetch mutual fund data from AMFI and MFAPI. Please try again later.</p>
          <Button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-md hover:from-teal-700 hover:to-cyan-700 transition-colors"
          >
            Retry
          </Button>
        </div>
      ) : !funds || funds.length === 0 ? (
        <div className="text-center py-10 bg-teal-50 rounded-lg border border-teal-200">
          <h3 className="text-lg font-medium text-teal-800 mb-1">No funds found</h3>
          <p className="text-teal-600 mb-4">
            We couldn't find any mutual funds matching your criteria. Try changing your filters or refreshing the data.
          </p>
          <Button 
            onClick={handleRefetch}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-md hover:from-teal-700 hover:to-cyan-700 transition-colors"
          >
            Refresh Data
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {funds.map((fund: Fund) => (
            <FundCard key={fund.schemeCode} fund={fund} />
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default Funds;
