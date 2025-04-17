
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Link } from "react-router-dom";

export const MarketInsights = () => {
  // Sample empty data to use when no real insights exist
  const insights = [];
  
  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "negative":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "stocks":
        return "bg-blue-100 text-blue-800";
      case "bonds":
        return "bg-purple-100 text-purple-800";
      case "funds":
        return "bg-green-100 text-green-800";
      case "economy":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Market Insights</CardTitle>
          <Link to="/insights" className="text-xs text-muted-foreground hover:underline">
            View all
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {insights.length === 0 ? (
          <div className="text-center py-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Market update</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Global markets continue to adapt to economic changes and policy decisions.
              </p>
              <div className="flex justify-center space-x-2 text-xs">
                <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">Stocks</span>
                <span className="px-2 py-1 rounded bg-purple-100 text-purple-800">Bonds</span>
                <span className="px-2 py-1 rounded bg-green-100 text-green-800">Funds</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className="border-b last:border-b-0 pb-3 last:pb-0"
              >
                <div className="flex items-start gap-2 mb-1">
                  {getImpactIcon(insight.impact)}
                  <h3 className="font-medium text-sm">{insight.title}</h3>
                </div>
                <p className="text-xs text-muted-foreground ml-6 mb-2">
                  {insight.description}
                </p>
                <div className="flex justify-between items-center ml-6">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getCategoryBadgeClass(
                      insight.category
                    )}`}
                  >
                    {insight.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {insight.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketInsights;
