
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";

interface GrowwAuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
}

const GrowwAuthLayout = ({ children, title, subtitle }: GrowwAuthLayoutProps) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Navigation Bar */}
      <header className="w-full py-4 px-6 md:px-10 flex justify-between items-center border-b">
        <div className="flex-shrink-0">
          <Logo />
        </div>
        <div className="flex gap-4">
          <Link to="/login">
            <Button 
              variant={isLoginPage ? "default" : "outline"} 
              className={isLoginPage ? "bg-[#8D6E63] text-white" : "text-[#8D6E63] border-[#8D6E63] hover:bg-[#EFEBE9]"}
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button 
              variant={!isLoginPage ? "default" : "outline"}
              className={!isLoginPage ? "bg-[#8D6E63] text-white" : "text-[#8D6E63] border-[#8D6E63] hover:bg-[#EFEBE9]"}
            >
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#5D4037]">{title}</h2>
            {subtitle && <div className="mt-2 text-sm text-gray-600">{subtitle}</div>}
          </div>

          <div className="bg-white p-6 md:p-8 shadow-md rounded-lg border border-gray-100">
            {children}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center text-sm text-gray-500 border-t">
        <p>© {new Date().getFullYear()} Keberiti. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GrowwAuthLayout;
