
import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Edit, Trash, Coins, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { fetchGoalById } from "@/services/mockData";
import { useToast } from "@/components/ui/use-toast";
import PageLayout from "@/components/layout/PageLayout";

const GoalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: goal, isLoading, error } = useQuery({
    queryKey: ['goal', id],
    queryFn: () => fetchGoalById(id || ''),
    enabled: !!id,
  });

  useEffect(() => {
    if (goal) {
      document.title = `${goal.name} | SmartFund Goals`;
    } else {
      document.title = `Goal Details | SmartFund`;
    }
  }, [goal]);

  if (error) {
    toast({
      variant: "destructive",
      title: "Error loading goal",
      description: "Could not load the goal details. Please try again later.",
    });
  }

  const handleDelete = () => {
    toast({
      title: "Goal deleted",
      description: "Your goal has been successfully deleted.",
    });
    navigate("/goals");
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 max-w-4xl">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!goal) {
    return (
      <PageLayout>
        <div className="container mx-auto py-6 max-w-4xl text-center">
          <h1 className="text-2xl font-bold mb-4">Goal Not Found</h1>
          <p className="mb-6">The goal you're looking for doesn't exist or was deleted.</p>
          <Button asChild>
            <Link to="/goals">Back to Goals</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto py-6 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link to="/goals">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to Goals
            </Link>
          </Button>
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{goal.name}</h1>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/goals/${goal.id}/edit`}>
                  <Edit className="mr-1 h-4 w-4" /> Edit
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleDelete}>
                <Trash className="mr-1 h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Target: ₹{goal.targetAmount.toLocaleString()}</span>
                <span className="text-gray-600">
                  Saved: ₹{goal.currentAmount.toLocaleString()} ({goal.progress.toFixed(1)}%)
                </span>
              </div>
              <Progress value={goal.progress} className="h-3" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center">
                <div className="bg-finance-primary/10 p-2 rounded-full mr-3">
                  <Coins className="h-5 w-5 text-finance-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly Contribution</p>
                  <p className="font-medium">₹{goal.monthlyContribution?.toLocaleString() || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-finance-primary/10 p-2 rounded-full mr-3">
                  <Calendar className="h-5 w-5 text-finance-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Target Date</p>
                  <p className="font-medium">{new Date(goal.targetDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-finance-primary/10 p-2 rounded-full mr-3">
                  <TrendingUp className="h-5 w-5 text-finance-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expected Return</p>
                  <p className="font-medium">{goal.expectedReturn || 12}% p.a.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Based on your goal timeframe and risk profile, we recommend these funds:
              </p>
              {[
                { name: "HDFC Equity Fund", allocation: 40 },
                { name: "Axis Bluechip Fund", allocation: 30 },
                { name: "SBI Small Cap Fund", allocation: 30 },
              ].map((fund, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{fund.name}</span>
                    <span>{fund.allocation}%</span>
                  </div>
                  <Progress value={fund.allocation} className="h-1.5" />
                </div>
              ))}
              <Button className="w-full mt-4" asChild>
                <Link to="/invest">Invest Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Goal Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Current savings</span>
                    <span className="text-sm">₹{goal.currentAmount.toLocaleString()}</span>
                  </div>
                  <Separator />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Expected returns</span>
                    <span className="text-sm">₹{Math.floor(goal.currentAmount * 0.42).toLocaleString()}</span>
                  </div>
                  <Separator />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Remaining to save</span>
                    <span className="text-sm">₹{Math.max(0, goal.targetAmount - goal.currentAmount).toLocaleString()}</span>
                  </div>
                  <Separator />
                </div>
                <div>
                  <div className="flex justify-between font-medium">
                    <span>Target amount</span>
                    <span>₹{goal.targetAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default GoalDetail;
