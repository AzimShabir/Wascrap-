import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FloatingScheduleButton = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent pointer-events-none">
      <Link to="/booking" className="pointer-events-auto">
        <Button 
          size="lg"
          className="w-full h-14 text-lg font-bold shadow-2xl hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse hover:animate-none"
        >
          <Calendar className="w-6 h-6 mr-2" />
          Schedule Pickup Now
        </Button>
      </Link>
    </div>
  );
};

export default FloatingScheduleButton;
