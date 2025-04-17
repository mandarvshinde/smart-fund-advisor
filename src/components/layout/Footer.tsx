
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
    <footer className="bg-gradient-to-r from-[#1A1F2C] to-[#2D1A38] text-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo className="h-17 w-auto" />
            <Button 
              onClick={handleWhatsAppChat} 
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat with Us
            </Button>
          </div>
          
          <div>
            <h3 className="font-medium text-[#9b87f5] mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/funds" className="text-sm text-gray-300 hover:text-white transition-colors">Explore Funds</Link></li>
              <li><Link to="/calculator" className="text-sm text-gray-300 hover:text-white transition-colors">Returns Calculator</Link></li>
              <li><Link to="/dashboard" className="text-sm text-gray-300 hover:text-white transition-colors">Portfolio Manager</Link></li>
              <li><Link to="/calculator" className="text-sm text-gray-300 hover:text-white transition-colors">SIP vs Lumpsum</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-[#9b87f5] mb-3">Fund Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/funds?category=equity" className="text-sm text-gray-300 hover:text-white transition-colors">Equity Funds</Link></li>
              <li><Link to="/funds?category=debt" className="text-sm text-gray-300 hover:text-white transition-colors">Debt Funds</Link></li>
              <li><Link to="/funds?category=hybrid" className="text-sm text-gray-300 hover:text-white transition-colors">Hybrid Funds</Link></li>
              <li><Link to="/funds?category=index" className="text-sm text-gray-300 hover:text-white transition-colors">Index Funds</Link></li>
              <li><Link to="/funds?category=elss" className="text-sm text-gray-300 hover:text-white transition-colors">ELSS Funds</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-[#9b87f5] mb-3">Contact Us</h3>
            <p className="text-sm text-gray-300 mb-2">kuberitifinancialservices@gmail.com</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-2 md:mb-0">© {new Date().getFullYear()} Kuberiti. All rights reserved. | ARN-323568</p>
          <div className="flex space-x-4">
            <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</Link>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
