
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import Logo from '@/components/brand/Logo';
import { Button } from '@/components/ui/button';
import { ChevronRight, Shield, TrendingUp, Target } from 'lucide-react';

const Index = () => {
  const { isLoading, session } = useUser();
  
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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Logo className="h-10" />
            <div className="flex space-x-4">
              {session ? (
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
                Kuberiti helps you build and manage an intelligent investment portfolio 
                tailored to your financial goals and risk appetite.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-[#8D6E63] hover:bg-[#6D4C41] text-white">
                  <Link to="/register">
                    Start Investing
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-[#8D6E63] border-[#8D6E63] hover:bg-[#EFEBE9]">
                  <Link to="/login">Login to Your Account</Link>
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
            <h2 className="text-3xl font-bold text-[#5D4037]">Why Choose Kuberiti</h2>
            <p className="mt-4 text-lg text-gray-600">
              Intelligent investment solutions designed for your financial growth
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#EFEBE9] p-8 rounded-lg shadow-sm">
              <div className="bg-[#D7CCC8] p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-[#5D4037]" />
              </div>
              <h3 className="text-xl font-semibold text-[#5D4037] mb-3">Secure Investments</h3>
              <p className="text-gray-700">
                Your investments are secured with industry-leading security practices and regular portfolio monitoring.
              </p>
            </div>
            
            <div className="bg-[#EFEBE9] p-8 rounded-lg shadow-sm">
              <div className="bg-[#D7CCC8] p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-[#5D4037]" />
              </div>
              <h3 className="text-xl font-semibold text-[#5D4037] mb-3">Smart Portfolio</h3>
              <p className="text-gray-700">
                AI-powered portfolio management that adapts to market conditions and your financial goals.
              </p>
            </div>
            
            <div className="bg-[#EFEBE9] p-8 rounded-lg shadow-sm">
              <div className="bg-[#D7CCC8] p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-[#5D4037]" />
              </div>
              <h3 className="text-xl font-semibold text-[#5D4037] mb-3">Goal-Based Planning</h3>
              <p className="text-gray-700">
                Create and track financial goals with personalized investment plans to achieve your dreams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#8D6E63] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Investment Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of investors who trust Kuberiti for their financial growth and wealth management.
          </p>
          <Button asChild size="lg" className="bg-white text-[#5D4037] hover:bg-gray-100">
            <Link to="/register">Create Your Account Today</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <Logo className="h-8 w-auto mr-2" />
              <span className="text-sm text-gray-500">© {new Date().getFullYear()} All rights reserved.</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-[#8D6E63]">Terms</a>
              <a href="#" className="text-sm text-gray-500 hover:text-[#8D6E63]">Privacy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-[#8D6E63]">Help</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
