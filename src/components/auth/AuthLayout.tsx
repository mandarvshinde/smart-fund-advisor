
import React from "react";
import Logo from "@/components/brand/Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: React.ReactNode;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Logo />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{title}</h2>
          {subtitle && <div className="mt-2 text-sm text-gray-600">{subtitle}</div>}
        </div>

        <div className="bg-white p-8 shadow-md rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
