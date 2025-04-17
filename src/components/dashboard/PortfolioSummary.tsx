
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const PortfolioSummary = () => {
  // Sample empty data to use when no real portfolio data exists
  const investmentHistory = [];
  
  // Calculate portfolio metrics with fallbacks for empty data
  const totalInvested = 0;
  const currentValue = 0;
  const totalReturns = 0;
  const annualizedReturn = 0;
  
  // Asset allocation
  const assetAllocation = [
    { name: "Equity", value: 60 },
    { name: "Debt", value: 30 },
    { name: "Hybrid", value: 10 },
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Portfolio Summary</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Current Value</div>
            <div className="text-2xl font-semibold">₹{currentValue.toLocaleString('en-IN')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Invested Amount</div>
            <div className="text-2xl font-semibold">₹{totalInvested.toLocaleString('en-IN')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Returns</div>
            <div className="text-2xl font-semibold text-green-500">₹{totalReturns.toLocaleString('en-IN')}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">CAGR</div>
            <div className="text-2xl font-semibold text-green-500">{annualizedReturn.toFixed(2)}%</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 relative">
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-muted-foreground text-sm mb-4">No portfolio data available</p>
                <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
                  {assetAllocation.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-full h-4 rounded" 
                        style={{ 
                          backgroundColor: index === 0 ? '#8B5CF6' : 
                                         index === 1 ? '#0EA5E9' : '#F97316'
                        }}
                      ></div>
                      <p className="text-xs mt-1">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-sm">No performance data available</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioSummary;
