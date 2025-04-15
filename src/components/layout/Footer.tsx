
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../brand/Logo';
import { Button } from '../ui/button';
import { MessageSquare } from 'lucide-react';

const Footer = () => {
  const handleWhatsAppChat = () => {
    window.open('https://wa.me/918446597048?text=Hello,%20I%20am%20interested%20in%20your%20investment%20services.', '_blank');
  };

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo className="h-17 w-auto" />
            <p className="text-md text-gray-600">
            The Algorithm of Prosperity.
            </p>
            <Button 
              onClick={handleWhatsAppChat} 
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/funds" className="text-sm text-gray-600 hover:text-[#8D6E63]">Explore Funds</Link></li>
              <li><Link to="/calculator" className="text-sm text-gray-600 hover:text-[#8D6E63]">Returns Calculator</Link></li>
              <li><Link to="/dashboard" className="text-sm text-gray-600 hover:text-[#8D6E63]">Portfolio Manager</Link></li>
              <li><Link to="/calculator" className="text-sm text-gray-600 hover:text-[#8D6E63]">SIP vs Lumpsum</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Fund Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/funds?category=equity" className="text-sm text-gray-600 hover:text-[#8D6E63]">Equity Funds</Link></li>
              <li><Link to="/funds?category=debt" className="text-sm text-gray-600 hover:text-[#8D6E63]">Debt Funds</Link></li>
              <li><Link to="/funds?category=hybrid" className="text-sm text-gray-600 hover:text-[#8D6E63]">Hybrid Funds</Link></li>
              <li><Link to="/funds?category=index" className="text-sm text-gray-600 hover:text-[#8D6E63]">Index Funds</Link></li>
              <li><Link to="/funds?category=elss" className="text-sm text-gray-600 hover:text-[#8D6E63]">ELSS Funds</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Contact Us</h3>
            <p className="text-sm text-gray-600 mb-2">kuberitifinancialservices@gmail.com</p>
            
            {/*<div className="bg-[#EFEBE9] p-4 rounded-lg mt-4">
              <h4 className="font-medium text-[#5D4037] mb-2">Ready to Optimize Your Investments?</h4>
              <p className="text-sm text-gray-600 mb-3">Join Kuberiti today and take advantage of our powerful tools to research, analyze, and manage your mutual fund portfolio.</p>
              <Button asChild className="w-full">
                <Link to="/register">Start Investing Now</Link>
              </Button>
            </div>*/}
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-2 md:mb-0">© {new Date().getFullYear()} Kuberiti. All rights reserved. | ARN-323568</p>
          <div className="flex space-x-4">
            <Link to="/about" className="text-sm text-gray-600 hover:text-[#8D6E63]">About Us</Link>
            <a href="#" className="text-sm text-gray-600 hover:text-[#8D6E63]">Terms</a>
            <a href="#" className="text-sm text-gray-600 hover:text-[#8D6E63]">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
