
import { useState, useEffect } from 'react';
import { Menu, X, Leaf, Recycle, User, LogOut, ClipboardList } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrapBuyer, setIsScrapBuyer] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const checkScrapBuyer = async () => {
      if (user?.email) {
        try {
          const { data } = await supabase
            .from('scrap_buyers')
            .select('id')
            .eq('email', user.email)
            .single();
          setIsScrapBuyer(!!data);
        } catch (error) {
          setIsScrapBuyer(false);
        }
      } else {
        setIsScrapBuyer(false);
      }
    };

    checkScrapBuyer();
  }, [user]);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'How It Works', path: '/how-it-works' },
    { label: 'Services', path: '/services' },
    { label: 'Book Pickup', path: '/booking' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 md:space-x-3">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="relative">
                  <Recycle className="w-5 h-5 md:w-7 md:h-7 text-white" />
                  <Leaf className="w-3 h-3 md:w-4 md:h-4 text-green-200 absolute -top-1 -right-1" />
                </div>
              </div>
              <div className="absolute inset-0 w-10 h-10 md:w-12 md:h-12 bg-green-600 rounded-full opacity-20 animate-pulse"></div>
            </div>
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              WAS<span className="text-green-600">CRAP</span>
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium px-3 xl:px-4 py-2 rounded-lg transition-all duration-300 text-sm xl:text-base ${
                  isActive(item.path)
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {isScrapBuyer && (
              <Link
                to="/bookings-dashboard"
                className={`font-medium px-3 xl:px-4 py-2 rounded-lg transition-all duration-300 text-sm xl:text-base flex items-center ${
                  isActive('/bookings-dashboard')
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <ClipboardList className="w-4 h-4 mr-1" />
                Current Orders
              </Link>
            )}
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2 text-sm">
                    <User className="w-4 h-4" />
                    <span className="hidden xl:inline">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="bg-green-600 hover:bg-green-700 text-sm">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </div>

          <button
            className="lg:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-2 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium p-3 rounded-lg transition-all duration-300 text-base ${
                    isActive(item.path)
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {isScrapBuyer && (
                <Link
                  to="/bookings-dashboard"
                  onClick={() => setIsOpen(false)}
                  className={`font-medium p-3 rounded-lg transition-all duration-300 text-base flex items-center ${
                    isActive('/bookings-dashboard')
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Current Orders
                </Link>
              )}
              
              {user ? (
                <Button 
                  onClick={handleSignOut}
                  variant="outline" 
                  className="justify-start mt-2 text-base"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Button asChild className="bg-green-600 hover:bg-green-700 mt-2 text-base">
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
