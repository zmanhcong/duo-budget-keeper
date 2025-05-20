
import { supabase } from './supabase';
import { Tables } from './supabase';
import { format, parseISO, startOfMonth, endOfMonth } from 'date-fns';

// Expense types
export type Expense = Tables['expenses']['Row'];
export type NewExpense = Tables['expenses']['Insert'];
export type UpdateExpense = Tables['expenses']['Update'];

// Categories for expenses
export const EXPENSE_CATEGORIES = [
  'Food', 
  'Housing', 
  'Transportation', 
  'Utilities', 
  'Healthcare', 
  'Personal', 
  'Entertainment', 
  'Education', 
  'Clothing', 
  'Gifts', 
  'Other'
];

// Helper function to format date strings
export const formatDate = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, 'dd/MM/yyyy');
};

// Get all expenses for the current user for a specific month
export const getMonthlyExpenses = async (year: number, month: number) => {
  const startDate = startOfMonth(new Date(year, month - 1));
  const endDate = endOfMonth(new Date(year, month - 1));
  
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .gte('created_at', startDate.toISOString())
    .lte('created_at', endDate.toISOString())
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
};

// Get a specific expense by ID
export const getExpenseById = async (id: string) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Create a new expense
export const createExpense = async (expense: NewExpense) => {
  const { data, error } = await supabase
    .from('expenses')
    .insert(expense)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Update an existing expense
export const updateExpense = async ({ id, ...expense }: UpdateExpense & { id: string }) => {
  const { data, error } = await supabase
    .from('expenses')
    .update(expense)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Delete an expense
export const deleteExpense = async (id: string) => {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return true;
};

// Get category totals for a specific month
export const getCategoryTotals = async (year: number, month: number): Promise<{name: string, value: number}[]> => {
  const expenses = await getMonthlyExpenses(year, month);
  
  // Group by category and sum amounts
  const categoryTotals = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += Number(expense.amount);
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(categoryTotals).map(([name, value]) => ({ name, value }));
};

// Get total expenses for a specific month
export const getMonthlyTotal = async (year: number, month: number): Promise<number> => {
  const expenses = await getMonthlyExpenses(year, month);
  return expenses.reduce((total, expense) => total + Number(expense.amount), 0);
};
