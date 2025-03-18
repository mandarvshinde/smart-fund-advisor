
import { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, CreditCard, Landmark, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Invest = () => {
  const [investmentAmount, setInvestmentAmount] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Invest | SmartFund";
  }, []);

  const handleInvest = () => {
    if (!investmentAmount || isNaN(Number(investmentAmount)) || Number(investmentAmount) <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid investment amount",
      });
      return;
    }

    toast({
      title: "Investment initiated",
      description: `Your investment of ₹${investmentAmount} has been initiated successfully.`,
    });
  };

  return (
    <PageLayout 
      title="Invest Now" 
      subtitle="Start your investment journey with SmartFund"
    >
      <Tabs defaultValue="lumpsum" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="lumpsum">One-time Investment</TabsTrigger>
          <TabsTrigger value="sip">Start SIP</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lumpsum">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>One-time Investment</CardTitle>
                <CardDescription>Invest a lumpsum amount in mutual funds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Investment Amount (₹)</Label>
                  <Input 
                    id="amount" 
                    placeholder="Enter amount" 
                    type="number" 
                    min="500"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Minimum: ₹500</p>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handleInvest}
                  disabled={!investmentAmount || Number(investmentAmount) < 500}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Invest Now
                </Button>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recommended Funds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-x-4 border-b pb-3">
                    <div>
                      <p className="font-medium">HDFC Small Cap Fund</p>
                      <p className="text-xs text-muted-foreground">Small Cap • Direct Growth</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+18.5%</p>
                      <p className="text-xs text-muted-foreground">1Y Returns</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-4 border-b pb-3">
                    <div>
                      <p className="font-medium">Axis Bluechip Fund</p>
                      <p className="text-xs text-muted-foreground">Large Cap • Direct Growth</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+12.3%</p>
                      <p className="text-xs text-muted-foreground">1Y Returns</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-4">
                    <div>
                      <p className="font-medium">Mirae Asset Emerging Bluechip</p>
                      <p className="text-xs text-muted-foreground">Multi Cap • Direct Growth</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+15.7%</p>
                      <p className="text-xs text-muted-foreground">1Y Returns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Why Invest Now?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-finance-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Market Opportunity</p>
                      <p className="text-sm text-muted-foreground">Current market conditions are favorable for long-term investments.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-finance-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Time in Market</p>
                      <p className="text-sm text-muted-foreground">The sooner you invest, the longer your money can grow.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Landmark className="h-5 w-5 text-finance-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Expert Fund Management</p>
                      <p className="text-sm text-muted-foreground">Professional managers optimize your portfolio for best returns.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sip">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Start a SIP</CardTitle>
                <CardDescription>Systematic Investment Plan for disciplined investing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sip-amount">Monthly SIP Amount (₹)</Label>
                  <Input 
                    id="sip-amount" 
                    placeholder="Enter amount" 
                    type="number" 
                    min="500"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Minimum: ₹500 per month</p>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handleInvest}
                  disabled={!investmentAmount || Number(investmentAmount) < 500}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Start SIP
                </Button>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Benefits of SIP</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-finance-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Rupee Cost Averaging</p>
                      <p className="text-sm text-muted-foreground">Buy more units when prices are low and fewer when prices are high.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-finance-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Financial Discipline</p>
                      <p className="text-sm text-muted-foreground">Regular investments help build wealth systematically.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Landmark className="h-5 w-5 text-finance-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Power of Compounding</p>
                      <p className="text-sm text-muted-foreground">Earn returns on your returns over the long term.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recommended SIP Funds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-x-4 border-b pb-3">
                    <div>
                      <p className="font-medium">ICICI Pru Multicap Fund</p>
                      <p className="text-xs text-muted-foreground">Multi Cap • Direct Growth</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+16.2%</p>
                      <p className="text-xs text-muted-foreground">3Y Returns</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-4 border-b pb-3">
                    <div>
                      <p className="font-medium">SBI Focused Equity Fund</p>
                      <p className="text-xs text-muted-foreground">Large & Mid Cap • Direct Growth</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+14.8%</p>
                      <p className="text-xs text-muted-foreground">3Y Returns</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-4">
                    <div>
                      <p className="font-medium">Parag Parikh Flexi Cap Fund</p>
                      <p className="text-xs text-muted-foreground">Flexi Cap • Direct Growth</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+19.3%</p>
                      <p className="text-xs text-muted-foreground">3Y Returns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Invest;
