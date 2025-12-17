
import Navigation from '@/components/Navigation';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';

const BookingPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <BookingForm />
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
