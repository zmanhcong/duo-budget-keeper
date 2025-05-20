
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AuthGuard from "@/components/AuthGuard";

import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import NewExpensePage from "@/pages/NewExpensePage";
import EditExpensePage from "@/pages/EditExpensePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route path="/dashboard" element={
              <AuthGuard>
                <DashboardPage />
              </AuthGuard>
            } />
            
            <Route path="/expenses/new" element={
              <AuthGuard>
                <NewExpensePage />
              </AuthGuard>
            } />
            
            <Route path="/expenses/:id/edit" element={
              <AuthGuard>
                <EditExpensePage />
              </AuthGuard>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
