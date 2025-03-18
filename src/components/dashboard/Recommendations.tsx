
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, AlertTriangle, Check } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchRecommendations, actOnRecommendation } from "@/services/mockData";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";

export const Recommendations = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useUser();
  const queryClient = useQueryClient();
  
  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['recommendations'],
    queryFn: fetchRecommendations,
  });
  
  const actionMutation = useMutation({
    mutationFn: actOnRecommendation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations'] });
      toast({
        title: "Recommendation actioned",
        description: user?.agenticAIEnabled 
          ? "The AI assistant will take care of this for you." 
          : "Your action has been processed successfully.",
      });
    },
  });

  const handleAction = (recommendationId: string) => {
    actionMutation.mutate(recommendationId);
  };
  
  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Low Risk</Badge>;
      case 'moderate':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Moderate Risk</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High Risk</Badge>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recommendations</h2>
        <div className="grid grid-cols-1 gap-4">
          {[1, 2].map((i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="h-5 w-36 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-12 w-full bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recommendations</h2>
        <Card className="shadow-sm">
          <CardContent className="pt-6 text-center">
            <Check className="h-12 w-12 mx-auto text-finance-success mb-2" />
            <p className="text-lg font-medium">No recommendations at this time</p>
            <p className="text-gray-500 mt-1">We'll notify you when we have suggestions to optimize your portfolio.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Recommendations</h2>
        {user?.agenticAIEnabled && (
          <Badge variant="outline" className="border-finance-primary text-finance-primary">
            <div className="flex items-center">
              <span className="h-2 w-2 bg-finance-primary rounded-full mr-1.5 animate-pulse-slow"></span>
              Agentic AI Enabled
            </div>
          </Badge>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {recommendations.map((recommendation) => (
          <Card key={recommendation.id} className="shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div className="flex items-start">
                  {recommendation.type === 'switch' && <TrendingUp className="mr-2 h-5 w-5 text-finance-primary" />}
                  {recommendation.type === 'increase_sip' && <TrendingUp className="mr-2 h-5 w-5 text-finance-success" />}
                  {recommendation.type === 'buy' && <TrendingUp className="mr-2 h-5 w-5 text-finance-success" />}
                  <div>
                    <CardTitle className="text-base font-semibold text-gray-900">{recommendation.description}</CardTitle>
                    <CardDescription className="text-sm text-gray-500 mt-1">
                      {new Date(recommendation.date).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
                {getRiskBadge(recommendation.riskLevel)}
              </div>
            </CardHeader>
            <CardContent>
              <div className={`${expandedId === recommendation.id ? '' : 'line-clamp-2'} text-sm text-gray-700 mb-4`}>
                <p><strong>Reason:</strong> {recommendation.reason}</p>
                {expandedId === recommendation.id && (
                  <p className="mt-2"><strong>Potential Benefit:</strong> {recommendation.potentialBenefit}</p>
                )}
              </div>
              
              <div className="flex justify-between items-center">
                <Button variant="ghost" size="sm" onClick={() => toggleExpand(recommendation.id)}>
                  {expandedId === recommendation.id ? 'Show Less' : 'Show More'}
                </Button>
                
                {!recommendation.isActioned && (
                  <Button 
                    onClick={() => handleAction(recommendation.id)}
                    className="bg-finance-primary hover:bg-finance-primary/90"
                  >
                    {user?.agenticAIEnabled ? 'Approve Action' : 'Take Action'}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
                
                {recommendation.isActioned && (
                  <Badge variant="outline" className="text-finance-success border-finance-success">
                    <Check className="mr-1 h-3 w-3" /> Actioned
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
