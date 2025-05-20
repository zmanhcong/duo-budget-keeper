
import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User, PieChart, Plus } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="text-2xl font-bold text-primary">
            Duo Budget
          </Link>
          
          {user && (
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                className={isActive('/dashboard') ? 'bg-accent text-accent-foreground' : ''}
                onClick={() => navigate('/dashboard')}
              >
                <PieChart className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/expenses/new')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-primary text-primary-foreground">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-1 py-6 px-4 sm:px-6 md:px-8">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
      
      <footer className="border-t py-4 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Duo Budget Keeper
        </div>
      </footer>
    </div>
  );
};

export default Layout;
