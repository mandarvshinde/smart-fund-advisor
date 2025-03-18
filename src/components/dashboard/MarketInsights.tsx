
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMarketInsights } from "@/services/mockData";

export const MarketInsights = () => {
  const { data: insights, isLoading } = useQuery({
    queryKey: ['marketInsights'],
    queryFn: fetchMarketInsights,
  });

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="h-5 w-5 text-finance-success" />;
      case 'negative':
        return <TrendingDown className="h-5 w-5 text-finance-danger" />;
      default:
        return <AlertCircle className="h-5 w-5 text-finance-warning" />;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Positive</Badge>;
      case 'negative':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Negative</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Neutral</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'market':
        return <Badge variant="outline">Market</Badge>;
      case 'economy':
        return <Badge variant="outline">Economy</Badge>;
      case 'stock':
        return <Badge variant="outline">Stock</Badge>;
      case 'sector':
        return <Badge variant="outline">Sector</Badge>;
      case 'policy':
        return <Badge variant="outline">Policy</Badge>;
      default:
        return <Badge variant="outline">Other</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Market Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="h-5 w-36 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 w-full bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!insights || insights.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Market Insights</h2>
        <Card className="shadow-sm">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <p className="text-lg font-medium">No market insights available</p>
            <p className="text-gray-500 mt-1">Check back later for updates on market trends and news.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Market Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <Card key={insight.id} className="shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div className="flex items-start">
                  {getImpactIcon(insight.impact)}
                  <CardTitle className="text-base font-semibold text-gray-900 ml-2">
                    {insight.title}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-3">{insight.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {getImpactBadge(insight.impact)}
                  {getCategoryBadge(insight.category)}
                </div>
                
                <div className="text-xs text-gray-500">
                  {new Date(insight.date).toLocaleDateString()} • {insight.source}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
