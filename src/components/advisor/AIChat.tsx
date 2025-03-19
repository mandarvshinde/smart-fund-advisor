import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  BarChart, 
  PieChart, 
  LineChart, 
  ArrowRight, 
  ShoppingCart, 
  CreditCard,
  SlidersHorizontal
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ChatMessage } from "@/types";
import { useUser } from "@/context/UserContext";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend } from "recharts";

const AIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      content: "Hello! I'm your personal financial advisor. Ask me anything about your investments, goals, or get personalized recommendations.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVisualization, setShowVisualization] = useState<string | null>(null);
  const [quickPurchaseOptions, setQuickPurchaseOptions] = useState<any[] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setShowVisualization(null);
    setQuickPurchaseOptions(null);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
      
      // Simulate showing visualization for certain queries
      if (input.toLowerCase().includes("portfolio") || 
          input.toLowerCase().includes("allocation") ||
          input.toLowerCase().includes("performance")) {
        setShowVisualization("portfolio");
      } else if (input.toLowerCase().includes("sip") || 
                input.toLowerCase().includes("invest")) {
        setQuickPurchaseOptions(getMockFundOptions());
      }
    }, 1500);
  };

  const generateAIResponse = (userInput: string): ChatMessage => {
    // This is a mock function - in a real app, this would call an AI API
    const lowerInput = userInput.toLowerCase();
    let responseContent = "";

    if (lowerInput.includes("recommend") || lowerInput.includes("suggestion")) {
      responseContent = "Based on your risk profile and goals, I recommend considering increasing your allocation to mid-cap funds. They offer higher growth potential which aligns with your retirement goal timeline.";
    } else if (lowerInput.includes("risk") || lowerInput.includes("appetite")) {
      responseContent = `Your current risk appetite is set to ${user?.riskAppetite}. Based on your age and investment horizon, this appears appropriate. Would you like me to suggest adjustments?`;
    } else if (lowerInput.includes("sip") || lowerInput.includes("invest")) {
      responseContent = "For regular investments, you currently have 3 active SIPs totaling ₹10,000 per month. Would you like to review these or set up a new SIP?";
    } else if (lowerInput.includes("goal") || lowerInput.includes("target")) {
      responseContent = "You have 3 goals set up. Your retirement goal is 13% complete, house down payment is 15.7% complete, and child education is 1.95% complete. Would you like specific recommendations to achieve these goals faster?";
    } else if (lowerInput.includes("market") || lowerInput.includes("trend")) {
      responseContent = "Current market trends indicate a positive outlook for IT and pharma sectors. Given recent volatility, maintaining a diversified portfolio is recommended. Would you like me to analyze how your portfolio aligns with current market conditions?";
    } else {
      responseContent = "I'm here to help with your investment portfolio. You can ask me about your investments, goals, or get personalized recommendations. What specific information would you like to know?";
    }

    return {
      id: Date.now().toString(),
      sender: "ai",
      content: responseContent,
      timestamp: new Date().toISOString(),
    };
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleVisualizationToggle = (type: string | null) => {
    setShowVisualization(type);
  };

  const handlePurchase = (fund: any) => {
    toast({
      title: "Investment initiated",
      description: `You are now investing in ${fund.name}`,
    });
  };

  const suggestions = [
    "What's my current portfolio performance?",
    "Recommend funds based on my risk profile",
    "How am I progressing towards my goals?",
    "Explain my SIP investments",
    "What market trends should I be aware of?",
  ];
  
  // Mock data for visualizations
  const portfolioData = [
    { name: 'Equity', value: 62 },
    { name: 'Debt', value: 28 },
    { name: 'Gold', value: 5 },
    { name: 'Cash', value: 5 },
  ];
  
  const performanceData = [
    { month: 'Jan', value: 1000 },
    { month: 'Feb', value: 1020 },
    { month: 'Mar', value: 1070 },
    { month: 'Apr', value: 1050 },
    { month: 'May', value: 1080 },
    { month: 'Jun', value: 1150 },
  ];
  
  // Mock fund options
  const getMockFundOptions = () => [
    { id: 1, name: "HDFC Flexi Cap Fund", category: "Equity", nav: "₹875.43", returns: "15.6%", minInvestment: "₹5,000" },
    { id: 2, name: "ICICI Prudential Balanced Advantage", category: "Hybrid", nav: "₹52.67", returns: "12.3%", minInvestment: "₹1,000" },
    { id: 3, name: "Axis Bluechip Fund", category: "Equity", nav: "₹43.21", returns: "14.2%", minInvestment: "₹500" },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const portfolioChartConfig: ChartConfig = {
    Equity: { 
      color: '#0088FE',
      label: 'Equity'
    },
    Debt: { 
      color: '#00C49F',
      label: 'Debt'
    },
    Gold: { 
      color: '#FFBB28',
      label: 'Gold'
    },
    Cash: { 
      color: '#FF8042',
      label: 'Cash'
    },
  };

  const performanceChartConfig: ChartConfig = {
    value: {
      color: '#3E63DD',
      label: 'Portfolio Value'
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
      <Card className="flex-grow flex flex-col overflow-hidden">
        <ScrollArea className="flex-grow p-4">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start max-w-[90%] ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className={`${message.sender === "user" ? "ml-3" : "mr-3"} mt-0.5`}>
                    {message.sender === "ai" ? (
                      <>
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-finance-primary text-white">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src={user?.profileImage} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div className="max-w-full">
                    <div
                      className={`rounded-lg p-4 ${
                        message.sender === "ai"
                          ? "bg-muted text-foreground"
                          : "bg-finance-primary text-white"
                      }`}
                    >
                      {message.content}
                    </div>
                    <div
                      className={`text-xs text-gray-500 mt-1 ${
                        message.sender === "user" ? "text-right" : ""
                      }`}
                    >
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {showVisualization && (
              <div className="flex justify-start w-full pl-12 pr-4">
                <div className="w-full bg-card border border-border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium">
                      {showVisualization === "portfolio" ? "Portfolio Allocation" : "Performance Trend"}
                    </h3>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className={showVisualization === "portfolio" ? "bg-muted/50" : ""}
                        onClick={() => handleVisualizationToggle("portfolio")}
                      >
                        <PieChart className="h-3.5 w-3.5 mr-1" /> Allocation
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className={showVisualization === "performance" ? "bg-muted/50" : ""}
                        onClick={() => handleVisualizationToggle("performance")}
                      >
                        <LineChart className="h-3.5 w-3.5 mr-1" /> Performance
                      </Button>
                    </div>
                  </div>
                  
                  {showVisualization === "portfolio" ? (
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ChartContainer config={portfolioChartConfig}>
                          <RechartsPieChart>
                            <Pie
                              data={portfolioData}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {portfolioData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Legend />
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </RechartsPieChart>
                        </ChartContainer>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ChartContainer config={performanceChartConfig}>
                          <RechartsBarChart
                            data={performanceData}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="value" fill="#3E63DD" />
                          </RechartsBarChart>
                        </ChartContainer>
                      </ResponsiveContainer>
                    </div>
                  )}
                  
                  <div className="flex justify-end mt-3">
                    <Button size="sm" variant="outline" asChild>
                      <a href="/investments">
                        View Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {quickPurchaseOptions && (
              <div className="flex justify-start w-full pl-12 pr-4">
                <div className="w-full bg-card border border-border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium">Recommended Funds</h3>
                    <Button size="sm" variant="outline">
                      <SlidersHorizontal className="h-3.5 w-3.5 mr-1" /> Filter
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {quickPurchaseOptions.map((fund) => (
                      <div key={fund.id} className="flex justify-between items-center p-3 border border-border/50 rounded-md">
                        <div>
                          <div className="font-medium text-sm">{fund.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center mt-0.5">
                            <span className="inline-block w-2 h-2 rounded-full bg-finance-primary mr-1"></span>
                            {fund.category} • NAV: {fund.nav} • {fund.returns} (3Y)
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="h-8">
                            <ShoppingCart className="h-3 w-3 mr-1" /> SIP
                          </Button>
                          <Button 
                            size="sm" 
                            className="h-8 bg-finance-primary hover:bg-finance-primary/90"
                            onClick={() => handlePurchase(fund)}
                          >
                            <CreditCard className="h-3 w-3 mr-1" /> Invest
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end mt-3">
                    <Button size="sm" variant="outline" asChild>
                      <a href="/invest">
                        View All Funds <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start max-w-[90%]">
                  <Avatar className="mr-3 mt-0.5">
                    <AvatarFallback className="bg-finance-primary text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted text-foreground rounded-lg p-4">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t bg-card">
          <div className="mb-4 flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="text-xs bg-muted hover:bg-muted/80 text-foreground px-3 py-1.5 rounded-full transition-colors"
                onClick={() => handleSuggestion(suggestion)}
              >
                <div className="flex items-center">
                  <Lightbulb className="h-3 w-3 mr-1" />
                  {suggestion}
                </div>
              </button>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your investments, goals, or get recommendations..."
              className="flex-grow"
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={isLoading || !input.trim()}
              className="bg-finance-primary hover:bg-finance-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AIChat;
