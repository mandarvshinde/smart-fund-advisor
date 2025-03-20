
import { Link, Navigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import LegalLinks from "@/components/auth/LegalLinks";

const Register = () => {
  const { user, isLoading } = useUser();
  
  // If already logged in, redirect to dashboard
  if (user && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout 
      title="Create your account"
      subtitle={
        <>
          Or{" "}
          <Link to="/login" className="font-medium text-finance-primary hover:text-finance-primary/80">
            sign in to existing account
          </Link>
        </>
      }
    >
      <RegisterForm />
      <LegalLinks />
    </AuthLayout>
  );
};

export default Register;
