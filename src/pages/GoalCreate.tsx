
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";

const formSchema = z.object({
  name: z.string().min(3, { message: "Goal name must be at least 3 characters" }),
  targetAmount: z.number().min(1000, { message: "Target amount must be at least ₹1,000" }),
  targetDate: z.date().min(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), {
    message: "Target date must be at least 3 months in the future",
  }),
  riskTolerance: z.number().min(1).max(10),
});

const GoalCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [estimatedMonthly, setEstimatedMonthly] = useState(0);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      targetAmount: 100000,
      targetDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      riskTolerance: 5,
    },
  });

  useEffect(() => {
    document.title = "Create New Goal | SmartFund";
  }, []);

  // Calculate estimated monthly contribution whenever target amount or date changes
  useEffect(() => {
    const values = form.watch();
    if (values.targetAmount && values.targetDate) {
      const now = new Date();
      const monthsDifference = (values.targetDate.getFullYear() - now.getFullYear()) * 12 + 
                               (values.targetDate.getMonth() - now.getMonth());
      
      if (monthsDifference > 0) {
        // Simple calculation assuming no compounding for UI estimation
        setEstimatedMonthly(Math.ceil(values.targetAmount / monthsDifference));
      }
    }
  }, [form.watch()]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, we would save the goal to the backend
    console.log("Form submitted:", values);
    
    toast({
      title: "Goal created successfully!",
      description: `Your goal "${values.name}" has been created.`,
    });
    
    navigate("/goals");
  };

  const riskLevelDescription = (level: number) => {
    if (level <= 3) return "Conservative";
    if (level <= 7) return "Moderate";
    return "Aggressive";
  };

  return (
    <PageLayout>
      <div className="container mx-auto py-6 max-w-2xl">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/goals">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Goals
          </Link>
        </Button>
        <h1 className="text-2xl font-bold mb-6">Create New Financial Goal</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Define Your Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Home Purchase, Retirement, Education" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Amount (₹)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1000}
                          placeholder="Enter amount in rupees" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="targetDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Target Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : "Select a date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            fromDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="riskTolerance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Risk Tolerance</FormLabel>
                      <div className="space-y-2">
                        <FormControl>
                          <Slider
                            min={1}
                            max={10}
                            step={1}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                          />
                        </FormControl>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Conservative</span>
                          <span>Moderate</span>
                          <span>Aggressive</span>
                        </div>
                        <div className="text-sm font-medium text-center">
                          {riskLevelDescription(field.value)} ({field.value}/10)
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {estimatedMonthly > 0 && (
                  <div className="bg-finance-primary/10 p-4 rounded-md">
                    <p className="font-medium">Estimated Monthly Contribution</p>
                    <p className="text-2xl font-bold">₹{estimatedMonthly.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      This is an estimate based on your target amount and timeline.
                    </p>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" asChild>
                    <Link to="/goals">Cancel</Link>
                  </Button>
                  <Button type="submit">Create Goal</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default GoalCreate;
