
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, Info, TrendingUp, AlertCircle, MessageSquare } from "lucide-react";
import { fetchFundDetails } from "@/services/fundService";
import { Fund } from "@/types";

interface FundCardProps {
  fund: Fund;
}

export const FundCard = ({ fund }: FundCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const { data: details, isLoading: detailsLoading } = useQuery({
    queryKey: ['fund-details', fund.schemeCode],
    queryFn: () => fetchFundDetails(fund.schemeCode),
    enabled: showDetails,
  });

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleWhatsAppChat = () => {
    window.open(`https://wa.me/918446597048?text=I'm interested in investing in ${fund.schemeName}. Can you provide more information?`, '_blank');
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardHeader className="bg-[#F6F2F0] px-5 py-4">
        <CardTitle className="text-[#5D4037] text-lg line-clamp-2">{fund.schemeName}</CardTitle>
        <div className="text-xs text-gray-500 mt-1">
          {fund.fundHouse || 'Various Fund Houses'}
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-gray-500">Latest NAV</div>
            <div className="font-semibold text-xl text-[#5D4037]">
              ₹{parseFloat(fund.nav).toFixed(2)}
            </div>
            <div className="text-xs text-gray-400">as of {fund.date}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">1Y Returns</div>
            <div className={`font-semibold text-xl ${fund.returns?.oneYear > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {fund.returns?.oneYear 
                ? `${fund.returns.oneYear.toFixed(2)}%` 
                : <Skeleton className="h-6 w-16" />
              }
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="border-t pt-4 mt-2">
            {detailsLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <AlertCircle className="w-4 h-4 mr-2 text-amber-600" />
                  <span>Risk Level: {details?.riskLevel || 'Moderate'}</span>
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                  <span>3Y Returns: {details?.returns?.threeYear ? `${details.returns.threeYear.toFixed(2)}%` : 'NA'}</span>
                </div>
                <div className="flex items-center text-sm">
                  <BarChart3 className="w-4 h-4 mr-2 text-purple-600" />
                  <span>Category: {details?.category || fund.category || 'Equity'}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 px-5 py-3 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleDetails}
          className="text-[#8D6E63] border-[#8D6E63] hover:bg-[#EFEBE9]"
        >
          <Info className="h-4 w-4 mr-1" />
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Button>
        <Button 
          size="sm" 
          className="bg-[#8D6E63] text-white hover:bg-[#6D4C41]"
          asChild
        >
          <Link to={`/funds/${fund.schemeCode}`}>View Fund</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
