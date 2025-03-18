
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Bot, CheckCircle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUser } from "@/context/UserContext";

const AgenticAISettings = () => {
  const { user, toggleAgenticAI, isLoading } = useUser();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleToggleChange = () => {
    if (!user?.agenticAIEnabled) {
      // If enabling AI, show confirmation first
      setShowConfirmation(true);
    } else {
      // If disabling AI, just do it
      toggleAgenticAI();
    }
  };

  const confirmEnableAI = () => {
    toggleAgenticAI();
    setShowConfirmation(false);
  };

  const cancelEnableAI = () => {
    setShowConfirmation(false);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-semibold">
          <Bot className="mr-2 h-5 w-5" />
          Agentic AI Assistant
        </CardTitle>
        <CardDescription>
          Enable the AI to take actions on your behalf based on recommendations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {showConfirmation ? (
          <Alert className="bg-amber-50 text-amber-800 border-amber-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Confirm AI Assistant Activation</AlertTitle>
            <AlertDescription className="pt-2">
              <p className="mb-4">
                By enabling the Agentic AI Assistant, you allow the system to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Automatically process approved recommendations</li>
                <li>Execute fund switches when you give permission</li>
                <li>Adjust SIPs based on your confirmed decisions</li>
                <li>Rebalance your portfolio when authorized</li>
              </ul>
              <p className="mb-4">
                You'll always be notified before any action is taken, and you can disable this feature at any time.
              </p>
              <div className="flex space-x-3 mt-4">
                <Button onClick={confirmEnableAI} className="bg-finance-primary hover:bg-finance-primary/90">
                  <CheckCircle className="mr-1.5 h-4 w-4" />
                  Enable AI Assistant
                </Button>
                <Button variant="outline" onClick={cancelEnableAI}>
                  Cancel
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-medium">AI Assistant Status</div>
                <div className="text-sm text-muted-foreground">
                  {user?.agenticAIEnabled ? 'The AI assistant is currently active' : 'The AI assistant is currently disabled'}
                </div>
              </div>
              <Switch
                checked={user?.agenticAIEnabled || false}
                onCheckedChange={handleToggleChange}
                disabled={isLoading}
                aria-label="Toggle AI Assistant"
              />
            </div>
            
            {user?.agenticAIEnabled ? (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>AI Assistant is Active</AlertTitle>
                <AlertDescription>
                  Your AI assistant can now take actions on recommendations with your approval.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-200">
                <Info className="h-4 w-4" />
                <AlertTitle>AI Assistant is Disabled</AlertTitle>
                <AlertDescription>
                  Enable the AI assistant to help automate actions on your investments.
                </AlertDescription>
              </Alert>
            )}
          </>
        )}
        
        <div className="text-sm text-gray-500 pt-2">
          <h4 className="font-medium text-gray-700 mb-1">How it works</h4>
          <p className="mb-2">
            The Agentic AI assistant analyzes your portfolio and financial goals to provide personalized recommendations and can execute actions on your behalf when approved.
          </p>
          <h4 className="font-medium text-gray-700 mb-1">Privacy & Security</h4>
          <p>
            Your financial data is encrypted and never shared with third parties. The AI operates within the parameters you set and requires your approval for all actions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgenticAISettings;
