
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, TrendingUp, TrendingDown, SwitchCamera } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Recommendations = () => {
  // Sample empty data to use when no real recommendations exist
  const recommendations = [];
  
  const getActionIcon = (type: string) => {
    switch (type) {
      case "buy":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "sell":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "switch":
        return <SwitchCamera className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getRiskBadgeClass = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800";
      case "moderate":
        return "bg-amber-100 text-amber-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recommendations</h2>
      </div>

      {recommendations.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">
                  No current recommendations
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Your portfolio seems to be well-balanced. We'll notify you when we have new recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((rec) => (
            <Card key={rec.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  {getActionIcon(rec.type)}
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{rec.description}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {rec.reason}
                    </p>
                    <div className="flex justify-between items-center text-xs mb-4">
                      <span>
                        Potential benefit:{" "}
                        <span className="text-green-600 font-medium">
                          {rec.potentialBenefit}
                        </span>
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full ${getRiskBadgeClass(
                          rec.riskLevel
                        )}`}
                      >
                        {rec.riskLevel} risk
                      </span>
                    </div>
                    <Separator className="mb-4" />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {rec.date}
                      </span>
                      {rec.isActioned ? (
                        <span className="text-xs flex items-center text-green-600">
                          <Check className="h-3 w-3 mr-1" />
                          Actioned
                        </span>
                      ) : (
                        <Button size="sm" variant="outline">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
