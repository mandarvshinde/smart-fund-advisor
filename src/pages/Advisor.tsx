
import { useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import AIChat from "@/components/advisor/AIChat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, BrainCircuit, MessageSquare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const Advisor = () => {
  const { user } = useUser();

  useEffect(() => {
    document.title = "AI Advisor | Keberiti";
  }, []);

  return (
    <PageLayout
      title="AI Advisor"
      subtitle="Get personalized investment advice and portfolio insights from your AI assistant."
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <AIChat />
        </div>
        
        <div className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center">
                <BrainCircuit className="mr-1.5 h-4 w-4" />
                AI Assistant Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm">Agentic Actions:</div>
                <div className={`text-sm font-medium ${user?.agenticAIEnabled ? 'text-finance-success' : 'text-gray-500'}`}>
                  {user?.agenticAIEnabled ? 'Enabled' : 'Disabled'}
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/settings">
                  <Settings className="mr-1.5 h-4 w-4" />
                  Manage AI Settings
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center">
                <MessageSquare className="mr-1.5 h-4 w-4" />
                How Can I Help You?
              </CardTitle>
              <CardDescription>Ask me about:</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-finance-primary/10 text-finance-primary p-1 rounded-full mr-2">
                    <Bot className="h-3 w-3" />
                  </span>
                  Portfolio performance and allocation
                </li>
                <li className="flex items-start">
                  <span className="bg-finance-primary/10 text-finance-primary p-1 rounded-full mr-2">
                    <Bot className="h-3 w-3" />
                  </span>
                  Investment recommendations based on your goals
                </li>
                <li className="flex items-start">
                  <span className="bg-finance-primary/10 text-finance-primary p-1 rounded-full mr-2">
                    <Bot className="h-3 w-3" />
                  </span>
                  Market trends and their impact on your investments
                </li>
                <li className="flex items-start">
                  <span className="bg-finance-primary/10 text-finance-primary p-1 rounded-full mr-2">
                    <Bot className="h-3 w-3" />
                  </span>
                  SIP and lumpsum investment guidance
                </li>
                <li className="flex items-start">
                  <span className="bg-finance-primary/10 text-finance-primary p-1 rounded-full mr-2">
                    <Bot className="h-3 w-3" />
                  </span>
                  Fund comparisons and tax optimization
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Advisor;
