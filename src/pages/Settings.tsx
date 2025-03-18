
import { useEffect } from "react";
import PageLayout from "@/components/layout/PageLayout";
import AgenticAISettings from "@/components/settings/AgenticAISettings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Bell, Lock, User, UserCog } from "lucide-react";
import { useUser } from "@/context/UserContext";

const Settings = () => {
  const { user, updateUser } = useUser();
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = "Settings | SmartFund";
  }, []);
  
  const handleRiskAppetiteChange = async (value: string) => {
    if (!user) return;
    
    try {
      await updateUser({
        ...user,
        riskAppetite: value as 'low' | 'moderate' | 'high',
      });
      
      toast({
        title: "Risk profile updated",
        description: `Your risk appetite has been set to ${value}.`,
      });
    } catch (error) {
      console.error("Failed to update risk appetite:", error);
    }
  };
  
  const handleNotificationSave = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  const handlePasswordUpdate = () => {
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
  };

  return (
    <PageLayout title="Settings" subtitle="Manage your account settings and preferences">
      <Tabs defaultValue="ai">
        <TabsList className="mb-6">
          <TabsTrigger value="ai" className="flex items-center">
            <UserCog className="mr-1.5 h-4 w-4" />
            AI Assistant
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center">
            <User className="mr-1.5 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="mr-1.5 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="mr-1.5 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai" className="space-y-6">
          <AgenticAISettings />
          
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-semibold">
                <AlertCircle className="mr-2 h-5 w-5" />
                Risk Profile
              </CardTitle>
              <CardDescription>
                Set your investment risk appetite to personalize recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="risk-appetite">Risk Appetite</Label>
                <Select
                  defaultValue={user?.riskAppetite}
                  onValueChange={handleRiskAppetiteChange}
                >
                  <SelectTrigger id="risk-appetite">
                    <SelectValue placeholder="Select your risk appetite" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Conservative (Low Risk)</SelectItem>
                    <SelectItem value="moderate">Balanced (Moderate Risk)</SelectItem>
                    <SelectItem value="high">Aggressive (High Risk)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  This setting helps us tailor investment recommendations to match your comfort with market volatility.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Personal Information</CardTitle>
              <CardDescription>
                Update your personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={user?.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" defaultValue="1985-06-15" />
                </div>
              </div>
              <Button className="mt-2 bg-finance-primary hover:bg-finance-primary/90">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Notification Preferences</CardTitle>
              <CardDescription>
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive updates about your portfolio via email</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="daily">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-gray-500">Receive alerts on your device</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="important">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="important">Important</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleNotificationSave}
                className="mt-2 bg-finance-primary hover:bg-finance-primary/90"
              >
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Password</CardTitle>
              <CardDescription>
                Update your password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              
              <Button 
                onClick={handlePasswordUpdate}
                className="mt-2 bg-finance-primary hover:bg-finance-primary/90"
              >
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Settings;
