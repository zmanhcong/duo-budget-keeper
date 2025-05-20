
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface TotalCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  isLoading?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const TotalCard = ({ title, value, icon, isLoading = false, variant = 'default' }: TotalCardProps) => {
  // Define variant styles
  const variantStyles = {
    default: 'bg-white',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-amber-50 border-amber-200',
    danger: 'bg-red-50 border-red-200',
  };
  
  const iconStyles = {
    default: 'text-primary',
    success: 'text-green-600',
    warning: 'text-amber-600',
    danger: 'text-red-600',
  };
  
  return (
    <Card className={`${variantStyles[variant]}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div>
          {isLoading ? (
            <Skeleton className="h-10 w-24" />
          ) : (
            <div className="text-2xl font-bold">{value.toLocaleString()} ₫</div>
          )}
        </div>
        <div className={`rounded-full p-2 ${iconStyles[variant]}`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default TotalCard;
