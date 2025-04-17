
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Goal } from '@/types';
import { ChevronLeft, PenSquare, Trash2, Plus, ChevronRight, Share2, TrendingUp } from 'lucide-react';

const GoalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a goal for demonstration purposes
    // In a real app, we would fetch the goal from an API
    if (id) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const demoGoal = {
          id: id,
          name: "Sample Goal",
          targetAmount: 1000000,
          targetDate: "2028-04-01",
          currentAmount: 250000,
          monthlyContribution: 10000,
          progress: 25,
          investments: ["SBI Bluechip Fund", "Axis Long Term Equity Fund"],
          riskAppetite: "moderate" as "low" | "moderate" | "high",
          expectedReturn: 12
        };
        setGoal(demoGoal);
        setLoading(false);
      }, 500);
    }
  }, [id]);

  useEffect(() => {
    document.title = goal ? `${goal.name} Goal | Kuberiti` : 'Goal Detail | Kuberiti';
  }, [goal]);

  if (loading) {
    return (
      <PageLayout title="Loading..." subtitle="Please wait while we fetch your goal details">
        <div className="flex justify-center items-center h-64">
          <div className="loading-spinner" />
        </div>
      </PageLayout>
    );
  }

  if (!goal) {
    return (
      <PageLayout title="Goal Not Found" subtitle="We couldn't find the goal you're looking for">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 mb-4">The goal you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/goals">Back to Goals</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  const remainingAmount = goal.targetAmount - goal.currentAmount;
  const formattedCurrentAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(goal.currentAmount);
  
  const formattedTargetAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(goal.targetAmount);

  const formattedMonthlyContribution = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(goal.monthlyContribution || 0);

  // Calculate remaining months
  const targetDate = new Date(goal.targetDate);
  const currentDate = new Date();
  const monthsDiff = (targetDate.getFullYear() - currentDate.getFullYear()) * 12 + 
                    (targetDate.getMonth() - currentDate.getMonth());
  
  const formattedTargetDate = new Date(goal.targetDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  });

  return (
    <PageLayout
      title={goal.name}
      subtitle={`Target: ${formattedTargetAmount} by ${formattedTargetDate}`}
    >
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link to="/goals" className="flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Goals
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Goal Progress</CardTitle>
                  <CardDescription>
                    {goal.progress}% of your target amount
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <PenSquare className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Progress value={goal.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Current Amount</div>
                  <div className="text-lg font-semibold">{formattedCurrentAmount}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Remaining</div>
                  <div className="text-lg font-semibold">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                      maximumFractionDigits: 0
                    }).format(remainingAmount)}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Monthly SIP</div>
                  <div className="text-lg font-semibold">{formattedMonthlyContribution}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Time Left</div>
                  <div className="text-lg font-semibold">{monthsDiff} months</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Linked Investments</CardTitle>
                <Button size="sm">
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Investment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {goal.investments && goal.investments.length > 0 ? (
                <ul className="space-y-3">
                  {goal.investments.map((investment, index) => (
                    <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{investment}</div>
                        <div className="text-sm text-gray-500">
                          {['SIP', 'Lumpsum'][Math.floor(Math.random() * 2)]} • Started {new Date().getFullYear() - Math.floor(Math.random() * 3)} years ago
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-600 font-medium mr-3">
                          +{(Math.random() * 20 + 5).toFixed(2)}%
                        </span>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No investments linked to this goal yet.</p>
                  <Button className="mt-3" size="sm">
                    <Plus className="h-3.5 w-3.5 mr-1" /> Link Investment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Goal Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Risk Appetite</h4>
                <p className="font-medium capitalize">{goal.riskAppetite}</p>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium text-gray-500">Expected Returns</h4>
                <p className="font-medium">{goal.expectedReturn || 12}% per annum</p>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-medium text-gray-500">Monthly Contribution</h4>
                <p className="font-medium">{formattedMonthlyContribution}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" /> 
                  Investment Analysis
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span className="flex items-center">
                  <Share2 className="h-4 w-4 mr-2" /> 
                  Share Goal
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default GoalDetail;
