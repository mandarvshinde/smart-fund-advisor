
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@/context/UserContext';
import PageLayout from '@/components/layout/PageLayout';
import { fetchFundDetails } from '@/services/fundService';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { AlertCircle, Calendar, CheckCircle, CreditCard, DollarSign, InfoIcon, MessageSquare, ShieldCheck } from 'lucide-react';

// Define form schema
const investmentSchema = z.object({
  amount: z.string().min(1, { message: 'Please enter an amount' }),
  investmentType: z.enum(['sip', 'lumpsum']),
  sipDate: z.string().optional(),
  accountType: z.enum(['savings', 'current']),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms' }),
  }),
});

type InvestmentForm = z.infer<typeof investmentSchema>;

const Invest = () => {
  const location = useLocation();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get fund code from URL query params
  const searchParams = new URLSearchParams(location.search);
  const fundCode = searchParams.get('fund');
  
  // Fetch fund details if fund code is provided
  const { data: fund, isLoading: fundLoading } = useQuery({
    queryKey: ['fund-details', fundCode],
    queryFn: () => fetchFundDetails(fundCode || ''),
    enabled: !!fundCode,
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
  });
  
  const form = useForm<InvestmentForm>({
    resolver: zodResolver(investmentSchema),
    defaultValues: {
      amount: '',
      investmentType: 'sip',
      sipDate: '1',
      accountType: 'savings',
      termsAccepted: false,
    },
  });
  
  const investmentType = form.watch('investmentType');
  
  useEffect(() => {
    document.title = 'Invest | Kuberiti';
  }, []);
  
  const onSubmit = async (data: InvestmentForm) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Investment request submitted successfully!`, {
        description: `Your ${data.investmentType === 'sip' ? 'SIP' : 'lumpsum'} investment of ₹${data.amount} has been initiated.`,
        duration: 5000,
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast.error('Failed to process investment', {
        description: 'Please try again or contact our support team.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleWhatsAppChat = () => {
    window.open(`https://wa.me/918446597048?text=I'm interested in investing in ${fund?.schemeName}. Can you help me?`, '_blank');
  };
  
  return (
    <PageLayout 
      title="Invest Now" 
      subtitle="Start or modify your investment journey"
      backLink="/funds"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Investment Details</CardTitle>
              <CardDescription>
                {fund ? `Investment in ${fund.schemeName}` : 'Enter your investment details'}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Tabs defaultValue="sip" value={investmentType} onValueChange={(value) => form.setValue('investmentType', value as 'sip' | 'lumpsum')}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="sip">SIP Investment</TabsTrigger>
                      <TabsTrigger value="lumpsum">Lumpsum Investment</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="sip" className="pt-4">
                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
                          <div className="flex items-start">
                            <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <h3 className="text-sm font-medium text-blue-800">About SIP Investment</h3>
                              <p className="text-xs text-blue-700 mt-1">
                                A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly (usually monthly). This helps in averaging out your purchase cost over time and building wealth through disciplined investing.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Monthly SIP Amount (₹)</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                  <Input {...field} placeholder="1000" className="pl-8" type="number" min="500" />
                                </div>
                              </FormControl>
                              <p className="text-xs text-gray-500">Minimum amount ₹500</p>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="sipDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>SIP Date</FormLabel>
                              <FormControl>
                                <RadioGroup 
                                  onValueChange={field.onChange} 
                                  defaultValue={field.value}
                                  className="grid grid-cols-3 sm:grid-cols-6 gap-2"
                                >
                                  {[1, 5, 10, 15, 20, 25].map((date) => (
                                    <div key={date} className="flex items-center space-x-2">
                                      <RadioGroupItem value={date.toString()} id={`date-${date}`} />
                                      <FormLabel htmlFor={`date-${date}`} className="font-normal cursor-pointer">
                                        {date}
                                      </FormLabel>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="lumpsum" className="pt-4">
                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6">
                          <div className="flex items-start">
                            <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                              <h3 className="text-sm font-medium text-blue-800">About Lumpsum Investment</h3>
                              <p className="text-xs text-blue-700 mt-1">
                                A lumpsum investment is a one-time investment of a larger amount. This approach can be beneficial during market dips or when you have a sizable amount to invest at once.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lumpsum Amount (₹)</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                  <Input {...field} placeholder="5000" className="pl-8" type="number" min="1000" />
                                </div>
                              </FormControl>
                              <p className="text-xs text-gray-500">Minimum amount ₹1,000</p>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <Separator />
                  
                  <FormField
                    control={form.control}
                    name="accountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Type</FormLabel>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            className="flex space-x-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="savings" id="savings" />
                              <FormLabel htmlFor="savings" className="font-normal cursor-pointer">Savings Account</FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="current" id="current" />
                              <FormLabel htmlFor="current" className="font-normal cursor-pointer">Current Account</FormLabel>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            I agree to the terms and conditions and have read and understood the scheme information document.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-2">
                    <Button type="submit" className="w-full bg-[#8D6E63] hover:bg-[#6D4C41]" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">●</span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <DollarSign className="mr-2 h-4 w-4" />
                          Proceed to Payment
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {fund ? (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Fund Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">{fund.schemeName}</h3>
                  <p className="text-sm text-gray-500">{fund.fundHouse}</p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-y-3">
                  <div className="text-sm text-gray-500">NAV</div>
                  <div className="text-sm text-right font-medium">₹{parseFloat(fund.nav).toFixed(2)}</div>
                  
                  <div className="text-sm text-gray-500">Category</div>
                  <div className="text-sm text-right font-medium">{fund.category}</div>
                  
                  <div className="text-sm text-gray-500">1 Year Return</div>
                  <div className={`text-sm text-right font-medium ${(fund.returns?.oneYear || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {fund.returns?.oneYear ? `${fund.returns.oneYear.toFixed(2)}%` : 'NA'}
                  </div>
                  
                  <div className="text-sm text-gray-500">Min. SIP</div>
                  <div className="text-sm text-right font-medium">₹500</div>
                  
                  <div className="text-sm text-gray-500">Min. Lumpsum</div>
                  <div className="text-sm text-right font-medium">₹1,000</div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button onClick={handleWhatsAppChat} variant="outline" size="sm" className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Need Help?
                </Button>
              </CardFooter>
            </Card>
          ) : fundLoading ? (
            <Card>
              <CardContent className="py-6">
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8D6E63] mb-3"></div>
                  <p className="text-sm text-gray-500">Loading fund details...</p>
                </div>
              </CardContent>
            </Card>
          ) : null}
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Secure Investment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium">SEBI Regulated</h4>
                  <p className="text-xs text-gray-500">All investments are regulated by Securities and Exchange Board of India</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CreditCard className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium">Secure Payments</h4>
                  <p className="text-xs text-gray-500">All payments are processed via secure gateways</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium">Transparent Process</h4>
                  <p className="text-xs text-gray-500">No hidden charges or fees</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="rounded-lg bg-gradient-to-br from-[#8D6E63] to-[#5D4037] p-4 text-white">
            <div className="flex items-center mb-3">
              <Calendar className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Start Early, Invest Regularly</h3>
            </div>
            <p className="text-sm opacity-90 mb-3">
              The power of compounding works best over long periods. Start your investment journey today.
            </p>
            <Button variant="secondary" size="sm" className="w-full" onClick={handleWhatsAppChat}>
              Talk to an Advisor
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Invest;
