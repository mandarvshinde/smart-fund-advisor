
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle, 
  Clock,
  HelpCircle, 
  RefreshCw, 
  DollarSign, 
  Zap, 
  AlertCircle
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const Invest = () => {
  const [searchParams] = useSearchParams();
  const fundCode = searchParams.get('fund');
  const navigate = useNavigate();
  
  const [investmentType, setInvestmentType] = useState('sip');
  const [amount, setAmount] = useState('5000');
  const [installmentDay, setInstallmentDay] = useState('1');
  
  useEffect(() => {
    document.title = "Invest | Keberiti";
  }, []);
  
  const { data: fund, isLoading, error } = useQuery({
    queryKey: ['fund-details', fundCode],
    queryFn: () => fetchFundDetails(fundCode || ''),
    enabled: !!fundCode,
    refetchOnWindowFocus: false,
    retry: 2,
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would make an API call to submit the investment
    toast.success(`${investmentType === 'sip' ? 'SIP' : 'Lumpsum'} investment initiated successfully!`);
    
    // Redirect to dashboard or investment confirmation page
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };
  
  const renderAmountInput = () => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label htmlFor="amount" className="text-sm font-medium">Investment Amount (₹)</label>
        {investmentType === 'sip' && (
          <span className="text-xs text-gray-500">Minimum: ₹500/month</span>
        )}
        {investmentType === 'lumpsum' && (
          <span className="text-xs text-gray-500">Minimum: ₹5,000</span>
        )}
      </div>
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="pl-10"
          min={investmentType === 'sip' ? 500 : 5000}
        />
      </div>
    </div>
  );
  
  // If no fund code is provided, show a message
  if (!fundCode) {
    return (
      <PageLayout
        title="Start Investing"
        subtitle="Begin your investment journey"
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No fund selected</h2>
            <p className="text-gray-600 mb-6">Please select a mutual fund to invest in.</p>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              onClick={() => navigate('/funds')}
            >
              Browse Mutual Funds
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout
      title="Start Investing"
      subtitle="Begin your investment journey with a trusted asset management company"
    >
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        
        {isLoading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-40 w-full" />
              </div>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="text-center py-6">
            <CardContent>
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Error loading fund</h2>
              <p className="text-gray-600 mb-6">We couldn't load the details for this fund. Please try again later.</p>
              <Button 
                onClick={() => navigate('/funds')}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Browse Other Funds
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="mb-6 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-1">{fund?.schemeName}</CardTitle>
                    <div className="text-indigo-100 text-sm flex items-center">
                      <span>{fund?.fundHouse}</span>
                    </div>
                  </div>
                  <Badge className="bg-white text-indigo-700">{fund?.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">NAV</div>
                    <div className="text-2xl font-semibold">₹{parseFloat(fund?.nav || '0').toFixed(2)}</div>
                    <div className="text-xs text-gray-500">As of {fund?.date}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">1 Year Returns</div>
                    <div className={`text-2xl font-semibold ${(fund?.returns?.oneYear || 0) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {fund?.returns?.oneYear?.toFixed(2)}%
                    </div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 mr-2">
                      {fund?.riskLevel || 'Moderate'}
                    </Badge>
                    <span>Risk Level</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-indigo-600 mr-2" />
                    <span>Min. SIP: ₹500</span>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-indigo-600 mr-2" />
                    <span>Min. Lumpsum: ₹5,000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Choose Investment Options</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Tabs defaultValue="sip" onValueChange={setInvestmentType}>
                    <TabsList className="grid grid-cols-2 w-full mb-6">
                      <TabsTrigger value="sip" className="text-center py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        SIP (Monthly)
                      </TabsTrigger>
                      <TabsTrigger value="lumpsum" className="text-center py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
                        <Zap className="h-4 w-4 mr-2" />
                        One-time Investment
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="sip" className="space-y-6">
                      {renderAmountInput()}
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label htmlFor="installment-day" className="text-sm font-medium">
                            SIP Day
                          </label>
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-5 p-0">
                                <HelpCircle className="h-4 w-4 text-gray-400" />
                              </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80 text-sm">
                              <p>Choose the day of the month when you want your SIP amount to be debited from your account.</p>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                          <Select value={installmentDay} onValueChange={setInstallmentDay}>
                            <SelectTrigger className="pl-10">
                              <SelectValue placeholder="Select day" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                                <SelectItem key={day} value={day.toString()}>
                                  {day}
                                  {day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'} of every month
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="bg-indigo-50 rounded-lg p-4 space-y-2">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                          <div>
                            <h4 className="font-medium text-sm">SIP Benefits</h4>
                            <p className="text-xs text-gray-600">Invest periodically without timing the market, reducing overall risk through rupee cost averaging.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-indigo-600 mt-0.5 mr-2" />
                          <div>
                            <h4 className="font-medium text-sm">SIP Timeline</h4>
                            <p className="text-xs text-gray-600">Your first installment will be processed on {new Date().getMonth() + 1}/{installmentDay}/{new Date().getFullYear()}.</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="lumpsum" className="space-y-6">
                      {renderAmountInput()}
                      
                      <div className="bg-indigo-50 rounded-lg p-4 space-y-2">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                          <div>
                            <h4 className="font-medium text-sm">One-time Investment Benefits</h4>
                            <p className="text-xs text-gray-600">Invest a larger amount at once, potentially benefiting from market opportunities and lower transaction costs.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-2" />
                          <div>
                            <h4 className="font-medium text-sm">Market Timing</h4>
                            <p className="text-xs text-gray-600">Be aware that one-time investments are subject to market timing risk.</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-8">
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 py-6 text-lg"
                    >
                      Proceed to Payment
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-4 text-sm text-gray-600">
                <p>Your investment will be processed securely. Funds will be directly invested with the asset management company.</p>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default Invest;
