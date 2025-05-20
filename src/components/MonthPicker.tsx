
import { useEffect, useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MonthPickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const MonthPicker = ({ selectedDate, onDateChange }: MonthPickerProps) => {
  const [months, setMonths] = useState<{ label: string; value: string }[]>([]);
  const [years, setYears] = useState<number[]>([]);
  
  useEffect(() => {
    // Generate list of months
    const monthsArray = Array.from({ length: 12 }, (_, i) => {
      const month = new Date(2000, i, 1);
      return {
        label: format(month, 'MMMM'),
        value: format(month, 'M'),
      };
    });
    setMonths(monthsArray);
    
    // Generate list of years (current year - 3 to current year + 1)
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from({ length: 5 }, (_, i) => currentYear - 3 + i);
    setYears(yearsArray);
  }, []);
  
  const handlePreviousMonth = () => {
    onDateChange(subMonths(selectedDate, 1));
  };
  
  const handleNextMonth = () => {
    onDateChange(addMonths(selectedDate, 1));
  };
  
  const handleMonthSelect = (month: string) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(parseInt(month) - 1);
    onDateChange(newDate);
  };
  
  const handleYearSelect = (year: string) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(parseInt(year));
    onDateChange(newDate);
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            
            <Select value={String(selectedDate.getMonth() + 1)} onValueChange={handleMonthSelect}>
              <SelectTrigger className="w-[110px]">
                <SelectValue>{format(selectedDate, 'MMMM')}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={String(selectedDate.getFullYear())} onValueChange={handleYearSelect}>
              <SelectTrigger className="w-[80px]">
                <SelectValue>{selectedDate.getFullYear()}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="ghost" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthPicker;
