
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { 
  InfoIcon, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  MessageSquare, 
  Award,
  AlertCircle,
  ArrowLeft,
  Landmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import PageLayout from '@/components/layout/PageLayout';
import { fetchFundDetails } from '@/services/fundService';
import { FundDetails } from '@/types';

const FundDetail = () => {
  const { schemeCode } = useParams<{ schemeCode: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  const { data: fund, isLoading, error } = useQuery({
    queryKey: ['fund-details', schemeCode],
    queryFn: () => fetchFundDetails(schemeCode || ''),
    enabled: !!schemeCode,
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    onSettled: (data, error) => {
      if (error) {
        toast.error("Failed to load fund details. Please try again later.", {
          duration: 5000,
        });
      }
    }
  });
  
  useEffect(() => {
    if (fund) {
      document.title = `${fund.schemeName} | Kuberiti`;
    } else {
      document.title = 'Fund Details | Kuberiti';
    }
  }, [fund]);
  
  const handleWhatsAppChat = () => {
    window.open(`https://wa.me/918446597048?text=I'm interested in investing in ${fund?.schemeName}. Can you provide more information?`, '_blank');
  };
  
  if (isLoading) {
    return (
      <PageLayout title="Loading Fund Details..." subtitle="Please wait while we fetch the fund information">
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <div>
              <h3 className="font-medium text-amber-800">Loading fund details</h3>
              <p className="text-sm text-amber-700">
                We're retrieving the latest data for this fund. This should only take a moment...
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    );
  }
  
  if (error || !fund) {
    return (
      <PageLayout title="Fund Not Found" subtitle="The requested fund could not be found">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <InfoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Unable to load fund details</h3>
              <p className="text-gray-500 mb-4">The fund you're looking for may not exist or there was an error loading the data.</p>
              <Button asChild>
                <Link to="/funds">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Funds
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title={fund.schemeName}
      subtitle={fund.fundHouse || 'Regular Mutual Fund'}
      backLink="/funds"
    >
      <div className="grid gap-6">
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3 border-b">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <h2 className="text-xl font-semibold text-[#5D4037]">{fund.schemeName}</h2>
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Regular</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{fund.fundHouse || 'Fund House'}</p>
              </div>
              <Button onClick={handleWhatsAppChat} className="bg-green-600 hover:bg-green-700 text-white">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with Advisor
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div>
                <div className="text-sm text-gray-500">NAV</div>
                <div className="font-semibold text-xl">₹{parseFloat(fund.nav).toFixed(2)}</div>
                <div className="text-xs text-gray-400">as of {fund.date}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">1Y Returns</div>
                <div className={`font-semibold text-xl ${(fund.returns?.oneYear || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {fund.returns?.oneYear ? `${fund.returns.oneYear.toFixed(2)}%` : 'NA'}
                </div>
                <div className="text-xs text-gray-400">Historical returns</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Fund Category</div>
                <div className="font-semibold text-lg">{fund.category || 'Equity'}</div>
                <div className="text-xs text-gray-400">Fund type</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Risk Level</div>
                <div className="font-semibold text-lg">{fund.riskLevel || 'Moderate'}</div>
                <div className="text-xs text-gray-400">Investment risk</div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Button asChild className="flex-1 bg-[#8D6E63] hover:bg-[#6D4C41]">
                <Link to={`/invest?fund=${fund.schemeCode}`}>
                  <DollarSign className="mr-2 h-4 w-4" />
                  Invest Now
                </Link>
              </Button>
              <Button variant="outline" onClick={handleWhatsAppChat} className="flex-1">
                <MessageSquare className="mr-2 h-4 w-4" />
                Get Expert Advice
              </Button>
            </div>
            
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="details">Fund Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-lg mb-2">Fund Overview</h3>
                    <Card className="bg-gray-50">
                      <CardContent className="p-4">
                        <p className="text-sm text-gray-700">
                          {fund.schemeName} is a {fund.category?.toLowerCase() || 'mutual fund'} that aims to provide capital appreciation over the long term by investing predominantly in equity and equity related securities. The fund primarily focuses on large-cap stocks with stable growth potential and strong fundamentals.
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Historical Returns</h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>1 Year</span>
                                <span className={`${(fund.returns?.oneYear || 0) >= 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                  {fund.returns?.oneYear ? `${fund.returns.oneYear.toFixed(2)}%` : 'NA'}
                                </span>
                              </div>
                              <Progress value={Math.min(Math.abs(fund.returns?.oneYear || 0) * 1.5, 100)} className="h-1.5" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>3 Years (CAGR)</span>
                                <span className={`${(fund.returns?.threeYear || 0) >= 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                  {fund.returns?.threeYear ? `${fund.returns.threeYear.toFixed(2)}%` : 'NA'}
                                </span>
                              </div>
                              <Progress value={Math.min(Math.abs(fund.returns?.threeYear || 0), 100)} className="h-1.5" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>5 Years (CAGR)</span>
                                <span className={`${(fund.returns?.fiveYear || 0) >= 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                  {fund.returns?.fiveYear ? `${fund.returns.fiveYear.toFixed(2)}%` : 'NA'}
                                </span>
                              </div>
                              <Progress value={Math.min(Math.abs(fund.returns?.fiveYear || 0) * 0.7, 100)} className="h-1.5" />
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex items-center">
                              <AlertCircle className="text-amber-500 h-4 w-4 mr-2" />
                              <p className="text-xs text-gray-600">
                                Past performance is not indicative of future returns. Regular plans have higher expense ratio than direct plans.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Fund Highlights</h3>
                      <Card>
                        <CardContent className="p-4 space-y-4">
                          <div className="flex items-start">
                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                              <Award className="h-5 w-5 text-blue-700" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Fund Category</h4>
                              <p className="text-sm text-gray-600">
                                {fund.category} fund with {fund.riskLevel} risk profile
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="bg-green-100 p-2 rounded-full mr-3">
                              <Calendar className="h-5 w-5 text-green-700" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Fund History</h4>
                              <p className="text-sm text-gray-600">
                                Launched on {fund.launchDate || 'NA'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="bg-amber-100 p-2 rounded-full mr-3">
                              <TrendingUp className="h-5 w-5 text-amber-700" />
                            </div>
                            <div>
                              <h4 className="font-medium text-sm">Performance Trend</h4>
                              <p className="text-sm text-gray-600">
                                {(fund.returns?.oneYear || 0) > 15 ? 'Strong' : (fund.returns?.oneYear || 0) > 0 ? 'Positive' : 'Challenging'} performance over the past year
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="performance">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Historical Performance</h3>
                    <Card>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="text-sm font-medium mb-4">Returns (%)</h4>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>1 Year</span>
                                  <span className={`${(fund.returns?.oneYear || 0) >= 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                    {fund.returns?.oneYear ? `${fund.returns.oneYear.toFixed(2)}%` : 'NA'}
                                  </span>
                                </div>
                                <Progress value={Math.min(Math.abs(fund.returns?.oneYear || 0) * 2, 100)} className="h-1.5" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>3 Years (CAGR)</span>
                                  <span className={`${(fund.returns?.threeYear || 0) >= 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                    {fund.returns?.threeYear ? `${fund.returns.threeYear.toFixed(2)}%` : 'NA'}
                                  </span>
                                </div>
                                <Progress value={Math.min(Math.abs(fund.returns?.threeYear || 0), 100)} className="h-1.5" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>5 Years (CAGR)</span>
                                  <span className={`${(fund.returns?.fiveYear || 0) >= 0 ? 'text-green-600' : 'text-red-600'} font-medium`}>
                                    {fund.returns?.fiveYear ? `${fund.returns.fiveYear.toFixed(2)}%` : 'NA'}
                                  </span>
                                </div>
                                <Progress value={Math.min(Math.abs(fund.returns?.fiveYear || 0), 100)} className="h-1.5" />
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-4">Benchmark Comparison</h4>
                            <div className="bg-gray-50 p-4 rounded">
                              <p className="text-gray-500 text-sm mb-4">Benchmark: {fund.category === 'Equity' ? 'Nifty 50' : fund.category === 'Debt' ? 'CRISIL Composite Bond Fund Index' : 'S&P BSE 200 TRI'}</p>
                              
                              <div className="flex items-center justify-center p-8">
                                <p className="text-sm text-gray-600">
                                  Benchmark comparison data not available from API
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Value of ₹10,000 invested</h3>
                    <Card className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded">
                            <h4 className="text-sm font-medium mb-3">SIP Investment Growth</h4>
                            <div className="grid grid-cols-3 text-xs border-b pb-2 mb-2">
                              <div>Duration</div>
                              <div>Investment</div>
                              <div>Current Value*</div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 text-sm">
                                <div>1 Year</div>
                                <div>₹1,20,000</div>
                                <div className="font-medium">₹{Math.round(120000 * (1 + (fund.returns?.oneYear || 10) / 100)).toLocaleString('en-IN')}</div>
                              </div>
                              
                              <div className="grid grid-cols-3 text-sm">
                                <div>3 Years</div>
                                <div>₹3,60,000</div>
                                <div className="font-medium">₹{Math.round(360000 * (1 + (fund.returns?.threeYear || 30) / 100)).toLocaleString('en-IN')}</div>
                              </div>
                              
                              <div className="grid grid-cols-3 text-sm">
                                <div>5 Years</div>
                                <div>₹6,00,000</div>
                                <div className="font-medium">₹{Math.round(600000 * (1 + (fund.returns?.fiveYear || 50) / 100)).toLocaleString('en-IN')}</div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">*Estimated based on current returns. Not guaranteed.</p>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded">
                            <h4 className="text-sm font-medium mb-3">Lumpsum Investment Growth</h4>
                            <div className="grid grid-cols-3 text-xs border-b pb-2 mb-2">
                              <div>Duration</div>
                              <div>Investment</div>
                              <div>Current Value*</div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="grid grid-cols-3 text-sm">
                                <div>1 Year</div>
                                <div>₹10,000</div>
                                <div className="font-medium">₹{Math.round(10000 * (1 + (fund.returns?.oneYear || 10) / 100)).toLocaleString('en-IN')}</div>
                              </div>
                              
                              <div className="grid grid-cols-3 text-sm">
                                <div>3 Years</div>
                                <div>₹10,000</div>
                                <div className="font-medium">₹{Math.round(10000 * Math.pow(1 + (fund.returns?.threeYear || 30) / 100, 3)).toLocaleString('en-IN')}</div>
                              </div>
                              
                              <div className="grid grid-cols-3 text-sm">
                                <div>5 Years</div>
                                <div>₹10,000</div>
                                <div className="font-medium">₹{Math.round(10000 * Math.pow(1 + (fund.returns?.fiveYear || 50) / 100, 5)).toLocaleString('en-IN')}</div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">*Estimated based on current returns. Not guaranteed.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="details">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Fund Details</h3>
                    <Card>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-gray-500">Fund Name</span>
                            <span className="text-sm font-medium text-right">{fund.schemeName}</span>
                          </div>
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-gray-500">Fund House</span>
                            <span className="text-sm font-medium text-right">{fund.fundHouse || 'NA'}</span>
                          </div>
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-gray-500">Scheme Type</span>
                            <span className="text-sm font-medium text-right">Regular</span>
                          </div>
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-gray-500">Category</span>
                            <span className="text-sm font-medium text-right">{fund.category || 'Equity'}</span>
                          </div>
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-gray-500">Launch Date</span>
                            <span className="text-sm font-medium text-right">{fund.launchDate || 'NA'}</span>
                          </div>
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-gray-500">Benchmark</span>
                            <span className="text-sm font-medium text-right">{fund.category === 'Equity' ? 'Nifty 50' : fund.category === 'Debt' ? 'CRISIL Composite Bond Fund Index' : 'S&P BSE 200 TRI'}</span>
                          </div>
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-gray-500">Risk Level</span>
                            <span className="text-sm font-medium text-right">{fund.riskLevel}</span>
                          </div>
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-gray-500">Scheme Code</span>
                            <span className="text-sm font-medium text-right">{fund.schemeCode}</span>
                          </div>
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-gray-500">NAV (as on {fund.date})</span>
                            <span className="text-sm font-medium text-right">₹{parseFloat(fund.nav).toFixed(2)}</span>
                          </div>
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-gray-500">Min SIP Amount</span>
                            <span className="text-sm font-medium text-right">₹500</span>
                          </div>
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-gray-500">Min Lumpsum</span>
                            <span className="text-sm font-medium text-right">₹5,000</span>
                          </div>
                          
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-sm text-gray-500">SIP Dates</span>
                            <span className="text-sm font-medium text-right">1st, 5th, 10th, 15th, 20th, 25th</span>
                          </div>
                        </div>
                        
                        <div className="mt-6 flex items-center">
                          <AlertCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                          <p className="text-xs text-gray-600">
                            Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">AMC Details</h3>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-gray-100 rounded-md">
                            <Landmark className="h-10 w-10 text-gray-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">{fund.fundHouse || 'Fund House'}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {fund.fundHouse || 'This asset management company'} is registered with SEBI and offers a range of mutual fund schemes catering to diverse investor needs.
                            </p>
                            <Button variant="outline" size="sm" className="mt-3">
                              Contact Advisor
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Button variant="outline" asChild>
            <Link to="/funds">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Funds
            </Link>
          </Button>
          
          <div className="flex gap-3">
            <Button onClick={handleWhatsAppChat} className="bg-green-600 hover:bg-green-700">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat with Advisor
            </Button>
            
            <Button asChild className="bg-[#8D6E63] hover:bg-[#6D4C41]">
              <Link to={`/invest?fund=${fund.schemeCode}`}>
                <DollarSign className="mr-2 h-4 w-4" />
                Invest
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default FundDetail;
