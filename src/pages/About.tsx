import Navigation from '@/components/Navigation';
import About from '@/components/About';
import BusinessModel from '@/components/BusinessModel';
import MarketOpportunity from '@/components/MarketOpportunity';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="pt-20 px-4 space-y-16">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center">
          About Our Project
        </h1>

        {/* Sections */}
        <About />
        <BusinessModel />
        <MarketOpportunity />
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
