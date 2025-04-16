
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, Info, TrendingUp, Calendar, DollarSign, PieChart, Users } from "lucide-react";
import { fetchFundDetails } from "@/services/fundService";
import { Fund } from "@/types";
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-purple-100 bg-gradient-to-br from-white to-indigo-50">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-4">
        <CardTitle className="text-white text-lg line-clamp-2">{fund.schemeName}</CardTitle>
        <div className="text-xs text-purple-100 mt-1">
          {fund.fundHouse || 'Various Fund Houses'}
        </div>
      </CardHeader>
      <CardContent className="p-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-indigo-600">Latest NAV</div>
            <div className="font-semibold text-xl text-purple-700">
              ₹{parseFloat(fund.nav).toFixed(2)}
            </div>
            <div className="text-xs text-gray-400">as of {fund.date}</div>
          </div>
          <div>
            <div className="text-sm text-indigo-600">1Y Returns</div>
            <div className={`font-semibold text-xl ${fund.returns?.oneYear > 0 ? 'text-emerald-600' : 'text-pink-600'}`}>
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
              <div className="space-y-4">
                <div className="bg-indigo-50 p-3 rounded-md">
                  <div className="grid grid-cols-2 gap-y-2">
                    <div className="text-xs text-indigo-600">Fund Type</div>
                    <div className="text-xs font-medium">{details?.category || 'Equity'}</div>
                    
                    <div className="text-xs text-indigo-600">Risk Level</div>
                    <div className="text-xs font-medium">{details?.riskLevel || 'Moderate'}</div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-3.5 w-3.5 mr-1 text-indigo-600" />
                    <span className="text-xs font-medium">Historical Returns</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span>1 Year</span>
                        <span className={`${details?.returns?.oneYear && details.returns.oneYear > 0 ? 'text-emerald-600' : 'text-pink-600'}`}>
                          {details?.returns?.oneYear ? details.returns.oneYear.toFixed(2) + '%' : 'NA'}
                        </span>
                      </div>
                      <Progress value={Math.min(Math.abs(details?.returns?.oneYear || 0) * 1.5, 100)} className="h-1 bg-indigo-100" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span>3 Years</span>
                        <span className={`${details?.returns?.threeYear && details.returns.threeYear > 0 ? 'text-emerald-600' : 'text-pink-600'}`}>
                          {details?.returns?.threeYear ? details.returns.threeYear.toFixed(2) + '%' : 'NA'}
                        </span>
                      </div>
                      <Progress value={Math.min(Math.abs(details?.returns?.threeYear || 0) * 0.8, 100)} className="h-1 bg-indigo-100" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span>5 Years</span>
                        <span className={`${details?.returns?.fiveYear && details.returns.fiveYear > 0 ? 'text-emerald-600' : 'text-pink-600'}`}>
                          {details?.returns?.fiveYear ? details.returns.fiveYear.toFixed(2) + '%' : 'NA'}
                        </span>
                      </div>
                      <Progress value={Math.min(Math.abs(details?.returns?.fiveYear || 0) * 0.6, 100)} className="h-1 bg-indigo-100" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-indigo-500" />
                    <span>Launch Date: {details?.launchDate || 'NA'}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3.5 w-3.5 mr-1 text-indigo-500" />
                    <span>Min Investment: ₹500</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-indigo-50 px-5 py-3 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleDetails}
          className="text-indigo-600 border-indigo-300 hover:bg-indigo-100"
        >
          <Info className="h-4 w-4 mr-1" />
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Button>
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
          asChild
        >
          <Link to={`/funds/${fund.schemeCode}`}>View Fund</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FundCard;
