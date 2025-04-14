
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight, Check, ChevronsUpDown, HelpCircle, Info, TrendingUp } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchFundsList, fetchFundDetails } from '@/services/fundService';
import { Fund, FundDetails } from '@/types';
import { toast } from '@/hooks/use-toast';

const Invest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fundCode = searchParams.get('fund');

  const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');
  const [amount, setAmount] = useState<string>(investmentType === 'sip' ? '5000' : '25000');
  const [selectedFund, setSelectedFund] = useState<string | null>(fundCode);

  useEffect(() => {
    document.title = "Invest | Kuberiti";
  }, []);

  useEffect(() => {
    // Set default amount based on investment type
    setAmount(investmentType === 'sip' ? '5000' : '25000');
  }, [investmentType]);

  // Fetch all funds
  const { data: funds = [] } = useQuery({
    queryKey: ['allFunds'],
    queryFn: () => fetchFundsList('all', 'alpha'),
  });

  // Fetch selected fund details
  const { data: fundDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['fundDetails', selectedFund],
    queryFn: () => fetchFundDetails(selectedFund || ''),
    enabled: !!selectedFund,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFund) {
      toast({
        title: "Please select a fund",
        description: "You need to select a mutual fund to invest in",
        variant: "destructive",
      });
      return;
    }

    if (!amount || parseInt(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid investment amount",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would submit to an API
    toast({
      title: "Investment placed successfully",
      description: `Your ${investmentType.toUpperCase()} investment of ₹${amount} has been placed.`,
    });

    // Navigate to the investments page
    setTimeout(() => {
      navigate('/investments');
    }, 1500);
  };

  const selectedFundData = fundDetails || funds.find(fund => fund.schemeCode === selectedFund);

  return (
    <PageLayout title="Invest in Mutual Funds" subtitle="Start or manage your mutual fund investments">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue={investmentType} onValueChange={(value) => setInvestmentType(value as 'sip' | 'lumpsum')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sip">SIP Investment</TabsTrigger>
              <TabsTrigger value="lumpsum">One-time Investment</TabsTrigger>
            </TabsList>
            <TabsContent value="sip" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Start a SIP Investment</CardTitle>
                  <CardDescription>
                    Systematic Investment Plans allow you to invest a fixed amount periodically
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fund-select">Select a Mutual Fund</Label>
                        <Select value={selectedFund || ''} onValueChange={setSelectedFund}>
                          <SelectTrigger id="fund-select">
                            <SelectValue placeholder="Select a fund" />
                          </SelectTrigger>
                          <SelectContent>
                            {funds.map((fund) => (
                              <SelectItem key={fund.schemeCode} value={fund.schemeCode}>
                                {fund.schemeName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="sip-amount">Monthly SIP Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                          <Input
                            id="sip-amount"
                            type="number"
                            placeholder="5000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="pl-8"
                            min="500"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Minimum amount: ₹500
                        </p>
                      </div>

                      <div>
                        <Label>SIP Frequency</Label>
                        <RadioGroup defaultValue="monthly" className="mt-2">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="monthly" id="monthly" />
                              <Label htmlFor="monthly" className="cursor-pointer">Monthly</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="quarterly" id="quarterly" />
                              <Label htmlFor="quarterly" className="cursor-pointer">Quarterly</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label>SIP Date</Label>
                        <Select defaultValue="1">
                          <SelectTrigger>
                            <SelectValue placeholder="Select date" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 5, 10, 15, 20, 25].map((date) => (
                              <SelectItem key={date} value={date.toString()}>
                                {date}th of every month
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Start SIP <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="lumpsum" className="pt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Make a One-time Investment</CardTitle>
                  <CardDescription>
                    Invest a lump sum amount in your chosen mutual fund
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fund-select-lumpsum">Select a Mutual Fund</Label>
                        <Select value={selectedFund || ''} onValueChange={setSelectedFund}>
                          <SelectTrigger id="fund-select-lumpsum">
                            <SelectValue placeholder="Select a fund" />
                          </SelectTrigger>
                          <SelectContent>
                            {funds.map((fund) => (
                              <SelectItem key={fund.schemeCode} value={fund.schemeCode}>
                                {fund.schemeName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="lumpsum-amount">Investment Amount</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                          <Input
                            id="lumpsum-amount"
                            type="number"
                            placeholder="25000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="pl-8"
                            min="1000"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Minimum amount: ₹1,000
                        </p>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Invest Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          {selectedFundData ? (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{selectedFundData.schemeName}</CardTitle>
                <CardDescription>
                  {selectedFundData.category || 'Mutual Fund'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">NAV</p>
                    <p className="font-medium">₹{parseFloat(selectedFundData.nav).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">1Y Returns</p>
                    <p className={`font-medium ${selectedFundData.returns?.oneYear && selectedFundData.returns.oneYear > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedFundData.returns?.oneYear ? `${selectedFundData.returns.oneYear.toFixed(2)}%` : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                {fundDetails && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Risk Level</p>
                      <div className={`font-medium flex items-center ${
                        fundDetails.riskLevel?.toLowerCase() === 'high' ? 'text-red-600' :
                        fundDetails.riskLevel?.toLowerCase() === 'moderate' ? 'text-amber-600' : 'text-green-600'
                      }`}>
                        {fundDetails.riskLevel || 'N/A'}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Expense Ratio</p>
                      <p className="font-medium">{fundDetails.expenseRatio || 'N/A'}</p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Fund Manager</span>
                        <span>{fundDetails.fundManager || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">AUM</span>
                        <span>{fundDetails.aum || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Exit Load</span>
                        <span>{fundDetails.exitLoad || 'N/A'}</span>
                      </div>
                    </div>
                  </>
                )}
                
                <Button variant="outline" className="w-full" onClick={() => navigate(`/funds/${selectedFund}`)}>
                  View Fund Details
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Fund Information</CardTitle>
                <CardDescription>
                  Select a fund to view its details
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  Fund details will be displayed here once you select a mutual fund.
                </p>
              </CardContent>
            </Card>
          )}
          
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-blue-900">Why invest with Kuberiti?</h4>
                <ul className="mt-2 space-y-1 text-sm text-blue-800">
                  <li className="flex items-center">
                    <Check className="h-3.5 w-3.5 mr-2 text-blue-600" />
                    Zero commission on direct mutual funds
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3.5 w-3.5 mr-2 text-blue-600" />
                    Completely paperless investment process
                  </li>
                  <li className="flex items-center">
                    <Check className="h-3.5 w-3.5 mr-2 text-blue-600" />
                    Secure transactions with bank-level encryption
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Invest;
