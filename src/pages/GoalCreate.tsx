
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Form schema
const formSchema = z.object({
  name: z.string().min(2, 'Goal name must be at least 2 characters'),
  targetAmount: z.number().min(1000, 'Target amount must be at least ₹1,000'),
  targetDate: z.date().refine(date => {
    return date > new Date();
  }, 'Target date must be in the future'),
  monthlyContribution: z.number().min(100, 'Monthly contribution must be at least ₹100'),
  riskAppetite: z.enum(['low', 'moderate', 'high']),
});

const GoalCreate = () => {
  const navigate = useNavigate();
  const [startingAmount, setStartingAmount] = useState(0);
  
  useEffect(() => {
    document.title = "Create Goal | Keberiti";
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      targetAmount: 1000000,
      targetDate: new Date(new Date().setFullYear(new Date().getFullYear() + 5)),
      monthlyContribution: 10000,
      riskAppetite: 'moderate',
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // This would typically call an API to save the goal
    toast.success('Goal created successfully!');
    navigate('/goals');
  };
  
  // Calculate needed monthly contribution
  const calculateNeededContribution = () => {
    const targetAmount = form.watch('targetAmount');
    const targetDate = form.watch('targetDate');
    
    if (!targetAmount || !targetDate) return;
    
    const now = new Date();
    const monthsRemaining = (targetDate.getFullYear() - now.getFullYear()) * 12 + 
                           (targetDate.getMonth() - now.getMonth());
    
    if (monthsRemaining <= 0) return;
    
    const amountNeeded = targetAmount - startingAmount;
    const monthlyContribution = Math.ceil(amountNeeded / monthsRemaining);
    
    form.setValue('monthlyContribution', monthlyContribution > 0 ? monthlyContribution : 100);
  };
  
  return (
    <PageLayout 
      title="Create New Goal" 
      subtitle="Define your financial objectives and track your progress towards achieving them"
    >
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Buy a Home, Education, Retirement" {...field} />
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
                      {...field} 
                      onChange={e => {
                        field.onChange(parseFloat(e.target.value));
                        calculateNeededContribution();
                      }} 
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
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          calculateNeededContribution();
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <FormLabel>Starting Amount (Optional)</FormLabel>
              <Input 
                type="number" 
                value={startingAmount}
                onChange={(e) => {
                  setStartingAmount(parseInt(e.target.value) || 0);
                  calculateNeededContribution();
                }}
                className="mt-1"
              />
            </div>
            
            <FormField
              control={form.control}
              name="monthlyContribution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Contribution (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="riskAppetite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Risk Appetite</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your risk appetite" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low (Conservative)</SelectItem>
                      <SelectItem value="moderate">Moderate (Balanced)</SelectItem>
                      <SelectItem value="high">High (Aggressive)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" type="button" onClick={() => navigate('/goals')}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                Create Goal
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
};

export default GoalCreate;
