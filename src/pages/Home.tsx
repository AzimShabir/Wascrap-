
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import QuickServices from '@/components/home/QuickServices';
import TrustIndicators from '@/components/home/TrustIndicators';
import Footer from '@/components/Footer';
import FloatingScheduleButton from '@/components/FloatingScheduleButton';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <QuickServices />
      <TrustIndicators />
      <Footer />
      <FloatingScheduleButton />
    </div>
  );
};

export default Home;
