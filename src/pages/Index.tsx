
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

const Index = () => {
  const { isLoading, session } = useUser();
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  
  useEffect(() => {
    document.title = 'SmartFund - Intelligent Mutual Fund Portfolio Management';
    
    // Safety timeout to prevent infinite loading
    const timer = setTimeout(() => {
      setLoadingTimeout(true);
    }, 5000); // 5 seconds timeout
    
    return () => clearTimeout(timer);
  }, []);

  // If loading takes too long, force navigation to login
  if (loadingTimeout && isLoading) {
    console.log("Loading timeout reached, forcing navigation");
    return <Navigate to="/login" replace />;
  }

  // Show loading indicator while auth state is being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-finance-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated, otherwise to dashboard
  return <Navigate to={session ? "/dashboard" : "/login"} replace />;
};

export default Index;
