import { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CreditCard, Landmark, TrendingUp } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchMutualFunds } from "@/services/mockData";
import { useQuery } from "@tanstack/react-query";
import { Fund } from "@/types";

const Invest = () => {
  const [investmentAmount, setInvestmentAmount] = useState<string>("");
  const [fundHouse, setFundHouse] = useState<string>("");
  const [selectedFund, setSelectedFund] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Invest | SmartFund";
  }, []);

  const { data: mutualFunds = [], isLoading } = useQuery({
    queryKey: ['mutualFunds'],
    queryFn: fetchMutualFunds,
  });

  // Get unique fund houses
  const fundHouses = mutualFunds ? 
    [...new Set(mutualFunds.map((fund: Fund) => fund.fundHouse || fund.name.split(' ')[0]))] : [];

  // Get schemes for selected fund house
  const fundSchemes = mutualFunds ? 
    mutualFunds.filter((fund: Fund) => 
      (fund.fundHouse || fund.name.split(' ')[0]) === fundHouse
    ) : [];

  const handleInvest = () => {
    if (!investmentAmount || isNaN(Number(investmentAmount)) || Number(investmentAmount) <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid investment amount",
      });
      return;
    }

    if (!selectedFund) {
      toast({
        variant: "destructive",
        title: "No fund selected",
        description: "Please select a mutual fund scheme",
      });
      return;
    }

    const selectedScheme = mutualFunds?.find((fund: Fund) => fund.id === selectedFund);

    toast({
      title: "Investment initiated",
      description: `Your investment of ₹${investmentAmount} in ${selectedScheme?.name} has been initiated successfully.`,
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
                  <Label htmlFor="fund-house">Select Fund House</Label>
                  <Select value={fundHouse} onValueChange={setFundHouse}>
                    <SelectTrigger id="fund-house">
                      <SelectValue placeholder="Select fund house" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoading ? (
                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                      ) : (
                        fundHouses.map((house: string) => (
                          <SelectItem key={house} value={house}>{house}</SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="scheme">Select Scheme</Label>
                  <Select 
                    value={selectedFund} 
                    onValueChange={setSelectedFund}
                    disabled={!fundHouse}
                  >
                    <SelectTrigger id="scheme">
                      <SelectValue placeholder="Select scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      {fundHouse ? (
                        fundSchemes.map((scheme: Fund) => (
                          <SelectItem key={scheme.id} value={scheme.id}>
                            {scheme.name} ({scheme.subcategory || scheme.category})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="select-house" disabled>
                          Select a fund house first
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
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
                  disabled={!investmentAmount || Number(investmentAmount) < 500 || !selectedFund}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Invest Now
                </Button>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              {selectedFund && mutualFunds && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Selected Fund Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {(() => {
                      const fund = mutualFunds.find((f: Fund) => f.id === selectedFund);
                      if (!fund) return null;
                      
                      return (
                        <>
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">Fund Name</span>
                            <span>{fund.name}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">Category</span>
                            <span>{fund.category} {fund.subcategory ? `- ${fund.subcategory}` : ''}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">NAV</span>
                            <span>₹{fund.price?.toFixed(2) || fund.nav?.toFixed(2) || '-'}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">1Y Return</span>
                            <span className="text-green-600">{fund.returns?.oneYear || 0}%</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">3Y Return</span>
                            <span className="text-green-600">{fund.returns?.threeYear || 0}%</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">Risk Level</span>
                            <span>{fund.riskLevel ? (fund.riskLevel.charAt(0).toUpperCase() + fund.riskLevel.slice(1)) : 'Moderate'}</span>
                          </div>
                          <div className="flex justify-between pb-2">
                            <span className="font-medium">Expense Ratio</span>
                            <span>{fund.expenseRatio || 1.2}%</span>
                          </div>
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}
              
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
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sip" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Start a SIP</CardTitle>
                <CardDescription>Systematic Investment Plan for disciplined investing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sip-fund-house">Select Fund House</Label>
                  <Select value={fundHouse} onValueChange={setFundHouse}>
                    <SelectTrigger id="sip-fund-house">
                      <SelectValue placeholder="Select fund house" />
                    </SelectTrigger>
                    <SelectContent>
                      {isLoading ? (
                        <SelectItem value="loading" disabled>Loading...</SelectItem>
                      ) : (
                        fundHouses.map((house: string) => (
                          <SelectItem key={house} value={house}>{house}</SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sip-scheme">Select Scheme</Label>
                  <Select 
                    value={selectedFund} 
                    onValueChange={setSelectedFund}
                    disabled={!fundHouse}
                  >
                    <SelectTrigger id="sip-scheme">
                      <SelectValue placeholder="Select scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      {fundHouse ? (
                        fundSchemes.map((scheme: Fund) => (
                          <SelectItem key={scheme.id} value={scheme.id}>
                            {scheme.name} ({scheme.subcategory || scheme.category})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="select-house" disabled>
                          Select a fund house first
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                
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
                  disabled={!investmentAmount || Number(investmentAmount) < 500 || !selectedFund}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Start SIP
                </Button>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              {selectedFund && mutualFunds && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Selected Fund Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {(() => {
                      const fund = mutualFunds.find((f: Fund) => f.id === selectedFund);
                      if (!fund) return null;
                      
                      return (
                        <>
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">Fund Name</span>
                            <span>{fund.name}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">Category</span>
                            <span>{fund.category} {fund.subcategory ? `- ${fund.subcategory}` : ''}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">NAV</span>
                            <span>₹{fund.price?.toFixed(2) || fund.nav?.toFixed(2) || '-'}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">3Y Return</span>
                            <span className="text-green-600">{fund.returns?.threeYear || 0}%</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="font-medium">Risk Level</span>
                            <span>{fund.riskLevel ? (fund.riskLevel.charAt(0).toUpperCase() + fund.riskLevel.slice(1)) : 'Moderate'}</span>
                          </div>
                          <div className="flex justify-between pb-2">
                            <span className="font-medium">Expense Ratio</span>
                            <span>{fund.expenseRatio || 1.2}%</span>
                          </div>
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}
              
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
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Invest;
