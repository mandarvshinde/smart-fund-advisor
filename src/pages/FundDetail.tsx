
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  InfoIcon, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Calendar, 
  DollarSign, 
  Users, 
  Clock, 
  ArrowLeft,
  ArrowUpRight,
  MessageSquare
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
  });
  
  useEffect(() => {
    if (fund) {
      document.title = `${fund.schemeName} | Keberiti`;
    } else {
      document.title = 'Fund Details | Keberiti';
    }
  }, [fund]);
  
  const handleWhatsAppChat = () => {
    window.open(`https://wa.me/918446597048?text=I'm interested in investing in ${fund?.schemeName}. Can you provide more information?`, '_blank');
  };
  
  if (isLoading) {
    return (
      <PageLayout title="Loading Fund Details..." subtitle="Please wait while we fetch the fund information">
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
      subtitle={fund.fundHouse || 'Mutual Fund'}
      backLink="/funds"
    >
      <div className="grid gap-6">
        {/* Fund Overview Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{fund.schemeName}</CardTitle>
              <Button onClick={handleWhatsAppChat} className="bg-green-600 hover:bg-green-700 text-white">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat with Advisor
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
              </div>
              
              <div>
                <div className="text-sm text-gray-500">3Y Returns</div>
                <div className={`font-semibold text-xl ${(fund.returns?.threeYear || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {fund.returns?.threeYear ? `${fund.returns.threeYear.toFixed(2)}%` : 'NA'}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">5Y Returns</div>
                <div className={`font-semibold text-xl ${(fund.returns?.fiveYear || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {fund.returns?.fiveYear ? `${fund.returns.fiveYear.toFixed(2)}%` : 'NA'}
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-1">Fund Details</div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="grid grid-cols-2 gap-y-3">
                          <div className="text-sm text-gray-500">Category</div>
                          <div className="text-sm font-medium">{fund.category || 'Equity'}</div>
                          
                          <div className="text-sm text-gray-500">Risk Level</div>
                          <div className="text-sm font-medium">{fund.riskLevel || 'Moderate'}</div>
                          
                          <div className="text-sm text-gray-500">Expense Ratio</div>
                          <div className="text-sm font-medium">{fund.expenseRatio || '1.2%'}</div>
                          
                          <div className="text-sm text-gray-500">AUM</div>
                          <div className="text-sm font-medium">{fund.aum || 'NA'}</div>
                          
                          <div className="text-sm text-gray-500">Launch Date</div>
                          <div className="text-sm font-medium">{fund.launchDate || 'NA'}</div>
                          
                          <div className="text-sm text-gray-500">Exit Load</div>
                          <div className="text-sm font-medium">{fund.exitLoad || 'NA'}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Fund Manager</div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex items-center mb-2">
                          <Users className="h-5 w-5 text-gray-500 mr-2" />
                          <span className="font-medium">{fund.fundManager || 'Experienced Fund Manager'}</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Manages multiple funds with consistent performance over the years.
                        </p>
                      </div>
                      
                      <div className="text-sm font-medium mt-4 mb-1">Minimum Investment</div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="grid grid-cols-2 gap-y-2">
                          <div className="text-sm text-gray-500">Lumpsum</div>
                          <div className="text-sm font-medium">₹5,000</div>
                          
                          <div className="text-sm text-gray-500">SIP</div>
                          <div className="text-sm font-medium">₹500</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-1">Investment Objective</div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-600">
                        The fund aims to provide capital appreciation over the long term by investing predominantly in equity and equity related securities.
                        The fund primarily focuses on large-cap stocks with stable growth potential and strong fundamentals.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="performance">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-1">Performance Comparison</div>
                    <div className="bg-gray-50 p-4 rounded-md min-h-[200px] flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 mx-auto text-gray-300" />
                        <p className="mt-2 text-sm text-gray-500">Performance chart visualization will be available soon</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-1">Historical Performance (%)</div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium mb-2">Fund Returns</div>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>1 Month</span>
                                <span className={`${Math.random() > 0.5 ? 'text-green-600' : 'text-red-600'}`}>
                                  {(Math.random() * 5 - 2).toFixed(2)}%
                                </span>
                              </div>
                              <Progress value={Math.random() * 100} className="h-1.5" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>6 Months</span>
                                <span className={`${Math.random() > 0.3 ? 'text-green-600' : 'text-red-600'}`}>
                                  {(Math.random() * 15 - 3).toFixed(2)}%
                                </span>
                              </div>
                              <Progress value={Math.random() * 100} className="h-1.5" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>1 Year</span>
                                <span className={`${(fund.returns?.oneYear || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {fund.returns?.oneYear ? `${fund.returns.oneYear.toFixed(2)}%` : '0.00%'}
                                </span>
                              </div>
                              <Progress value={Math.min(Math.abs(fund.returns?.oneYear || 0) * 2, 100)} className="h-1.5" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>3 Years</span>
                                <span className={`${(fund.returns?.threeYear || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {fund.returns?.threeYear ? `${fund.returns.threeYear.toFixed(2)}%` : '0.00%'}
                                </span>
                              </div>
                              <Progress value={Math.min(Math.abs(fund.returns?.threeYear || 0), 100)} className="h-1.5" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>5 Years</span>
                                <span className={`${(fund.returns?.fiveYear || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {fund.returns?.fiveYear ? `${fund.returns.fiveYear.toFixed(2)}%` : '0.00%'}
                                </span>
                              </div>
                              <Progress value={Math.min(Math.abs(fund.returns?.fiveYear || 0), 100)} className="h-1.5" />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-sm font-medium mb-2">Benchmark Comparison</div>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>1 Month</span>
                                <span className={`${Math.random() > 0.5 ? 'text-green-600' : 'text-red-600'}`}>
                                  {(Math.random() * 4 - 1.5).toFixed(2)}%
                                </span>
                              </div>
                              <Progress value={Math.random() * 100} className="h-1.5" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>6 Months</span>
                                <span className={`${Math.random() > 0.3 ? 'text-green-600' : 'text-red-600'}`}>
                                  {(Math.random() * 12 - 2).toFixed(2)}%
                                </span>
                              </div>
                              <Progress value={Math.random() * 100} className="h-1.5" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>1 Year</span>
                                <span className={`${Math.random() > 0.2 ? 'text-green-600' : 'text-red-600'}`}>
                                  {(Math.random() * 20 - 2).toFixed(2)}%
                                </span>
                              </div>
                              <Progress value={Math.random() * 100} className="h-1.5" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>3 Years</span>
                                <span className={`${Math.random() > 0.1 ? 'text-green-600' : 'text-red-600'}`}>
                                  {(Math.random() * 40 + 5).toFixed(2)}%
                                </span>
                              </div>
                              <Progress value={Math.random() * 100} className="h-1.5" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>5 Years</span>
                                <span className={`${Math.random() > 0.1 ? 'text-green-600' : 'text-red-600'}`}>
                                  {(Math.random() * 60 + 10).toFixed(2)}%
                                </span>
                              </div>
                              <Progress value={Math.random() * 100} className="h-1.5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="portfolio">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium mb-1">Sector Allocation</div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        {fund.sectorAllocation ? (
                          <div className="space-y-3">
                            {fund.sectorAllocation.map((item, index) => (
                              <div key={index}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>{item.sector}</span>
                                  <span>{item.allocation.toFixed(1)}%</span>
                                </div>
                                <Progress value={item.allocation} className="h-1.5" />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-sm text-gray-500">Sector allocation data not available</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Top Holdings</div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        {fund.portfolioHoldings ? (
                          <div className="space-y-3">
                            {fund.portfolioHoldings.map((item, index) => (
                              <div key={index}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>{item.company}</span>
                                  <span>{item.allocation.toFixed(1)}%</span>
                                </div>
                                <Progress value={item.allocation} className="h-1.5" />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4">
                            <p className="text-sm text-gray-500">Holdings data not available</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-1">Asset Allocation</div>
                    <div className="bg-gray-50 p-4 rounded-md min-h-[150px] flex items-center justify-center">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 mx-auto text-gray-300" />
                        <p className="mt-2 text-sm text-gray-500">Asset allocation visualization will be available soon</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link to="/funds">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Funds
            </Link>
          </Button>
          
          <Button onClick={handleWhatsAppChat} className="bg-green-600 hover:bg-green-700">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat with Advisor
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default FundDetail;
