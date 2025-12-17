
import Navigation from '@/components/Navigation';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <HowItWorks />
        <Pricing />
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
