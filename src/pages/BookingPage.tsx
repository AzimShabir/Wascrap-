
import Navigation from '@/components/Navigation';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';

const BookingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="pt-20 px-4 flex-1">
        <h1 className="text-4xl font-bold text-center mb-12">
          Book a Service
        </h1>

        <BookingForm />
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;

