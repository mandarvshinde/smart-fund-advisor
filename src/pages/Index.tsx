
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import Logo from '@/components/brand/Logo';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield, TrendingUp, Target, BarChart3, Calculator, MessageSquare, CheckCircle, LockKeyhole, DollarSign, Users, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const { isLoading, user } = useUser();
  
  useEffect(() => {
    document.title = 'Kuberiti - Intelligent Investment Portfolio Management';
  }, []);

  // Show loading indicator while auth state is being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5D4037]"></div>
      </div>
    );
  }
  
  const handleWhatsAppChat = () => {
    window.open('https://wa.me/918446597048?text=Hello,%20I%20am%20interested%20in%20your%20investment%20services.', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Logo className="h-10" />
            <div className="hidden md:flex space-x-4 mx-auto">
              <Link to="/funds" className="text-gray-700 font-medium hover:text-[#8D6E63]">Explore Funds</Link>
              <Link to="/calculator" className="text-gray-700 font-medium hover:text-[#8D6E63]">Calculator</Link>
              <Link to="/about" className="text-gray-700 font-medium hover:text-[#8D6E63]">About Us</Link>
            </div>
            <div className="flex space-x-4">
              {user ? (
                <Button asChild className="bg-[#8D6E63] hover:bg-[#6D4C41] text-white">
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" className="text-[#8D6E63] border-[#8D6E63] hover:bg-[#EFEBE9]">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild className="bg-[#8D6E63] hover:bg-[#6D4C41] text-white">
                    <Link to="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#EFEBE9] to-[#FEF7CD] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#5D4037] leading-tight">
                Smart Investment Solutions for Your Future
              </h1>
              <p className="mt-6 text-lg text-gray-700">
                Take control of your financial future with an intelligent investment portfolio—customized to your goals and risk profile. From beginners to seasoned investors, make smarter, data-driven decisions with powerful insights and comprehensive analysis.
              </p>
              
              <Card className="mt-8 bg-white/80 backdrop-blur shadow-md border-2 border-[#D7CCC8]">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl text-[#5D4037] mb-3">Get Started Now</h3>
                  <h4 className="font-medium text-[#8D6E63] mb-2">What Kuberiti Offers:</h4>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Search and compare 5000+ mutual funds</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Track performance with advanced analytics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Analyze fund holdings and sector exposure</span>
                    </li>
                  </ul>
                  <Button onClick={handleWhatsAppChat} size="lg" className="w-full bg-green-600 hover:bg-green-700">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Chat with Us
                  </Button>
                </CardContent>
              </Card>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#8D6E63] hover:bg-[#6D4C41] text-white">
                  <Link to="/funds">
                    Explore Funds
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-[#8D6E63] border-[#8D6E63] hover:bg-[#EFEBE9]">
                  <Link to="/calculator">
                    <Calculator className="mr-2 h-5 w-5" />
                    Investment Calculator
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="/lovable-uploads/51289d21-30ea-4bc6-bc74-ca4b8c933683.png"
                alt="Kuberiti Investment"
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#5D4037]">More About Kuberiti</h2>
          </div>
          
          <div className="space-y-8">
            <div className="bg-[#EFEBE9] p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#5D4037] mb-3">Expert Guidance at Your Fingertips</h3>
              <p className="text-gray-700">
                Kuberiti connects you with financial experts who provide personalized recommendations, portfolio reviews, and investment planning. Simply send us a WhatsApp message and our experts will guide you through your investment journey.
              </p>
            </div>
            
            <div className="bg-[#EFEBE9] p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#5D4037] mb-3">100% Safe Transactions</h3>
              <p className="text-gray-700">
                We've integrated with Bombay Stock Exchange to process your transactions securely. Your money goes directly from you to BSE and then to the mutual fund company, completely bypassing Kuberiti's accounts for maximum security and transparency.
              </p>
            </div>
            
            <div className="bg-[#EFEBE9] p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-[#5D4037] mb-3">No Hidden Fees</h3>
              <p className="text-gray-700">
                With Kuberiti, you invest in Regular Mutual Funds. The mutual fund companies pay us a small commission, which means there are absolutely no extra fees or hidden charges for you. We prioritize transparency in all our operations.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-[#5D4037] mb-6">Learn More About Our Services</h3>
            <div className="bg-[#EFEBE9] p-8 rounded-lg shadow-sm max-w-3xl mx-auto">
              <h4 className="text-lg font-medium text-[#5D4037] mb-3">Get Expert Help Now</h4>
              <p className="mb-4">
                Ready to start your investment journey? Our financial experts are just a message away. Connect with us on WhatsApp and get personalized guidance for your mutual fund investments.
              </p>
              
              <div className="bg-white p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">What our experts can help you with:</h5>
                <ul className="space-y-2 text-left">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Personalized fund recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Portfolio reviews and optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>SIP planning and management</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Goal-based investment strategies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Tax-efficient investment advice</span>
                  </li>
                </ul>
              </div>
              
              <Button onClick={handleWhatsAppChat} size="lg" className="bg-green-600 hover:bg-green-700 w-full">
                <MessageSquare className="mr-2 h-5 w-5" />
                Chat with an Expert on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* "Connect with an expert" Section - Updated */}
      <section className="py-16 bg-gradient-to-r from-[#EFEBE9] to-[#FEF7CD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-[#D7CCC8] p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-[#5D4037]" />
              </div>
              <h3 className="text-xl font-semibold text-[#5D4037] mb-3">Connect with an expert</h3>
              <p className="text-gray-700 mb-4">
                100% Safe Transactions
              </p>
              <p className="text-gray-700 mb-4">
                Your money goes directly from you to Asset Management Companies (AMCs) ensuring complete safety.
              </p>
              <Button asChild variant="outline" className="w-full mt-2" onClick={handleWhatsAppChat}>
                <Link to="#">
                  Connect with an expert
                </Link>
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-[#D7CCC8] p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <LockKeyhole className="h-8 w-8 text-[#5D4037]" />
              </div>
              <h3 className="text-xl font-semibold text-[#5D4037] mb-3">100% Safe Transactions</h3>
              <p className="text-gray-700 mb-4">
                Your money goes directly from you to BSE and then to the Mutual Fund company via our BSE integration, ensuring complete safety.
              </p>
              <p className="text-sm font-medium text-[#5D4037]">
                ARN-323568 - Registered with Association of Mutual Funds in India
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-[#D7CCC8] p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <DollarSign className="h-8 w-8 text-[#5D4037]" />
              </div>
              <h3 className="text-xl font-semibold text-[#5D4037] mb-3">Transparent Fee Structure</h3>
              <p className="text-gray-700 mb-4">
                You invest in Regular Mutual Funds, with Kuberiti earning a small commission from the fund houses. We charge no additional fees.
              </p>
              <Button asChild className="w-full mt-2">
                <Link to="/funds">
                  Start investing
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button onClick={handleWhatsAppChat} size="lg" className="bg-green-600 hover:bg-green-700">
              <MessageSquare className="mr-2 h-5 w-5" />
              Chat with us on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#5D4037]">What Our Users Say</h2>
          <p className="text-lg mb-12 max-w-2xl mx-auto">
            Join thousands of investors who trust Kuberiti for their mutual fund investment journey.
          </p>
          
          <div className="bg-[#EFEBE9] p-8 rounded-lg shadow-sm max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-[#5D4037]">Ready to Optimize Your Mutual Fund Investments?</h3>
            <p className="mb-8">
              Join Kuberiti today and take advantage of our powerful tools to research, analyze, and manage your mutual fund portfolio.
            </p>
            
            <Button asChild size="lg" className="bg-[#8D6E63] hover:bg-[#6D4C41] text-white">
              <Link to="/register">
                Start Investing Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Features Section */}
      <section className="py-16 bg-[#EFEBE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-[#5D4037]">Contact Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mb-3 text-[#8D6E63]">
                <BarChart3 className="h-10 w-10 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2 text-[#5D4037]">5000+ Mutual Funds</h3>
              <p className="text-sm text-gray-600">Comprehensive coverage of all funds</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mb-3 text-[#8D6E63]">
                <TrendingUp className="h-10 w-10 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2 text-[#5D4037]">Real-Time Analytics</h3>
              <p className="text-sm text-gray-600">Up-to-date performance metrics</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mb-3 text-[#8D6E63]">
                <Calculator className="h-10 w-10 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2 text-[#5D4037]">SIP & Lumpsum Options</h3>
              <p className="text-sm text-gray-600">Flexible investment approaches</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mb-3 text-[#8D6E63]">
                <Target className="h-10 w-10 mx-auto" />
              </div>
              <h3 className="font-semibold mb-2 text-[#5D4037]">Personalized Portfolio</h3>
              <p className="text-sm text-gray-600">Tailored to your financial goals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer is in PageLayout now */}
    </div>
  );
};

export default Index;
