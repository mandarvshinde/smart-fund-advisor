
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, ArrowRight } from "lucide-react";
import { fetchGoals } from "@/services/mockData";
import PageLayout from "@/components/layout/PageLayout";

const Goals = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Financial Goals | SmartFund";
  }, []);

  const { data: goals, isLoading, error } = useQuery({
    queryKey: ['goals'],
    queryFn: fetchGoals,
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error loading goals",
      description: "There was an error loading your financial goals. Please try again later.",
    });
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-6 max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Financial Goals</h1>
          <Button asChild>
            <Link to="/goals/create">
              <Plus className="mr-2 h-4 w-4" /> Create New Goal
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-2 w-full bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !goals || goals.length === 0 ? (
          <Card className="shadow-sm">
            <CardContent className="pt-10 pb-10 text-center">
              <Target className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">No goals set yet</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Set financial goals to track your progress and get personalized recommendations 
                for your investment portfolio.
              </p>
              <Button asChild>
                <Link to="/goals/create">Create Your First Goal</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal) => (
              <Card key={goal.id} className="shadow-sm hover:shadow transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-gray-900">{goal.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Target: ₹{goal.targetAmount.toLocaleString()}</span>
                      <span className="text-gray-600">
                        Saved: ₹{goal.currentAmount.toLocaleString()} ({goal.progress.toFixed(1)}%)
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">
                      Target Date: {new Date(goal.targetDate).toLocaleDateString()}
                    </div>
                    
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/goals/${goal.id}`}>
                        Details
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Goals;
