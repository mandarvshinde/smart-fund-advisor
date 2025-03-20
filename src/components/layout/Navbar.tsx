
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
  Target
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

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSignOut = () => {
    // Clear any user data or tokens from localStorage if they exist
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    toast({
      title: "Signed out",
      description: "You have been signed out of your account.",
    });
    
    // Redirect to login page
    navigate('/login');
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
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <TrendingUp className="h-8 w-8 text-finance-primary" />
              <span className="ml-2 text-xl font-bold text-finance-primary">SmartFund</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-2">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-finance-primary transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link
                to="/investments"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-finance-primary transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <PieChart className="h-4 w-4" />
                  <span>Investments</span>
                </div>
              </Link>
              <Link
                to="/goals"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-finance-primary transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <Target className="h-4 w-4" />
                  <span>Goals</span>
                </div>
              </Link>
              <Link
                to="/advisor"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-finance-primary transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <HelpCircle className="h-4 w-4" />
                  <span>AI Advisor</span>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="sm"
              className="mr-2 hidden sm:flex"
              asChild
            >
              <Link to="/invest">Invest Now</Link>
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
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-finance-primary"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </div>
            </Link>
            <Link
              to="/investments"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-finance-primary"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <PieChart className="h-5 w-5" />
                <span>Investments</span>
              </div>
            </Link>
            <Link
              to="/goals"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-finance-primary"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Goals</span>
              </div>
            </Link>
            <Link
              to="/advisor"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-finance-primary"
              onClick={toggleMenu}
            >
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5" />
                <span>AI Advisor</span>
              </div>
            </Link>
            <Link
              to="/invest"
              className="block px-3 py-2 rounded-md text-base font-medium bg-finance-primary text-white"
              onClick={toggleMenu}
            >
              Invest Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
