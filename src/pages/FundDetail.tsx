import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import PageLayout from "@/components/layout/PageLayout";
import { fetchFundDetails } from "@/services/fundService";
import { FundDetails } from "@/types";
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users, TrendingUp, Award, FileText, Scale, ShieldCheck, Gem, PiggyBank, Banknote, Briefcase } from 'lucide-react';

const FundDetail = () => {
  const { fundId } = useParams<{ fundId: string }>();

  useEffect(() => {
    document.title = "Fund Details | Keberiti";
  }, []);

  const { data: fund, isLoading, error } = useQuery({
    queryKey: ['fund', fundId],
    queryFn: () => fetchFundDetails(fundId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
    meta: {
      onError: () => {
        toast.error("Failed to load fund details. Please try again later.");
      }
    }
  });

  if (isLoading) {
    return (
      <PageLayout title="Loading..." subtitle="Fetching fund details">
        <div className="text-center py-10">
          <p>Loading fund details...</p>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title="Error" subtitle="Failed to load fund details">
        <div className="text-center py-10 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-2" />
          <h3 className="text-lg font-medium text-red-800 mb-1">Error loading fund details</h3>
          <p className="text-red-600 mb-4">We couldn't load the fund data. Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-md hover:from-red-700 hover:to-pink-700 transition-colors"
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
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-1">Fund not found</h3>
          <p className="text-gray-600 mb-4">
            We couldn't find the mutual fund details.
          </p>
        </div>
      </PageLayout>
    );
  }

  const oneMonthReturn = fund?.returns?.oneMonth ? fund.returns.oneMonth.toFixed(2) : 'N/A';
  const threeMonthReturn = fund?.returns?.threeMonth ? fund.returns.threeMonth.toFixed(2) : 'N/A';
  const sixMonthReturn = fund?.returns?.sixMonth ? fund.returns.sixMonth.toFixed(2) : 'N/A';

  return (
    <PageLayout title={fund.schemeName} subtitle="Detailed fund information and performance metrics">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overview Section */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-white to-indigo-50 border border-purple-100 shadow-md">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <CardTitle className="text-xl font-semibold">{fund.schemeName}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-indigo-600">Fund House</div>
                  <div className="font-medium">{fund.fundHouse}</div>
                </div>
                <div>
                  <div className="text-sm text-indigo-600">Category</div>
                  <div className="font-medium">{fund.category}</div>
                </div>
                <div>
                  <div className="text-sm text-indigo-600">Launch Date</div>
                  <div className="font-medium">{fund.launchDate}</div>
                </div>
                <div>
                  <div className="text-sm text-indigo-600">Risk Level</div>
                  <div className="font-medium">{fund.riskLevel}</div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-indigo-600">Latest NAV</div>
                  <div className="font-semibold text-xl text-purple-700">₹{parseFloat(fund.nav).toFixed(2)}</div>
                  <div className="text-xs text-gray-400">as of {fund.date}</div>
                </div>
                <div>
                  <div className="text-sm text-indigo-600">Expense Ratio</div>
                  <div className="font-semibold">{fund.expenseRatio ? fund.expenseRatio.toFixed(2) + '%' : 'N/A'}</div>
                </div>
                <div>
                  <div className="text-sm text-indigo-600">AUM</div>
                  <div className="font-semibold">₹{fund.aum ? (fund.aum / 10000000).toFixed(2) + 'Cr' : 'N/A'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Returns and Performance */}
        <div>
          <Card className="bg-gradient-to-br from-white to-indigo-50 border border-purple-100 shadow-md">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <CardTitle className="text-xl font-semibold">Returns</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-indigo-600 mb-0.5">
                    <span>1 Month</span>
                    <span className={`${fund?.returns?.oneMonth && fund.returns.oneMonth > 0 ? 'text-emerald-600' : 'text-pink-600'}`}>
                      {oneMonthReturn ? oneMonthReturn + '%' : 'NA'}
                    </span>
                  </div>
                  <Progress value={Math.min(Math.abs(fund?.returns?.oneMonth || 0) * 10, 100)} className="h-1 bg-indigo-100" />
                </div>
                <div>
                  <div className="flex justify-between text-sm text-indigo-600 mb-0.5">
                    <span>3 Months</span>
                    <span className={`${fund?.returns?.threeMonth && fund.returns.threeMonth > 0 ? 'text-emerald-600' : 'text-pink-600'}`}>
                      {threeMonthReturn ? threeMonthReturn + '%' : 'NA'}
                    </span>
                  </div>
                  <Progress value={Math.min(Math.abs(fund?.returns?.threeMonth || 0) * 8, 100)} className="h-1 bg-indigo-100" />
                </div>
                <div>
                  <div className="flex justify-between text-sm text-indigo-600 mb-0.5">
                    <span>6 Months</span>
                    <span className={`${fund?.returns?.sixMonth && fund.returns.sixMonth > 0 ? 'text-emerald-600' : 'text-pink-600'}`}>
                      {sixMonthReturn ? sixMonthReturn + '%' : 'NA'}
                    </span>
                  </div>
                  <Progress value={Math.min(Math.abs(fund?.returns?.sixMonth || 0) * 6, 100)} className="h-1 bg-indigo-100" />
                </div>
                <div>
                  <div className="flex justify-between text-sm text-indigo-600 mb-0.5">
                    <span>1 Year</span>
                    <span className={`${fund?.returns?.oneYear && fund.returns.oneYear > 0 ? 'text-emerald-600' : 'text-pink-600'}`}>
                      {fund?.returns?.oneYear ? fund.returns.oneYear.toFixed(2) + '%' : 'NA'}
                    </span>
                  </div>
                  <Progress value={Math.min(Math.abs(fund?.returns?.oneYear || 0) * 1.5, 100)} className="h-1 bg-indigo-100" />
                </div>
                <div>
                  <div className="flex justify-between text-sm text-indigo-600 mb-0.5">
                    <span>3 Years</span>
                    <span className={`${fund?.returns?.threeYear && fund.returns.threeYear > 0 ? 'text-emerald-600' : 'text-pink-600'}`}>
                      {fund?.returns?.threeYear ? fund.returns.threeYear.toFixed(2) + '%' : 'NA'}
                    </span>
                  </div>
                  <Progress value={Math.min(Math.abs(fund?.returns?.threeYear || 0) * 0.8, 100)} className="h-1 bg-indigo-100" />
                </div>
                <div>
                  <div className="flex justify-between text-sm text-indigo-600 mb-0.5">
                    <span>5 Years</span>
                    <span className={`${fund?.returns?.fiveYear && fund.returns.fiveYear > 0 ? 'text-emerald-600' : 'text-pink-600'}`}>
                      {fund?.returns?.fiveYear ? fund.returns.fiveYear.toFixed(2) + '%' : 'NA'}
                    </span>
                  </div>
                  <Progress value={Math.min(Math.abs(fund?.returns?.fiveYear || 0) * 0.6, 100)} className="h-1 bg-indigo-100" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="mt-6">
        <Card className="bg-gradient-to-br from-white to-indigo-50 border border-purple-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <CardTitle className="text-xl font-semibold">Fund Details</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center text-indigo-600 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  Launch Date
                </div>
                <div className="text-sm">{fund.launchDate || 'N/A'}</div>
              </div>
              <div>
                <div className="flex items-center text-indigo-600 mb-2">
                  <FileText className="h-4 w-4 mr-2" />
                  Category
                </div>
                <div className="text-sm">{fund.category || 'N/A'}</div>
              </div>
              <div>
                <div className="flex items-center text-indigo-600 mb-2">
                  <Scale className="h-4 w-4 mr-2" />
                  Risk Level
                </div>
                <div className="text-sm">{fund.riskLevel || 'N/A'}</div>
              </div>
              <div>
                <div className="flex items-center text-indigo-600 mb-2">
                  <ShieldCheck className="h-4 w-4 mr-2" />
                  NAV Date
                </div>
                <div className="text-sm">{fund.date || 'N/A'}</div>
              </div>
              <div>
                <div className="flex items-center text-indigo-600 mb-2">
                  <Gem className="h-4 w-4 mr-2" />
                  Benchmark
                </div>
                <div className="text-sm">{fund.benchmark || 'N/A'}</div>
              </div>
              <div>
                <div className="flex items-center text-indigo-600 mb-2">
                  <PiggyBank className="h-4 w-4 mr-2" />
                  Minimum Investment
                </div>
                <div className="text-sm">₹500</div>
              </div>
              <div>
                <div className="flex items-center text-indigo-600 mb-2">
                  <Banknote className="h-4 w-4 mr-2" />
                  Expense Ratio
                </div>
                <div className="text-sm">{fund.expenseRatio ? fund.expenseRatio.toFixed(2) + '%' : 'N/A'}</div>
              </div>
               <div>
                <div className="flex items-center text-indigo-600 mb-2">
                  <Briefcase className="h-4 w-4 mr-2" />
                  Fund Manager
                </div>
                <div className="text-sm">{fund.fundManager || 'N/A'}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default FundDetail;
