
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, Plus, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { Goal } from '@/types';

// Mock goals data (would be fetched from an API in a real application)
const mockGoals: Goal[] = [
  {
    id: '1',
    name: 'Retirement',
    targetAmount: 10000000,
    targetDate: '2045-01-01',
    currentAmount: 2500000,
    monthlyContribution: 15000,
    progress: 25,
    investments: ['1', '2', '3'],
    riskAppetite: 'moderate'
  },
  {
    id: '2',
    name: 'Home Purchase',
    targetAmount: 5000000,
    targetDate: '2028-06-30',
    currentAmount: 1000000,
    monthlyContribution: 25000,
    progress: 20,
    investments: ['4', '5'],
    riskAppetite: 'high'
  },
  {
    id: '3',
    name: 'Child\'s Education',
    targetAmount: 3000000,
    targetDate: '2035-04-15',
    currentAmount: 450000,
    monthlyContribution: 10000,
    progress: 15,
    investments: ['6'],
    riskAppetite: 'low'
  }
];

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setGoals(mockGoals);
    document.title = "Financial Goals | Keberiti";
  }, []);
  
  return (
    <PageLayout 
      title="Financial Goals" 
      subtitle="Track and manage your long-term financial objectives"
    >
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold mb-1">Your Goals</h2>
          <p className="text-gray-600">Track the progress towards your financial objectives</p>
        </div>
        <Button 
          asChild 
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          <Link to="/goals/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Goal
          </Link>
        </Button>
      </div>
      
      {goals.length === 0 ? (
        <Card className="text-center py-10">
          <CardContent>
            <Target className="mx-auto h-12 w-12 text-purple-500 mb-3" />
            <h3 className="text-lg font-medium mb-2">No goals yet</h3>
            <p className="text-gray-600 mb-6">
              Start planning your financial future by creating your first goal.
            </p>
            <Button 
              asChild 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Link to="/goals/create">Create Your First Goal</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <Link to={`/goals/${goal.id}`} key={goal.id}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  <CardTitle className="text-xl">
                    {goal.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2 bg-purple-100" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-purple-500 mr-2" />
                      <div className="flex justify-between w-full">
                        <span className="text-gray-600">Target</span>
                        <span className="font-medium">₹{goal.targetAmount.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-purple-500 mr-2" />
                      <div className="flex justify-between w-full">
                        <span className="text-gray-600">Target Date</span>
                        <span className="font-medium">{new Date(goal.targetDate).toLocaleDateString('en-IN')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 text-purple-500 mr-2" />
                      <div className="flex justify-between w-full">
                        <span className="text-gray-600">Monthly</span>
                        <span className="font-medium">₹{goal.monthlyContribution.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default Goals;
