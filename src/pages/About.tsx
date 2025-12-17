
import Navigation from '@/components/Navigation';
import About from '@/components/About';
import BusinessModel from '@/components/BusinessModel';
import MarketOpportunity from '@/components/MarketOpportunity';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <About />
        <BusinessModel />
        <MarketOpportunity />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
