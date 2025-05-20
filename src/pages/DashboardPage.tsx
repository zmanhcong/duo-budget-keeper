
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMonthlyExpenses, getCategoryTotals, getMonthlyTotal } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import ExpenseList from '@/components/ExpenseList';
import ExpenseSummary from '@/components/ExpenseSummary';
import MonthPicker from '@/components/MonthPicker';
import TotalCard from '@/components/TotalCard';
import { Wallet, PiggyBank, ArrowDown } from 'lucide-react';

interface CategoryTotal {
  name: string;
  value: number;
}

const DashboardPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useAuth();
  
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  
  // Query for expenses
  const {
    data: expenses = [],
    isLoading: isLoadingExpenses,
    error: expensesError,
  } = useQuery({
    queryKey: ['expenses', year, month],
    queryFn: () => getMonthlyExpenses(year, month),
  });
  
  // Query for category totals
  const {
    data: categoryTotals = [],
    isLoading: isLoadingCategoryTotals,
  } = useQuery<CategoryTotal[]>({
    queryKey: ['categoryTotals', year, month],
    queryFn: () => getCategoryTotals(year, month),
  });
  
  // Query for monthly total
  const {
    data: monthlyTotal = 0,
    isLoading: isLoadingMonthlyTotal,
  } = useQuery<number>({
    queryKey: ['monthlyTotal', year, month],
    queryFn: () => getMonthlyTotal(year, month),
  });
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your expenses and track your spending
          </p>
        </div>
        
        <MonthPicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TotalCard
            title="Total Spent This Month"
            value={monthlyTotal}
            icon={<Wallet className="h-5 w-5" />}
            isLoading={isLoadingMonthlyTotal}
            variant="danger"
          />
          
          <TotalCard
            title="Average Daily Spend"
            value={Math.round(monthlyTotal / 30)}
            icon={<ArrowDown className="h-5 w-5" />}
            isLoading={isLoadingMonthlyTotal}
            variant="warning"
          />
          
          <TotalCard
            title="Budget Remaining"
            value={10000000 - monthlyTotal}
            icon={<PiggyBank className="h-5 w-5" />}
            isLoading={isLoadingMonthlyTotal}
            variant="success"
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <ExpenseSummary
            categoryTotals={categoryTotals}
            isLoading={isLoadingCategoryTotals}
          />
          
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Expenses</h2>
            <ExpenseList
              expenses={expenses}
              isLoading={isLoadingExpenses}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
