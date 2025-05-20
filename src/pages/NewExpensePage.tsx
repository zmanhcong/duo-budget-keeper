
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExpense } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import ExpenseForm, { ExpenseFormData } from '@/components/ExpenseForm';

const NewExpensePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      toast({
        title: 'Expense Added',
        description: 'Your expense has been added successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Error adding expense:', error);
      toast({
        title: 'Failed to add expense',
        description: 'There was an error adding your expense. Please try again.',
        variant: 'destructive',
      });
    }
  });
  
  const handleSubmit = (data: ExpenseFormData) => {
    if (!user) {
      toast({
        title: 'Authentication Error',
        description: 'You must be logged in to add an expense.',
        variant: 'destructive',
      });
      return;
    }
    
    mutation.mutate({
      ...data,
      amount: Number(data.amount), // Ensure amount is a number
      user_id: user.id,
    });
  };
  
  return (
    <Layout>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Add New Expense</h1>
          <p className="text-muted-foreground">Create a new expense record</p>
        </div>
        
        <ExpenseForm
          isSubmitting={mutation.isPending}
          onSubmit={handleSubmit}
        />
      </div>
    </Layout>
  );
};

export default NewExpensePage;
