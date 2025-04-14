
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  backLink?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  backLink
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#EFEBE9]">
      <Navbar />
      
      <main className="flex-grow">
        {(title || subtitle) && (
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center space-x-4">
                {backLink && (
                  <Button variant="ghost" size="sm" asChild className="mr-2">
                    <Link to={backLink}>
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back
                    </Link>
                  </Button>
                )}
                <div>
                  {title && <h1 className="text-2xl font-semibold text-[#5D4037]">{title}</h1>}
                  {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PageLayout;
