
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getExpenseById, updateExpense, deleteExpense } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import ExpenseForm, { ExpenseFormData } from '@/components/ExpenseForm';
import { Skeleton } from '@/components/ui/skeleton';

const EditExpensePage = () => {
  const { id = '' } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: expense, isLoading, error } = useQuery({
    queryKey: ['expense', id],
    queryFn: () => getExpenseById(id),
    enabled: !!id,
  });
  
  const updateMutation = useMutation({
    mutationFn: updateExpense,
    onSuccess: () => {
      toast({
        title: 'Expense Updated',
        description: 'Your expense has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Error updating expense:', error);
      toast({
        title: 'Failed to update expense',
        description: 'There was an error updating your expense. Please try again.',
        variant: 'destructive',
      });
    }
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      toast({
        title: 'Expense Deleted',
        description: 'Your expense has been deleted successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Error deleting expense:', error);
      toast({
        title: 'Failed to delete expense',
        description: 'There was an error deleting your expense. Please try again.',
        variant: 'destructive',
      });
    }
  });
  
  const handleSubmit = (data: ExpenseFormData) => {
    if (!user || !expense) {
      toast({
        title: 'Error',
        description: 'Cannot update expense. Please try again.',
        variant: 'destructive',
      });
      return;
    }
    
    updateMutation.mutate({
      ...data,
      id,
      user_id: expense.user_id,
    });
  };
  
  const handleDelete = () => {
    if (!id) return;
    deleteMutation.mutate(id);
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl space-y-6">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !expense) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl text-center py-10">
          <h1 className="text-2xl font-bold mb-4">Expense Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The expense you're looking for couldn't be found or you don't have permission to view it.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-primary hover:underline"
          >
            Return to Dashboard
          </button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Edit Expense</h1>
          <p className="text-muted-foreground">Update or delete this expense</p>
        </div>
        
        <ExpenseForm
          defaultValues={{
            amount: expense.amount,
            category: expense.category || '',
            note: expense.note || '',
          }}
          isSubmitting={updateMutation.isPending}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      </div>
    </Layout>
  );
};

export default EditExpensePage;
