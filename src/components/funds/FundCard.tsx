
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3, Info, TrendingUp, TrendingDown, Calendar, DollarSign, Building, ArrowUpRight } from "lucide-react";
import { fetchFundDetails } from "@/services/fundService";
import { Fund } from "@/types";
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from "@/components/ui/badge";

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

  const isPositiveReturn = (fund.returns?.oneYear || 0) > 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-teal-100 group">
      <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white text-lg line-clamp-2 group-hover:underline transition-all">
              {fund.schemeName}
            </CardTitle>
            <div className="text-xs text-teal-100 mt-1 flex items-center">
              <Building className="h-3 w-3 mr-1" />
              {fund.fundHouse || 'Various Fund Houses'}
            </div>
          </div>
          <Badge className={`${fund.category === 'Equity' ? 'bg-blue-500' : 
                               fund.category === 'Debt' ? 'bg-purple-500' : 
                               fund.category === 'Hybrid' ? 'bg-amber-500' : 
                               fund.category === 'Index' ? 'bg-emerald-500' : 
                               fund.category === 'ELSS' ? 'bg-rose-500' : 'bg-gray-500'} 
                             text-white`}>
            {fund.category || 'Other'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-5 bg-gradient-to-br from-white to-teal-50">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm text-teal-600 font-medium">Latest NAV</div>
            <div className="font-semibold text-xl text-teal-700 flex items-end gap-1">
              ₹{parseFloat(fund.nav).toFixed(2)}
              <span className="text-xs text-teal-500 font-normal">as of {fund.date}</span>
            </div>
          </div>
          <div>
            <div className="text-sm text-teal-600 font-medium">1Y Returns</div>
            <div className={`font-semibold text-xl flex items-center ${isPositiveReturn ? 'text-emerald-600' : 'text-rose-600'}`}>
              {isPositiveReturn ? <TrendingUp className="h-5 w-5 mr-1" /> : <TrendingDown className="h-5 w-5 mr-1" />}
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
                <div className="bg-teal-50 p-3 rounded-md">
                  <div className="grid grid-cols-2 gap-y-2">
                    <div className="text-xs text-teal-600">Fund Type</div>
                    <div className="text-xs font-medium">{details?.category || 'Equity'}</div>
                    
                    <div className="text-xs text-teal-600">Risk Level</div>
                    <div className="text-xs font-medium">{details?.riskLevel || 'Moderate'}</div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <BarChart3 className="h-3.5 w-3.5 mr-1 text-teal-600" />
                    <span className="text-xs font-medium">Historical Returns</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span>1 Year</span>
                        <span className={`${details?.returns?.oneYear && details.returns.oneYear > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {details?.returns?.oneYear ? details.returns.oneYear.toFixed(2) + '%' : 'NA'}
                        </span>
                      </div>
                      <Progress value={Math.min(Math.abs(details?.returns?.oneYear || 0) * 1.5, 100)} className="h-1 bg-teal-100" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span>3 Years</span>
                        <span className={`${details?.returns?.threeYear && details.returns.threeYear > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {details?.returns?.threeYear ? details.returns.threeYear.toFixed(2) + '%' : 'NA'}
                        </span>
                      </div>
                      <Progress value={Math.min(Math.abs(details?.returns?.threeYear || 0) * 0.8, 100)} className="h-1 bg-teal-100" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span>5 Years</span>
                        <span className={`${details?.returns?.fiveYear && details.returns.fiveYear > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {details?.returns?.fiveYear ? details.returns.fiveYear.toFixed(2) + '%' : 'NA'}
                        </span>
                      </div>
                      <Progress value={Math.min(Math.abs(details?.returns?.fiveYear || 0) * 0.6, 100)} className="h-1 bg-teal-100" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-teal-500" />
                    <span>Min Investment: ₹500</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-teal-50 px-5 py-3 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleDetails}
          className="text-teal-600 border-teal-300 hover:bg-teal-100"
        >
          <Info className="h-4 w-4 mr-1" />
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Button>
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700"
          asChild
        >
          <Link to={`/funds/${fund.schemeCode}`} className="flex items-center">
            View Fund
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FundCard;
