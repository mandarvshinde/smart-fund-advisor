
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { fetchRecommendations, actOnRecommendation } from '@/services/mockData';
import { Recommendation } from '@/types';

export const Recommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const data = fetchRecommendations();
      setRecommendations(data);
    };

    fetchData();
  }, []);

  const handleAction = (id: string) => {
    actOnRecommendation(id);
    
    // Update local state to mark as actioned
    setRecommendations(prevRecs => 
      prevRecs.map(rec => 
        rec.id === id ? { ...rec, isActioned: true } : rec
      )
    );

    toast({
      title: "Action Taken",
      description: "We'll implement this recommendation for you.",
    });
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.slice(0, 3).map((recommendation) => (
            <div key={recommendation.id} className="bg-white rounded-lg p-4 border">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Badge variant={recommendation.type === 'buy' ? 'default' : recommendation.type === 'sell' ? 'destructive' : 'outline'}>
                      {recommendation.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <span className="text-sm font-medium">{recommendation.description}</span>
                  </div>
                  <p className="text-sm text-gray-500">{recommendation.reason}</p>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => handleAction(recommendation.id)}
                  disabled={recommendation.isActioned}
                  variant={recommendation.isActioned ? "outline" : "default"}
                >
                  {recommendation.isActioned ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Applied
                    </>
                  ) : (
                    <>
                      Apply
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
          {recommendations.length > 3 && (
            <Button variant="outline" size="sm" className="w-full">
              View All Recommendations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
