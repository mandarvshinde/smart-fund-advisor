
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Bell, 
  Menu, 
  X, 
  User as UserIcon, 
  Settings, 
  LogOut, 
  HelpCircle,
  TrendingUp,
  Home,
  PieChart,
  Target,
  Calculator,
  MessageSquare,
  BarChart3,
  Info
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "@/components/brand/Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  const handleWhatsAppChat = () => {
    window.open('https://wa.me/918446597048?text=Hello,%20I%20am%20interested%20in%20your%20investment%20services.', '_blank');
  };

  useEffect(() => {
    // Close the menu when resizing to desktop
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-17">
          <div className="flex items-center">
            <Logo className="flex-shrink-0" />
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-2">
              <Link
                to="/dashboard"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-[#8D6E63] transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <Home className="h-6 w-6" />
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link
                to="/investments"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-[#8D6E63] transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <PieChart className="h-6 w-6" />
                  <span>Investments</span>
                </div>
              </Link>
              <Link
                to="/funds"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-[#8D6E63] transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <BarChart3 className="h-6 w-6" />
                  <span>Explore Funds</span>
                </div>
              </Link>
              <Link
                to="/goals"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-[#8D6E63] transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <Target className="h-6 w-6" />
                  <span>Goals</span>
                </div>
              </Link>
              <Link
                to="/calculator"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-[#8D6E63] transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <Calculator className="h-6 w-6" />
                  <span>Calculator</span>
                </div>
              </Link>
              <Link
                to="/advisor"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-[#8D6E63] transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <HelpCircle className="h-6 w-6" />
                  <span>AI Advisor</span>
                </div>
              </Link>
              <Link
                to="/about"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-[#8D6E63] transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <Info className="h-6 w-6" />
                  <span>About Us</span>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="sm"
              className="mr-2 hidden sm:flex text-[#8D6E63] border-[#8D6E63] hover:bg-[#EFEBE9]"
              onClick={handleWhatsAppChat}
            >
              <MessageSquare className="mr-1.5 h-4 w-4" />
              Chat with us
            </Button>
            
            <div className="ml-3 relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profileImage} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer flex items-center">
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden ml-2">
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-[#8D6E63]"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link
              to="/investments"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-[#8D6E63]"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Investments</span>
              </div>
            </Link>
            <Link
              to="/funds"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-[#8D6E63]"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Explore Funds</span>
              </div>
            </Link>
            <Link
              to="/goals"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-[#8D6E63]"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Goals</span>
              </div>
            </Link>
            <Link
              to="/calculator"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-[#8D6E63]"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <Calculator className="h-5 w-5" />
                <span>Calculator</span>
              </div>
            </Link>
            <Link
              to="/advisor"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-[#8D6E63]"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5" />
                <span>AI Advisor</span>
              </div>
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-[#8D6E63]"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>About Us</span>
              </div>
            </Link>
            <div
              className="block px-3 py-2 rounded-md text-base font-medium bg-[#8D6E63] text-white"
              onClick={() => {
                toggleMenu();
                handleWhatsAppChat();
              }}
            >
              <div className="flex items-center space-x-2 cursor-pointer">
                <MessageSquare className="h-5 w-5" />
                <span>Chat with us</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
