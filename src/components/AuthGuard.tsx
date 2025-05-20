
import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      console.log('User not authenticated, redirecting to login');
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-4 p-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
