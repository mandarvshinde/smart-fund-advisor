
import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  title, 
  subtitle 
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {(title || subtitle) && (
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {title && <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>}
              {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>
      
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <span className="text-sm text-gray-500">© 2023 SmartFund. All rights reserved.</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-finance-primary">Terms</a>
              <a href="#" className="text-sm text-gray-500 hover:text-finance-primary">Privacy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-finance-primary">Help</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;
