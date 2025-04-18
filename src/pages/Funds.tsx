
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import PageLayout from "@/components/layout/PageLayout";
import { FundCard } from "@/components/funds/FundCard";
import { FundFilters } from "@/components/funds/FundFilters";
import { LoadingSkeleton } from "@/components/funds/LoadingSkeleton";
import { fetchFundsList } from "@/services/fundService";
import { Fund } from "@/types";
import { AlertCircle, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

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
    retry: 3,
    meta: {
      onError: () => {
        toast.error("Failed to load funds data. Please try refreshing.", {
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
          <Alert className="bg-amber-50 border border-amber-200 mb-6">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <AlertTitle className="text-amber-800">Loading funds</AlertTitle>
            <AlertDescription className="text-amber-700">
              We're fetching the latest mutual fund data from AMFI and MFAPI. This may take a moment...
            </AlertDescription>
          </Alert>
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
          <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-teal-800 mb-1">No funds found</h3>
          <p className="text-teal-600 mb-4">
            We couldn't find any mutual funds matching your criteria. Try changing your filters or refreshing the data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleRefetch}
              className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-md hover:from-teal-700 hover:to-cyan-700 transition-colors"
            >
              Refresh Data
            </Button>
            <Button 
              onClick={() => {
                setCategory('all');
                setFundHouse('all');
                setSortBy('returns');
              }}
              variant="outline"
              className="px-4 py-2 text-teal-700 border-teal-300"
            >
              Reset Filters
            </Button>
          </div>
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
