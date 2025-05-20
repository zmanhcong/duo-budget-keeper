
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Expense, formatDate } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ExpenseListProps {
  expenses: Expense[];
  isLoading: boolean;
}

const ExpenseList = ({ expenses, isLoading }: ExpenseListProps) => {
  const navigate = useNavigate();
  
  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="space-y-2">
          <div className="h-6 bg-muted animate-pulse rounded" />
          <div className="h-6 bg-muted animate-pulse rounded" />
          <div className="h-6 bg-muted animate-pulse rounded" />
        </div>
      </Card>
    );
  }
  
  if (expenses.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground mb-4">No expenses found for this month</p>
        <Button onClick={() => navigate('/expenses/new')}>Add an expense</Button>
      </Card>
    );
  }
  
  return (
    <Card>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Note</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>{formatDate(expense.created_at)}</TableCell>
                <TableCell>{expense.category || 'Uncategorized'}</TableCell>
                <TableCell className="max-w-[200px] truncate">{expense.note || '-'}</TableCell>
                <TableCell className="text-right font-medium">
                  {expense.amount.toLocaleString()} ₫
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/expenses/${expense.id}/edit`)}
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default ExpenseList;
