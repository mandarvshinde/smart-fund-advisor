
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Mail, 
  MessageSquare, 
  Linkedin,
  Send
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PageLayout from '@/components/layout/PageLayout';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().min(10, {
    message: 'Please enter a valid phone number.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const About = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    document.title = 'About Us | Keberiti';
  }, []);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });
  
  const handleWhatsApp = () => {
    window.open('https://wa.me/918446597048?text=Hello,%20I%20am%20interested%20in%20your%20financial%20services.', '_blank');
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, you would send this data to your backend
      // For now, we'll just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent Successfully",
        description: "We'll get back to you as soon as possible!",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: "Please try again or contact us via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <PageLayout 
      title="About Us" 
      subtitle="Learn more about Keberiti Financial Services"
    >
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Story</CardTitle>
              <CardDescription>Empowering your financial journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                At Keberiti Financial Services, we believe that everyone deserves access to quality financial 
                advice and investment opportunities. Founded with a mission to simplify wealth creation, 
                we've been helping individuals achieve their financial goals through customized investment solutions.
              </p>
              <p>
                Our team of experienced financial advisors is dedicated to understanding your unique needs and 
                creating personalized investment strategies. Whether you're saving for retirement, planning for 
                your child's education, or looking to grow your wealth, we're here to guide you every step of the way.
              </p>
              <p>
                What sets us apart is our commitment to transparency, integrity, and client education. We don't 
                just manage your investments; we empower you with the knowledge to make informed financial decisions.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Our Approach</CardTitle>
              <CardDescription>Client-focused investment philosophy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our investment philosophy is centered around long-term wealth creation through disciplined and 
                systematic investing. We believe in the power of compounding and focus on quality investments 
                that have the potential to deliver consistent returns over time.
              </p>
              <p>
                We take a holistic approach to financial planning, considering all aspects of your financial life 
                before recommending any investment solutions. This ensures that our advice is aligned with your 
                overall financial goals and risk tolerance.
              </p>
              <p>
                We leverage technology to provide you with seamless access to your investments, real-time portfolio 
                tracking, and insightful analytics. However, we also understand the importance of human guidance, 
                which is why our advisors are always available to address your queries and concerns.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>We'd love to hear from you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-[#8D6E63]" />
                <span>kuberitifinancialservices@gmail.com</span>
              </div>
              
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-3 text-[#8D6E63]" />
                <span>WhatsApp: +91 8446597048</span>
              </div>
              
              <div className="flex items-center">
                <Linkedin className="h-5 w-5 mr-3 text-[#8D6E63]" />
                <a 
                  href="https://www.linkedin.com/company/keberiti-financial-services" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Keberiti Financial Services
                </a>
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={handleWhatsApp} 
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat with us on WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email address" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="resize-none min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                  
                  <FormDescription className="text-center">
                    Prefer to chat? <span className="font-medium text-[#8D6E63] cursor-pointer" onClick={handleWhatsApp}>Contact us on WhatsApp</span>
                  </FormDescription>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
