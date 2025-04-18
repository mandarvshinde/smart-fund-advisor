
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

// Mock or actual implementation of fetchFundDetails
const fetchFundDetails = async (fundId: string): Promise<FundDetails> => {
  // Replace this with the actual API call
  const response = await fetch(`/api/funds/${fundId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch fund details');
  }
  return response.json();
};
import PageLayout from "@/components/layout/PageLayout";
import { FundDetails } from "@/types";
import { AlertCircle, BarChart3, Building, TrendingUp, Award, FileText, Scale, ShieldCheck, Calendar, DollarSign, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Sample chart data since we don't have historical data
const generatePerformanceData = (years: number, initialValue: number, volatility: number) => {
  const data = [];
  let currentValue = initialValue;
  const monthsCount = years * 12;
  
  for (let i = 0; i < monthsCount; i++) {
    // Random monthly change with overall trend
    const change = (Math.random() - 0.4) * volatility; 
    currentValue = currentValue * (1 + change / 100);
    
    // Month-year label
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth() - monthsCount + i, 1);
    const monthYearLabel = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    
    data.push({
      date: monthYearLabel,
      value: currentValue.toFixed(2)
    });
  }
  
  return data;
};

const FundDetail = () => {
  const { fundId } = useParams<{ fundId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Fund Details | Keberiti";
  }, []);

  const { data: fund, isLoading, error, refetch } = useQuery({
    queryKey: ['fund', fundId],
    queryFn: () => fetchFundDetails(fundId || ''),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
    meta: {
      onError: () => {
        toast.error("Failed to load fund details. Please try again later.");
      }
    }
  });

  // Generate performance chart data
  const oneYearData = fund ? generatePerformanceData(1, 100, 3) : [];
  const threeYearData = fund ? generatePerformanceData(3, 100, 4) : [];
  const fiveYearData = fund ? generatePerformanceData(5, 100, 5) : [];

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <PageLayout title="Loading..." subtitle="Fetching fund details">
        <Button variant="outline" size="sm" className="mb-4" onClick={handleGoBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Funds
        </Button>
        <div className="bg-teal-50 border border-teal-200 rounded-md p-4 mb-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-teal-500" />
            <div>
              <h3 className="font-medium text-teal-800">Loading fund details</h3>
              <p className="text-sm text-teal-700">
                We're fetching the latest data for this fund. This should only take a moment...
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="bg-teal-200 h-16"></CardHeader>
              <CardContent className="p-6">
                <div className="h-60 bg-teal-100 rounded-md"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title="Error" subtitle="Failed to load fund details">
        <Button variant="outline" size="sm" className="mb-4" onClick={handleGoBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Funds
        </Button>
        <div className="text-center py-10 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-red-800 mb-1">Error loading fund details</h3>
          <p className="text-red-600 mb-4">We couldn't load the fund data. Please try again later.</p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-md hover:from-teal-700 hover:to-cyan-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </PageLayout>
    );
  }

  if (!fund) {
    return (
      <PageLayout title="Not Found" subtitle="Fund details not available">
        <Button variant="outline" size="sm" className="mb-4" onClick={handleGoBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Funds
        </Button>
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-1">Fund not found</h3>
          <p className="text-gray-600 mb-4">
            We couldn't find the mutual fund details.
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={fund.schemeName} subtitle="Detailed fund information and performance metrics">
      <Button variant="outline" size="sm" className="mb-4" onClick={handleGoBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Funds
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview Section */}
        <div className="lg:col-span-2">
          <Card className="border border-teal-100 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-semibold">{fund.schemeName}</CardTitle>
                <Badge className={`${fund.category === 'Equity' ? 'bg-blue-500' : 
                                     fund.category === 'Debt' ? 'bg-purple-500' : 
                                     fund.category === 'Hybrid' ? 'bg-amber-500' : 
                                     fund.category === 'Index' ? 'bg-emerald-500' : 
                                     fund.category === 'ELSS' ? 'bg-rose-500' : 'bg-gray-500'} 
                                   text-white`}>
                  {fund.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 bg-gradient-to-br from-white to-teal-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="text-sm text-teal-600">Fund House</div>
                    <div className="font-medium">{fund.fundHouse}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="text-sm text-teal-600">Category</div>
                    <div className="font-medium">{fund.category}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="text-sm text-teal-600">Launch Date</div>
                    <div className="font-medium">{fund.launchDate || 'NA'}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Scale className="h-5 w-5 text-teal-500 mr-3" />
                  <div>
                    <div className="text-sm text-teal-600">Risk Level</div>
                    <div className="font-medium">{fund.riskLevel}</div>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-sm text-teal-600">Latest NAV</div>
                  <div className="font-semibold text-xl text-teal-700">₹{parseFloat(fund.nav).toFixed(2)}</div>
                  <div className="text-xs text-gray-400">as of {fund.date}</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-sm text-teal-600">Minimum Investment</div>
                  <div className="font-semibold text-xl text-teal-700">₹500</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-sm text-teal-600">SIP Available</div>
                  <div className="font-semibold text-xl text-teal-700">Yes</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Returns and Performance */}
        <div>
          <Card className="border border-teal-100 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
              <CardTitle className="text-xl font-semibold">Returns</CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-gradient-to-br from-white to-teal-50">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-teal-600 mb-0.5">
                    <span>1 Year</span>
                    <span className={`${fund?.returns?.oneYear && fund.returns.oneYear > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {fund?.returns?.oneYear ? fund.returns.oneYear.toFixed(2) + '%' : 'NA'}
                    </span>
                  </div>
                  <Progress value={Math.min(Math.abs(fund?.returns?.oneYear || 0) * 1.5, 100)} className="h-1 bg-teal-100" />
                </div>
                <div>
                  <div className="flex justify-between text-sm text-teal-600 mb-0.5">
                    <span>3 Years</span>
                    <span className={`${fund?.returns?.threeYear && fund.returns.threeYear > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {fund?.returns?.threeYear ? fund.returns.threeYear.toFixed(2) + '%' : 'NA'}
                    </span>
                  </div>
                  <Progress value={Math.min(Math.abs(fund?.returns?.threeYear || 0) * 0.8, 100)} className="h-1 bg-teal-100" />
                </div>
                <div>
                  <div className="flex justify-between text-sm text-teal-600 mb-0.5">
                    <span>5 Years</span>
                    <span className={`${fund?.returns?.fiveYear && fund.returns.fiveYear > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {fund?.returns?.fiveYear ? fund.returns.fiveYear.toFixed(2) + '%' : 'NA'}
                    </span>
                  </div>
                  <Progress value={Math.min(Math.abs(fund?.returns?.fiveYear || 0) * 0.6, 100)} className="h-1 bg-teal-100" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="mt-6">
        <Card className="border border-teal-100 shadow-md overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
            <CardTitle className="text-xl font-semibold">Performance Charts</CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-gradient-to-br from-white to-teal-50">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  1 Year Performance
                </h3>
                <div className="h-64 bg-white p-4 rounded-lg shadow-sm">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={oneYearData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0D9488" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip formatter={(value) => [`₹${value}`, 'NAV']} />
                      <Area type="monotone" dataKey="value" stroke="#0D9488" fillOpacity={1} fill="url(#colorValue1)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  3 Year Performance
                </h3>
                <div className="h-64 bg-white p-4 rounded-lg shadow-sm">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={threeYearData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue3" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0891B2" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0891B2" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip formatter={(value) => [`₹${value}`, 'NAV']} />
                      <Area type="monotone" dataKey="value" stroke="#0891B2" fillOpacity={1} fill="url(#colorValue3)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-teal-700 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  5 Year Performance
                </h3>
                <div className="h-64 bg-white p-4 rounded-lg shadow-sm">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={fiveYearData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue5" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0E7490" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#0E7490" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" />
                      <YAxis domain={['dataMin - 15', 'dataMax + 15']} />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip formatter={(value) => [`₹${value}`, 'NAV']} />
                      <Area type="monotone" dataKey="value" stroke="#0E7490" fillOpacity={1} fill="url(#colorValue5)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default FundDetail;
