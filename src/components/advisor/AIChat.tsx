
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Lightbulb } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ChatMessage } from "@/types";
import { useUser } from "@/context/UserContext";

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

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
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

  const suggestions = [
    "What's my current portfolio performance?",
    "Recommend funds based on my risk profile",
    "How am I progressing towards my goals?",
    "Explain my SIP investments",
    "What market trends should I be aware of?",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
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
                  className={`flex items-start max-w-[85%] ${
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
                  <div>
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
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start max-w-[85%]">
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
