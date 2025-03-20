
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, isLoading } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is logged out after being authenticated, redirect to login
    if (!isLoading && !user) {
      navigate('/login', { state: { from: location }, replace: true });
    }
  }, [user, isLoading, navigate, location]);

  if (isLoading) {
    // Display a simple loading state while checking user session
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
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
