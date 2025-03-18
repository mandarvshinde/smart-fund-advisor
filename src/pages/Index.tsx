
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    document.title = 'SmartFund - Intelligent Mutual Fund Portfolio Management';
  }, []);

  // Redirect to the dashboard page
  return <Navigate to="/dashboard" replace />;
};

export default Index;
