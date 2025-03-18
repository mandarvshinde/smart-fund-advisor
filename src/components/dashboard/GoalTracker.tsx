
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchGoals } from "@/services/mockData";

export const GoalTracker = () => {
  const { data: goals, isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: fetchGoals,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Goals Tracker</h2>
        <div className="grid grid-cols-1 gap-4">
          {[1, 2].map((i) => (
            <Card key={i} className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!goals || goals.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Goals Tracker</h2>
        <Card className="shadow-sm">
          <CardContent className="pt-6 pb-6 text-center">
            <Target className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <p className="text-lg font-medium">No goals set yet</p>
            <p className="text-gray-500 mt-1 mb-4">Set financial goals to track your progress and get personalized recommendations.</p>
            <Button asChild>
              <Link to="/goals/create">Create Your First Goal</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Goals Tracker</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/goals">View All Goals</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {goals.slice(0, 3).map((goal) => (
          <Card key={goal.id} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium text-gray-900">{goal.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
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
    </div>
  );
};
