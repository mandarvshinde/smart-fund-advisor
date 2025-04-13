
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, isLoading } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  useEffect(() => {
    // Safety timeout to prevent infinite loading
    const timer = setTimeout(() => {
      setLoadingTimeout(true);
    }, 5000); // 5 seconds timeout
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If user is logged out after being authenticated, redirect to login
    if (!isLoading && !user) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [user, isLoading, navigate, location]);

  // If loading takes too long, force navigation to login
  if (loadingTimeout && isLoading) {
    console.log("AuthGuard loading timeout reached, forcing navigation");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isLoading) {
    // Display a simple loading state while checking user session
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8D6E63] mr-3"></div>
        <div className="text-lg text-[#5D4037]">Loading...</div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page if no user is found
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
};

export default AuthGuard;
