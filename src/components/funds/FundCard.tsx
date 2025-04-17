
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Building, ArrowUpRight, Calendar } from "lucide-react";
import { Fund } from "@/types";
import { Badge } from "@/components/ui/badge";

interface FundCardProps {
  fund: Fund;
}

export const FundCard = ({ fund }: FundCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-purple-100 group">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white text-lg line-clamp-2 group-hover:underline transition-all">
              {fund.schemeName}
            </CardTitle>
            <div className="text-xs text-purple-100 mt-1 flex items-center">
              <Building className="h-3 w-3 mr-1" />
              {fund.fundHouse || 'Various Fund Houses'}
            </div>
          </div>
          <Badge className={`${fund.category === 'equity' ? 'bg-blue-500' : 
                               fund.category === 'debt' ? 'bg-purple-500' : 
                               fund.category === 'hybrid' ? 'bg-amber-500' : 
                               fund.category === 'index' ? 'bg-emerald-500' : 
                               fund.category === 'elss' ? 'bg-rose-500' : 'bg-gray-500'} 
                             text-white`}>
            {fund.category || 'Other'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-5 bg-gradient-to-br from-white to-purple-50">
        <div className="grid grid-cols-1 gap-4 mb-4">
          <div>
            <div className="text-sm text-purple-600 font-medium">Latest NAV</div>
            <div className="font-semibold text-xl text-purple-700 flex items-end gap-1">
              ₹{parseFloat(fund.nav).toFixed(2)}
              <span className="text-xs text-purple-500 font-normal">as of {fund.date}</span>
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="border-t pt-4 mt-2">
            <div className="space-y-4">
              <div className="bg-purple-50 p-3 rounded-md">
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="text-xs text-purple-600">Fund Type</div>
                  <div className="text-xs font-medium">{fund.category || 'Equity'}</div>
                  
                  <div className="text-xs text-purple-600">Scheme Code</div>
                  <div className="text-xs font-medium">{fund.schemeCode}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-purple-500" />
                  <span>Min Investment: ₹500</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-purple-50 px-5 py-3 flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleDetails}
          className="text-purple-600 border-purple-300 hover:bg-purple-100"
        >
          <Info className="h-4 w-4 mr-1" />
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Button>
        <Button 
          size="sm" 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
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
