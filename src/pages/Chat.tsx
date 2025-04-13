
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, ArrowLeft, Linkedin } from 'lucide-react';

const Chat = () => {
  useEffect(() => {
    document.title = "Chat with Us | Keberiti";
    
    // Automatically redirect to WhatsApp after a short delay
    const timer = setTimeout(() => {
      window.location.href = 'https://wa.me/918446597048?text=Hello,%20I%20am%20interested%20in%20your%20investment%20services.';
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    window.location.href = 'https://wa.me/918446597048?text=Hello,%20I%20am%20interested%20in%20your%20investment%20services.';
  };

  return (
    <PageLayout 
      title="Contact Us" 
      subtitle="We're here to help with all your investment needs"
    >
      <div className="max-w-2xl mx-auto">
        <Card className="border shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#5D4037]">Chat with Our Experts</CardTitle>
            <CardDescription>
              You'll be redirected to WhatsApp in a few seconds to chat with our investment advisor.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="animate-pulse text-green-500">
                <MessageSquare size={64} />
              </div>
            </div>
            
            <div className="bg-[#EFEBE9] rounded-lg p-4">
              <p className="text-center text-[#5D4037] font-medium">
                For quick assistance, connect with our investment advisor directly on WhatsApp:
                <span className="block mt-2 font-bold">+91 8446597048</span>
              </p>
            </div>
            
            <div className="space-y-3">
              <p className="text-center font-medium">Other ways to reach us:</p>
              <div className="flex justify-center space-x-6">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-[#8D6E63]" />
                  <span>kuberitifinancialservices@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Linkedin className="h-5 w-5 mr-2 text-[#8D6E63]" />
                  <a 
                    href="https://www.linkedin.com/company/keberiti-financial-services" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Link>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleWhatsAppClick}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Chat;
