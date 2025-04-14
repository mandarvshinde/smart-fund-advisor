
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Fund } from "@/types";

interface FundCardProps {
  fund: Fund;
}

export const FundCard = ({ fund }: FundCardProps) => {
  const oneYearReturn = fund.returns?.oneYear || 0;
  
  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <h4 className="font-medium text-sm line-clamp-2 h-10">{fund.schemeName}</h4>
        <Separator className="my-2" />
        <div className="flex justify-between items-center mt-1">
          <div>
            <p className="text-xs text-gray-500">1Y Returns</p>
            <p className={`text-sm font-semibold ${oneYearReturn > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {oneYearReturn.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">NAV</p>
            <p className="text-sm font-semibold">₹{parseFloat(fund.nav).toFixed(2)}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/invest?fund=${fund.schemeCode}`}>
              Invest
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundCard;
