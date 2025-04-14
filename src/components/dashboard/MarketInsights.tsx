
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingDown, TrendingUp, Minus, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchMarketInsights, MarketInsight } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const MarketInsights = () => {
  const { data: insights = [], isLoading } = useQuery({
    queryKey: ['marketInsights'],
    queryFn: fetchMarketInsights,
  });

  // Helper function to render impact icon
  const renderImpactIcon = (impact: 'positive' | 'negative' | 'neutral') => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  // Helper function to get impact color
  const getImpactColor = (impact: 'positive' | 'negative' | 'neutral') => {
    switch (impact) {
      case 'positive':
        return "bg-green-100 text-green-800";
      case 'negative':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Market Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Market Insights</CardTitle>
          <Button variant="ghost" size="sm" className="text-sm text-muted-foreground h-8">
            View All <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight: MarketInsight) => (
          <div key={insight.id} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-2">
                {renderImpactIcon(insight.impact)}
                <h4 className="text-sm font-medium leading-none">{insight.title}</h4>
              </div>
              <Badge variant="secondary" className={`text-xs ${getImpactColor(insight.impact)}`}>
                {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground pl-6">{insight.description}</p>
            <div className="flex items-center justify-between pl-6">
              <div className="flex items-center space-x-1">
                <Badge variant="outline" className="text-xs bg-gray-50 border-gray-200">
                  {insight.category}
                </Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{insight.date} • {insight.source}</span>
              </div>
            </div>
            <Separator className="mt-3" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MarketInsights;
