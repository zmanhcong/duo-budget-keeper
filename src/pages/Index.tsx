
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-budget-purple-light to-white">
      <div className="text-center">
        <div className="h-12 w-12 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
        <Skeleton className="h-8 w-48 mx-auto mb-2" />
        <Skeleton className="h-4 w-64 mx-auto" />
      </div>
    </div>
  );
};

export default Index;
