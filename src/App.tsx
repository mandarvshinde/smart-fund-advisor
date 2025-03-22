
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/context/UserContext";
import AuthGuard from "./components/auth/AuthGuard";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Investments from "./pages/Investments";
import Invest from "./pages/Invest";
import Advisor from "./pages/Advisor";
import Settings from "./pages/Settings";
import Goals from "./pages/Goals";
import GoalDetail from "./pages/GoalDetail";
import GoalCreate from "./pages/GoalCreate";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Protected routes */}
            <Route path="/" element={<Index />} />
            <Route 
              path="/dashboard" 
              element={
                <AuthGuard>
                  <Dashboard />
                </AuthGuard>
              } 
            />
            <Route 
              path="/investments" 
              element={
                <AuthGuard>
                  <Investments />
                </AuthGuard>
              } 
            />
            <Route 
              path="/invest" 
              element={
                <AuthGuard>
                  <Invest />
                </AuthGuard>
              } 
            />
            <Route 
              path="/advisor" 
              element={
                <AuthGuard>
                  <Advisor />
                </AuthGuard>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <AuthGuard>
                  <Settings />
                </AuthGuard>
              } 
            />
            <Route 
              path="/goals" 
              element={
                <AuthGuard>
                  <Goals />
                </AuthGuard>
              } 
            />
            <Route 
              path="/goals/:id" 
              element={
                <AuthGuard>
                  <GoalDetail />
                </AuthGuard>
              } 
            />
            <Route 
              path="/goals/create" 
              element={
                <AuthGuard>
                  <GoalCreate />
                </AuthGuard>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
