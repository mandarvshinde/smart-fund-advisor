
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, isLoading } = useUser();
  const location = useLocation();

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
