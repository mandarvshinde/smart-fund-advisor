
import { useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowRightLeft, TrendingUp, Clock, Landmark } from "lucide-react";
import { Link } from "react-router-dom";

const Investments = () => {
  const { user } = useUser();

  useEffect(() => {
    document.title = "Investments | SmartFund";
  }, []);

  return (
    <PageLayout 
      title="Investments" 
      subtitle="View and manage all your investment schemes in one place."
    >
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Investments</TabsTrigger>
            <TabsTrigger value="sip">SIP</TabsTrigger>
            <TabsTrigger value="lumpsum">Lumpsum</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/invest/switch">
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                Switch Funds
              </Link>
            </Button>
            <Button asChild>
              <Link to="/invest">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Investment
              </Link>
            </Button>
          </div>
        </div>
      
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 gap-4">
            {/* Example investment cards */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle>HDFC Mid-Cap Opportunities Fund</CardTitle>
                    <CardDescription>Direct Growth • Equity • Mid Cap</CardDescription>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Value</p>
                    <p className="text-xl font-semibold">₹32,450</p>
                    <p className="text-xs text-green-500">+12.3% (₹3,540)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Invested</p>
                    <p className="text-xl font-semibold">₹28,910</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>Since Apr 2022</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">NAV</p>
                    <p className="text-xl font-semibold">₹142.35</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Landmark className="mr-1 h-3 w-3" />
                      <span>Units: 227.96</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Axis Bluechip Fund</CardTitle>
                    <CardDescription>Direct Growth • Equity • Large Cap</CardDescription>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Value</p>
                    <p className="text-xl font-semibold">₹45,680</p>
                    <p className="text-xs text-green-500">+8.5% (₹3,580)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Invested</p>
                    <p className="text-xl font-semibold">₹42,100</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>Since Jan 2022</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">NAV</p>
                    <p className="text-xl font-semibold">₹98.12</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Landmark className="mr-1 h-3 w-3" />
                      <span>Units: 465.55</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sip" className="mt-0">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle>HDFC Mid-Cap Opportunities Fund</CardTitle>
                    <CardDescription>Direct Growth • Equity • Mid Cap</CardDescription>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Value</p>
                    <p className="text-xl font-semibold">₹32,450</p>
                    <p className="text-xs text-green-500">+12.3% (₹3,540)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly SIP</p>
                    <p className="text-xl font-semibold">₹2,000</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>Next: 15 Apr 2025</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">SIP Details</p>
                    <p className="text-xl font-semibold">14 months</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Landmark className="mr-1 h-3 w-3" />
                      <span>₹28,000 invested</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="lumpsum" className="mt-0">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Axis Bluechip Fund</CardTitle>
                    <CardDescription>Direct Growth • Equity • Large Cap</CardDescription>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Value</p>
                    <p className="text-xl font-semibold">₹45,680</p>
                    <p className="text-xs text-green-500">+8.5% (₹3,580)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Invested</p>
                    <p className="text-xl font-semibold">₹42,100</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      <span>On 15 Jan 2022</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">NAV</p>
                    <p className="text-xl font-semibold">₹98.12</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Landmark className="mr-1 h-3 w-3" />
                      <span>Units: 465.55</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Investments;
