
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';

const Index = () => {
  const { isLoading, session } = useUser();
  
  useEffect(() => {
    document.title = 'SmartFund - Intelligent Mutual Fund Portfolio Management';
  }, []);

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
