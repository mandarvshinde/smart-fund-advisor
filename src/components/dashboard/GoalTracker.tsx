
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle, Target } from "lucide-react";

export const GoalTracker = () => {
  // Sample empty data to use when no real goals exist
  const goals = [];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Financial Goals</CardTitle>
      </CardHeader>
      <CardContent>
        {goals.length === 0 ? (
          <div className="text-center py-6">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <h3 className="font-medium mb-2">No financial goals yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create goals to track your investment progress
            </p>
            <Button asChild variant="outline">
              <Link to="/goals/create">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Goal
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.slice(0, 3).map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <Link
                    to={`/goals/${goal.id}`}
                    className="font-medium hover:underline"
                  >
                    {goal.name}
                  </Link>
                  <span className="text-sm">
                    ₹{goal.currentAmount.toLocaleString("en-IN")} / ₹
                    {goal.targetAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>
                    {Math.round(goal.progress)}% complete
                  </span>
                  <span>Target: {goal.targetDate}</span>
                </div>
              </div>
            ))}
            {goals.length > 3 && (
              <Button variant="link" size="sm" className="w-full" asChild>
                <Link to="/goals">View all goals</Link>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoalTracker;
