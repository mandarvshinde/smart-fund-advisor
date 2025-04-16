import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import Logo from '@/components/brand/Logo';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield, TrendingUp, Target, BarChart3, Calculator, MessageSquare, CheckCircle, LockKeyhole, DollarSign, Users, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/layout/Footer';
import { PopularFunds } from '@/components/dashboard/PopularFunds';

const Index = () => {
  const { isLoading, user } = useUser();
  
  useEffect(() => {
    document.title = 'Kuberiti';
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-17 w-12 border-t-2 border-b-2 border-[#5D4037]"></div>
      </div>
    );
  }
  
  const handleWhatsAppChat = () => {
    window.open('https://wa.me/918446597048?text=Hello,%20I%20am%20interested%20in%20your%20investment%20services.', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-[#EFEBE9] to-[#FEF7CD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Logo className="h-17" />
            <div className="hidden md:flex space-x-16 mx-auto">
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

      <section className="bg-gradient-to-r from-[#EFEBE9] to-[#FEF7CD] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#5D4037] leading-tight">
                Smart Investment Solutions for Your Future
              </h1>
              <p className="mt-6 text-lg text-gray-700">
                Take control of your financial future with an intelligent investment portfolio customized to your goals and risk profile. From beginners to seasoned investors, make smarter, data-driven decisions with powerful insights and comprehensive analysis.
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
                    </li><li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Portfolio reviews and recommendations</span>
                    </li><li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Help choosing SIP or lumpsum investment options</span>
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
                alt="Kuberiti"
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#EFEBE9] to-[#FEF7CD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#5D4037]">
            Explore Popular Mutual Funds
          </h2>
          <PopularFunds />
        </div>
      </section>

      <div className="bg-gradient-to-r from-[#EFEBE9] to-[#FEF7CD] max-w-8xl mx-auto px-8 sm:px-4 lg:px-12 ">
        <div className="bg-gradient-to-r from-[#EFEBE9] to-[#FEF7CD] max-w-7xl mx-auto px-8 sm:px-4 lg:px-12 text-center mb-8 py-1">
          <h2 className="text-3xl font-bold text-[#5D4037]">
            Helping You Choose the Right Investment, Every Time
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#a5d6a7] p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-[#4E342E] mb-6">AI-Powered Fund Matching</h3>
            <p className="text-gray-700 text-sm">
              We analyze thousands of schemes so you don't have to—our intelligent engine matches you with funds that fit your profile, goals, and risk appetite.
            </p>
          </div>

          <div className="bg-[#a5d6a7] p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-[#4E342E] mb-6">Expert-Curated Recommendations</h3>
            <p className="text-gray-700 text-sm">
              Backed by research, powered by data—every suggestion is vetted by finance pros and market trends.
            </p>
          </div>

          <div className="bg-[#448aff] p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-[#4E342E] mb-6">Goal-Based Filtering</h3>
            <p className="text-gray-700 text-sm">
              Whether it’s wealth creation, tax saving, or retirement planning—we recommend what’s right for your purpose.
            </p>
          </div>

          <div className="bg-[#448aff] p-6 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-[#4E342E] mb-6">Real-Time Performance Tracking</h3>
            <p className="text-gray-700 text-sm">
              We continuously monitor fund performance, so you stay invested in what works best—always.
            </p>
          </div>
        </div>
      </div>
          
      <div>
      
        <section className="py-16 bg-gradient-to-r from-[#EFEBE9] to-[#FEF7CD]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="bg-[#D7CCC8] p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-[#5D4037]" />
                </div>
                <h3 className="text-xl font-semibold text-[#5D4037] mb-3">Connect with an expert</h3>
                <p className="text-gray-700 mb-4">
                Need help with your investments? Our experts are here to help you make confident, informed decisions. Our experts offer personalized guidance tailored to your financial goals.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="bg-[#D7CCC8] p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <LockKeyhole className="h-8 w-8 text-[#5D4037]" />
                </div>
                <h3 className="text-xl font-semibold text-[#5D4037] mb-3">100% Safe Transactions</h3>
                <p className="text-gray-700 mb-4">
                Your money goes directly from you to Asset Management Companies (AMCs) ensuring complete safety.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="bg-[#D7CCC8] p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                  <DollarSign className="h-8 w-8 text-[#5D4037]" />
                </div>
                <h3 className="text-xl font-semibold text-[#5D4037] mb-3">Transparent Fee Structure</h3>
                <p className="text-gray-700 mb-4">
                  You invest in Regular Mutual Funds, with Kuberiti earning a small commission from the fund houses. We charge no additional fees.
                </p>
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
      </div>

      <section className="py-16 bg-gradient-to-r from-[#EFEBE9] to-[#FEF7CD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mb-3 text-[#8D6E63]">
                <BarChart3 className="h-10 w-10 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold mb-8 text-center text-[#5D4037]">Explore</h2>
              <h3 className="font-semibold mb-2 text-[#5D4037]">5000+ Mutual Funds</h3>
              <p className="text-sm text-gray-600">Comprehensive coverage of all funds</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mb-3 text-[#8D6E63]">
                <TrendingUp className="h-10 w-10 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold mb-8 text-center text-[#5D4037]">Analyze</h2>
              <h3 className="font-semibold mb-2 text-[#5D4037]">Real-Time Analytics</h3>
              <p className="text-sm text-gray-600">Up-to-date performance metrics</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mb-3 text-[#8D6E63]">
                <Calculator className="h-10 w-10 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold mb-8 text-center text-[#5D4037]">Invest</h2>
              <h3 className="font-semibold mb-2 text-[#5D4037]">SIP & Lumpsum Options</h3>
              <p className="text-sm text-gray-600">Flexible investment approaches</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="mb-3 text-[#8D6E63]">
                <Target className="h-10 w-10 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold mb-8 text-center text-[#5D4037]">Personalized for You</h2>
              <h3 className="font-semibold mb-2 text-[#5D4037]">Personalized Portfolio</h3>
              <p className="text-sm text-gray-600">Tailored to your financial goals</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
