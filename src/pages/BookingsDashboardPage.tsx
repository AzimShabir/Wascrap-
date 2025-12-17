
import Navigation from '@/components/Navigation';
import BookingsDashboard from '@/components/auth/BookingsDashboard';
import Footer from '@/components/Footer';

const BookingsDashboardPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <BookingsDashboard />
      </div>
      <Footer />
    </div>
  );
};

export default BookingsDashboardPage;
