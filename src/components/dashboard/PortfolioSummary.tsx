
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, LineChart, BarChart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchInvestments } from "@/services/mockData";

export const PortfolioSummary = () => {
  const { data: investments, isLoading } = useQuery({
    queryKey: ['investments'],
    queryFn: fetchInvestments,
  });

  // Calculate portfolio metrics
  const calculatePortfolioMetrics = () => {
    if (!investments || investments.length === 0) return {
      totalValue: 0,
      totalInvested: 0,
      totalGain: 0,
      totalReturn: 0,
      xirr: 0
    };

    const totalValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalInvested = investments.reduce((sum, inv) => sum + inv.totalInvested, 0);
    const totalGain = totalValue - totalInvested;
    const totalReturn = (totalGain / totalInvested) * 100;
    
    // Simplified XIRR calculation (in reality would be more complex)
    const xirr = investments.reduce((sum, inv) => sum + inv.annualizedReturn, 0) / investments.length;

    return {
      totalValue,
      totalInvested,
      totalGain,
      totalReturn,
      xirr
    };
  };

  const metrics = calculatePortfolioMetrics();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Portfolio Summary</h2>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 font-medium">Current Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">₹{metrics.totalValue.toLocaleString()}</div>
                <div className="flex items-center mt-1">
                  <span className={`text-sm ${metrics.totalGain >= 0 ? 'text-finance-success' : 'text-finance-danger'}`}>
                    {metrics.totalGain >= 0 ? '+' : ''}{metrics.totalGain.toLocaleString()} ({metrics.totalReturn.toFixed(2)}%)
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 font-medium">Total Invested</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">₹{metrics.totalInvested.toLocaleString()}</div>
                <div className="text-sm text-gray-500 mt-1">Across {investments.length} investments</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 font-medium">XIRR</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{metrics.xirr.toFixed(2)}%</div>
                <div className={`text-sm ${metrics.xirr >= 10 ? 'text-finance-success' : metrics.xirr < 0 ? 'text-finance-danger' : 'text-finance-warning'} mt-1`}>
                  {metrics.xirr >= 10 ? 'Excellent' : metrics.xirr >= 5 ? 'Good' : metrics.xirr >= 0 ? 'Average' : 'Poor'}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card className="shadow-sm md:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-base font-medium">
                  <PieChart className="h-4 w-4 mr-1" />
                  Asset Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Equity</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Debt</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Hybrid</span>
                      <span>7%</span>
                    </div>
                    <Progress value={7} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-base font-medium">
                  <LineChart className="h-4 w-4 mr-1" />
                  Performance Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center text-sm text-gray-500">
                <div className="text-center">
                  <BarChart className="h-12 w-12 mx-auto text-gray-300" />
                  <p className="mt-2">Portfolio performance chart will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
