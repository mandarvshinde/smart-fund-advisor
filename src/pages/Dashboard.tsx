
import { useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { PortfolioSummary } from "@/components/dashboard/PortfolioSummary";
import { Recommendations } from "@/components/dashboard/Recommendations";
import { GoalTracker } from "@/components/dashboard/GoalTracker";
import { MarketInsights } from "@/components/dashboard/MarketInsights";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const Dashboard = () => {
  const { user } = useUser();

  useEffect(() => {
    document.title = "Dashboard | SmartFund";
  }, []);

  return (
    <PageLayout 
      title="Dashboard" 
      subtitle={`Welcome back, ${user?.name || 'Investor'}. Here's your portfolio overview.`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PortfolioSummary />
          <Recommendations />
        </div>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-finance-primary to-finance-secondary rounded-xl p-5 text-white shadow-md">
            <h3 className="text-lg font-semibold mb-2">Ready to invest?</h3>
            <p className="text-sm opacity-90 mb-4">Start a SIP or make a lumpsum investment in just a few steps.</p>
            <div className="flex space-x-2">
              <Button variant="secondary" className="w-full" asChild>
                <Link to="/invest">
                  <PlusCircle className="mr-1.5 h-4 w-4" />
                  Invest Now
                </Link>
              </Button>
            </div>
          </div>
          
          <GoalTracker />
          <MarketInsights />
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
